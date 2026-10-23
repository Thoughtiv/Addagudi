import type { Metadata } from "next";
import { MachineCards, MachineTable } from "@/components/MachineryParts";
import { PageHeader } from "@/components/PageHeader";
import { getMachines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Machinery",
  description: "CNC lathes, milling machines, drilling machines and other equipment used by AEPL to manufacture components to customer specifications.",
};

export default async function Machinery() {
  const machines = await getMachines();
  return (
    <main id="main">
      <PageHeader
        crumb="Machinery"
        eyebrow="Our machinery"
        title={["Modern machinery", "for higher precision."]}
        lead="Our facility uses CNC lathes, milling equipment, drilling machines, and other specialized equipment to manufacture components to customer specifications."
      />
      <section className="section machinery" aria-label="Featured machines" style={{ paddingBottom: 0 }}>
        <div className="container"><MachineCards machines={machines} /></div>
      </section>
      <MachineTable machines={machines} />
    </main>
  );
}
