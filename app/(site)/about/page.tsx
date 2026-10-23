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
        lead="Addagudi Exports Pvt. Ltd. was established in 1997 in Hyderabad, India. AEPL engineers, manufactures and exports custom-made engineered components, including CNC-turned and machined metallic parts, with work ranging from individual components to finished assemblies and OEM requirements."
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
