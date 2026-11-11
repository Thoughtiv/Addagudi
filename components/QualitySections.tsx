"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { qualityChecks } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

const CERT_SRC = "/img/certificate-iso9001-2015.webp";
const CERT_W = 985;
const CERT_H = 1600;
const CERT_ALT =
  "ISO 9001:2015 certificate issued by TÜV SÜD South Asia Private Limited to Addagudi Exports Pvt. Ltd. for manufacturing and exports of machined/CNC turned metallic components, valid from 1 June 2024 until 31 May 2027.";
const CERT_CAPTION =
  "ISO 9001:2015, certified by TÜV SÜD South Asia. Certificate no. 99 100 14407. Scope: manufacturing and exports of machined / CNC turned metallic components. Valid 1 June 2024 to 31 May 2027, subject to periodic surveillance audits.";

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
            <Image src={CERT_SRC} alt={CERT_ALT} width={CERT_W} height={CERT_H} sizes="(max-width: 960px) 60vw, 260px" style={{ width: "100%", height: "auto" }} />
          </Link>
          <figcaption>{CERT_CAPTION}</figcaption>
        </figure>
      </div>
    </section>
  );
}

const EQUIPMENT = [
  {
    src: "/img/quality-video-measuring-machine.webp",
    width: 900,
    height: 1274,
    name: "Video Measuring Machine",
    alt: "Video measuring machine in the AEPL quality department: a white optical measuring head over a granite stage, with a monitor, keyboard and computer on an inspection bench.",
  },
  {
    src: "/img/quality-optical-comparator.webp",
    width: 1000,
    height: 914,
    name: "Optical Comparator",
    alt: "Optical comparator, model BT-300TE, with a large circular projection screen, a measuring stage and a digital readout unit.",
  },
] as const;

/** /quality: the dimensional inspection equipment used in the quality department. */
export function InspectionEquipment() {
  return (
    <section className="section quality quality--equipment" aria-labelledby="equip-title">
      <div className="container">
        <div className="equipment__head reveal">
          <Eyebrow>Inspection equipment</Eyebrow>
          <h2 className="display h-section" id="equip-title">
            <span>Measured</span>
            <span className="accent">with precision.</span>
          </h2>
          <p>Components are checked for dimensional accuracy in our quality department using a video measuring machine and an optical comparator.</p>
        </div>

        <div className="equipment__grid">
          {EQUIPMENT.map((e) => (
            <figure className="equipment reveal" key={e.name}>
              <div className="cert__frame cert__frame--static equipment__frame">
                <Image src={e.src} alt={e.alt} width={e.width} height={e.height} sizes="(max-width: 760px) 90vw, 480px" />
              </div>
              <figcaption>{e.name}</figcaption>
            </figure>
          ))}
        </div>
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
            <Image src={CERT_SRC} alt={CERT_ALT} width={CERT_W} height={CERT_H} sizes="(max-width: 960px) 80vw, 340px" style={{ width: "100%", height: "auto" }} />
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
            src={CERT_SRC}
            alt="Full ISO 9001:2015 certificate issued by TÜV SÜD South Asia Private Limited to Addagudi Exports Pvt. Ltd., registration no. 99 100 14407, valid from 1 June 2024 until 31 May 2027."
            width={CERT_W}
            height={CERT_H}
            sizes="(max-width: 640px) 90vw, 480px"
          />
          <div className="dialog__actions">
            <a className="btn btn--primary" href={`mailto:${email}?subject=Quality%20certificate%20request`}>Request certificate copy <Icon id="i-mail" /></a>
            <button className="btn btn--ghost" type="submit" autoFocus>Close</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
