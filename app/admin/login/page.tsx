import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { authConfigured, getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ changed?: string }> }) {
  const sp = await searchParams;
  if (await getSession()) redirect("/admin");
  const ready = authConfigured();

  return (
    <div className="a-login">
      <Image className="a-login__logo" src="/aepl-logo.png" alt="AEPL" width={1980} height={434} priority />
      <h1>Admin sign in</h1>
      {sp.changed && <div className="a-msg a-msg--ok" role="status">Password changed. Please sign in with the new password.</div>}
      {ready ? (
        <LoginForm />
      ) : (
        <div className="a-msg a-msg--err" role="alert">
          <p><strong>Admin sign-in is not set up yet.</strong></p>
          <p>Add these to <code>.env.local</code> (or your host&apos;s environment settings) and restart:</p>
          <pre>{`MONGODB_URI=<your MongoDB connection string>
AUTH_SECRET=<random text, 32+ characters>`}</pre>
          <p>Then create the first admin: <code>npm run admin:create -- &lt;username&gt; &lt;password&gt;</code></p>
        </div>
      )}
    </div>
  );
}
