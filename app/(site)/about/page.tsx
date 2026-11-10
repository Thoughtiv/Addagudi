import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { PageHeader } from "@/components/PageHeader";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Addagudi Exports Pvt. Ltd. was established in 1997 in Hyderabad, India, and engineers, manufactures and exports custom-made engineered components.",
};

export default function About() {
  return (
    <main id="main">
      <PageHeader
        crumb="About"
        eyebrow="About AEPL"
        title={["Engineering", "since 1997."]}
        lead="Established in Hyderabad in 1997, Addagudi Exports Pvt. Ltd. (AEPL) began by supplying engineered components and expanded into manufacturing. As a family-owned company, AEPL combines experienced production personnel, machine capability and established inspection practices to produce custom machined parts and support assemblies to customer specifications."
      />
      <CapabilitiesSection />
      <section className="section capabilities about-stats" aria-label="Capability summary" style={{ paddingTop: 0 }}>
        <div className="container">
          <ul className="stats reveal">
            {stats.map((s) => <li key={s.value}><strong>{s.value}</strong><span>{s.label}</span></li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
