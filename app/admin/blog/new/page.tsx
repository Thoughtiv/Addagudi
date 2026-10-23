import type { Metadata } from "next";
import { DbRequired } from "@/components/admin/DbRequired";
import { PostForm } from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";

export const metadata: Metadata = { title: "New post" };

export default async function NewPost() {
  await requireAdmin();
  return (
    <>
      <h1 className="a-h1">New post</h1>
      {isDbConfigured() ? <PostForm /> : <DbRequired />}
    </>
  );
}
