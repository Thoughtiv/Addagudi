import { steps } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";

export function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="proc-title">
      <div className="process__bg" aria-hidden="true" />
      <div className="container process__inner">
        <Eyebrow className="reveal">Our process</Eyebrow>
        <div className="section__head section__head--end reveal">
          <h2 className="display h-section" id="proc-title">
            <span>A streamlined process</span>
            <span className="accent">for consistent quality.</span>
          </h2>
          <p className="section__lead">From raw material to final inspection, every component goes through a well-defined process with quality checks at each stage.</p>
        </div>

        <ol className="steps reveal">
          {steps.map((s) => (
            <li className="step" key={s.num}>
              <div className="step__top"><span className="step__num">{s.num}</span><span className="step__line" aria-hidden="true" /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
