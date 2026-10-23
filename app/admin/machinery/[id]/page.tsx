import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DbRequired } from "@/components/admin/DbRequired";
import { MachineForm } from "@/components/admin/MachineForm";
import { requireAdmin } from "@/lib/auth";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { Machine } from "@/models/Machine";

export const metadata: Metadata = { title: "Edit machine" };

export default async function EditMachine({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isDbConfigured()) return (<><h1 className="a-h1">Edit machine</h1><DbRequired /></>);
  if (!/^[a-f0-9]{24}$/.test(id)) notFound();
  await connectDb();
  const m = await Machine.findById(id).lean();
  if (!m) notFound();
  return (
    <>
      <h1 className="a-h1">Edit machine</h1>
      <MachineForm machine={{ id: String(m._id), name: m.name, model: m.model ?? "", image: m.image ?? "", alt: m.alt ?? "" }} />
    </>
  );
}
