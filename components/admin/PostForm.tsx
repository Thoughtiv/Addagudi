"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { savePostAction, uploadInlineImageAction } from "@/app/admin/actions";
import { FieldError, FormMessage, ImageField, SubmitButton, useAdminAction } from "./Controls";

type Post = { id: string; title: string; slug: string; excerpt: string; content: string; coverImage: string; coverAlt: string; status: "draft" | "published" };

export function PostForm({ post }: { post?: Post }) {
  const { state, pending, onSubmit } = useAdminAction(savePostAction);
  const e = state?.errors ?? {};
  const text = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [uploading, startUpload] = useTransition();
  const [uploadMsg, setUploadMsg] = useState("");

  function insertImage(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    ev.target.value = "";
    if (!f) return;
    setUploadMsg("");
    const fd = new FormData();
    fd.set("file", f);
    startUpload(async () => {
      const res = await uploadInlineImageAction(fd);
      if (res.error || !res.url) { setUploadMsg(res.error ?? "Upload failed."); return; }
      const ta = text.current;
      if (!ta) return;
      const md = `\n\n![Describe the image](${res.url})\n\n`;
      const start = ta.selectionStart ?? ta.value.length;
      ta.setRangeText(md, start, ta.selectionEnd ?? start, "end");
      ta.focus();
      setUploadMsg("Image inserted. Replace “Describe the image” with a short description.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="a-form">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="a-field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={post?.title} required maxLength={160} aria-describedby="e-title" aria-invalid={e.title ? true : undefined} />
        <FieldError id="e-title" error={e.title} />
      </div>

      <div className="a-row">
        <div className="a-field">
          <label htmlFor="slug">Web address <span className="a-opt">(optional)</span></label>
          <input id="slug" name="slug" type="text" defaultValue={post?.slug} placeholder="made from the title if left empty" aria-describedby="e-slug" aria-invalid={e.slug ? true : undefined} />
          <FieldError id="e-slug" error={e.slug} />
          <p className="a-help">The post will be at /blog/<strong>{post?.slug || "your-title"}</strong></p>
        </div>
        <div className="a-field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={post?.status ?? "draft"}>
            <option value="draft">Draft (not visible on the website)</option>
            <option value="published">Published (visible on the website)</option>
          </select>
        </div>
      </div>

      <div className="a-field">
        <label htmlFor="excerpt">Summary <span className="a-opt">(optional, shown on the blog page)</span></label>
        <textarea id="excerpt" name="excerpt" rows={2} maxLength={300} defaultValue={post?.excerpt} aria-describedby="e-excerpt" aria-invalid={e.excerpt ? true : undefined} />
        <FieldError id="e-excerpt" error={e.excerpt} />
      </div>

      <ImageField name="cover" removeName="removeCover" label="Cover image" current={post?.coverImage} error={e.cover} />
      <div className="a-field">
        <label htmlFor="coverAlt">Cover image description <span className="a-opt">(optional, for accessibility)</span></label>
        <input id="coverAlt" name="coverAlt" type="text" defaultValue={post?.coverAlt} />
      </div>

      <div className="a-field">
        <div className="a-field__bar">
          <label htmlFor="content">Content</label>
          <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={() => file.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Insert image"}
          </button>
          <input ref={file} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={insertImage} hidden />
        </div>
        <textarea id="content" name="content" ref={text} rows={18} defaultValue={post?.content} required className="a-mono" aria-describedby="e-content help-content" aria-invalid={e.content ? true : undefined} />
        <FieldError id="e-content" error={e.content} />
        <p className="a-help" id="help-content">
          Write in Markdown: <code>## Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>- list item</code>, <code>[link text](https://…)</code>. Use “Insert image” to upload a photo into the text.
        </p>
        <p className="a-help" role="status" aria-live="polite">{uploadMsg}</p>
      </div>

      <FormMessage state={state} />
      <div className="a-actions">
        <SubmitButton pending={pending}>{post ? "Save post" : "Create post"}</SubmitButton>
        <Link className="a-btn a-btn--ghost" href="/admin/blog">Cancel</Link>
      </div>
    </form>
  );
}
