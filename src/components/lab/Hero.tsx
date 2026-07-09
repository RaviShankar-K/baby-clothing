import Image from "next/image";
import ReagentField from "./ReagentField";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/15">
      <ReagentField className="absolute inset-0 h-full w-full" />
      {/* keep the graph grid visible above the shader */}
      <div className="graph-field pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[7fr_5fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* ——— left: thesis ——— */}
        <div className="flex flex-col justify-center">
          <p className="label mb-6 flex items-center gap-3 text-ink/60">
            <span className="inline-block h-2 w-2 rounded-full bg-litmus" />
            Institute for the Study of Small Humans · Vol. 01
          </p>

          <h1 className="display text-[clamp(3.2rem,8.5vw,7.5rem)]">
            The science
            <br />
            of being{" "}
            <span className="display-i text-litmus">small.</span>
          </h1>

          <p className="mt-8 max-w-md text-[15px] leading-7 text-ink/70">
            Peer-reviewed baby clothing for specimens aged 0–24 months.
            Milestone tees, lab-grade onesies, and personalized field
            equipment — soft enough to pass every nap trial we could devise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#specimens"
              className="label inline-flex items-center gap-3 bg-ink px-7 py-4 font-semibold text-paper transition-colors hover:bg-litmus"
            >
              Browse specimens
              <span aria-hidden>→</span>
            </a>
            <a
              href="#protocol"
              className="label inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-semibold text-ink transition-colors hover:border-ink hover:bg-ink/5"
            >
              Read the protocol
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-px border border-ink/15 bg-ink/15">
            {[
              ["21", "designs under trial"],
              ["100%", "combed cotton"],
              ["0", "itchy tags observed"],
            ].map(([n, l]) => (
              <div key={l} className="bg-paper px-4 py-3">
                <dt className="display text-3xl">{n}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ——— right: annotated specimen ——— */}
        <figure className="relative mx-auto w-full max-w-md self-center">
          <div className="relative border border-ink bg-paper p-3 shadow-[10px_10px_0_0_var(--ink)]">
            <div className="label flex items-center justify-between border-b border-ink/15 pb-2 text-ink/60">
              <span>Fig. 1 — Specimen №001</span>
              <span className="text-litmus">● Live</span>
            </div>
            <div className="relative mt-3 aspect-[4/5] overflow-hidden">
              <Image
                src="/babies/model-studio.jpg"
                alt="Baby model in a soft white laboratory-approved tee"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
                priority
              />
              {/* crosshair corner ticks */}
              <CornerTicks />
            </div>
            <figcaption className="label mt-3 flex justify-between text-ink/60">
              <span>Age: 9 months</span>
              <span>Mood: peer-reviewed</span>
            </figcaption>
          </div>

          {/* floating annotations */}
          <Annotation className="max-sm:hidden -left-4 top-16 lg:-left-12" color="var(--petri)">
            grip strength: heroic
          </Annotation>
          <Annotation className="right-0 top-1/3 sm:-right-2 lg:-right-8" color="var(--litmus)">
            softness: 99.7th pct.
          </Annotation>
          <Annotation className="-left-2 bottom-14 lg:-left-10" color="var(--cusof)">
            drool yield: 3 mL/min
          </Annotation>

          {/* rotating certification seal */}
          <div className="absolute -right-5 -top-6 h-24 w-24 lg:-right-9">
            <svg viewBox="0 0 100 100" className="spin-slow h-full w-full" aria-hidden="true">
              <defs>
                <path id="seal-arc" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <circle cx="50" cy="50" r="48" fill="var(--litmus)" />
              <circle cx="50" cy="50" r="27" fill="none" stroke="var(--paper)" strokeWidth="1" />
              <text fontSize="8.6" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="1.6" fill="var(--paper)">
                <textPath href="#seal-arc">CERTIFIED SOFT · PEER-REVIEWED ·</textPath>
              </text>
              <text x="50" y="55" textAnchor="middle" fontSize="15" fontFamily="var(--font-display)" fontStyle="italic" fill="var(--paper)">
                99.7%
              </text>
            </svg>
          </div>
        </figure>
      </div>
    </section>
  );
}

function Annotation({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 ${className ?? ""}`}
      style={{ animation: "bob 5.5s ease-in-out infinite" }}
    >
      <span
        className="inline-block h-2.5 w-2.5 rounded-full border border-ink"
        style={{ background: color }}
      />
      <span className="border border-ink/25 bg-paper px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] shadow-[3px_3px_0_0_var(--ink-14)]">
        {children}
      </span>
    </div>
  );
}

function CornerTicks() {
  const tick = "absolute h-4 w-4 border-paper";
  return (
    <div aria-hidden="true">
      <span className={`${tick} left-2 top-2 border-l-2 border-t-2`} />
      <span className={`${tick} right-2 top-2 border-r-2 border-t-2`} />
      <span className={`${tick} bottom-2 left-2 border-b-2 border-l-2`} />
      <span className={`${tick} bottom-2 right-2 border-b-2 border-r-2`} />
    </div>
  );
}
