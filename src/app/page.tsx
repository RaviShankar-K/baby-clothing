import Link from "next/link";
import Hero from "@/components/Hero";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { collections, getBestsellers } from "@/data/products";

function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 ${className}`}>
      <h2 className="text-center text-2xl md:text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mx-auto mt-2 max-w-xl text-center text-ink-soft">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const bestsellers = getBestsellers();

  return (
    <>
      <Hero />

      <Section
        title="Shop by collection"
        subtitle="From monthly milestones to tiny techies — find the theme that fits your little universe."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.handle} collection={c} />
          ))}
        </div>
      </Section>

      {/* See it on your baby */}
      <section className="bg-sky/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">See it on your baby — before you buy ✨</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Upload a photo of your little one, pick any outfit, and preview how adorable
                they&apos;ll look. It takes less than a minute and melts hearts every time.
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  ["📸", "Upload a clear photo of your baby"],
                  ["👕", "Choose an outfit design you love"],
                  ["✨", "Generate an instant try-on preview"],
                ].map(([emoji, text], i) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-bold shadow-sm">
                      {i + 1}
                    </span>
                    <span className="font-semibold">
                      <span aria-hidden className="mr-1.5">{emoji}</span>
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-ink-soft">
                🔒 Your uploaded photo is used only to create your preview and is not displayed publicly.
              </p>
              <Link
                href="/try-on"
                className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-white shadow-md shadow-coral/30 hover:bg-coral-deep transition-colors"
              >
                Try Baby Preview
              </Link>
            </div>
            <div className="mx-auto w-56 sm:w-72 rounded-3xl bg-white p-4 shadow-md rotate-2">
              <div className="rounded-2xl bg-blush p-3">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-white text-6xl">
                  👶
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-bold">Your baby + any Tinyverse outfit</p>
              <p className="text-center text-xs text-ink-soft">Preview in seconds</p>
            </div>
          </div>
        </div>
      </section>

      <Section title="Little bestsellers" subtitle="The outfits parents (and grandparents) can't stop ordering.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {bestsellers.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-full border-2 border-coral/40 bg-white px-7 py-3 font-bold text-coral-deep hover:bg-blush/50 transition-colors"
          >
            Shop All Outfits
          </Link>
        </div>
      </Section>

      {/* Personalization promise */}
      <section className="bg-lilac/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Our personalization promise 💌</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft leading-relaxed">
            Every Tinyverse outfit is made to order for one specific, very important little person:
            yours. Name, age, occasion, date — printed with baby-safe inks on soft, pre-washed
            cotton, and checked by hand before it ships.
          </p>
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      <Section title="Loved by parents" subtitle="Real moments from the Tinyverse family.">
        <Testimonials />
      </Section>

      <Section title="Questions, answered" subtitle="Everything parents usually ask before ordering.">
        <div className="mx-auto max-w-2xl">
          <FAQ />
        </div>
      </Section>
    </>
  );
}
