import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/Process";
import { QualityDetails } from "@/components/QualitySections";

export const metadata: Metadata = {
  title: "Quality",
  description: "AEPL's quality practices: documented checks, first-article reports, calibrated inspection equipment and third-party inspection when required.",
};

export default function Quality() {
  return (
    <main id="main">
      <PageHeader
        crumb="Quality"
        eyebrow="Quality & certification"
        title={["Committed", "to quality."]}
        lead="AEPL emphasizes quality throughout manufacturing through documented checks, first-article reporting, calibrated inspection equipment, and third-party inspection when required."
      />
      <QualityDetails />
      <Process />
    </main>
  );
}
