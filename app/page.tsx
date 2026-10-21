import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { CtaBand } from "@/components/EnquirySections";
import { Hero } from "@/components/Hero";
import { MachineryTeaser } from "@/components/MachineryParts";
import { ProductsTeaser } from "@/components/ProductsSection";
import { QualityTeaser } from "@/components/QualitySections";
import { company } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.short,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: "+91-40-20004225",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot #60/C, Phase-I, I.D.A. Jeedimetla, Shapur Nagar",
    addressLocality: "Hyderabad",
    postalCode: "500055",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CapabilityStrip />
      <CapabilitiesSection home />
      <ProductsTeaser />
      <MachineryTeaser />
      <QualityTeaser />
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
