import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { toTel } from "@/lib/phone";
import { EnquiryForm } from "./EnquiryForm";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

/** Home closing band: headline and a button to /contact. */
export function CtaBand() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__bg" aria-hidden="true" />
      <div className="container cta__inner">
        <Eyebrow light className="reveal">Let&apos;s work together</Eyebrow>
        <div className="section__head section__head--end reveal">
          <h2 className="display h-section h-section--light cta__title" id="cta-title">
            <span>Your manufacturing</span>
            <span>partner for global growth.</span>
          </h2>
          <div className="section__lead-wrap">
            <p className="section__lead section__lead--light">
              Looking for a reliable supplier for precision components? Get in touch with our team for enquiries, quotations or custom manufacturing requirements.
            </p>
            <Link className="btn btn--primary btn--lg" href="/contact#enquiry-form">Enquire Now <Icon id="i-arrow-r" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** /contact body: contact details beside the enquiry form. */
export function EnquirySection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="cta cta--page" aria-label="Enquiry form and contact details">
      <div className="cta__bg" aria-hidden="true" />
      <div className="container cta__inner">
        <div className="enquiry" id="enquiry-form">
          <div className="enquiry__aside reveal">
            <h2>Contact AEPL</h2>
            <p>Prefer to talk? Call or email the team directly.</p>
            <ul>
              {settings.address && <li><Icon id="i-pin" /><address>{settings.address}</address></li>}
              {settings.phone && <li><Icon id="i-phone" /><a href={toTel(settings.phone)}>{settings.phone}</a></li>}
              {settings.mobile && <li><Icon id="i-phone" /><a href={toTel(settings.mobile)}>{settings.mobile}</a></li>}
              {settings.email && <li><Icon id="i-mail" /><a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
            </ul>
          </div>
          <div className="reveal"><EnquiryForm settings={settings} /></div>
        </div>
      </div>
    </section>
  );
}
