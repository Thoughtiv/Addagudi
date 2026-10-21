import Link from "next/link";
import { CapabilityCards } from "./CapabilityCards";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

/** Capabilities heading + cards. On the home page it ends with a button to /about. */
export function CapabilitiesSection({ home = false }: { home?: boolean }) {
  return (
    <section className="section capabilities" aria-labelledby="cap-title">
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

        <CapabilityCards />

        {home && (
          <div className="section__more reveal">
            <Link className="btn btn--primary btn--lg" href="/about">About AEPL <Icon id="i-arrow-r" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
