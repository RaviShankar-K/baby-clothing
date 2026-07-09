"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Longitudinal Study — an SVG chart of "observed cuteness" over the
 * first 24 months. The line draws itself as the section scrolls into view;
 * each data point is a milestone tee.
 */

const POINTS = [
  { m: 1, label: "1 Month Old", price: 449, x: 60, y: 300, lx: 14, ly: -4 },
  { m: 2, label: "2 Months Old", price: 449, x: 130, y: 282, lx: -56, ly: -48 },
  { m: 3, label: "3 Months Old", price: 449, x: 200, y: 258, lx: 16, ly: 10 },
  { m: 6, label: "Half Way to One", price: 499, x: 340, y: 210, lx: -40, ly: -48 },
  { m: 12, label: "I'm One Now", price: 549, x: 560, y: 128, lx: 18, ly: 4 },
  { m: 24, label: "Officially Two", price: 549, x: 860, y: 52, lx: -132, ly: -18 },
];

const PATH = `M60 300 C 100 292, 110 288, 130 282 S 180 266, 200 258 S 300 226, 340 210 S 500 152, 560 128 S 800 68, 860 52`;

export default function GrowthChart() {
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
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="study" className="rule-b scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="label text-ink/60">Section IV — Longitudinal Study</p>
        <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.2rem)]">
          Cuteness compounds{" "}
          <span className="display-i text-cusof">monthly.</span>
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-6 text-ink/65">
          Our milestone series tracks the subject from month one to month
          twenty-four. Findings are consistent across all trials: the curve
          only goes up. Each data point ships as a tee.
        </p>

        <div ref={ref} className="mt-14 overflow-x-auto">
          <svg
            viewBox="0 0 920 380"
            className="min-w-[720px]"
            role="img"
            aria-label="Chart of observed cuteness rising from month 1 to month 24, with a milestone tee at each data point"
          >
            {/* axes */}
            <line x1="40" y1="20" x2="40" y2="330" stroke="var(--ink)" strokeWidth="1.4" />
            <line x1="40" y1="330" x2="900" y2="330" stroke="var(--ink)" strokeWidth="1.4" />
            <text x="46" y="30" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-60)" letterSpacing="2">
              OBSERVED CUTENESS (ARBITRARY UNITS)
            </text>
            <text x="900" y="352" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-60)" textAnchor="end" letterSpacing="2">
              AGE (MONTHS)
            </text>

            {/* gridlines */}
            {[80, 140, 200, 260].map((y) => (
              <line key={y} x1="40" y1={y} x2="900" y2={y} stroke="var(--ink-14)" strokeWidth="1" strokeDasharray="2 6" />
            ))}

            {/* the curve */}
            <path
              d={PATH}
              fill="none"
              stroke="var(--litmus)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1100"
              strokeDashoffset={inView ? 0 : 1100}
              style={{ transition: "stroke-dashoffset 2.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />

            {/* data points */}
            {POINTS.map((p, i) => (
              <g
                key={p.m}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.4 + i * 0.35}s`,
                }}
              >
                <circle cx={p.x} cy={p.y} r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                <circle cx={p.x} cy={p.y} r="2" fill="var(--litmus)" />
                <line x1={p.x} y1={p.y + 8} x2={p.x} y2={330} stroke="var(--ink-14)" strokeWidth="1" />
                <text x={p.x} y={348} fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink)" textAnchor="middle">
                  {p.m}
                </text>
                <g transform={`translate(${p.x + p.lx}, ${p.y + p.ly})`}>
                  <rect width="118" height="30" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                  <text x="8" y="13" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600" fill="var(--ink)" letterSpacing="0.5">
                    {p.label.toUpperCase()}
                  </text>
                  <text x="8" y="24" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-60)">
                    ₹{p.price} · milestone tee
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
