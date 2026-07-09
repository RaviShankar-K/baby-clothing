"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import { getProduct, type Product } from "@/data/products";

/** Chef-baby garments plated as 3D-tilting recipe cards. */

const RECIPES: { handle: string; yieldNote: string; stamp: string }[] = [
  { handle: "tiny-chef", yieldNote: "1 very small executive chef", stamp: "House signature" },
  { handle: "milk-sommelier", yieldNote: "1 discerning milk critic", stamp: "Cellar pick" },
  { handle: "snack-boss", yieldNote: "1 unelected snack official", stamp: "Staff favourite" },
  { handle: "master-of-mess", yieldNote: "1 abstract expressionist", stamp: "Gallery grade" },
];

export default function RecipeCards() {
  return (
    <section id="recipes" className="scroll-mt-20 border-b-2 border-choc">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tag text-tomato">From the recipe box</p>
            <h2 className="menu-display-black mt-4 text-[clamp(2.6rem,5.5vw,4.6rem)]">
              House Recipes
            </h2>
          </div>
          <p className="tag max-w-[240px] pb-3 text-choc/50">
            Tested on real kitchens. Survived real toddlers.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {RECIPES.map((r, i) => {
            const product = getProduct(r.handle);
            if (!product) return null;
            return (
              <Reveal
                key={r.handle}
                className={i === 1 ? "reveal-late" : i >= 2 ? "reveal-later" : ""}
              >
                <RecipeCard product={product} yieldNote={r.yieldNote} stamp={r.stamp} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RecipeCard({
  product,
  yieldNote,
  stamp,
}: {
  product: Product;
  yieldNote: string;
  stamp: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${px * 10}deg`);
    el.style.setProperty("--rx", `${-py * 10}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tilt-card relative flex h-full flex-col rounded-2xl border-2 border-choc bg-plate p-6"
    >
      {/* stamp */}
      <span className="tag absolute -top-3 right-5 rounded-full border-2 border-choc bg-saffron px-3 py-1 text-[9px] text-choc">
        {stamp}
      </span>

      <p className="tag text-[10px] text-olive">Recipe №{product.id.slice(-2)}</p>
      <h3 className="menu-display lift mt-2 text-[1.65rem] leading-tight">
        {product.title}
      </h3>

      {/* the plated garment */}
      <div
        className="lift mt-5 flex items-center justify-center rounded-xl border-2 border-choc/15 py-6"
        style={{ background: product.mockup.bg }}
      >
        <TeeMini mockup={product.mockup} />
      </div>

      <dl className="mt-5 space-y-2 text-[13.5px] text-choc/75">
        <Row k="Ingredients" v="Combed cotton, safe inks" />
        <Row k="Prep time" v="2–4 days, to order" />
        <Row k="Yields" v={yieldNote} />
      </dl>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="menu-display text-2xl">₹{product.price}</span>
        <a
          href="#reserve"
          className="tag rounded-full border-2 border-choc bg-choc px-4 py-2.5 text-[10px] text-butter transition-colors hover:bg-tomato"
        >
          Add to order
        </a>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="tag shrink-0 pt-0.5 text-[9px] text-choc/45">{k}</dt>
      <dd className="flex-1 text-right">{v}</dd>
    </div>
  );
}

function TeeMini({ mockup }: { mockup: Product["mockup"] }) {
  return (
    <svg viewBox="0 0 120 110" className="w-28" aria-hidden="true">
      <path
        d="M38 8 60 16 82 8l24 14-9 18-11-5v62a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V35l-11 5-9-18Z"
        fill={mockup.shirt}
        stroke="var(--choc)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text x="60" y="52" textAnchor="middle" fontSize="16">{mockup.emoji}</text>
      <text
        x="60"
        y="73"
        textAnchor="middle"
        fontSize="8"
        fontFamily="var(--font-body)"
        fontWeight="800"
        letterSpacing="0.6"
        fill={mockup.accent}
      >
        {mockup.print.length > 15 ? mockup.print.slice(0, 14) + "…" : mockup.print}
      </text>
    </svg>
  );
}
