import "server-only";
import { defaultMachines, defaultSettings, type MachineItem, type SiteSettings } from "@/lib/content";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Machine } from "@/models/Machine";
import { Post } from "@/models/Post";
import { Setting } from "@/models/Setting";

/**
 * Read helpers for the public website. Each one falls back to the built-in content when the
 * database is not configured or unreachable, so the site always renders.
 */

export async function getSettings(): Promise<SiteSettings> {
  if (!isDbConfigured()) return defaultSettings;
  try {
    await connectDb();
    const doc = await Setting.findOne({ key: "site" }).lean();
    if (!doc) return defaultSettings;
    return { address: doc.address ?? "", phone: doc.phone ?? "", mobile: doc.mobile ?? "", email: doc.email ?? "" };
  } catch (err) {
    console.error("getSettings failed, using defaults", err);
    return defaultSettings;
  }
}

export async function getMachines(): Promise<MachineItem[]> {
  if (!isDbConfigured()) return defaultMachines;
  try {
    await connectDb();
    const docs = await Machine.find().sort({ order: 1, createdAt: 1 }).lean();
    // An empty collection means the admin has not imported/added machines yet: keep the built-in list.
    if (docs.length === 0) return defaultMachines;
    return docs.map((d) => ({ id: String(d._id), name: d.name, model: d.model ?? "", image: d.image ?? "", alt: d.alt ?? "" }));
  } catch (err) {
    console.error("getMachines failed, using defaults", err);
    return defaultMachines;
  }
}

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  publishedAt: string;
};
export type PostFull = PostSummary & { content: string };

const toSummary = (d: {
  _id: unknown; title: string; slug: string; excerpt?: string | null; coverImage?: string | null; coverAlt?: string | null;
  publishedAt?: Date | null; createdAt?: Date;
}): PostSummary => ({
  id: String(d._id),
  title: d.title,
  slug: d.slug,
  excerpt: d.excerpt ?? "",
  coverImage: d.coverImage ?? "",
  coverAlt: d.coverAlt ?? "",
  publishedAt: (d.publishedAt ?? d.createdAt ?? new Date()).toISOString(),
});

export async function getPublishedPosts(): Promise<PostSummary[]> {
  if (!isDbConfigured()) return [];
  try {
    await connectDb();
    const docs = await Post.find({ status: "published" }).sort({ publishedAt: -1 }).lean();
    return docs.map(toSummary);
  } catch (err) {
    console.error("getPublishedPosts failed", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  if (!isDbConfigured()) return null;
  try {
    await connectDb();
    const d = await Post.findOne({ slug, status: "published" }).lean();
    return d ? { ...toSummary(d), content: d.content } : null;
  } catch (err) {
    console.error("getPostBySlug failed", err);
    return null;
  }
}
