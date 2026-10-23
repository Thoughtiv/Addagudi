import "server-only";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

const COOKIE = "aepl_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Sessions are signed with AUTH_SECRET; admin accounts live in the `admins` collection. */
export function authConfigured() {
  return Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32 && isDbConfigured());
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const sign = (payload: string) => createHmac("sha256", process.env.AUTH_SECRET!).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Hash format: scrypt$<salt hex>$<hash hex>. Same format is used by scripts/create-admin.mjs. */
export function hashPassword(password: string) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 64).toString("hex")}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Used when the username is unknown, so a wrong username costs the same time as a wrong password.
const DUMMY_HASH = hashPassword("not-a-real-password");

/** A short fingerprint of the stored hash: changing the password invalidates existing sessions. */
const fingerprint = (passwordHash: string) => createHash("sha256").update(passwordHash).digest("hex").slice(0, 16);

export async function checkCredentials(username: string, password: string): Promise<{ username: string; pv: string } | null> {
  if (!authConfigured()) return null;
  await connectDb();
  const admin = await Admin.findOne({ username: username.trim().toLowerCase() }).lean();
  const ok = verifyHash(password, admin?.passwordHash ?? DUMMY_HASH);
  return admin && ok ? { username: admin.username, pv: fingerprint(admin.passwordHash) } : null;
}

export async function startSession(user: { username: string; pv: string }) {
  const payload = b64(JSON.stringify({ u: user.username, pv: user.pv, exp: Math.floor(Date.now() / 1000) + MAX_AGE }));
  const jar = await cookies();
  // Mark the cookie Secure only when the visitor reached us over HTTPS (reverse proxies set x-forwarded-proto),
  // so the admin also works when you run the production build locally over plain http.
  const secure = (await headers()).get("x-forwarded-proto") === "https" || process.env.AUTH_COOKIE_SECURE === "true";
  jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: MAX_AGE });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

/** Verified once per request (cached), then checked against the database so removed/changed accounts are signed out. */
export const getSession = cache(async (): Promise<{ username: string } | null> => {
  if (!authConfigured()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000 || typeof data.u !== "string") return null;
    await connectDb();
    const admin = await Admin.findOne({ username: data.u }).select("username passwordHash").lean();
    if (!admin || fingerprint(admin.passwordHash) !== data.pv) return null;
    return { username: admin.username };
  } catch {
    return null;
  }
});

/** Call at the top of every admin page and every server action. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Replace the signed-in admin's password after checking the current one. Returns an error message or null. */
export async function changePassword(username: string, current: string, next: string): Promise<string | null> {
  await connectDb();
  const admin = await Admin.findOne({ username });
  if (!admin || !verifyHash(current, admin.passwordHash)) return "Your current password is incorrect.";
  admin.passwordHash = hashPassword(next);
  await admin.save();
  return null;
}
