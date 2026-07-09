"use client";

import { useEffect, useRef } from "react";

/**
 * A real 3D torus, ray-shaded and rendered as ASCII — the classic donut,
 * spinning forever in a terminal window. Luminance maps to the charset
 * `.,-~:;=!*#$@`. Pure math, no libraries.
 */
export default function AsciiTorus() {
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const W = 64; // columns
    const H = 30; // rows
    const CHARS = ".,-~:;=!*#$@";
    let A = 1.0;
    let B = 0.4;
    let raf = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frame = () => {
      A += 0.05;
      B += 0.023;

      const out: string[] = new Array(W * H).fill(" ");
      const z: number[] = new Array(W * H).fill(0);

      const cA = Math.cos(A), sA = Math.sin(A);
      const cB = Math.cos(B), sB = Math.sin(B);

      for (let th = 0; th < 6.28; th += 0.07) {
        const ct = Math.cos(th), st = Math.sin(th);
        for (let ph = 0; ph < 6.28; ph += 0.02) {
          const cp = Math.cos(ph), sp = Math.sin(ph);

          const circx = 2 + ct; // torus radius 2, tube radius 1
          const circy = st;

          const x = circx * (cB * cp + sA * sB * sp) - circy * cA * sB;
          const y = circx * (sB * cp - sA * cB * sp) + circy * cA * cB;
          const ooz = 1 / (circx * cA * sp + circy * sA + 5);
          const xp = Math.floor(W / 2 + W * 0.48 * ooz * x);
          const yp = Math.floor(H / 2 - H * 0.9 * ooz * y);

          const L =
            cp * ct * sB -
            cA * ct * sp -
            sA * st +
            cB * (cA * st - ct * sA * sp);

          if (xp >= 0 && xp < W && yp >= 0 && yp < H) {
            const idx = xp + yp * W;
            if (ooz > z[idx]) {
              z[idx] = ooz;
              out[idx] = CHARS[Math.max(0, Math.floor(L * 8))] ?? ".";
            }
          }
        }
      }

      let text = "";
      for (let r = 0; r < H; r++) {
        text += out.slice(r * W, (r + 1) * W).join("") + "\n";
      }
      pre.textContent = text;

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={preRef}
      aria-label="A spinning 3D donut rendered in ASCII characters"
      className="glow select-none text-[9px] leading-[1.05] sm:text-[10.5px]"
    />
  );
}
