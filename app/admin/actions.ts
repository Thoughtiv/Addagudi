"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { changePassword, checkCredentials, endSession, requireAdmin, startSession } from "@/lib/auth";
import { defaultMachines } from "@/lib/content";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { deleteUploadedImage, saveUploadedImage, UploadError } from "@/lib/media";
import { slugify } from "@/lib/slug";
import { Enquiry } from "@/models/Enquiry";
import { Machine } from "@/models/Machine";
import { Post } from "@/models/Post";
import { Setting } from "@/models/Setting";

export type ActionState = { ok?: boolean; message?: string; errors?: Record<string, string> } | null;

const str = (fd: FormData, k: string) => (typeof fd.get(k) === "string" ? (fd.get(k) as string).trim() : "");
const fileOf = (fd: FormData, k: string): File | null => {
  const f = fd.get(k);
  return f instanceof File && f.size > 0 ? f : null;
};
const refreshSite = () => revalidatePath("/", "layout");

async function guard() {
  await requireAdmin();
  if (!isDbConfigured()) throw new Error("MONGODB_URI is not set");
  await connectDb();
}

/* ------------------------------------------------------------------ auth */

const attempts = new Map<string, number[]>();

export async function loginAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  if (recent.length >= 8) return { message: "Too many attempts. Please wait a few minutes and try again." };

  let user = null;
  try {
    user = await checkCredentials(str(fd, "username"), typeof fd.get("password") === "string" ? (fd.get("password") as string) : "");
  } catch (err) {
    console.error("login failed", err);
    return { message: "Could not reach the database. Please try again." };
  }
  if (!user) {
    recent.push(now);
    attempts.set(ip, recent);
    return { message: "Incorrect username or password." };
  }
  attempts.delete(ip);
  await startSession(user);
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

/* --------------------------------------------------------------- account */

export async function changePasswordAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const session = await requireAdmin();
  const current = typeof fd.get("current") === "string" ? (fd.get("current") as string) : "";
  const next = typeof fd.get("next") === "string" ? (fd.get("next") as string) : "";
  const confirm = typeof fd.get("confirm") === "string" ? (fd.get("confirm") as string) : "";

  const errors: Record<string, string> = {};
  if (!current) errors.current = "Please enter your current password.";
  if (next.length < 10) errors.next = "Use at least 10 characters.";
  else if (next === current) errors.next = "The new password must be different.";
  if (confirm !== next) errors.confirm = "The two passwords do not match.";
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  const problem = await changePassword(session.username, current, next);
  if (problem) return { errors: { current: problem }, message: problem };
  // the old session is now invalid (password fingerprint changed): sign in again
  await endSession();
  redirect("/admin/login?changed=1");
}

/* -------------------------------------------------------------- settings */

export async function saveSettingsAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await guard();
  const data = { address: str(fd, "address"), phone: str(fd, "phone"), mobile: str(fd, "mobile"), email: str(fd, "email").toLowerCase() };
  const errors: Record<string, string> = {};
  if (!data.address) errors.address = "Please enter the address.";
  if (data.address.length > 400) errors.address = "Address is too long (400 characters max).";
  if (data.phone && !/^[+()\d][\d\s().+-]{5,}$/.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.mobile && !/^[+()\d][\d\s().+-]{5,}$/.test(data.mobile)) errors.mobile = "Please enter a valid mobile number.";
  if (!data.email) errors.email = "Please enter an email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  await Setting.findOneAndUpdate({ key: "site" }, { $set: data, $setOnInsert: { key: "site" } }, { upsert: true });
  refreshSite();
  return { ok: true, message: "Saved. The new details are now live across the website." };
}

/* ------------------------------------------------------------------ blog */

/** Handles the optional image field of a form: replace, remove, or keep. Returns the new `src` value. */
async function resolveImage(fd: FormData, field: string, removeField: string, current: string): Promise<string> {
  const file = fileOf(fd, field);
  if (file) {
    const next = await saveUploadedImage(file);
    await deleteUploadedImage(current);
    return next;
  }
  if (fd.get(removeField) === "on") {
    await deleteUploadedImage(current);
    return "";
  }
  return current;
}

