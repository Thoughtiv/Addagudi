import Image from "next/image";
import Link from "next/link";
import type { MachineItem } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

const pad = (n: number) => String(n).padStart(2, "0");

/** Machine cards (photo, name, model) plus the stock-photo disclosure when bundled stock photos are shown. */
export function MachineCards({ machines }: { machines: MachineItem[] }) {
  const showsStock = machines.some((m) => m.image.startsWith("/img/"));
  return (
    <>
      <ul className="machines">
        {machines.map((m, i) => (
          <li className="machine reveal" key={m.id}>
            <div className="machine__img">
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.alt || `${m.name}${m.model ? ` ${m.model}` : ""}`}
                  fill
                  unoptimized={m.image.startsWith("/api/")}
                  sizes="(max-width: 600px) 45vw, (max-width: 1180px) 30vw, 230px"
                  style={{ objectFit: "cover", objectPosition: m.pos ?? "50% 50%" }}
                />
              ) : (
                <span className="machine__none" aria-hidden="true"><Icon id="i-cnc" /></span>
              )}
              <span className="machine__no">{pad(i + 1)}</span>
            </div>
            <h3>{m.name}</h3>
            {m.model && <p>{m.model}</p>}
          </li>
        ))}
      </ul>
      {showsStock && (
        <p className="note">
          Photographs are representative stock images pending AEPL equipment photography; they do not show the named machines. See <Link href="/credits">image credits</Link>.
        </p>
      )}
    </>
  );
}

/** Home teaser: heading, copy, the first five machines, and a button to the full list. */
export function MachineryTeaser({ machines }: { machines: MachineItem[] }) {
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
        <MachineCards machines={machines.slice(0, 5)} />
      </div>
    </section>
  );
}

/** Complete inventory table for /machinery. */
export function MachineTable({ machines }: { machines: MachineItem[] }) {
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
              {machines.map((m, i) => (
                <tr key={m.id}>
                  <td className="inventory__no">{pad(i + 1)}</td>
                  <th scope="row">{m.name}</th>
                  <td className="inventory__model">{m.model}</td>
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
