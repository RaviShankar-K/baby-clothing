import Reveal from "./Reveal";
import { getProduct, type Product } from "@/data/products";

/** The it-baby collection as installable packages. */

const PACKAGES: { handle: string; pkg: string; desc: string }[] = [
  {
    handle: "hello-world-im-new-here",
    pkg: "hello-world",
    desc: "Prints a newborn to stdout. The canonical first program.",
  },
  {
    handle: "debugging-since-birth",
    pkg: "debug-since-birth",
    desc: "Verbose crying logs with zero stack traces. Root cause: unknown.",
  },
  {
    handle: "future-coder",
    pkg: "future-coder",
    desc: "Ships with keyboard-mashing bindings and infinite curiosity.",
  },
  {
    handle: "tiny-techie",
    pkg: "tiny-techie",
    desc: "Full-stack: handles both the bottle and the burp layer.",
  },
  {
    handle: "alexa-order-cake",
    pkg: "alexa-order-cake",
    desc: "Voice-activated birthday module. Requires exactly one candle.",
  },
  {
    handle: "custom-name-tee",
    pkg: "custom-name",
    desc: "Your baby's name, compiled to cotton. Fully typed.",
  },
];

export default function PkgGrid() {
  return (
    <section id="packages" className="scroll-mt-16 border-b border-edge bg-panel/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="term-label">$ npm search @init-baby</p>
            <h2 className="pixel glow mt-4 text-[clamp(2.6rem,6vw,4.4rem)] leading-none">
              Package registry
            </h2>
          </div>
          <p className="term-label max-w-[260px] pb-2">
            Hover a package to install. All builds reproducible, all
            fabrics pre-washed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const product = getProduct(p.handle);
            if (!product) return null;
            return (
              <Reveal
                key={p.pkg}
                className={i % 3 === 1 ? "reveal-late" : i % 3 === 2 ? "reveal-later" : ""}
              >
                <PkgCard meta={p} product={product} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PkgCard({
  meta,
  product,
}: {
  meta: { pkg: string; desc: string };
  product: Product;
}) {
  return (
    <div className="pkg term-window flex h-full flex-col transition-transform duration-300 hover:-translate-y-1.5">
      <div className="term-bar">
        <span className="term-dot bg-magenta" />
        <span className="term-dot bg-amber" />
        <span className="term-dot bg-phos" />
        <span className="ml-2 truncate text-[11px] text-fg-dim">
          @init-baby/{meta.pkg}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px]">
          <span className="text-fg-dim">$ </span>
          <span className="text-fg">npm i </span>
          <span className="glow">@init-baby/{meta.pkg}</span>
        </p>

        {/* garment preview */}
        <div className="mt-4 flex items-center justify-center border border-edge bg-crt py-5">
          <TeeAscii product={product} />
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">{meta.desc}</p>

        <div className="mt-4 space-y-1 text-[12px] text-fg-dim">
          <p>
            <span className="text-cyber">version</span>: {product.title}
          </p>
          <p>
            <span className="text-cyber">size</span>: 0–3M → 18–24M ·{" "}
            <span className="text-cyber">license</span>: HUG-2.0
          </p>
        </div>

        {/* install progress on hover */}
        <div className="mt-5">
          <div className="h-2 w-full border border-edge">
            <div className="install-bar h-full bg-phos" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="glow-amber text-[15px] font-bold">₹{product.price}</span>
            <a
              href="#deploy"
              aria-label={`Install ${product.title} for ₹${product.price}`}
              className="border border-phos-dim px-3 py-1.5 text-[11.5px] font-bold tracking-[0.1em] text-phos transition-colors hover:bg-phos hover:text-crt"
            >
              install
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeeAscii({ product }: { product: Product }) {
  return (
    <svg viewBox="0 0 120 104" className="w-28" aria-hidden="true">
      <path
        d="M38 6 60 14 82 6l24 14-9 18-11-5v60a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V33l-11 5-9-18Z"
        fill="var(--crt-panel)"
        stroke="var(--phos-dim)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text x="60" y="48" textAnchor="middle" fontSize="15">
        {product.mockup.emoji}
      </text>
      <text
        x="60"
        y="69"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="var(--font-term)"
        fontWeight="700"
        letterSpacing="0.6"
        fill="var(--phos)"
      >
        {product.mockup.print.length > 16
          ? product.mockup.print.slice(0, 15) + "…"
          : product.mockup.print}
      </text>
    </svg>
  );
}
