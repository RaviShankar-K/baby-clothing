"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, getCollection, getModelPhoto, type Product } from "@/data/products";
import ProductImage, { getProductViews } from "./ProductImage";
import ProductMockup from "./ProductMockup";
import BabyPhotoMockup from "./BabyPhotoMockup";
import PersonalizationForm, {
  emptyPersonalization,
  type PersonalizationValues,
} from "./PersonalizationForm";
import TrustBadges from "./TrustBadges";

export default function ProductDetail({ product }: { product: Product }) {
  const collection = getCollection(product.collection);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [personalization, setPersonalization] = useState<PersonalizationValues>(emptyPersonalization);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const views = getProductViews(product);
  const activeView = views[Math.min(imageIndex, views.length - 1)];

  // Live personalization drawn onto the mockups as the parent types
  const typedName = personalization.babyName.trim();
  const typedSub =
    [personalization.ageMonth.trim(), personalization.date].filter(Boolean).join(" · ") || undefined;
  const isCustomName = product.collection === "custom-name";
  // Custom-name designs print the name itself; others add it below the design
  const effectiveMockup =
    isCustomName && typedName ? { ...product.mockup, print: typedName.toUpperCase() } : product.mockup;
  const nameLine = isCustomName ? undefined : typedName || undefined;

  function handleAddToCart() {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/shop" className="hover:text-coral-deep font-semibold">Shop</Link>
        {collection && (
          <>
            <span aria-hidden> / </span>
            <Link href={`/collections/${collection.handle}`} className="hover:text-coral-deep font-semibold">
              {collection.title}
            </Link>
          </>
        )}
        <span aria-hidden> / </span>
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div
            className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-ink/5"
            style={{ backgroundColor: product.mockup.bg }}
          >
            {activeView.type === "photo" ? (
              <BabyPhotoMockup
                product={product}
                photo={getModelPhoto(product)}
                mockup={effectiveMockup}
                personalizedName={nameLine}
                personalizedSub={typedSub}
                className="aspect-square h-auto w-full"
              />
            ) : activeView.type === "image" ? (
              <ProductImage product={product} imageIndex={imageIndex} className="aspect-square h-auto w-full" />
            ) : (
              <ProductMockup
                mockup={effectiveMockup}
                title={product.title}
                personalizedName={nameLine}
                personalizedSub={typedSub}
                className="aspect-square h-auto w-full"
              />
            )}
          </div>
          <div className="mt-3 flex gap-2" role="group" aria-label="Product views">
            {views.map((view, i) => (
              <button
                key={view.label}
                type="button"
                onClick={() => setImageIndex(i)}
                aria-label={view.label}
                aria-pressed={imageIndex === i}
                className={`h-16 w-16 overflow-hidden rounded-xl ring-2 transition-all ${
                  imageIndex === i ? "ring-coral" : "ring-transparent hover:ring-coral/40"
                }`}
                style={{ backgroundColor: product.mockup.bg }}
              >
                <ProductImage product={product} imageIndex={i} className="h-full w-full" />
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            Mockup shown — type a name below and watch it appear on the outfit. ✨{" "}
            Model photo: {getModelPhoto(product).credit}.
          </p>
        </div>

        {/* Details */}
        <div>
          {collection && (
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: collection.accent }}>
              {collection.title}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-ink-soft leading-relaxed">{product.description}</p>
          <p className="mt-4 font-display text-2xl font-bold">
            {formatPrice(product.price)}
            {product.compareAtPrice && (
              <span className="ml-2 text-base font-normal text-ink-soft line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </p>

          <div className="mt-5">
            <TrustBadges compact />
          </div>

          {/* Size */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-bold" id="size-label">
              Size {sizeError && <span className="font-semibold text-coral-deep">— please pick a size</span>}
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                    size === s
                      ? "border-coral bg-coral text-white"
                      : "border-ink/15 bg-white hover:border-coral/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-bold" id="color-label">
              Color: <span className="font-semibold text-ink-soft">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="color-label">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={`Color ${c.name}`}
                  aria-pressed={color === c.name}
                  className={`h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-cream transition-all ${
                    color === c.name ? "ring-coral" : "ring-ink/15 hover:ring-coral/50"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="mt-6 rounded-3xl bg-lilac/60 p-5">
            <PersonalizationForm
              fields={product.personalization}
              values={personalization}
              onChange={setPersonalization}
              showTheme={product.collection === "custom-name"}
            />
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 w-full rounded-full bg-coral px-8 py-4 text-lg font-bold text-white shadow-md shadow-coral/30 transition-colors hover:bg-coral-deep"
          >
            {added ? "Added to cart 🎉" : "Add to Cart"}
          </button>
          <p className="mt-3 text-center text-sm font-semibold text-ink-soft">
            🚚 {product.deliveryEstimate}
          </p>

          <Link
            href={`/try-on?product=${product.handle}`}
            className="mt-3 block w-full rounded-full border-2 border-coral/40 bg-white px-8 py-3 text-center font-bold text-coral-deep transition-colors hover:bg-blush/50"
          >
            See Your Baby Wearing This ✨
          </Link>

          {/* Info accordions */}
          <div className="mt-8 space-y-3">
            <details className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5" open>
              <summary className="cursor-pointer list-none font-bold">🧵 Fabric details</summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{product.fabric}</p>
            </details>
            <details className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
              <summary className="cursor-pointer list-none font-bold">🫧 Care instructions</summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </details>
            <details className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
              <summary className="cursor-pointer list-none font-bold">↩️ Returns & customization policy</summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Personalized outfits are made just for your baby, so they can only be returned for
                defects or printing errors — we&apos;ll replace those free, fast, and with an apology
                cookie (okay, maybe just fast). Non-personalized items can be returned within 7 days,
                unworn and unwashed.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
