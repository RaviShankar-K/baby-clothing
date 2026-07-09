const SPECIALS = [
  "Today's special: strained peas, worn proudly",
  "Milk pairing included with every order",
  "Chef's table now seating parties of one (small)",
  "86'd: itchy tags, scratchy seams, sad beige",
  "Personalization printed to order — allow 2–4 days",
  "Dress code: bib optional, cuteness mandatory",
];

export default function SpecialsTicker() {
  return (
    <div className="marquee overflow-hidden border-b-2 border-choc bg-olive py-3.5 text-butter">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {SPECIALS.map((s) => (
              <span key={s} className="tag flex items-center px-7 text-butter/90">
                <span className="mr-7 text-saffron">✦</span>
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
