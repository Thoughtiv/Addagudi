import Image from "next/image";
import Link from "next/link";
import { productPhotos } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Icon } from "./Icon";
import { ProductList } from "./ProductList";

const IMG_ALT = "Rows of small precision-turned metal components with bored and tapped holes, laid out in a tray. Representative image.";

/** Home teaser: headline, copy, button to /products, image and category list. */
export function ProductsTeaser() {
  return (
    <section className="products" aria-labelledby="prod-title">
      <div className="container products__grid">
        <div className="products__copy reveal">
          <Eyebrow light>Our products</Eyebrow>
          <h2 className="display h-section h-section--light" id="prod-title">
            <span>Precision components</span>
            <span>across industries.</span>
          </h2>
          <p>We manufacture a wide range of turned and machined components as per customer drawings and specifications, catering to various industrial requirements.</p>
          <Link className="btn btn--primary btn--lg" href="/products">View Products <Icon id="i-arrow-r" /></Link>
        </div>

        <figure className="products__media reveal">
          <Image src="/img/products-turned-components.webp" alt={IMG_ALT} width={1920} height={1440} sizes="(max-width: 960px) 100vw, 40vw" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />
        </figure>

        <ProductList variant="links" />
      </div>
    </section>
  );
}

/** Products page body: image beside the full category list. */
export function ProductsShowcase() {
  return (
    <section className="products products--page" aria-label="Product categories">
      <div className="container products__grid">
        <figure className="products__media reveal">
          <Image src="/img/products-turned-components.webp" alt={IMG_ALT} width={1920} height={1440} sizes="(max-width: 960px) 100vw, 50vw" style={{ width: "100%", height: "100%", objectFit: "cover" }} priority />
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />
        </figure>
        <div className="products__side">
          <ProductList variant="open" />
          <Link className="btn btn--primary btn--lg reveal" href="/contact#enquiry-form">Send an enquiry <Icon id="i-arrow-r" /></Link>
        </div>
      </div>
    </section>
  );
}

/** Products page: photographs of manufactured parts. */
export function ProductGallery() {
  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head reveal">
          <Eyebrow>Our portfolio</Eyebrow>
          <h2 className="display h-section" id="gallery-title">
            <span>Examples of</span>
            <span className="accent">our components.</span>
          </h2>
          <p>A selection of parts manufactured by AEPL, from turned shafts and fasteners to pressed metal parts and gears. Our engineered parts are used across applications such as pumps, hydraulics, electrical equipment, automotive, agricultural equipment, industrial hardware, refrigeration and soil testing.</p>
        </div>
        <ul className="gallery__grid">
          {productPhotos.map((p) => (
            <li className="gallery__item reveal" key={p.file}>
              <figure>
                <div className="gallery__frame">
                  <Image src={`/img/products/${p.file}.webp`} alt={`${p.name} manufactured by AEPL`} width={640} height={427} sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 380px" />
                </div>
                <figcaption>{p.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
