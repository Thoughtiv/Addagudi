import type { Metadata } from "next";
import { DbRequired } from "@/components/admin/DbRequired";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import { isDbConfigured } from "@/lib/mongodb";

export const metadata: Metadata = { title: "Contact & address" };

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <>
      <h1 className="a-h1">Contact &amp; address</h1>
      <p className="a-lead">These details appear in the website footer and on the Contact page, and are used for the phone and email links across the site.</p>
      {isDbConfigured() ? <SettingsForm settings={settings} /> : <DbRequired />}
    </>
  );
}
