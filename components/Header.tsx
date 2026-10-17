"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { Icon } from "./Icon";

const SPY_IDS = ["home", "about", "products", "machinery", "process", "quality", "enquiry", "contact"];
const INHERIT: Record<string, string> = { process: "machinery", enquiry: "quality" };

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // active nav link follows scroll position
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(INHERIT[current] ?? current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Escape / when leaving the mobile breakpoint
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = window.matchMedia("(min-width: 961px)");
    const onMq = () => { if (mq.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, []);

  return (
    <header className="site-header" id="top">
      <div className="site-header__inner">
        <a className="brand" href="#home" aria-label="AEPL, Addagudi Exports Pvt. Ltd. — home">
          <span className="brand__mark" aria-hidden="true">AEPL</span>
          <span className="brand__name">Addagudi Exports<br />Pvt. Ltd.</span>
        </a>

        <nav className={`site-nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
          <ul>
            {navItems.map((n) => (
              <li key={n.key}>
                <a href={n.href} data-nav={n.key} aria-current={active === n.key ? "true" : undefined} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary site-nav__cta" href="#enquiry" onClick={() => setOpen(false)}>
            Enquire Now <Icon id="i-arrow-ne" />
          </a>
        </nav>

        <div className="site-header__aside">
          <p className="header-label">Manufacturing /<br />Custom Components /<br />Since 1997</p>
          <a className="btn btn--primary" href="#enquiry">Enquire Now <Icon id="i-arrow-ne" /></a>
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle__bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>
    </header>
  );
}
