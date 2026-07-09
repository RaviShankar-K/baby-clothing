import Reveal from "./Reveal";

const REVIEWS = [
  {
    stars: "★★★",
    quote:
      "The Tiny Chef tee held its structure through three purée services and a yogurt incident. Faultless technique. A destination garment.",
    who: "The Guide Bébélin — Bengaluru edition",
  },
  {
    stars: "★★★",
    quote:
      "Milk Sommelier arrived personalized with our daughter's name and an unimpeachable sense of occasion. The snap buttons? Service at its finest.",
    who: "A. Grandmother, dining critic, Hyderabad",
  },
  {
    stars: "★★★",
    quote:
      "We ordered the First Birthday tasting for our son. He wore it, he smashed cake on it, it washed clean. Encore requested for the sibling.",
    who: "Table 4 (party of three), Pune",
  },
];

export default function ChefReviews() {
  return (
    <section id="reviews" className="scroll-mt-20 border-b-2 border-choc bg-choc text-butter">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="tag text-saffron">The critics have eaten</p>
          <h2 className="menu-display-black mt-4 text-[clamp(2.6rem,5.5vw,4.6rem)]">
            Rave Reviews
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={r.who} className="rounded-2xl border-2 border-butter/25 p-8">
              <Reveal className={i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""}>
                <p className="text-2xl tracking-[0.35em] text-saffron" aria-label={`Three stars`}>
                  {r.stars}
                </p>
                <blockquote className="menu-display mt-6 text-[1.45rem] leading-snug text-butter/95">
                  “{r.quote}”
                </blockquote>
                <p className="tag mt-7 text-butter/50">{r.who}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
