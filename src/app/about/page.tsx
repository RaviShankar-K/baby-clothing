import type { Metadata } from "next";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "About Tinyverse",
  description:
    "Tinyverse makes personalized baby milestone and theme outfits — soft cotton, baby-safe prints, and keepsake-quality craft for your little universe.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-14">
      <div className="text-center">
        <span aria-hidden className="text-5xl">🌙</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold">Dress the tiny universe</h1>
        <p className="mt-3 text-ink-soft">The story behind Tinyverse</p>
      </div>

      <div className="mt-10 space-y-6 leading-relaxed text-ink">
        <p>
          Tinyverse started with a simple observation: babies grow up impossibly fast, and every
          month of that first magical stretch deserves to be remembered. A first smile. A first
          Diwali. The day they officially turn one. These are big little moments — and the outfits
          they happen in become keepsakes.
        </p>
        <p>
          So we make baby clothing that&apos;s worthy of the moment. Every Tinyverse piece is printed
          to order on soft, pre-washed 100% cotton with baby-safe, water-based inks. We personalize
          each outfit with your baby&apos;s name, age, and occasion — then check it by hand before it
          ships, because there are no do-overs on a first birthday.
        </p>
        <p>
          Whether your little one is a future scientist, a tiny techie, the head chef of the purée
          department, or simply six months of pure sunshine, there&apos;s a corner of the Tinyverse
          made just for them.
        </p>
      </div>

      <div className="mt-10">
        <TrustBadges />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-white shadow-md shadow-coral/30 hover:bg-coral-deep transition-colors"
        >
          Explore the Collections
        </Link>
      </div>
    </div>
  );
}
