"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getDesign } from "@/data/designs";
import Reveal from "./Reveal";

/**
 * The Chapters — a winding dotted path that draws itself as it scrolls into
 * view, with an illustrated milestone waiting at each bend.
 */

const STATIONS = [
  {
    handle: "six-months",
    chapter: "Chapter One · 6 months",
    line: "In which our hero discovers volume.",
  },
  {
    handle: "nine-months",
    chapter: "Chapter Two · 9 months",
    line: "In which applause is invented, for oneself.",
  },
  {
    handle: "it-me-one",
    chapter: "Chapter Three · one year",
    line: "In which there is cake, and it is personal.",
  },
];

export default function GrowthPath() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="chapters" className="relative scroll-mt-20 border-b-[2.5px] border-ink bg-page-warm">
      <div
        className="page-scallop"
        style={{ "--scallop-color": "var(--sage)" } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 pb-18 pt-12 sm:px-8 lg:pb-24 lg:pt-16">
        <Reveal className="text-center">
          <p className="eyebrow text-sage-deep">Table of contents</p>
          <h2 className="story-display mt-3 text-[clamp(2.2rem,5vw,3.8rem)]">
            The chapters so far<span className="text-coral">…</span>
          </h2>
          <p className="script mt-2 text-2xl text-ink/55">
            every hero starts small
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* the winding path (desktop) */}
          <svg
            viewBox="0 0 1000 120"
            className="absolute left-0 top-16 hidden w-full lg:block"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M40 80 C 200 20, 320 110, 500 60 S 800 20, 960 70"
              fill="none"
              stroke="var(--sage)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="2 16"
              pathLength={1000}
              style={{
                strokeDashoffset: inView ? 0 : 1000,
                transition: "stroke-dashoffset 2.6s ease-out",
              }}
            />
          </svg>

          <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
            {STATIONS.map((s, i) => {
              const d = getDesign(s.handle);
              if (!d) return null;
              return (
                <li key={s.handle} className={i === 1 ? "lg:translate-y-10" : ""}>
                  <Reveal
                    className={
                      i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""
                    }
                  >
                    <figure
                      className="sticker relative mx-auto max-w-sm p-4"
                      style={{ transform: `rotate(${i === 1 ? 1.6 : -1.4}deg)` }}
                    >
                      <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
                      <div className="overflow-hidden rounded-2xl border-2 border-ink/12">
                        <Image
                          src={d.src}
                          alt={`${d.title} — illustrated milestone artwork`}
                          width={560}
                          height={Math.round(560 / d.ratio)}
                          className="h-auto w-full"
                          sizes="(min-width: 1024px) 22rem, 85vw"
                        />
                      </div>
                      <figcaption className="px-2 pb-1 pt-4 text-center">
                        <p className="eyebrow text-[11px] text-coral">{s.chapter}</p>
                        <p className="story-display mt-1.5 text-2xl">{d.title}</p>
                        <p className="script mt-1 text-xl leading-snug text-ink/60">
                          {s.line}
                        </p>
                      </figcaption>
                      {/* page number */}
                      <span className="story-display absolute -right-3 -top-4 flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-butter text-lg shadow-[0_3px_0_0_var(--ink-15)]">
                        {i + 1}
                      </span>
                    </figure>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16 text-center lg:mt-20">
          <a
            href="#collection"
            className="pop-hover story-display inline-block rounded-full border-[2.5px] border-ink bg-sage px-7 py-3.5 text-[16px] text-white shadow-[0_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          >
            Turn the page → the full collection
          </a>
        </Reveal>
      </div>
    </section>
  );
}
