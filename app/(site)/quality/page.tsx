import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";
import { QualityDetails } from "@/components/QualitySections";
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
        lead="AEPL emphasizes quality throughout manufacturing through documented checks, first-article reporting, calibrated inspection equipment, and third-party inspection when required."
      />
      <QualityDetails email={settings.email} />
      <Process />
    </main>
  );
}
