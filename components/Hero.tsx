import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { heroCallouts } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <Eyebrow mono>Precision engineered components / Since 1997</Eyebrow>
        <h1 className="display hero__title" id="hero-title">
          <span>Engineered</span>
          <span>Components</span>
          <span>For a stronger</span>
          <span className="accent">Tomorrow.</span>
        </h1>
        <p className="hero__lead">
          Addagudi Exports Pvt. Ltd. (AEPL) is an engineering and manufacturing company producing custom-made engineered components for global industries.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary btn--lg" href="/contact#enquiry-form">Enquire Now <Icon id="i-arrow-ne" /></Link>
          <Link className="link-underline" href="/products">View Products <Icon id="i-arrow-r" /></Link>
        </div>
        <dl className="proof">
          <div><dt>1997</dt><dd>Established</dd></div>
          <div><dt>Quality</dt><dd>Documented checks</dd></div>
          <div><dt>Exports</dt><dd>From Hyderabad, India</dd></div>
        </dl>
      </div>

      <div className="hero__media">
        <Image
          src="/img/hero-machined-component.webp"
          alt="Close-up of a precision-machined stainless steel component with a ring of cross-drilled ports, beside engineering drawings and a vernier caliper. Representative image."
          fill
          priority
          sizes="(max-width: 960px) 100vw, 56vw"
          style={{ objectFit: "cover", objectPosition: "40% 55%" }}
        />
        {heroCallouts.map((c) => (
          <div key={c.label} className={`callout callout--${c.dir}`} style={{ "--x": c.x, "--y": c.y, "--len": c.len } as CSSProperties}>
            <span className="callout__dot" aria-hidden="true" />
            <span className="callout__line" aria-hidden="true" />
            <span className="callout__label">{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
