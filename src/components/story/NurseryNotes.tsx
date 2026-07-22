import Reveal from "./Reveal";

const NOTES = [
  {
    quote:
      "The 'It Me' tee arrived with our daughter's name worked into the art. Grandma framed the packaging. The packaging.",
    who: "Meera & Arjun, Bengaluru",
    tape: "var(--butter)",
    rotate: "-2.2deg",
  },
  {
    quote:
      "He wore 'Ate Carpet' to his first birthday and every aunty read it out loud. Best ₹579 of comedy we've ever bought.",
    who: "Priyanka, Pune",
    tape: "var(--sky)",
    rotate: "1.8deg",
  },
  {
    quote:
      "Washed the Standing Ovation tee eleven times. The colours still look freshly painted. The baby, less so.",
    who: "The Fernandes family, Goa",
    tape: "var(--blush)",
    rotate: "-1.4deg",
  },
];

export default function NurseryNotes() {
  return (
    <section id="notes" className="scroll-mt-20 border-b-[2.5px] border-ink">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <Reveal className="text-center">
          <p className="eyebrow text-sage-deep">Nursery notes</p>
          <h2 className="story-display mt-3 text-[clamp(2.2rem,5vw,3.8rem)]">
            Letters from the little library
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {NOTES.map((n, i) => (
            <Reveal key={n.who} className={i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""}>
              <figure
                className="sticker relative h-full px-7 pb-7 pt-9"
                style={{ transform: `rotate(${n.rotate})` }}
              >
                <span
                  className="tape -top-3 left-1/2 -translate-x-1/2"
                  style={{ background: `color-mix(in srgb, ${n.tape} 75%, white)` }}
                  aria-hidden="true"
                />
                <blockquote className="script text-[24px] leading-[1.25] text-ink/85">
                  “{n.quote}”
                </blockquote>
                <figcaption className="story-soft mt-5 text-[14px] text-ink/55">
                  — {n.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
