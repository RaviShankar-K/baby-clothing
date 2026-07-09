import Reveal from "./Reveal";
import { getProduct, type Product } from "@/data/products";

/**
 * The Periodic Table of Garments. Each tile is an "element": front face shows
 * symbol/number/price like a periodic entry; hovering flips it to reveal the
 * garment itself.
 */

interface ElementSpec {
  handle: string;
  symbol: string;
  /** lg-grid column start, to stagger rows like a periodic table */
  col?: number;
  accent: string;
}

const ELEMENTS: ElementSpec[] = [
  { handle: "tiny-scientist", symbol: "Ts", col: 1, accent: "var(--litmus)" },
  { handle: "experiment-loading", symbol: "Ex", col: 5, accent: "var(--phenol)" },
  { handle: "lab-baby", symbol: "Lb", col: 1, accent: "var(--cusof)" },
  { handle: "future-inventor", symbol: "Fi", accent: "var(--petri)" },
  { handle: "one-month-old", symbol: "M₁", accent: "var(--flame)" },
  { handle: "half-way-to-one", symbol: "M₆", accent: "var(--litmus)" },
  { handle: "im-one-now", symbol: "Y₁", accent: "var(--phenol)" },
  { handle: "custom-name-tee", symbol: "Cn", col: 1, accent: "var(--cusof)" },
  { handle: "custom-birthday-tee", symbol: "Cb", accent: "var(--petri)" },
  { handle: "custom-theme-romper", symbol: "Cr", accent: "var(--flame)" },
];

export default function PeriodicShop() {
  return (
    <section id="specimens" className="rule-b scroll-mt-16 bg-paper-deep/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-ink/60">Section III — Materials</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">
                The periodic table{" "}
                <span className="display-i text-litmus">of garments.</span>
              </h2>
            </div>
            <p className="label max-w-xs pb-2 text-ink/55">
              Hover or tap an element to reveal the specimen. All entries
              stable at room temperature.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {ELEMENTS.map((el, i) => {
            const product = getProduct(el.handle);
            if (!product) return null;
            return (
              <ElementTile
                key={el.handle}
                spec={el}
                product={product}
                number={i + 1}
              />
            );
          })}
          <UndiscoveredTile />
        </div>
      </div>
    </section>
  );
}

function ElementTile({
  spec,
  product,
  number,
}: {
  spec: ElementSpec;
  product: Product;
  number: number;
}) {
  return (
    <div
      className={`tile aspect-[4/5] ${
        spec.col === 1 ? "lg:col-start-1" : spec.col === 5 ? "lg:col-start-5" : ""
      }`}
    >
      <div className="tile-inner relative h-full w-full">
        {/* front — periodic entry */}
        <div className="tile-face absolute inset-0 flex flex-col border border-ink bg-paper p-4 shadow-[5px_5px_0_0_var(--ink-14)]">
          <div className="flex items-start justify-between text-[11px] tracking-[0.08em] text-ink/55">
            <span>{String(number).padStart(2, "0")}</span>
            <span>₹{product.price}</span>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span
              className="display text-[clamp(3rem,6vw,4.6rem)]"
              style={{ color: spec.accent }}
            >
              {spec.symbol}
            </span>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em]">
              {product.title}
            </p>
            <p className="mt-1 text-[10px] text-ink/50">
              {product.sizes[0]} → {product.sizes[product.sizes.length - 1]}
            </p>
          </div>
        </div>

        {/* back — the garment */}
        <div
          className="tile-face tile-back absolute inset-0 flex flex-col border border-ink p-4"
          style={{ background: product.mockup.bg }}
        >
          <div className="flex flex-1 items-center justify-center">
            <TeeMini mockup={product.mockup} />
          </div>
          <div className="text-center">
            <a
              href="#specimens"
              aria-label={`Add ${product.title} to tray, ₹${product.price}`}
              className="inline-block border border-ink bg-paper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
            >
              ₹{product.price} · add to tray
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeeMini({
  mockup,
}: {
  mockup: Product["mockup"];
}) {
  return (
    <svg viewBox="0 0 120 110" className="w-4/5 max-w-[150px]" aria-hidden="true">
      <path
        d="M38 8 60 16 82 8l24 14-9 18-11-5v62a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V35l-11 5-9-18Z"
        fill={mockup.shirt}
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="52"
        textAnchor="middle"
        fontSize="15"
      >
        {mockup.emoji}
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="var(--font-mono)"
        fontWeight="600"
        letterSpacing="0.5"
        fill={mockup.accent}
      >
        {mockup.print.length > 16 ? mockup.print.slice(0, 15) + "…" : mockup.print}
      </text>
    </svg>
  );
}

function UndiscoveredTile() {
  return (
    <div className="flex aspect-[4/5] flex-col border border-dashed border-ink/40 bg-transparent p-4 lg:col-start-5">
      <div className="flex items-start justify-between text-[11px] text-ink/40">
        <span>??</span>
        <span>₹—</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span className="display text-5xl text-ink/25">?</span>
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-ink/50">
        Undiscovered — your baby&apos;s name here
      </p>
    </div>
  );
}
