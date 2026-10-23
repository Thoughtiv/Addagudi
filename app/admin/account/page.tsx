import type { Metadata } from "next";
import { PasswordForm } from "@/components/admin/PasswordForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await requireAdmin();
  return (
    <>
      <h1 className="a-h1">Account</h1>
      <p className="a-lead">Signed in as <strong>{session.username}</strong>. To add another admin, run <code>npm run admin:create -- &lt;username&gt; &lt;password&gt;</code>.</p>
      <PasswordForm />
    </>
  );
}
