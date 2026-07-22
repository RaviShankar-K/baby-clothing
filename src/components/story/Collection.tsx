import Image from "next/image";
import { designs, type Design } from "@/data/designs";
import TeeMockup from "./TeeMockup";
import Reveal from "./Reveal";

const ACCENT: Record<Design["accent"], string> = {
  sage: "var(--sage)",
  apricot: "var(--apricot)",
  coral: "var(--coral)",
  butter: "var(--butter)",
  sky: "var(--sky-deep)",
  blush: "var(--blush)",
};

/**
 * The Collection — every listing shows the artwork AND the tee it prints on,
 * as an overlapping pair that gently fans apart on hover.
 */
export default function Collection() {
  return (
    <section id="collection" className="scroll-mt-20 border-b-[2.5px] border-ink">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-sage-deep">The collection</p>
            <h2 className="story-display mt-3 text-[clamp(2.2rem,5vw,3.8rem)]">
              Pick a page<span className="text-coral">,</span> wear the story.
            </h2>
          </div>
          <p className="script max-w-[250px] pb-2 text-[22px] leading-tight text-ink/55">
            every design shown twice — the art, and the art on the tee
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {designs.map((d, i) => (
            <Reveal
              key={d.handle}
              className={i % 3 === 1 ? "reveal-late" : i % 3 === 2 ? "reveal-later" : ""}
            >
              <DesignCard design={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignCard({ design }: { design: Design }) {
  return (
    <article className="duo group">
      {/* the pair: tee behind-right, art front-left */}
      <div className="relative aspect-[13/10]">
        {/* tee pane */}
        <div className="pane-tee absolute right-0 top-2 w-[58%] rotate-[2.5deg]">
          <div className="sticker p-2" style={{ background: "var(--page-warm)" }}>
            <TeeMockup
              src={design.src}
              alt={`${design.title} printed on a cream baby tee`}
              className="h-auto w-full"
            />
          </div>
        </div>
        {/* art pane */}
        <div className="pane-art absolute bottom-0 left-0 w-[56%] rotate-[-2.5deg]">
          <div className="sticker p-2">
            <div className="overflow-hidden rounded-[18px] border-2 border-ink/12">
              <Image
                src={design.src}
                alt={`${design.title} — original illustration`}
                width={480}
                height={Math.round(480 / design.ratio)}
                className="h-auto w-full"
                sizes="(min-width: 640px) 14rem, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* words */}
      <div className="mt-5 flex items-start justify-between gap-3 px-1">
        <div>
          <p
            className="eyebrow text-[10.5px]"
            style={{ color: ACCENT[design.accent] === "var(--butter)" ? "var(--apricot)" : ACCENT[design.accent] }}
          >
            {design.chapter}
          </p>
          <h3 className="story-display mt-1 text-[21px] leading-tight">
            {design.title}
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-snug text-ink/60">
            {design.caption}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="story-display text-[20px]">₹{design.price}</p>
          <a
            href="#begin"
            aria-label={`Add ${design.title} to basket for ₹${design.price}`}
            className="pop-hover mt-2 inline-block rounded-full border-[2.5px] border-ink bg-white px-3.5 py-1.5 text-[12.5px] font-bold shadow-[0_3px_0_0_var(--ink-15)] transition-colors hover:bg-butter"
          >
            Add ♥
          </a>
        </div>
      </div>
    </article>
  );
}
