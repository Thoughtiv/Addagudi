import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Icon } from "@/components/Icon";
import { PostCover } from "@/components/PostCover";
import { getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt || undefined };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <main id="main">
      <article className="article">
        <header className="page-hero">
          <div className="container article__head">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{post.title}</span>
            </nav>
            <time className="article__date" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <h1 className="display h-article">{post.title}</h1>
            {post.excerpt && <p className="section__lead">{post.excerpt}</p>}
          </div>
        </header>

        <div className="container article__body">
          {post.coverImage && (
            <div className="article__cover">
              <PostCover src={post.coverImage} alt={post.coverAlt} sizes="(max-width: 960px) 100vw, 860px" priority />
            </div>
          )}
          <div className="prose">
            <Markdown
              components={{
                // links to other sites open in a new tab
                a: ({ href, children }) => {
                  const external = typeof href === "string" && /^https?:\/\//.test(href);
                  return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
                },
                // eslint-disable-next-line @next/next/no-img-element
                img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />,
              }}
            >
              {post.content}
            </Markdown>
          </div>
          <p className="article__back"><Link className="link-blue" href="/blog"><Icon id="i-arrow-r" className="icon icon--flip" /> All posts</Link></p>
        </div>
      </article>
    </main>
  );
}
