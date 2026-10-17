"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { featuredMachines, machineList } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function Machinery() {
  const listRef = useRef<HTMLDetailsElement>(null);

  // open the full list when linked to via #machine-list
  useEffect(() => {
    const sync = () => { if (location.hash === "#machine-list" && listRef.current) listRef.current.open = true; };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section className="section machinery" id="machinery" aria-labelledby="mach-title">
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
            <a
              className="link-blue link-blue--right"
              href="#machine-list"
              onClick={() => { if (listRef.current) listRef.current.open = true; }}
            >
              View full machine list <Icon id="i-arrow-r" />
            </a>
          </div>
        </div>

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

        <details className="machine-list" id="machine-list" ref={listRef}>
          <summary><span>Full machinery list</span><Icon id="i-plus" /></summary>
          <div className="machine-list__body">
            <table>
              <caption className="sr-only">Machinery inventory as listed by AEPL</caption>
              <thead><tr><th scope="col">No.</th><th scope="col">Machine</th><th scope="col">Make / model</th></tr></thead>
              <tbody>
                {machineList.map(([name, model], i) => (
                  <tr key={i}><td>{String(i + 1).padStart(2, "0")}</td><td>{name}</td><td>{model}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="note">Machine names and model codes are reproduced from AEPL&apos;s earlier equipment list and are subject to confirmation.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
