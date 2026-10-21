import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductsShowcase } from "@/components/ProductsSection";

export const metadata: Metadata = {
  title: "Products",
  description: "Turned and machined components, assemblies and custom parts made to customer drawings and specifications by AEPL, Hyderabad.",
};

export default function Products() {
  return (
    <main id="main">
      <PageHeader
        crumb="Products"
        eyebrow="Our products"
        title={["Precision components", "across industries."]}
        lead="We manufacture a wide range of turned and machined components as per customer drawings and specifications, catering to various industrial requirements."
      />
      <ProductsShowcase />
    </main>
  );
}
