import { stripItems } from "@/lib/content";
import { Icon } from "./Icon";

export function CapabilityStrip() {
  return (
    <section className="strip" aria-label="Capabilities at a glance">
      <ul className="strip__list">
        {stripItems.map((i) => (
          <li key={i.label}><Icon id={i.icon} className="strip__icon" /><span>{i.label}</span></li>
        ))}
      </ul>
    </section>
  );
}
