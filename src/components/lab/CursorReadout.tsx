"use client";

import { useEffect, useRef } from "react";

/** A fixed lab-instrument readout of the cursor position. Desktop only. */
export default function CursorReadout() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.textContent = `x:${String(Math.round(x)).padStart(4, "0")} y:${String(
            Math.round(y)
          ).padStart(4, "0")} · OBSERVING`;
          raf = 0;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="label pointer-events-none fixed bottom-4 left-5 z-50 hidden text-[10px] text-ink/45 md:block"
    >
      x:0000 y:0000 · OBSERVING
    </div>
  );
}
