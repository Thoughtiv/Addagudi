import Link from "next/link";
import { DbRequired } from "@/components/admin/DbRequired";
import { requireAdmin } from "@/lib/auth";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { Machine } from "@/models/Machine";
import { Post } from "@/models/Post";

export default async function Dashboard() {
  await requireAdmin();
  if (!isDbConfigured()) return (<><h1 className="a-h1">Dashboard</h1><DbRequired /></>);
  await connectDb();
  const [published, drafts, machines, newEnquiries] = await Promise.all([
    Post.countDocuments({ status: "published" }),
    Post.countDocuments({ status: "draft" }),
    Machine.countDocuments(),
    Enquiry.countDocuments({ status: "new" }),
  ]);

  const cards = [
    { href: "/admin/blog", label: "Blog posts", value: published, note: `${drafts} draft${drafts === 1 ? "" : "s"}` },
    { href: "/admin/machinery", label: "Machines", value: machines, note: machines === 0 ? "Using the built-in list" : "Shown on the website" },
    { href: "/admin/enquiries", label: "New enquiries", value: newEnquiries, note: "Waiting for a reply" },
    { href: "/admin/settings", label: "Contact & address", value: "Edit", note: "Updates the whole website" },
  ];

  return (
    <>
      <h1 className="a-h1">Dashboard</h1>
      <ul className="a-cards">
        {cards.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="a-card">
              <span className="a-card__label">{c.label}</span>
              <strong className="a-card__value">{c.value}</strong>
              <span className="a-card__note">{c.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
