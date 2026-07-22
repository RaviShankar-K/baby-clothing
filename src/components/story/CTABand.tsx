import Reveal from "./Reveal";

/** The closing page — balloons drift upward behind a big warm invitation. */
export default function CTABand() {
  return (
    <section
      id="begin"
      className="relative scroll-mt-20 overflow-hidden border-b-[2.5px] border-ink"
      style={{
        background:
          "linear-gradient(180deg, var(--page) 0%, var(--sky) 90%)",
      }}
    >
      {/* rising balloons */}
      {[
        { left: "8%", color: "var(--coral)", delay: "0s", dur: "16s", size: 54 },
        { left: "22%", color: "var(--butter)", delay: "5s", dur: "20s", size: 40 },
        { left: "72%", color: "var(--sage)", delay: "2.5s", dur: "18s", size: 48 },
        { left: "88%", color: "var(--apricot)", delay: "8s", dur: "22s", size: 38 },
      ].map((b, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-120px]"
          style={{
            left: b.left,
            animation: `rise-away ${b.dur} linear ${b.delay} infinite`,
            ["--r" as string]: i % 2 ? "6deg" : "-5deg",
          }}
        >
          <BalloonMini color={b.color} size={b.size} />
        </div>
      ))}

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <Reveal>
          <p className="script text-[clamp(1.5rem,3vw,2rem)] text-sage-deep">
            ready when you are, tiny hero
          </p>
          <h2 className="story-display mt-3 text-[clamp(2.6rem,6.5vw,5rem)]">
            Begin chapter one<span className="text-coral">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16.5px] leading-relaxed text-ink/70">
            Personalized storybook tees from ₹549, printed to order and posted
            anywhere in India. The milestones happen anyway — you might as
            well dress for them.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#collection"
              className="pop-hover story-display rounded-full border-[2.5px] border-ink bg-coral px-8 py-4 text-[17px] text-white shadow-[0_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Choose their page
            </a>
            <a
              href="#chapters"
              className="pop-hover story-display rounded-full border-[2.5px] border-ink bg-white px-8 py-4 text-[17px] text-ink shadow-[0_5px_0_0_var(--ink-15)] transition-transform hover:-translate-y-0.5"
            >
              Re-read the chapters
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BalloonMini({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 40 64">
      <path
        d="M20 2C10 2 3 10 3 20c0 9 8 16 13 20h8c5-4 13-11 13-20C37 10 30 2 20 2Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.9"
      />
      <path d="M17 40h6l-2 4h-2Z" fill={color} stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M20 44c-3 6 3 10 0 18" fill="none" stroke="var(--ink)" strokeWidth="1.6" opacity="0.6" />
      <ellipse cx="13" cy="14" rx="4.5" ry="7" fill="#fff" opacity="0.35" transform="rotate(-18 13 14)" />
    </svg>
  );
}
