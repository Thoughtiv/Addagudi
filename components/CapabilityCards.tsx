import Image from "next/image";
import Link from "next/link";
import { capabilities } from "@/lib/content";
import { Icon } from "./Icon";

/** Three numbered capability cards. Each links to the page that covers it. */
export function CapabilityCards() {
  return (
    <ul className="cards">
      {capabilities.map((c) => (
        <li className="card reveal" key={c.num}>
          <Link className="card__media" href={c.href} tabIndex={-1} aria-hidden="true">
            <Image src={c.image} alt="" fill sizes="(max-width: 960px) 100vw, 380px" style={{ objectFit: "cover" }} />
            <span className="card__num">{c.num}</span>
          </Link>
          <div className="card__body">
            <h3 className="card__title">{c.title}</h3>
            <p>{c.text}</p>
            <div className="card__foot">
              <Link className="link-blue" href={c.href} aria-label={c.ariaLabel}>Explore capability <Icon id="i-arrow-r" /></Link>
              <ul className="tags" aria-label={`${c.title} highlights`}>
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
