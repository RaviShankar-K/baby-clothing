"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#e2795e", "#f2c879", "#8a9b6e", "#e8a06c", "#a8c9dd", "#f6ddd0"];

/** A single celebratory confetti fall on load, then quietly retires. */
export default function ConfettiBurst() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.6,
      vy: 1.2 + Math.random() * 1.8,
      vx: -0.6 + Math.random() * 1.2,
      size: 5 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI,
      vr: -0.08 + Math.random() * 0.16,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let raf = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, w, h);
      const fade = t > 5200 ? Math.max(0, 1 - (t - 5200) / 900) : 1;
      let alive = false;

      for (const p of pieces) {
        p.y += p.vy;
        p.x += p.vx + Math.sin((p.y + p.rot * 40) / 34) * 0.6;
        p.rot += p.vr;
        if (p.y < h + 20) alive = true;

        ctx.save();
        ctx.globalAlpha = 0.9 * fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive && fade > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
