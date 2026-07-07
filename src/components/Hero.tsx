import Link from "next/link";
import ProductMockup from "./ProductMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-coral-deep shadow-sm">
              Personalized baby outfits
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Tiny outfits for <span className="text-coral">magical</span> first moments.
            </h1>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              Personalized baby milestone and theme outfits made for birthdays, naming ceremonies,
              festivals, and everyday cuteness.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <Link
                href="/collections/milestones"
                className="w-full sm:w-auto rounded-full bg-coral px-7 py-3.5 text-center font-bold text-white shadow-md shadow-coral/30 hover:bg-coral-deep transition-colors"
              >
                Shop Milestones
              </Link>
              <Link
                href="/try-on"
                className="w-full sm:w-auto rounded-full border-2 border-coral/40 bg-white px-7 py-3.5 text-center font-bold text-coral-deep hover:border-coral hover:bg-blush/50 transition-colors"
              >
                Try Baby Preview ✨
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              🧸 Soft cotton · 🖍️ Baby-safe prints · 💌 Personalized with love
            </p>
          </div>

          <div className="mx-auto w-64 sm:w-80 md:w-full md:max-w-md">
            <ProductMockup
              mockup={{ shirt: "#FDFBF7", accent: "#E58A7E", print: "HALF WAY TO ONE", emoji: "🎈", bg: "#FFFFFF" }}
              title="Half Way to One"
              className="w-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
