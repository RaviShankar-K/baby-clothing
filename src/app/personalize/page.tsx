import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { getProductsByCollection } from "@/data/products";

export const metadata: Metadata = {
  title: "Personalize an Outfit",
  description:
    "Add your baby's name, age, birthday, and a theme — Tinyverse turns it into a one-of-a-kind keepsake outfit.",
};

const steps = [
  {
    emoji: "👕",
    title: "Pick an outfit",
    text: "Choose from milestone tees, theme designs, or a fully custom name tee.",
  },
  {
    emoji: "✏️",
    title: "Add their details",
    text: "Baby's name, age or month, the occasion, and an optional special date.",
  },
  {
    emoji: "🎨",
    title: "Choose a theme",
    text: "Classic cute, scientist, coder, chef, stars & moon — make it truly theirs.",
  },
  {
    emoji: "💝",
    title: "We make it with love",
    text: "Printed with baby-safe inks, checked by hand, and shipped gift-ready.",
  },
];

export default function PersonalizePage() {
  const customProducts = getProductsByCollection("custom-name");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Made just for your little one 💌</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Every Tinyverse outfit can carry your baby&apos;s name, age, birthday, and a theme you
          choose. Here&apos;s how personalization works.
        </p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush font-bold text-coral-deep">
              {i + 1}
            </span>
            <p aria-hidden className="mt-3 text-3xl">{s.emoji}</p>
            <h2 className="mt-2 font-bold">{s.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>

      <section className="mt-14">
        <h2 className="text-center text-2xl font-bold">Start with a custom design</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {customProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-14 text-center">
        <h2 className="text-2xl font-bold">Or personalize any outfit in the shop</h2>
        <p className="mx-auto mt-2 max-w-lg text-ink-soft">
          Every product page has personalization fields built in — just add your baby&apos;s details
          before adding to cart.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-white shadow-md shadow-coral/30 hover:bg-coral-deep transition-colors"
        >
          Browse All Outfits
        </Link>
        <div className="mt-10">
          <TrustBadges />
        </div>
      </section>
    </div>
  );
}
