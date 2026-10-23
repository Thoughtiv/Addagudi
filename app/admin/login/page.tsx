import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { authConfigured, getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  const ready = authConfigured();

  return (
    <div className="a-login">
      <p className="a-brand__mark">AEPL</p>
      <h1>Admin sign in</h1>
      {ready ? (
        <LoginForm />
      ) : (
        <div className="a-msg a-msg--err" role="alert">
          <p><strong>Admin sign-in is not set up yet.</strong></p>
          <p>Add these to <code>.env.local</code> and restart the server:</p>
          <pre>{`AUTH_SECRET=<random text, 32+ characters>
ADMIN_USERNAME=<your username>
ADMIN_PASSWORD_HASH=<from: npm run admin:hash -- "your password">`}</pre>
        </div>
      )}
    </div>
  );
}
