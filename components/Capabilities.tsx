import Image from "next/image";
import { capabilities, stats } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function Capabilities() {
  return (
    <section className="section capabilities" id="capabilities" aria-labelledby="cap-title">
      <div className="container">
        <div className="section__top reveal">
          <Eyebrow>Our capabilities</Eyebrow>
          <p className="pager" aria-hidden="true">01 — 03</p>
        </div>
        <div className="section__head reveal">
          <h2 className="display h-section" id="cap-title">
            <span>From raw material</span>
            <span>to <b className="accent">finished component.</b></span>
          </h2>
          <p className="section__lead">
            We manufacture precision components using modern machinery, skilled manpower and strict quality control, delivering cost-effective solutions to global customers.
          </p>
        </div>

        <ul className="cards">
          {capabilities.map((c) => (
            <li className="card reveal" key={c.num}>
              <a className="card__media" href={c.href} tabIndex={-1} aria-hidden="true">
                <Image src={c.image} alt="" fill sizes="(max-width: 960px) 100vw, 380px" style={{ objectFit: "cover" }} />
                <span className="card__num">{c.num}</span>
              </a>
              <div className="card__body">
                <h3 className="card__title">{c.title}</h3>
                <p>{c.text}</p>
                <div className="card__foot">
                  <a className="link-blue" href={c.href} aria-label={c.ariaLabel}>Explore capability <Icon id="i-arrow-r" /></a>
                  <ul className="tags" aria-label={`${c.title} highlights`}>
                    {c.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="about reveal" id="about" aria-labelledby="about-title">
          <div className="about__label">
            <Eyebrow>About AEPL</Eyebrow>
            <h3 className="display about__title" id="about-title">Engineering since <span className="accent">1997.</span></h3>
          </div>
          <p className="about__text">
            Addagudi Exports Pvt. Ltd. was established in 1997 in Hyderabad, India. AEPL engineers, manufactures and exports custom-made engineered components, including CNC-turned and machined metallic parts, with work ranging from individual components to finished assemblies and OEM requirements.
          </p>
        </div>

        <ul className="stats reveal" aria-label="Capability summary">
          {stats.map((s) => <li key={s.value}><strong>{s.value}</strong><span>{s.label}</span></li>)}
        </ul>
      </div>
    </section>
  );
}
