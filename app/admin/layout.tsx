import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { getSession } from "@/lib/auth";
import { logoutAction } from "./actions";
import "./admin.css";

// Session checks read cookies and the database; never prerender admin screens at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | AEPL Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) return <div className="admin a-center">{children}</div>;

  return (
    <div className="admin a-shell">
      <aside className="a-side">
        <Link className="a-brand" href="/admin" aria-label="AEPL admin home">
          <Image className="a-brand__logo" src="/aepl-logo.png" alt="AEPL" width={1980} height={434} priority />
          <span className="a-brand__sub">Admin</span>
        </Link>
        <AdminNav />
        <div className="a-side__foot">
          <Link href="/" target="_blank" rel="noopener">View website ↗</Link>
          <form action={logoutAction}>
            <button type="submit" className="a-link-btn">Sign out ({session.username})</button>
          </form>
        </div>
      </aside>
      <main className="a-main" id="main">{children}</main>
    </div>
  );
}
