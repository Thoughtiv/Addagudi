import type { Metadata } from "next";
import { DbRequired } from "@/components/admin/DbRequired";
import { MachineForm } from "@/components/admin/MachineForm";
import { requireAdmin } from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";

export const metadata: Metadata = { title: "Add machine" };

export default async function NewMachine() {
  await requireAdmin();
  return (
    <>
      <h1 className="a-h1">Add machine</h1>
      {isDbConfigured() ? <MachineForm /> : <DbRequired />}
    </>
  );
}
