const badges = [
  { emoji: "🧸", title: "Soft Cotton", text: "Pre-washed, breathable, gentle on new skin" },
  { emoji: "🖍️", title: "Baby-Safe Print", text: "Non-toxic, water-based inks tested for babies" },
  { emoji: "💌", title: "Personalized with Love", text: "Each piece is made to order, just for your baby" },
];

export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-2" aria-label="Product guarantees">
        {badges.map((b) => (
          <li
            key={b.title}
            className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-ink"
          >
            <span aria-hidden>{b.emoji}</span> {b.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-3" aria-label="Why parents trust Tinyverse">
      {badges.map((b) => (
        <li key={b.title} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-ink/5">
          <span aria-hidden className="text-3xl">{b.emoji}</span>
          <h3 className="mt-2 font-bold">{b.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{b.text}</p>
        </li>
      ))}
    </ul>
  );
}
