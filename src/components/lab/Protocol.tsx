import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Select a specimen",
    body: "Choose from the periodic table of garments below. Each design has been trialled on real, extremely small humans under rigorous nap conditions.",
    art: "beaker",
    accent: "var(--litmus)",
  },
  {
    n: "02",
    title: "Calibrate the variables",
    body: "Name, age in months, occasion, date — set your constants. We print them in baby-safe, OEKO-TEX certified ink. No dependent variables were harmed.",
    art: "atom",
    accent: "var(--cusof)",
  },
  {
    n: "03",
    title: "Observe the results",
    body: "Dispatch in 2–4 days across India. Expected outcomes: audible squealing, photographic evidence, grandparental approval at p < 0.001.",
    art: "chart",
    accent: "var(--petri)",
  },
] as const;

export default function Protocol() {
  return (
    <section id="protocol" className="rule-b relative scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="label text-ink/60">Section II — Method</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2.4rem,5vw,4.2rem)]">
            A rigorous protocol,{" "}
            <span className="display-i text-petri">gently applied.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px border border-ink/15 bg-ink/15 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n} className="group bg-paper p-8 lg:p-10">
              <Reveal
                className={i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""}
              >
                <div className="flex items-start justify-between">
                  <span className="display text-6xl text-ink/20 transition-colors group-hover:text-ink/40">
                    {s.n}
                  </span>
                  <StepArt kind={s.art} accent={s.accent} />
                </div>
                <h3 className="display mt-8 text-3xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-6 text-ink/65">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepArt({ kind, accent }: { kind: string; accent: string }) {
  if (kind === "beaker") {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
        <path
          d="M28 12h16M31 12v14l-12 26a4 4 0 0 0 3.6 5.7h26.8A4 4 0 0 0 53 52L41 26V12"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M26 42h20l7 15.7H19Z" fill={accent} opacity="0.22" />
        {[0, 1, 2].map((b) => (
          <circle
            key={b}
            cx={32 + b * 5}
            cy={52 - b * 2}
            r={2.4 - b * 0.5}
            fill={accent}
            style={{
              animation: `bubble-rise 2.6s ease-in ${b * 0.7}s infinite`,
            }}
          />
        ))}
      </svg>
    );
  }
  if (kind === "atom") {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
        <g style={{ animation: "orbit 14s linear infinite", transformOrigin: "36px 36px" }}>
          <ellipse cx="36" cy="36" rx="26" ry="11" fill="none" stroke="var(--ink)" strokeWidth="1.3" />
          <ellipse cx="36" cy="36" rx="26" ry="11" fill="none" stroke="var(--ink)" strokeWidth="1.3" transform="rotate(60 36 36)" />
          <ellipse cx="36" cy="36" rx="26" ry="11" fill="none" stroke="var(--ink)" strokeWidth="1.3" transform="rotate(-60 36 36)" />
          <circle cx="62" cy="36" r="3" fill={accent} />
          <circle cx="23" cy="14" r="3" fill="var(--phenol)" />
        </g>
        <circle cx="36" cy="36" r="4.5" fill="var(--ink)" />
      </svg>
    );
  }
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <path d="M12 12v48h48" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M16 52 28 40l9 6 17-22"
        fill="none"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="70"
        strokeDashoffset="70"
        style={{ animation: "dash-draw 2.4s ease-out 0.4s forwards" }}
      />
      <circle cx="54" cy="24" r="3" fill={accent} />
    </svg>
  );
}
