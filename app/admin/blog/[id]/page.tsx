import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DbRequired } from "@/components/admin/DbRequired";
import { PostForm } from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Post } from "@/models/Post";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isDbConfigured()) return (<><h1 className="a-h1">Edit post</h1><DbRequired /></>);
  if (!/^[a-f0-9]{24}$/.test(id)) notFound();
  await connectDb();
  const p = await Post.findById(id).lean();
  if (!p) notFound();

  return (
    <>
      <h1 className="a-h1">Edit post</h1>
      <PostForm
        post={{
          id: String(p._id), title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", content: p.content,
          coverImage: p.coverImage ?? "", coverAlt: p.coverAlt ?? "", status: p.status === "published" ? "published" : "draft",
        }}
      />
    </>
  );
}
