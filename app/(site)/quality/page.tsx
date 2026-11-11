import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";
import { InspectionEquipment, QualityDetails } from "@/components/QualitySections";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Quality",
  description: "AEPL's quality practices: documented checks, first-article reports, calibrated inspection equipment and third-party inspection when required.",
};

export default async function Quality() {
  const settings = await getSettings();
  return (
    <main id="main">
      <PageHeader
        crumb="Quality"
        eyebrow="Quality & certification"
        title={["Committed", "to quality."]}
        lead="Our TÜV SÜD-certified ISO 9001:2015 quality management system covers the manufacture and export of machined / CNC turned metallic components. Inspection and documentation are applied according to drawing, order and customer requirements."
      />
      <QualityDetails email={settings.email} />
      <InspectionEquipment />
      <Process />
    </main>
  );
}
