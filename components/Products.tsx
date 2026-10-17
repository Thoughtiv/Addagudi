"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";

export function Products() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="products" id="products" aria-labelledby="prod-title">
      <div className="container products__grid">
        <div className="products__copy reveal">
          <Eyebrow light>Our products</Eyebrow>
          <h2 className="display h-section h-section--light" id="prod-title">
            <span>Precision components</span>
            <span>across industries.</span>
          </h2>
          <p>We manufacture a wide range of turned and machined components as per customer drawings and specifications, catering to various industrial requirements.</p>
          <a className="btn btn--primary btn--lg" href="#product-list">View Products <Icon id="i-arrow-r" /></a>
        </div>

        <figure className="products__media reveal">
          <Image
            src="/img/products-turned-components.webp"
            alt="Rows of small precision-turned metal components with bored and tapped holes, laid out in a tray. Representative image."
            width={1920}
            height={1440}
            sizes="(max-width: 960px) 100vw, 40vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />
        </figure>

        <ul className="plist reveal" id="product-list" aria-label="Product categories">
          {products.map((p) => {
            const isOpen = openId === p.id;
            return (
              <li key={p.id} className={isOpen ? "is-open" : undefined}>
                <button type="button" aria-expanded={isOpen} aria-controls={p.id} onClick={() => setOpenId(isOpen ? null : p.id)}>
                  <Icon id="i-plus-circle" className="plist__icon" />
                  <span>{p.name}</span>
                </button>
                <p id={p.id} className="plist__desc"><span>{p.desc}</span></p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
