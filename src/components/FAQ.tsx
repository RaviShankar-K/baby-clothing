export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    question: "What sizes do you offer?",
    answer:
      "Every outfit comes in six sizes: 0–3M, 3–6M, 6–9M, 9–12M, 12–18M, and 18–24M. If your baby is between sizes, we recommend sizing up — more room to grow, more months of cuteness.",
  },
  {
    question: "How does personalization work?",
    answer:
      "On any product page, add your baby's name, age or month, occasion, and an optional date. We print it on the outfit exactly as you enter it, so double-check the spelling before ordering!",
  },
  {
    question: "Are the prints safe for babies?",
    answer:
      "Yes. We use non-toxic, water-based inks that are tested for baby garments, printed on 100% combed soft cotton. Every outfit is pre-washed before it reaches you.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Personalized outfits are made with love in 2–3 days and delivered in 5–7 days. Ordering for a birthday or ceremony? Order at least 10 days ahead to be safe.",
  },
  {
    question: "Can I return a personalized outfit?",
    answer:
      "Because personalized pieces are made just for your baby, we can't resell them — so returns are only available for defects or printing errors on our side. Non-personalized items can be returned within 7 days, unworn and unwashed.",
  },
  {
    question: "How does the baby photo try-on work?",
    answer:
      "Upload a photo of your baby, pick an outfit, and we generate a preview of your little one wearing it. Your photo is used only to create your preview and is never displayed publicly or shared.",
  },
];

export default function FAQ({ items = defaultFAQs }: { items?: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 open:ring-coral/30"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
            {item.question}
            <span aria-hidden className="text-coral transition-transform group-open:rotate-45 text-xl leading-none">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
