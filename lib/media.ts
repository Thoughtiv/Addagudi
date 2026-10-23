import "server-only";
import sharp, { type OutputInfo } from "sharp";
import { connectDb } from "@/lib/mongodb";
import { Media } from "@/models/Media";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export class UploadError extends Error {}

/**
 * Validate an uploaded image, resize it (max 1800px wide) and re-encode as WebP,
 * then store it in MongoDB. Returns the public path to use in `<img src>`.
 */
export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED.has(file.type)) throw new UploadError("Please upload a JPG, PNG, WebP, GIF or AVIF image.");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("That image is larger than 8 MB. Please choose a smaller one.");

  let out: { data: Buffer; info: OutputInfo };
  try {
    const input = Buffer.from(await file.arrayBuffer());
    // sharp decodes the real bytes, so a renamed non-image fails here instead of being stored
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    out = { data, info };
  } catch {
    throw new UploadError("That file could not be read as an image.");
  }

  await connectDb();
  const doc = await Media.create({
    data: out.data,
    contentType: "image/webp",
    width: out.info.width,
    height: out.info.height,
    size: out.info.size,
    filename: file.name.slice(0, 200),
  });
  return `/api/media/${doc._id.toString()}`;
}

/** Remove a stored upload when its owner no longer references it. Ignores bundled "/img/..." paths. */
export async function deleteUploadedImage(src: string | undefined | null) {
  const m = src?.match(/^\/api\/media\/([a-f0-9]{24})$/);
  if (!m) return;
  try {
    await connectDb();
    await Media.deleteOne({ _id: m[1] });
  } catch (err) {
    console.error("Failed to delete media", err);
  }
}
