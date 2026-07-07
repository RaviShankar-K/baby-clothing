import Link from "next/link";
import { collections } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-16 bg-blush/60 border-t border-blush">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span aria-hidden className="text-2xl">🌙</span>
              <span className="font-display text-xl font-bold">
                Tiny<span className="text-coral">verse</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              Little outfits for big little moments. Personalized baby clothing made with love,
              soft cotton, and baby-safe prints.
            </p>
          </div>

          <nav aria-label="Collections">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Collections</h3>
            <ul className="mt-3 space-y-2">
              {collections.map((c) => (
                <li key={c.handle}>
                  <Link href={`/collections/${c.handle}`} className="text-sm font-semibold hover:text-coral-deep">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/shop" className="text-sm font-semibold hover:text-coral-deep">Shop All</Link></li>
              <li><Link href="/personalize" className="text-sm font-semibold hover:text-coral-deep">Personalize</Link></li>
              <li><Link href="/try-on" className="text-sm font-semibold hover:text-coral-deep">Baby Try-On</Link></li>
              <li><Link href="/about" className="text-sm font-semibold hover:text-coral-deep">About Tinyverse</Link></li>
            </ul>
          </nav>

          <nav aria-label="Help">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Help</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/faq" className="text-sm font-semibold hover:text-coral-deep">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm font-semibold hover:text-coral-deep">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm font-semibold hover:text-coral-deep">Privacy & Photos</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-coral/20 pt-6 text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} Tinyverse · Dress the tiny universe · Made with 🤍 for tiny humans
        </div>
      </div>
    </footer>
  );
}
