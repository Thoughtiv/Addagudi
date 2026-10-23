import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { PostCover } from "@/components/PostCover";
import { getPublishedPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and updates from Addagudi Exports Pvt. Ltd., Hyderabad.",
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();
  return (
    <main id="main">
      <PageHeader
        crumb="Blog"
        eyebrow="Blog"
        title={["Latest", "from AEPL."]}
        lead="News and updates from Addagudi Exports Pvt. Ltd."
      />
      <section className="section" aria-label="Blog posts">
        <div className="container">
          {posts.length === 0 ? (
            <p className="note" style={{ marginTop: 0 }}>No posts have been published yet. Please check back soon.</p>
          ) : (
            <ul className="posts">
              {posts.map((p) => (
                <li className="post-card reveal" key={p.id}>
                  <Link className="post-card__media" href={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
                    {p.coverImage ? (
                      <PostCover src={p.coverImage} alt="" sizes="(max-width: 960px) 100vw, 380px" />
                    ) : (
                      <span className="machine__none"><Icon id="i-doc" /></span>
                    )}
                  </Link>
                  <div className="post-card__body">
                    <time className="post-card__date" dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                    <h2 className="post-card__title"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
                    {p.excerpt && <p>{p.excerpt}</p>}
                    <Link className="link-blue" href={`/blog/${p.slug}`} aria-label={`Read ${p.title}`}>Read more <Icon id="i-arrow-r" /></Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
