"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/machinery", label: "Machinery" },
  { href: "/admin/settings", label: "Contact & address" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="a-nav" aria-label="Admin sections">
      {TABS.map((t) => {
        const active = t.exact ? pathname === t.href : pathname.startsWith(t.href);
        return <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined}>{t.label}</Link>;
      })}
    </nav>
  );
}
