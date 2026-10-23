import { NextResponse } from "next/server";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Media } from "@/models/Media";

export const runtime = "nodejs";

/** Serves an uploaded image. Ids are unguessable ObjectIds and never reused, so responses cache forever. */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^[a-f0-9]{24}$/.test(id) || !isDbConfigured()) return new NextResponse("Not found", { status: 404 });

  const etag = `"${id}"`;
  if (req.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304, headers: { ETag: etag } });
  }

  try {
    await connectDb();
    // not .lean(): lean returns a BSON Binary, a hydrated document returns a Node Buffer
    const doc = await Media.findById(id).select("data contentType");
    if (!doc) return new NextResponse("Not found", { status: 404 });
    return new NextResponse(new Uint8Array(doc.data), {
      headers: {
        "Content-Type": doc.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        ETag: etag,
      },
    });
  } catch (err) {
    console.error("media fetch failed", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
