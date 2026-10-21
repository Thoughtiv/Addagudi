"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { Icon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // close the mobile menu on Escape, and when the viewport grows past the mobile breakpoint
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
        <Link className="brand" href="/" aria-label="AEPL, Addagudi Exports Pvt. Ltd. — home">
          <span className="brand__mark" aria-hidden="true">AEPL</span>
          <span className="brand__name">Addagudi Exports<br />Pvt. Ltd.</span>
        </Link>

        <nav className={`site-nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
          <ul>
            {navItems.map((n) => (
              <li key={n.key}>
                <Link href={n.href} data-nav={n.key} aria-current={isActive(n.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn--primary site-nav__cta" href="/contact#enquiry-form" onClick={() => setOpen(false)}>
            Enquire Now <Icon id="i-arrow-ne" />
          </Link>
        </nav>

        <div className="site-header__aside">
          <p className="header-label">Manufacturing /<br />Custom Components /<br />Since 1997</p>
          <Link className="btn btn--primary" href="/contact#enquiry-form">Enquire Now <Icon id="i-arrow-ne" /></Link>
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
