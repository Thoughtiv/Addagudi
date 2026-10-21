import type { Metadata } from "next";
import Link from "next/link";
import credits from "@/lib/credits.json";

export const metadata: Metadata = {
  title: "Image credits | Addagudi Exports Pvt. Ltd.",
  robots: { index: false },
};

export default function Credits() {
  return (
    <main id="main" className="container" style={{ paddingBlock: 64 }}>
      <p className="eyebrow"><span className="eyebrow__rule" aria-hidden="true" />Image credits</p>
      <h1 className="display h-section" style={{ marginTop: 20 }}>Temporary <span className="accent">photography.</span></h1>
      <p className="section__lead" style={{ marginTop: 20, maxWidth: "70ch" }}>
        The photographs on this site are representative industrial images from Wikimedia Commons, used as temporary placeholders under the licences below. They do not show AEPL&apos;s facility, machines or products and will be replaced with AEPL&apos;s own photography. Images were resized, converted to WebP and cropped for layout.
      </p>
      <div className="machine-list__body" style={{ padding: 0, marginTop: 32 }}>
        <table style={{ background: "var(--white)" }}>
          <thead><tr><th scope="col">Used for</th><th scope="col">Source file</th><th scope="col">Author</th><th scope="col">Licence</th></tr></thead>
          <tbody>
            {credits.map((c) => (
              <tr key={c.title}>
                <td>{c.use}</td>
                <td><a href={c.page} rel="noopener">{c.title}</a></td>
                <td>{c.author}</td>
                <td>{c.licenseUrl ? <a href={c.licenseUrl} rel="noopener">{c.license}</a> : c.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 32 }}><Link className="link-blue" href="/">← Back to home</Link></p>
    </main>
  );
}
