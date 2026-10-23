import "server-only";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "aepl_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function authConfigured() {
  return Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32 && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH);
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const sign = (payload: string) => createHmac("sha256", process.env.AUTH_SECRET!).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Hash format: scrypt$<salt hex>$<hash hex>. Generate with `npm run admin:hash -- "password"`. */
export function hashPassword(password: string) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 64).toString("hex")}`;
}

export function checkCredentials(username: string, password: string): boolean {
  if (!authConfigured()) return false;
  const [scheme, saltHex, hashHex] = process.env.ADMIN_PASSWORD_HASH!.split("$");
  const userOk = safeEqual(username.trim().toLowerCase(), process.env.ADMIN_USERNAME!.trim().toLowerCase());
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  const passOk = actual.length === expected.length && timingSafeEqual(actual, expected);
  return userOk && passOk;
}

export async function startSession(username: string) {
  const payload = b64(JSON.stringify({ u: username, exp: Math.floor(Date.now() / 1000) + MAX_AGE }));
  const jar = await cookies();
  // Mark the cookie Secure only when the visitor reached us over HTTPS (reverse proxies set x-forwarded-proto),
  // so the admin also works when you run the production build locally over plain http.
  const secure = (await headers()).get("x-forwarded-proto") === "https" || process.env.AUTH_COOKIE_SECURE === "true";
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<{ username: string } | null> {
  if (!authConfigured()) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) return null;
    return { username: String(data.u) };
  } catch {
    return null;
  }
}

/** Call at the top of every admin page and every server action. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
