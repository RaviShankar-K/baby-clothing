import Reveal from "./Reveal";

const STEPS = [
  {
    n: "1",
    title: "Pick a page",
    body: "Choose the chapter your tiny hero is living right now — six months of opinions, nine months of applause, or the big number one.",
    art: "crayon",
    bg: "var(--blush)",
  },
  {
    n: "2",
    title: "Add their name",
    body: "We hand-set the star's name and date into the illustration, so the story is unmistakably theirs.",
    art: "name",
    bg: "var(--sky)",
  },
  {
    n: "3",
    title: "We print & post",
    body: "Printed with baby-safe inks on pre-washed combed cotton, wrapped like a present, at your door in 2–4 days.",
    art: "plane",
    bg: "#e8edda",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-b-[2.5px] border-ink bg-page-warm">
      <div
        className="page-scallop"
        style={{ "--scallop-color": "var(--page)" } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 pb-18 pt-12 sm:px-8 lg:pb-24 lg:pt-16">
        <Reveal>
          <p className="eyebrow text-sage-deep">How it works</p>
          <h2 className="story-display mt-3 max-w-xl text-[clamp(2.2rem,5vw,3.8rem)]">
            Three little steps to a keepsake.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-8 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal className={i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""}>
                <div
                  className="sticker h-full p-7"
                  style={{ transform: `rotate(${[-1, 1.2, -0.8][i]}deg)` }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="story-display flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-ink text-xl"
                      style={{ background: s.bg }}
                    >
                      {s.n}
                    </span>
                    <StepArt kind={s.art} />
                  </div>
                  <h3 className="story-display mt-6 text-[26px]">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepArt({ kind }: { kind: string }) {
  if (kind === "crayon") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ animation: "wiggle 3s ease-in-out infinite" }}>
        <path d="M14 50 40 24l8 8-26 26-11 3Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M40 24l6-6c3-3 8 2 5 5l-6 6" fill="var(--blush)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M14 50l3 8" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 22c8-4 14 4 22-2" fill="none" stroke="var(--sage)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      </svg>
    );
  }
  if (kind === "name") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="8" y="16" width="48" height="32" rx="8" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M16 28h22M16 36h14" stroke="var(--sky-deep)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M44 40l10-10" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="55" cy="29" r="3" fill="var(--butter)" stroke="var(--ink)" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ animation: "bob-gentle 4s ease-in-out infinite" }}>
      <path d="M8 30 54 12 40 52l-10-14Z" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M54 12 30 38" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 46c6-2 8 2 14 0M18 56c5-2 7 1 12-1" stroke="var(--sky-deep)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
