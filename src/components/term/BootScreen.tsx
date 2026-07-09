"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "BABYBIOS v0.1.0 — © init_baby industries",
  "CPU: 1 × TinyHuman @ 3.2 giggles/sec ............ OK",
  "MEM: 640K naps (should be enough for anyone) .... OK",
  "Mounting /dev/crib ............................. OK",
  "Loading softness drivers ....................... OK",
  "Checking for itchy tags ................... 0 FOUND",
  "Starting cuteness daemon [cuted] ............... OK",
  "",
  "boot: init_baby ready. Press any key.",
];

/**
 * Full-screen CRT boot sequence played on load. Skippable by click/keypress;
 * skipped entirely under prefers-reduced-motion.
 */
export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(skip);
    }

    const t0 = performance.now();
    let i = 0;
    let auto: ReturnType<typeof setTimeout> | undefined;
    const timer = setInterval(() => {
      i += 1;
      setLines(BOOT_LINES.slice(0, i));
      if (i >= BOOT_LINES.length) {
        clearInterval(timer);
        // auto-dismiss only once every line has printed
        auto = setTimeout(() => setFading(true), 700);
      }
    }, 170);

    // ignore stray events fired right at load (some browsers synthesize one)
    const dismiss = () => {
      if (performance.now() - t0 > 500) setFading(true);
    };
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);

    return () => {
      clearInterval(timer);
      clearTimeout(auto);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, []);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setVisible(false), 450);
    return () => clearTimeout(t);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99] flex items-start bg-crt p-6 transition-opacity duration-400 sm:p-12"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <pre className="glow whitespace-pre-wrap text-[12px] leading-relaxed sm:text-[13.5px]">
        {lines.join("\n")}
        <span className="blink">▮</span>
      </pre>
    </div>
  );
}
