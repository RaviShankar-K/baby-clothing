"use client";

import { useRef } from "react";
import Image from "next/image";
import { heroArt } from "@/data/designs";
import ConfettiBurst from "./ConfettiBurst";

/**
 * A storybook diorama: layered clouds with mouse parallax, a swaying
 * hot-air balloon carrying the birthday portrait, and one confetti fall.
 */
export default function HeroStory() {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative overflow-hidden border-b-[2.5px] border-ink"
      style={{
        background:
          "linear-gradient(180deg, var(--sky) 0%, #e9f1ef 46%, var(--page) 100%)",
      }}
    >
      {/* ——— parallax cloud layers ——— */}
      <Cloud className="left-[6%] top-16 w-36 opacity-80" depth={10} />
      <Cloud className="right-[16%] top-10 w-28 opacity-60" depth={7} />
      <Cloud className="left-[38%] top-32 w-24 opacity-50" depth={5} />
      <Cloud className="right-[4%] top-44 w-44 opacity-90" depth={14} />
      <Cloud className="left-[12%] bottom-24 w-32 opacity-70" depth={18} />

      {/* floating hearts and stars */}
      <Float className="right-[45%] bottom-24" r="-8deg" delay="0.4s">
        <HeartDot color="var(--coral)" />
      </Float>
      <Float className="right-[4%] top-24" r="10deg" delay="1.3s">
        <StarDot color="var(--butter)" />
      </Float>
      <Float className="left-[46%] bottom-32" r="4deg" delay="0.9s">
        <StarDot color="var(--sage)" />
      </Float>

      <ConfettiBurst />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[11fr_9fr] lg:gap-4 lg:pb-24 lg:pt-20">
        {/* ——— left: the opening lines ——— */}
        <div className="relative">
          <p className="eyebrow flex items-center gap-2.5 text-ink/60">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-coral" />
            A picture book you can wear
          </p>

          <h1 className="story-display mt-5 text-[clamp(2.9rem,6.8vw,5.4rem)]">
            Every baby is
            <br />
            a <span className="relative inline-block text-coral">
              story
              <Underline />
            </span>
            <span className="text-ink">.</span>
          </h1>

          <p className="script mt-4 text-[clamp(1.6rem,3vw,2.3rem)] text-sage-deep">
            we print the chapters.
          </p>

          <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-ink/70">
            Hand-illustrated milestone tees for tiny heroes — from six months
            of strong opinions to the big number one. Soft cotton, safe inks,
            and a giggle printed into every page.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="pop-hover story-display rounded-full border-[2.5px] border-ink bg-coral px-7 py-3.5 text-[16px] text-white shadow-[0_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Browse the collection
            </a>
            <a
              href="#chapters"
              className="pop-hover story-display rounded-full border-[2.5px] border-ink bg-white px-7 py-3.5 text-[16px] text-ink shadow-[0_5px_0_0_var(--ink-15)] transition-transform hover:-translate-y-0.5"
            >
              Read the chapters
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px] font-semibold text-ink/60">
            <span>✿ 100% combed cotton</span>
            <span>✿ baby-safe inks</span>
            <span>✿ ships across India</span>
          </div>
        </div>

        {/* ——— right: the balloon ——— */}
        <div
          className="relative mx-auto w-full max-w-[420px]"
          style={{
            transform:
              "translate(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 10px))",
          }}
        >
          <div style={{ animation: "balloon-sway 7s ease-in-out infinite" }}>
            <Balloon />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— pieces ————— */

function Balloon() {
  return (
    <div className="relative">
      {/* envelope */}
      <svg viewBox="0 0 260 210" className="mx-auto w-[72%]" aria-hidden="true">
        <defs>
          <clipPath id="env">
            <path d="M130 6C62 6 22 52 22 104c0 44 40 76 76 96h64c36-20 76-52 76-96C238 52 198 6 130 6Z" />
          </clipPath>
        </defs>
        <path
          d="M130 6C62 6 22 52 22 104c0 44 40 76 76 96h64c36-20 76-52 76-96C238 52 198 6 130 6Z"
          fill="var(--coral)"
          stroke="var(--ink)"
          strokeWidth="4"
        />
        <g clipPath="url(#env)">
          {[52, 104, 156, 208].map((x, i) => (
            <path
              key={x}
              d={`M${x} 0C${x - 26} 60 ${x - 26} 150 ${x} 220`}
              fill="none"
              stroke={i % 2 ? "var(--butter)" : "#fff"}
              strokeWidth="30"
              opacity={i % 2 ? 0.95 : 0.9}
            />
          ))}
          <ellipse cx="86" cy="52" rx="34" ry="16" fill="#fff" opacity="0.35" />
        </g>
        <path
          d="M130 6C62 6 22 52 22 104c0 44 40 76 76 96h64c36-20 76-52 76-96C238 52 198 6 130 6Z"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="4"
        />
        {/* ropes */}
        <path d="M98 200l8 26M162 200l-8 26" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* basket carrying the artwork */}
      <div className="relative -mt-2 mx-auto w-[88%] rotate-[-1.5deg]">
        <div className="sticker overflow-hidden p-2.5">
          <div className="relative overflow-hidden rounded-2xl border-2 border-ink/15">
            <Image
              src={heroArt.src}
              alt={heroArt.alt}
              width={840}
              height={560}
              priority
              className="h-auto w-full"
              sizes="(min-width: 1024px) 26rem, 85vw"
            />
          </div>
        </div>
        {/* little bunting under the basket */}
        <svg viewBox="0 0 200 26" className="mx-auto -mt-1 w-1/2" aria-hidden="true">
          <path d="M0 4h200" stroke="var(--ink)" strokeWidth="2.5" />
          {[15, 55, 95, 135, 175].map((x, i) => (
            <path
              key={x}
              d={`M${x - 12} 4 L${x} 22 L${x + 12} 4Z`}
              fill={["var(--butter)", "var(--sage)", "var(--coral)", "var(--sky-deep)", "var(--apricot)"][i]}
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Cloud({ className, depth }: { className?: string; depth: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{
        transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth / 2}px))`,
      }}
    >
      <svg viewBox="0 0 120 60" className="w-full">
        <path
          d="M28 52a16 16 0 0 1-2-32 22 22 0 0 1 42-8 18 18 0 0 1 30 12 15 15 0 0 1-4 28Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

function Float({
  children,
  className,
  r,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  r: string;
  delay: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden lg:block ${className ?? ""}`}
      style={
        {
          "--r": r,
          animation: `bob-gentle 5.5s ease-in-out ${delay} infinite`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

function HeartDot({ color }: { color: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 26 24">
      <path
        d="M13 22C6 16 2 12 2 7.5A5.5 5.5 0 0 1 13 6a5.5 5.5 0 0 1 11 1.5C24 12 20 16 13 22Z"
        fill={color}
        opacity="0.75"
      />
    </svg>
  );
}

function StarDot({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22">
      <path
        d="M11 1l2.6 6.6L20 10l-6.4 2.4L11 19l-2.6-6.6L2 10l6.4-2.4Z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  );
}

function Underline() {
  return (
    <svg
      viewBox="0 0 200 20"
      className="absolute -bottom-2 left-0 w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M4 14C50 6 150 6 196 12"
        fill="none"
        stroke="var(--butter)"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}
