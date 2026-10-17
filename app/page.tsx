import { Capabilities } from "@/components/Capabilities";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { EnquiryCta } from "@/components/EnquiryCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Machinery } from "@/components/Machinery";
import { PageEffects } from "@/components/PageEffects";
import { Process } from "@/components/Process";
import { Products } from "@/components/Products";
import { Quality } from "@/components/Quality";
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
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <CapabilityStrip />
        <Capabilities />
        <Products />
        <Machinery />
        <Process />
        <Quality />
        <EnquiryCta />
      </main>
      <Footer />
      <PageEffects />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
