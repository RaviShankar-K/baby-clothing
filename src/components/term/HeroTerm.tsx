"use client";

import { useEffect, useState } from "react";
import AsciiTorus from "./AsciiTorus";

const CMD = "./init_baby --cute --size=0-24M";
const STDOUT = [
  "spawning tiny process ......... PID 1",
  "loading 100% combed cotton .... done",
  "compiling milestone releases .. done",
  "0 itchy dependencies found",
  "",
  "ready. tiny sysadmin online ▂▃▅▇",
];

export default function HeroTerm() {
  const [typed, setTyped] = useState(0);
  const [outLines, setOutLines] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = setTimeout(() => {
        setTyped(CMD.length);
        setOutLines(STDOUT.length);
      }, 0);
      return () => clearTimeout(skip);
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= CMD.length) {
        clearInterval(t);
        let j = 0;
        const t2 = setInterval(() => {
          j += 1;
          setOutLines(j);
          if (j >= STDOUT.length) clearInterval(t2);
        }, 210);
      }
    }, 42);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden border-b border-edge">
      {/* phosphor haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 35%, rgba(74,255,127,0.07), transparent 70%), radial-gradient(ellipse 50% 45% at 80% 70%, rgba(74,217,255,0.05), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[7fr_5fr] lg:pb-28 lg:pt-20">
        {/* ——— left: the prompt ——— */}
        <div>
          <p className="term-label flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-phos" />
            tty1 · apparel for tiny sysadmins
          </p>

          <h1 className="pixel glow mt-6 text-[clamp(3.6rem,9vw,7.6rem)] leading-[0.9]">
            init_baby
          </h1>

          <div className="mt-8 max-w-xl text-[14.5px]">
            <p>
              <span className="text-magenta">parent@nursery</span>
              <span className="text-fg-dim">:</span>
              <span className="text-cyber">~</span>
              <span className="text-fg-dim">$ </span>
              <span className="text-fg">{CMD.slice(0, typed)}</span>
              {typed < CMD.length && <span className="blink glow">▮</span>}
            </p>
            <div className="mt-3 space-y-1 text-fg-dim">
              {STDOUT.slice(0, outLines).map((l, i) => (
                <p key={i} style={{ animation: "rise 0.3s ease-out both" }}>
                  {l || " "}
                </p>
              ))}
              {outLines >= STDOUT.length && (
                <p>
                  <span className="text-magenta">parent@nursery</span>
                  <span className="text-fg-dim">:</span>
                  <span className="text-cyber">~</span>
                  <span className="text-fg-dim">$ </span>
                  <span className="blink glow">▮</span>
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#packages"
              className="border border-phos bg-phos px-6 py-3.5 text-[13px] font-bold tracking-[0.1em] text-crt transition-colors hover:bg-transparent hover:text-phos"
            >
              npm install cuteness
            </a>
            <a
              href="#releases"
              className="border border-edge px-6 py-3.5 text-[13px] font-bold tracking-[0.1em] text-fg transition-colors hover:border-phos-dim hover:text-phos"
            >
              view changelog
            </a>
          </div>

          <p className="mt-8 text-[13px] text-fg-dim">
            <span className="glow-amber">warn:</span> subjects may segfault
            into naps without notice. This is expected behaviour.
          </p>
        </div>

        {/* ——— right: 3D ASCII donut in a terminal window ——— */}
        <div className="term-window mx-auto w-full max-w-md">
          <div className="term-bar">
            <span className="term-dot bg-magenta" />
            <span className="term-dot bg-amber" />
            <span className="term-dot bg-phos" />
            <span className="ml-2 text-[11px] text-fg-dim">
              donut.c — 3D render · 64×30
            </span>
          </div>
          <div className="flex items-center justify-center overflow-hidden px-3 py-4">
            <AsciiTorus />
          </div>
          <div className="border-t border-edge px-4 py-2.5 text-[11px] text-fg-dim">
            proof of concept: we render donuts so your baby doesn&apos;t have to
          </div>
        </div>
      </div>
    </section>
  );
}
