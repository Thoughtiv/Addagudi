"use client";

import Image from "next/image";
import { useRef } from "react";
import { company, qualityChecks } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function Quality() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="section quality" id="quality" aria-labelledby="qual-title">
      <div className="container quality__grid">
        <div className="quality__head reveal">
          <Eyebrow>Quality &amp; certification</Eyebrow>
          <h2 className="display h-section" id="qual-title">
            <span>Committed</span>
            <span className="accent">to quality.</span>
          </h2>
        </div>

        <div className="quality__copy reveal">
          <p>AEPL emphasizes quality throughout manufacturing through documented checks, first-article reporting, calibrated inspection equipment, and third-party inspection when required.</p>
          <ul className="checks">
            {qualityChecks.map((c) => <li key={c}><Icon id="i-check" />{c}</li>)}
          </ul>
          <button className="btn btn--primary btn--lg" type="button" onClick={() => dialogRef.current?.showModal()}>
            View Certificate <Icon id="i-arrow-r" />
          </button>
        </div>

        <figure className="cert reveal">
          <button className="cert__frame" type="button" onClick={() => dialogRef.current?.showModal()} aria-label="View the certificate larger">
            <Image
              src="/img/certificate-iso9001-2008.webp"
              alt="ISO 9001:2008 certificate issued by TÜV SÜD South Asia Private Limited to Addagudi Exports Pvt. Ltd. for manufacturing of machined/CNC turned metallic components, valid until 7 January 2011."
              width={540}
              height={810}
              sizes="(max-width: 960px) 80vw, 340px"
              style={{ width: "100%", height: "auto" }}
            />
          </button>
          <figcaption>Historical record: ISO 9001:2008 certificate issued by TÜV SÜD South Asia, valid until 7 January 2011. This is not a current certification.</figcaption>
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
            <a className="btn btn--primary" href={`mailto:${company.email}?subject=Quality%20certificate%20request`}>Request current certificate <Icon id="i-mail" /></a>
            <button className="btn btn--ghost" type="submit" autoFocus>Close</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