export async function savePostAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await guard();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const content = typeof fd.get("content") === "string" ? (fd.get("content") as string).trim() : "";
  const excerpt = str(fd, "excerpt");
  const status = str(fd, "status") === "published" ? "published" : "draft";
  const slug = slugify(str(fd, "slug") || title);
  const coverAlt = str(fd, "coverAlt");

  const errors: Record<string, string> = {};
  if (!title) errors.title = "Please enter a title.";
  else if (title.length > 160) errors.title = "Title is too long (160 characters max).";
  if (!slug) errors.slug = "The web address could not be made from the title. Please type one.";
  if (!content) errors.content = "Please write the post content.";
  else if (content.length > 60000) errors.content = "The post is too long.";
  if (excerpt.length > 300) errors.excerpt = "The summary is too long (300 characters max).";
  if (slug && !errors.slug) {
    const clash = await Post.findOne({ slug, ...(id ? { _id: { $ne: id } } : {}) }).select("_id").lean();
    if (clash) errors.slug = "Another post already uses this web address.";
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  try {
    const existing = id ? await Post.findById(id) : null;
    if (id && !existing) return { message: "That post no longer exists." };

    const coverImage = await resolveImage(fd, "cover", "removeCover", existing?.coverImage ?? "");
    const publishedAt = status === "published" ? existing?.publishedAt ?? new Date() : existing?.publishedAt;

    if (existing) {
      Object.assign(existing, { title, slug, excerpt, content, status, coverImage, coverAlt, publishedAt });
      await existing.save();
    } else {
      await Post.create({ title, slug, excerpt, content, status, coverImage, coverAlt, publishedAt });
    }
  } catch (err) {
    if (err instanceof UploadError) return { errors: { cover: err.message }, message: "The cover image could not be used." };
    console.error("savePost failed", err);
    return { message: "Something went wrong while saving. Please try again." };
  }
  refreshSite();
  redirect("/admin/blog?saved=1");
}

export async function deletePostAction(fd: FormData) {
  await guard();
  const post = await Post.findByIdAndDelete(str(fd, "id"));
  if (post) await deleteUploadedImage(post.coverImage);
  refreshSite();
  redirect("/admin/blog?deleted=1");
}

/** Used by the editor's "Insert image" button: uploads and returns the path to put in the Markdown. */
export async function uploadInlineImageAction(fd: FormData): Promise<{ url?: string; error?: string }> {
  await guard();
  const file = fileOf(fd, "file");
  if (!file) return { error: "Please choose an image." };
  try {
    return { url: await saveUploadedImage(file) };
  } catch (err) {
    return { error: err instanceof UploadError ? err.message : "Upload failed. Please try again." };
  }
}

/* ------------------------------------------------------------- machinery */

export async function saveMachineAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await guard();
  const id = str(fd, "id");
  const name = str(fd, "name");
  const model = str(fd, "model");
  const alt = str(fd, "alt");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter the machine name.";
  else if (name.length > 120) errors.name = "Name is too long.";
  if (model.length > 120) errors.model = "Model is too long.";
  if (alt.length > 200) errors.alt = "Description is too long.";
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields." };

  try {
    const existing = id ? await Machine.findById(id) : null;
    if (id && !existing) return { message: "That machine no longer exists." };
    const image = await resolveImage(fd, "image", "removeImage", existing?.image ?? "");

    if (existing) {
      Object.assign(existing, { name, model, alt, image });
      await existing.save();
    } else {
      const last = await Machine.findOne().sort({ order: -1 }).select("order").lean();
      await Machine.create({ name, model, alt, image, order: (last?.order ?? -1) + 1 });
    }
  } catch (err) {
    if (err instanceof UploadError) return { errors: { image: err.message }, message: "The photo could not be used." };
    console.error("saveMachine failed", err);
    return { message: "Something went wrong while saving. Please try again." };
  }
  refreshSite();
  redirect("/admin/machinery?saved=1");
}

export async function deleteMachineAction(fd: FormData) {
  await guard();
  const m = await Machine.findByIdAndDelete(str(fd, "id"));
  if (m) await deleteUploadedImage(m.image);
  refreshSite();
  redirect("/admin/machinery?deleted=1");
}

export async function moveMachineAction(fd: FormData) {
  await guard();
  const id = str(fd, "id");
  const dir = str(fd, "dir") === "up" ? -1 : 1;
  const list = await Machine.find().sort({ order: 1, createdAt: 1 }).select("_id").lean();
  const i = list.findIndex((m) => String(m._id) === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  await Machine.bulkWrite(list.map((m, order) => ({ updateOne: { filter: { _id: m._id }, update: { $set: { order } } } })));
  refreshSite();
  revalidatePath("/admin/machinery");
}

/** Copy the built-in machine list into the database (safe to run more than once). */
export async function importDefaultMachinesAction() {
  await guard();
  await Machine.bulkWrite(
    defaultMachines.map((m, order) => ({
      updateOne: {
        filter: { seedKey: m.id },
        update: { $setOnInsert: { seedKey: m.id, name: m.name, model: m.model, image: m.image, alt: m.alt, order } },
        upsert: true,
      },
    })),
  );
  refreshSite();
  redirect("/admin/machinery?imported=1");
}

/* ------------------------------------------------------------ enquiries */

export async function setEnquiryStatusAction(fd: FormData) {
  await guard();
  const status = str(fd, "status");
  if (!["new", "replied", "closed"].includes(status)) return;
  await Enquiry.updateOne({ _id: str(fd, "id") }, { $set: { status } });
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiryAction(fd: FormData) {
  await guard();
  await Enquiry.deleteOne({ _id: str(fd, "id") });
  revalidatePath("/admin/enquiries");
}
