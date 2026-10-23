"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { qualityChecks } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

const CERT_ALT =
  "ISO 9001:2008 certificate issued by TÜV SÜD South Asia Private Limited to Addagudi Exports Pvt. Ltd. for manufacturing of machined/CNC turned metallic components, valid until 7 January 2011.";
const CERT_CAPTION =
  "Historical record: ISO 9001:2008 certificate issued by TÜV SÜD South Asia, valid until 7 January 2011. This is not a current certification.";

/** Home teaser: headline, one paragraph, button to /quality, certificate thumbnail. */
export function QualityTeaser() {
  return (
    <section className="section quality" aria-labelledby="qual-title">
      <div className="container quality__grid quality__grid--teaser">
        <div className="quality__copy reveal">
          <Eyebrow>Quality &amp; certification</Eyebrow>
          <h2 className="display h-section" id="qual-title">
            <span>Committed</span>
            <span className="accent">to quality.</span>
          </h2>
          <p>AEPL emphasizes quality throughout manufacturing through documented checks, first-article reporting, calibrated inspection equipment, and third-party inspection when required.</p>
          <Link className="btn btn--primary btn--lg" href="/quality">Quality &amp; process <Icon id="i-arrow-r" /></Link>
        </div>

        <figure className="cert cert--small reveal">
          <Link className="cert__frame" href="/quality" aria-label="See the certificate and quality details">
            <Image src="/img/certificate-iso9001-2008.webp" alt={CERT_ALT} width={540} height={810} sizes="(max-width: 960px) 60vw, 260px" style={{ width: "100%", height: "auto" }} />
          </Link>
          <figcaption>{CERT_CAPTION}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** /quality body: practices, certificate preview, and the certificate dialog. */
export function QualityDetails({ email }: { email: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="section quality quality--page" aria-label="Quality practices and certificate">
      <div className="container quality__grid quality__grid--page">
        <div className="quality__copy reveal">
          <ul className="checks">
            {qualityChecks.map((c) => <li key={c}><Icon id="i-check" />{c}</li>)}
          </ul>
          <button className="btn btn--primary btn--lg" type="button" onClick={() => dialogRef.current?.showModal()}>
            View Certificate <Icon id="i-arrow-r" />
          </button>
        </div>

        <figure className="cert reveal">
          <button className="cert__frame" type="button" onClick={() => dialogRef.current?.showModal()} aria-label="View the certificate larger">
            <Image src="/img/certificate-iso9001-2008.webp" alt={CERT_ALT} width={540} height={810} sizes="(max-width: 960px) 80vw, 340px" style={{ width: "100%", height: "auto" }} />
          </button>
          <figcaption>{CERT_CAPTION}</figcaption>
        </figure>
      </div>

      <dialog
        className="dialog"
        ref={dialogRef}
        aria-labelledby="cert-dialog-title"
        onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current?.close(); }}
      >
        <form method="dialog" className="dialog__inner">
          <h2 className="display dialog__title" id="cert-dialog-title">Certification details</h2>
          <Image
            className="dialog__cert"
            src="/img/certificate-iso9001-2008.webp"
            alt="Full ISO 9001:2008 certificate issued by TÜV SÜD South Asia Private Limited to Addagudi Exports Pvt. Ltd., registration no. 99 100 03423, valid until 7 January 2011."
            width={540}
            height={810}
            sizes="(max-width: 640px) 90vw, 480px"
          />
          <div className="dialog__actions">
            <a className="btn btn--primary" href={`mailto:${email}?subject=Quality%20certificate%20request`}>Request current certificate <Icon id="i-mail" /></a>
            <button className="btn btn--ghost" type="submit" autoFocus>Close</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
