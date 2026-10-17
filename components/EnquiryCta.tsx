import { company } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function EnquiryCta() {
  return (
    <section className="cta" id="enquiry" aria-labelledby="cta-title">
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
            <a className="btn btn--primary btn--lg" href="#enquiry-form">Enquire Now <Icon id="i-arrow-r" /></a>
          </div>
        </div>

        <div className="enquiry reveal" id="enquiry-form">
          <div className="enquiry__aside">
            <h3>Contact AEPL</h3>
            <p>Prefer to talk? Call or email the team directly.</p>
            <ul>
              <li><Icon id="i-phone" /><a href={company.phone.href}>{company.phone.label}</a></li>
              <li><Icon id="i-phone" /><a href={company.mobile.href}>{company.mobile.label}</a></li>
              <li><Icon id="i-mail" /><a href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
