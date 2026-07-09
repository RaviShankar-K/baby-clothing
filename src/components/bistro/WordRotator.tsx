"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "pure cuteness.",
  "the milk course.",
  "second breakfast.",
  "a tiny appetite.",
  "chaos, plated.",
];

/** Kinetic italic word that swaps every few seconds. */
export default function WordRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2700);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-grid overflow-hidden align-baseline">
      <span
        key={i}
        className="menu-italic col-start-1 row-start-1 text-tomato"
        style={{ animation: "word-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        {WORDS[i]}
      </span>
    </span>
  );
}
