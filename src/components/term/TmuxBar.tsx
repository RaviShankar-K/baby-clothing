"use client";

import { useEffect, useState } from "react";

/** A tmux-style status bar pinned to the bottom of the screen. */
export default function TmuxBar() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 z-40 hidden items-center justify-between border-t border-edge bg-panel px-4 py-1.5 text-[11.5px] text-fg-dim md:flex"
    >
      <p>
        <span className="bg-phos px-1.5 font-bold text-crt">[0]</span>
        <span className="ml-2">0:bash*</span>
        <span className="ml-2">1:naps</span>
        <span className="ml-2">2:snacks</span>
      </p>
      <p className="flex items-center gap-4">
        <span>load avg: 3 giggles/min</span>
        <span>mem: 640K naps free</span>
        <span className="glow">{time} IST</span>
      </p>
    </div>
  );
}
