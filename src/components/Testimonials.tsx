const testimonials = [
  {
    name: "Priya S.",
    role: "Mom of a 7-month-old",
    quote:
      "The 'Half Way to One' outfit made our 6-month photoshoot perfect. The cotton is so soft I ordered two more sizes for later!",
    emoji: "🌸",
  },
  {
    name: "Arjun & Meera",
    role: "First-time parents",
    quote:
      "We got the naming ceremony outfit with our son's name printed. Grandparents cried. Ten out of ten.",
    emoji: "🕊️",
  },
  {
    name: "Kavya R.",
    role: "Aunt & professional gifter",
    quote:
      "'Hello World, I'm New Here' for my sister's baby — the whole family of engineers lost it. Best baby gift I've ever given.",
    emoji: "💻",
  },
];

export default function Testimonials() {
  return (
    <ul className="grid gap-4 md:grid-cols-3" aria-label="Parent reviews">
      {testimonials.map((t) => (
        <li key={t.name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
          <span aria-hidden className="text-2xl">{t.emoji}</span>
          <p className="mt-3 text-sm leading-relaxed text-ink">“{t.quote}”</p>
          <p className="mt-4 text-sm font-bold">{t.name}</p>
          <p className="text-xs text-ink-soft">{t.role}</p>
          <p className="mt-1 text-coral" aria-label="5 out of 5 stars">★★★★★</p>
        </li>
      ))}
    </ul>
  );
}
