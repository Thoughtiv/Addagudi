import Link from "next/link";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow: string;
  /** Headline lines; the last one is highlighted in blue. */
  title: string[];
  lead: string;
  crumb: string;
};

/** Shared opening band for inner pages. */
export function PageHeader({ eyebrow, title, lead, crumb }: Props) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{crumb}</span>
        </nav>
        <Eyebrow className="page-hero__eyebrow">{eyebrow}</Eyebrow>
        <div className="section__head section__head--end">
          <h1 className="display h-page" id="page-title">
            {title.map((line, i) => (
              <span key={line} className={i === title.length - 1 ? "accent" : undefined}>{line}</span>
            ))}
          </h1>
          <p className="section__lead">{lead}</p>
        </div>
      </div>
    </section>
  );
}
