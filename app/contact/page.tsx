import type { Metadata } from "next";
import { EnquirySection } from "@/components/EnquirySections";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Addagudi Exports Pvt. Ltd., Jeedimetla, Hyderabad, for enquiries, quotations or custom manufacturing requirements.",
};

export default function Contact() {
  return (
    <main id="main">
      <PageHeader
        crumb="Contact"
        eyebrow="Contact AEPL"
        title={["Let's work", "together."]}
        lead="Looking for a reliable supplier for precision components? Get in touch with our team for enquiries, quotations or custom manufacturing requirements."
      />
      <EnquirySection />
    </main>
  );
}
