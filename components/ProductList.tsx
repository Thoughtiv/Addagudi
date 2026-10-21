import Link from "next/link";
import { products } from "@/lib/content";
import { Icon } from "./Icon";

/**
 * Product categories.
 * - "links": home page teaser; every row links to /products and reveals its description on hover/focus.
 * - "open": products page; descriptions are always visible.
 */
export function ProductList({ variant }: { variant: "links" | "open" }) {
  return (
    <ul className={`plist plist--${variant} reveal`} aria-label="Product categories">
      {products.map((p) => (
        <li key={p.id}>
          {variant === "links" ? (
            <Link className="plist__item" href="/products">
              <Icon id="i-plus-circle" className="plist__icon" />
              <span>{p.name}</span>
            </Link>
          ) : (
            <div className="plist__item">
              <Icon id="i-plus-circle" className="plist__icon" />
              <h3>{p.name}</h3>
            </div>
          )}
          <p className="plist__desc"><span>{p.desc}</span></p>
        </li>
      ))}
    </ul>
  );
}
