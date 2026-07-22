/**
 * Once Upon a Onesie — the illustrated catalog.
 * Every design is a hand-illustrated "page" printed on a tee.
 */

export interface Design {
  handle: string;
  title: string;
  caption: string;
  src: string;
  /** intrinsic aspect ratio of the artwork (w/h) */
  ratio: number;
  price: number; // INR
  chapter: "6 months" | "9 months" | "one year" | "any age";
  accent: "sage" | "apricot" | "coral" | "butter" | "sky" | "blush";
}

export const designs: Design[] = [
  {
    handle: "six-months",
    title: "Six Months In",
    caption: "Views: strong. Vocabulary: limited. Volume: increasing.",
    src: "/designs/six-months.jpg",
    ratio: 1,
    price: 549,
    chapter: "6 months",
    accent: "sage",
  },
  {
    handle: "tiny-ceo",
    title: "Chief Everything Officer",
    caption: "Cuteness up 600%. Six months of data. No further questions.",
    src: "/designs/tiny-ceo.jpg",
    ratio: 1,
    price: 579,
    chapter: "6 months",
    accent: "butter",
  },
  {
    handle: "nine-months",
    title: "The Standing Ovation",
    caption: "Gave my first standing ovation — to myself. Still working on the standing.",
    src: "/designs/nine-months.jpg",
    ratio: 1,
    price: 549,
    chapter: "9 months",
    accent: "coral",
  },
  {
    handle: "it-me-one",
    title: "It Me. I'm One Now.",
    caption: "The birthday announcement, straight from the source.",
    src: "/designs/it-me-one.jpg",
    ratio: 1,
    price: 599,
    chapter: "one year",
    accent: "apricot",
  },
  {
    handle: "number-one",
    title: "Officially Number One",
    caption: "For outstanding achievement in being a baby.",
    src: "/designs/number-one.jpg",
    ratio: 1,
    price: 599,
    chapter: "one year",
    accent: "butter",
  },
  {
    handle: "number-one-honest",
    title: "Number One (Honest Edition)",
    caption: "But mostly just pooped and screamed.",
    src: "/designs/number-one-honest.jpg",
    ratio: 1,
    price: 579,
    chapter: "one year",
    accent: "sky",
  },
  {
    handle: "alexa-cake",
    title: "Alexa, Order Cake",
    caption: "I've turned one. I was promised cake.",
    src: "/designs/alexa-cake.jpg",
    ratio: 1,
    price: 599,
    chapter: "one year",
    accent: "coral",
  },
  {
    handle: "ate-carpet",
    title: "Ate Carpet",
    caption: "Rejected 14 meals today. The carpet, however…",
    src: "/designs/ate-carpet.jpg",
    ratio: 0.8,
    price: 579,
    chapter: "one year",
    accent: "sage",
  },
  {
    handle: "human-management",
    title: "Human Management Award",
    caption: "One full year of supervising adults.",
    src: "/designs/human-management.jpg",
    ratio: 1,
    price: 579,
    chapter: "one year",
    accent: "butter",
  },
  {
    handle: "thank-myself",
    title: "The Acceptance Speech",
    caption: "I'd like to thank myself for putting up with all of you.",
    src: "/designs/thank-myself.jpg",
    ratio: 1,
    price: 579,
    chapter: "one year",
    accent: "apricot",
  },
  {
    handle: "wishlist",
    title: "The Birthday Wishlist",
    caption: "Faster snacks, unlimited bubbles, whatever the dog is having.",
    src: "/designs/wishlist.jpg",
    ratio: 1,
    price: 579,
    chapter: "one year",
    accent: "sky",
  },
  {
    handle: "ice-cream",
    title: "Not Prepared For This",
    caption: "First ice cream. Worldview permanently altered.",
    src: "/designs/ice-cream.jpg",
    ratio: 1,
    price: 549,
    chapter: "any age",
    accent: "blush",
  },
];

/** The wide birthday portrait used in the hero balloon. */
export const heroArt = {
  src: "/designs/it-me-wide.jpg",
  alt: "Watercolor illustration of a surprised baby beside a single birthday cupcake, captioned 'It me. I'm one now.'",
  ratio: 1.5,
};

export function getDesign(handle: string): Design | undefined {
  return designs.find((d) => d.handle === handle);
}
