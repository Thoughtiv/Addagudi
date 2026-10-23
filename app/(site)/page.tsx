import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { CtaBand } from "@/components/EnquirySections";
import { Hero } from "@/components/Hero";
import { MachineryTeaser } from "@/components/MachineryParts";
import { ProductsTeaser } from "@/components/ProductsSection";
import { QualityTeaser } from "@/components/QualitySections";
import { company } from "@/lib/content";
import { getMachines, getSettings } from "@/lib/data";
import { toTel } from "@/lib/phone";

export default async function Home() {
  const [settings, machines] = await Promise.all([getSettings(), getMachines()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.short,
    foundingDate: String(company.founded),
    email: settings.email || undefined,
    telephone: settings.phone ? toTel(settings.phone).replace("tel:", "") : undefined,
    address: settings.address ? { "@type": "PostalAddress", streetAddress: settings.address, addressCountry: "IN" } : undefined,
  };
  return (
    <main id="main">
      <Hero />
      <CapabilityStrip />
      <CapabilitiesSection home />
      <ProductsTeaser />
      <MachineryTeaser machines={machines} />
      <QualityTeaser />
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
