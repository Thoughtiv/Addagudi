import Link from "next/link";
import { company, type SiteSettings } from "@/lib/content";
import { toTel } from "@/lib/phone";
import { Icon } from "./Icon";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <Link className="brand brand--light" href="/" aria-label="AEPL, home">
            <span className="brand__mark" aria-hidden="true">AEPL</span>
            <span className="brand__name">Addagudi Exports<br />Pvt. Ltd.</span>
          </Link>
          <p className="footer__tag">Engineered components.<br />Precision manufacturing.</p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h2 className="footer__h">Quick links</h2>
          <ul className="footer__links">
            {[["About", "/about"], ["Products", "/products"], ["Machinery", "/machinery"], ["Quality", "/quality"], ["Blog", "/blog"], ["Enquiry", "/contact#enquiry-form"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={l}><Link href={h}>{l}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__h">Contact us</h2>
          <address className="footer__contact">
            {settings.address && <p><Icon id="i-pin" /><span>{settings.address}</span></p>}
            {settings.phone && <p><Icon id="i-phone" /><span>Phone: <a href={toTel(settings.phone)}>{settings.phone}</a></span></p>}
            {settings.mobile && <p><Icon id="i-phone" /><span>Mobile: <a href={toTel(settings.mobile)}>{settings.mobile}</a></span></p>}
            {settings.email && <p><Icon id="i-mail" /><span><a href={`mailto:${settings.email}`}>{settings.email}</a></span></p>}
          </address>
        </div>

        <div className="footer__col">
          <h2 className="footer__h">Supplying</h2>
          <ul className="footer__focus">
            <li>Precision components</li>
            <li>Custom engineered parts</li>
            <li>OEM requirements</li>
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} {company.name} All rights reserved.</p>
        <p><Link href="/credits">Image credits</Link> <span aria-hidden="true">·</span> <a href="#top">Back to top ↑</a></p>
      </div>
    </footer>
  );
}
