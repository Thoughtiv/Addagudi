import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/Controls";
import { DbRequired } from "@/components/admin/DbRequired";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { deletePostAction } from "../actions";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  if (!isDbConfigured()) return (<><h1 className="a-h1">Blog</h1><DbRequired /></>);
  await connectDb();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <>
      <div className="a-titlebar">
        <h1 className="a-h1">Blog</h1>
        <Link className="a-btn a-btn--primary" href="/admin/blog/new">New post</Link>
      </div>
      {sp.saved && <div className="a-msg a-msg--ok" role="status">Post saved.</div>}
      {sp.deleted && <div className="a-msg a-msg--ok" role="status">Post deleted.</div>}

      {posts.length === 0 ? (
        <p className="a-empty">No posts yet. Create the first one and it will appear on the website&apos;s Blog page once published.</p>
      ) : (
        <div className="a-tablewrap">
          <table className="a-table">
            <thead><tr><th scope="col">Title</th><th scope="col">Status</th><th scope="col">Date</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={String(p._id)}>
                  <th scope="row"><Link href={`/admin/blog/${p._id}`}>{p.title}</Link><small>/blog/{p.slug}</small></th>
                  <td><span className={`a-badge a-badge--${p.status}`}>{p.status === "published" ? "Published" : "Draft"}</span></td>
                  <td>{formatDate(p.publishedAt ?? p.createdAt!)}</td>
                  <td className="a-table__actions">
                    {p.status === "published" && <Link className="a-btn a-btn--ghost a-btn--sm" href={`/blog/${p.slug}`} target="_blank" rel="noopener">View</Link>}
                    <Link className="a-btn a-btn--ghost a-btn--sm" href={`/admin/blog/${p._id}`}>Edit</Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={String(p._id)} />
                      <ConfirmButton className="a-btn a-btn--danger a-btn--sm" message={`Delete “${p.title}”? This cannot be undone.`}>Delete</ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
