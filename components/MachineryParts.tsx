import Image from "next/image";
import Link from "next/link";
import { featuredMachines, machineList } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

/** Five featured machine cards plus the stock-photo disclosure. */
export function MachineCards() {
  return (
    <>
      <ul className="machines">
        {featuredMachines.map((m) => (
          <li className="machine reveal" key={m.no}>
            <div className="machine__img">
              <Image src={m.image} alt={m.alt} width={m.w} height={m.h} sizes="(max-width: 600px) 45vw, (max-width: 1180px) 30vw, 230px" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos }} />
              <span className="machine__no">{m.no}</span>
            </div>
            <h3>{m.name}</h3>
            <p>{m.model}</p>
          </li>
        ))}
      </ul>
      <p className="note">
        Photographs are representative stock images pending AEPL equipment photography; they do not show the named machines. See <Link href="/credits">image credits</Link>.
      </p>
    </>
  );
}

/** Home teaser: heading, copy, cards, and a button to the full list on /machinery. */
export function MachineryTeaser() {
  return (
    <section className="section machinery" aria-labelledby="mach-title">
      <div className="container">
        <Eyebrow className="reveal">Our machinery</Eyebrow>
        <div className="section__head section__head--end reveal">
          <h2 className="display h-section" id="mach-title">
            <span>Modern machinery</span>
            <span>for higher precision.</span>
          </h2>
          <div className="section__lead-wrap">
            <p className="section__lead">
              Our facility uses CNC lathes, milling equipment, drilling machines, and other specialized equipment to manufacture components to customer specifications.
            </p>
            <Link className="link-blue link-blue--right" href="/machinery">View full machine list <Icon id="i-arrow-r" /></Link>
          </div>
        </div>
        <MachineCards />
      </div>
    </section>
  );
}

/** Complete inventory table for /machinery. */
export function MachineTable() {
  return (
    <section className="section machine-table" aria-labelledby="inventory-title">
      <div className="container">
        <Eyebrow className="reveal">Machinery list</Eyebrow>
        <h2 className="display h-section reveal" id="inventory-title" style={{ marginTop: 20 }}>
          <span>Full machinery</span>
          <span className="accent">inventory.</span>
        </h2>
        <div className="inventory reveal">
          <table className="inventory__table">
            <caption className="sr-only">Machinery inventory as listed by AEPL</caption>
            <thead>
              <tr>
                <th scope="col" className="inventory__no">No.</th>
                <th scope="col">Machine</th>
                <th scope="col">Make / model</th>
              </tr>
            </thead>
            <tbody>
              {machineList.map(([name, model], i) => (
                <tr key={i}>
                  <td className="inventory__no">{String(i + 1).padStart(2, "0")}</td>
                  <th scope="row">{name}</th>
                  <td className="inventory__model">{model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">Machine names and model codes are reproduced from AEPL&apos;s earlier equipment list and are subject to confirmation.</p>
      </div>
    </section>
  );
}
