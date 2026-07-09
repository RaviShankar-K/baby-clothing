import Reveal from "./Reveal";

const STEPS = [
  {
    n: "I",
    title: "Mise en place",
    body: "Pick a recipe from the menu — chef tees, sommelier onesies, or a milestone course. Every dish is cut from pre-washed, combed cotton.",
    art: "whisk",
  },
  {
    n: "II",
    title: "Season to taste",
    body: "Add the guest of honour: name, age in months, the big date. We print personalization in baby-safe inks, checked by hand before service.",
    art: "salt",
  },
  {
    n: "III",
    title: "Service",
    body: "Plated, wrapped, and dispatched across India in 2–4 days. Best enjoyed immediately; photographs age exceptionally well.",
    art: "cloche",
  },
] as const;

export default function MethodKitchen() {
  return (
    <section id="method" className="scroll-mt-20 border-b-2 border-choc bg-butter-deep/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="tag text-tomato">How the kitchen works</p>
          <h2 className="menu-display-black mt-4 max-w-2xl text-[clamp(2.6rem,5.5vw,4.6rem)]">
            The Method
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-7 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative">
              <Reveal
                className={`h-full rounded-2xl border-2 border-choc bg-plate p-8 ${
                  i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="menu-display-black text-5xl text-tomato">{s.n}</span>
                  <StepArt kind={s.art} />
                </div>
                <h3 className="menu-display mt-7 text-[1.75rem]">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-choc/70">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepArt({ kind }: { kind: string }) {
  if (kind === "whisk") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        {/* cutting board with knife */}
        <rect x="8" y="20" width="48" height="32" rx="5" fill="var(--cream-plate)" stroke="var(--choc)" strokeWidth="2.2" />
        <circle cx="14.5" cy="26.5" r="1.8" fill="none" stroke="var(--choc)" strokeWidth="1.6" />
        <g style={{ animation: "simmer 1.8s ease-in-out infinite" }}>
          <path d="M22 40 46 16c3 0 5 2 5 5L27 45Z" fill="var(--cream-plate)" stroke="var(--choc)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 40l-4 9 9-4Z" fill="var(--tomato)" stroke="var(--choc)" strokeWidth="2" strokeLinejoin="round" />
        </g>
        <path d="M32 46h16" stroke="var(--choc-45)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "salt") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ animation: "simmer 1.6s ease-in-out infinite" }}>
        <path d="M24 22h16l3 30a5 5 0 0 1-5 5.4H26a5 5 0 0 1-5-5.4Z" fill="var(--cream-plate)" stroke="var(--choc)" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M26 22a6 8 0 0 1 12 0" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2.2" />
        {[26, 32, 38].map((x, i) => (
          <circle key={x} cx={x} cy={12 - (i % 2) * 4} r="1.6" fill="var(--choc)" opacity="0.7" />
        ))}
        <path d="M27 40h10M28 46h8" stroke="var(--choc-45)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 44c0-12 9-21 20-21s20 9 20 21Z" fill="var(--tomato)" stroke="var(--choc)" strokeWidth="2.2" />
      <circle cx="32" cy="20" r="3.4" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2" />
      <line x1="8" y1="48" x2="56" y2="48" stroke="var(--choc)" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 1].map((s) => (
        <path
          key={s}
          d={`M${26 + s * 12} 16 q -4 -8 0 -14`}
          fill="none"
          stroke="var(--choc-45)"
          strokeWidth="2.6"
          strokeLinecap="round"
          style={{ animation: `steam-rise 3s ease-out ${s * 1.2}s infinite` }}
        />
      ))}
    </svg>
  );
}
