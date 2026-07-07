import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections, getProductsByCollection } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Baby Outfits",
  description:
    "Browse all Tinyverse collections: milestone outfits, baby scientist, IT baby, chef baby, and custom name tees. Personalized, soft, and gift-worthy.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14">
      <h1 className="text-center text-3xl md:text-4xl font-bold">Shop the Tinyverse</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">
        Every outfit here can be personalized with your baby&apos;s name — because tiny humans
        deserve custom wardrobes too.
      </p>

      {/* Collection quick links */}
      <nav aria-label="Jump to collection" className="mt-8 flex flex-wrap justify-center gap-2">
        {collections.map((c) => (
          <a
            key={c.handle}
            href={`#${c.handle}`}
            className="rounded-full px-4 py-2 text-sm font-bold ring-1 ring-ink/10 transition-colors hover:ring-coral"
            style={{ backgroundColor: c.bg }}
          >
            {c.emoji} {c.title}
          </a>
        ))}
      </nav>

      {collections.map((c) => {
        const items = getProductsByCollection(c.handle);
        return (
          <section key={c.handle} id={c.handle} className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">
                  <span aria-hidden className="mr-2">{c.emoji}</span>
                  {c.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{c.tagline}</p>
              </div>
              <Link
                href={`/collections/${c.handle}`}
                className="text-sm font-bold text-coral-deep hover:underline underline-offset-4"
              >
                View collection →
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
