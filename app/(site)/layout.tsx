import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageEffects } from "@/components/PageEffects";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      {children}
      <Footer settings={settings} />
      <PageEffects />
    </>
  );
}
