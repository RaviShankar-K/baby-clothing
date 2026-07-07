/**
 * Tinyverse product catalog.
 *
 * This is the single source of truth for sample product data. The shape is
 * intentionally close to Shopify's product model (handle, title, options,
 * variants-by-size/color, collection membership) so it can later be replaced
 * by the Shopify Storefront API or Hydrogen queries with minimal refactoring.
 *
 * To swap in real product images: set `images` on a product to an array of
 * URLs (Shopify CDN, AI-generated mockups, or local /public files). When
 * `images` is empty, the UI renders a generated <ProductMockup /> placeholder.
 */

export const SIZES = ["0–3M", "3–6M", "6–9M", "9–12M", "12–18M", "18–24M"] as const;
export type Size = (typeof SIZES)[number];

export interface ColorOption {
  name: string;
  hex: string;
}

export interface PersonalizationFields {
  babyName?: boolean;
  ageMonth?: boolean;
  occasion?: boolean;
  date?: boolean;
}

export interface ProductMockupSpec {
  /** Garment fill color for the generated mockup illustration */
  shirt: string;
  /** Accent color used on the printed design */
  accent: string;
  /** Short text printed on the garment in the mockup */
  print: string;
  /** Decorative emoji shown above the print */
  emoji: string;
  /** Soft background wash behind the baby model */
  bg: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  collection: CollectionHandle;
  price: number; // in INR
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  sizes: readonly Size[];
  colors: ColorOption[];
  personalization: PersonalizationFields;
  mockup: ProductMockupSpec;
  /** Real image URLs — replaces the generated mockup when present */
  images: string[];
  /** Stock photo of a real baby model the design gets overlaid on */
  modelPhotoId: ModelPhotoId;
  bestseller?: boolean;
  fabric: string;
  care: string[];
  deliveryEstimate: string;
}

/** Where the design print lands on a model photo, in % of the square image */
export interface PrintPlacement {
  left: number;
  top: number;
  width: number;
  rotate: number;
}

export interface ModelPhoto {
  id: string;
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
  print: PrintPlacement;
}

export type ModelPhotoId = "sitting" | "lights" | "newborn";

/**
 * Licensed stock photos of baby models (Pexels license / public domain —
 * see public/babies/CREDITS.md). Product designs are overlaid on the chest
 * via the PrintPlacement config. Add entries here to grow the model pool,
 * then point products at them via `modelPhotoId`.
 */
export const modelPhotos: Record<ModelPhotoId, ModelPhoto> = {
  sitting: {
    id: "sitting",
    src: "/babies/model-sitting.jpg",
    alt: "Smiling baby model sitting in a plain white shirt",
    credit: "Bave Pictures via Pexels",
    creditUrl: "https://www.pexels.com/photo/17152783/",
    print: { left: 29, top: 55, width: 27, rotate: -3 },
  },
  lights: {
    id: "lights",
    src: "/babies/model-lights.jpg",
    alt: "Baby model in a white onesie playing with fairy lights",
    credit: "Helena Lopes via Pexels",
    creditUrl: "https://www.pexels.com/photo/27086930/",
    print: { left: 33, top: 46, width: 25, rotate: -6 },
  },
  newborn: {
    id: "newborn",
    src: "/babies/model-newborn.jpg",
    alt: "Newborn baby model lying in a soft white sleeper",
    credit: "Public Domain Pictures via Pexels",
    creditUrl: "https://www.pexels.com/photo/adorable-baby-beautiful-boy-41000/",
    print: { left: 28, top: 62, width: 26, rotate: 14 },
  },
};

export function getModelPhoto(product: Product): ModelPhoto {
  return modelPhotos[product.modelPhotoId];
}

export type CollectionHandle =
  | "milestones"
  | "baby-scientist"
  | "it-baby"
  | "chef-baby"
  | "custom-name";

export interface Collection {
  handle: CollectionHandle;
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  bg: string;
  accent: string;
}

export const collections: Collection[] = [
  {
    handle: "milestones",
    title: "Milestone Collection",
    tagline: "Every month is a big deal",
    description:
      "From the very first month to officially two — soft, photo-ready outfits that turn every milestone into a keepsake moment.",
    emoji: "🌙",
    bg: "#FBE9E7",
    accent: "#E58A7E",
  },
  {
    handle: "baby-scientist",
    title: "Baby Scientist",
    tagline: "Curiosity in a onesie",
    description:
      "For tiny explorers who test gravity daily. Playful lab-inspired designs for babies with big questions.",
    emoji: "🔬",
    bg: "#E3F2EC",
    accent: "#5FA98D",
  },
  {
    handle: "it-baby",
    title: "IT Baby",
    tagline: "The newest release in your family",
    description:
      "Adorable tech-themed tees for the little ones of engineers, coders, and anyone who debugs at 3am anyway.",
    emoji: "💻",
    bg: "#E3EDF9",
    accent: "#6D9DC9",
  },
  {
    handle: "chef-baby",
    title: "Chef Baby",
    tagline: "Head of the milk kitchen",
    description:
      "For the tiny gourmand who takes milk very seriously. Deliciously cute kitchen-themed outfits.",
    emoji: "🍼",
    bg: "#FDF3E3",
    accent: "#D9A05B",
  },
  {
    handle: "custom-name",
    title: "Custom Name Tees",
    tagline: "Made just for your little one",
    description:
      "Add your baby's name, age, birthday, and a theme — we turn it into a one-of-a-kind keepsake outfit.",
    emoji: "✨",
    bg: "#EFE9F8",
    accent: "#9B85C4",
  },
];

const defaultColors: ColorOption[] = [
  { name: "Cloud White", hex: "#FDFBF7" },
  { name: "Blush Pink", hex: "#F6D8D3" },
  { name: "Sky Blue", hex: "#CFE3F2" },
  { name: "Soft Mint", hex: "#D5EDE2" },
];

const fabric =
  "100% combed ring-spun soft cotton, 180 GSM. Pre-washed for extra softness and zero shrink surprises. Nickel-free snap buttons on rompers.";

const care = [
  "Machine wash cold with gentle detergent",
  "Wash inside-out to protect the print",
  "Tumble dry low or line dry in shade",
  "Do not iron directly on the print",
];

const deliveryEstimate = "Made with love in 2–3 days · Delivered in 5–7 days";

function product(
  p: Omit<Product, "sizes" | "fabric" | "care" | "deliveryEstimate" | "images" | "modelPhotoId"> &
    Partial<Pick<Product, "sizes" | "fabric" | "care" | "deliveryEstimate" | "images" | "modelPhotoId">>
): Product {
  return {
    sizes: SIZES,
    fabric,
    care,
    deliveryEstimate,
    images: [],
    modelPhotoId: "sitting",
    ...p,
  };
}

export const products: Product[] = [
  // ——— Milestone Collection ———
  product({
    id: "ms-01",
    handle: "one-month-old",
    modelPhotoId: "newborn",
    title: "1 Month Old",
    collection: "milestones",
    price: 699,
    shortDescription: "Thirty days of tiny miracles, one adorable outfit.",
    description:
      "Your baby's very first monthly photo deserves something special. Ultra-soft, photo-ready, and personalized with your little one's name — because month one only happens once.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#E58A7E", print: "1 MONTH OLD", emoji: "🌙", bg: "#FBE9E7" },
    bestseller: true,
  }),
  product({
    id: "ms-02",
    handle: "two-months-old",
    modelPhotoId: "lights",
    title: "2 Months Old",
    collection: "milestones",
    price: 699,
    shortDescription: "Two months of smiles, snuggles, and midnight cuddles.",
    description:
      "Celebrate month two in the softest way possible. A gentle, breathable outfit made for wriggly photoshoots and even wrigglier babies.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#F6D8D3", accent: "#C96F63", print: "2 MONTHS OLD", emoji: "⭐", bg: "#FBE9E7" },
  }),
  product({
    id: "ms-03",
    handle: "three-months-old",
    title: "3 Months Old",
    collection: "milestones",
    price: 699,
    shortDescription: "A quarter of a year of pure cuteness.",
    description:
      "Three months in and already stealing hearts. This milestone tee keeps your baby comfy through every giggle and grab of the camera strap.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#CFE3F2", accent: "#5E88AE", print: "3 MONTHS OLD", emoji: "🌟", bg: "#FBE9E7" },
  }),
  product({
    id: "ms-04",
    handle: "half-way-to-one",
    title: "Half Way to One",
    collection: "milestones",
    price: 749,
    shortDescription: "Perfect for your baby's 6-month photoshoot.",
    description:
      "Six months of firsts — first laughs, first rolls, maybe a first tooth. Mark the halfway point to one with an outfit as memorable as the milestone.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#9B85C4", print: "HALF WAY TO ONE", emoji: "🎈", bg: "#FBE9E7" },
    bestseller: true,
  }),
  product({
    id: "ms-05",
    handle: "im-one-now",
    title: "I'm One Now",
    collection: "milestones",
    price: 799,
    shortDescription: "One whole year of your favorite tiny human.",
    description:
      "The big O-N-E. Cake smash approved, camera ready, and soft enough for the birthday nap that will definitely happen mid-party.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#D5EDE2", accent: "#4E8F73", print: "I'M ONE NOW", emoji: "🎂", bg: "#FBE9E7" },
    bestseller: true,
  }),
  product({
    id: "ms-06",
    handle: "officially-two",
    title: "Officially Two",
    collection: "milestones",
    price: 799,
    shortDescription: "Two years old and twice the personality.",
    description:
      "Officially two, officially unstoppable. A birthday tee built for toddler adventures — and sturdy enough to survive the frosting.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#FDF3E3", accent: "#D9A05B", print: "OFFICIALLY TWO", emoji: "🎉", bg: "#FBE9E7" },
  }),
  product({
    id: "ms-07",
    handle: "first-diwali",
    modelPhotoId: "lights",
    title: "My First Diwali",
    collection: "milestones",
    price: 849,
    shortDescription: "Their very first festival of lights.",
    description:
      "A first Diwali happens only once. Dress your little diya in festive softness — gentle on skin, glowing in every photo with the family.",
    personalization: { babyName: true, date: true },
    colors: [
      { name: "Cloud White", hex: "#FDFBF7" },
      { name: "Festive Marigold", hex: "#F5D9A8" },
      { name: "Blush Pink", hex: "#F6D8D3" },
    ],
    mockup: { shirt: "#F5D9A8", accent: "#B8763B", print: "MY FIRST DIWALI", emoji: "🪔", bg: "#FBE9E7" },
    bestseller: true,
  }),
  product({
    id: "ms-08",
    handle: "first-sankranti",
    modelPhotoId: "lights",
    title: "My First Sankranti",
    collection: "milestones",
    price: 849,
    shortDescription: "Kites, sweets, and their very first Sankranti.",
    description:
      "Celebrate your baby's first harvest festival in an outfit as warm as the January sun. Soft cotton for festive cuddles and family photos.",
    personalization: { babyName: true, date: true },
    colors: [
      { name: "Cloud White", hex: "#FDFBF7" },
      { name: "Sky Blue", hex: "#CFE3F2" },
      { name: "Festive Marigold", hex: "#F5D9A8" },
    ],
    mockup: { shirt: "#CFE3F2", accent: "#5E88AE", print: "MY FIRST SANKRANTI", emoji: "🪁", bg: "#FBE9E7" },
  }),
  product({
    id: "ms-09",
    handle: "first-birthday",
    title: "First Birthday Outfit",
    collection: "milestones",
    price: 899,
    shortDescription: "The outfit for the biggest little birthday ever.",
    description:
      "A premium keepsake outfit for the party of the year. Personalized with name and date — made to be photographed, kept, and remembered.",
    personalization: { babyName: true, date: true, occasion: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#E58A7E", print: "FIRST BIRTHDAY", emoji: "🎁", bg: "#FBE9E7" },
    bestseller: true,
  }),
  product({
    id: "ms-10",
    handle: "naming-ceremony",
    modelPhotoId: "newborn",
    title: "Naming Ceremony Outfit",
    collection: "milestones",
    price: 899,
    shortDescription: "For the day they officially get their name.",
    description:
      "The day your baby's name is spoken for the world to hear. A gentle, elegant outfit personalized with that brand-new name — a keepsake from day one.",
    personalization: { babyName: true, date: true, occasion: true },
    colors: defaultColors,
    mockup: { shirt: "#EFE9F8", accent: "#7C67A8", print: "MY NAMING DAY", emoji: "🕊️", bg: "#FBE9E7" },
  }),

  // ——— Baby Scientist ———
  product({
    id: "sc-01",
    handle: "tiny-scientist",
    title: "Tiny Scientist",
    collection: "baby-scientist",
    price: 749,
    shortDescription: "Hypothesis: this is the cutest baby ever.",
    description:
      "Conclusion confirmed. For little researchers who study ceiling fans and peer-review every meal. Soft cotton certified for all experiments.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#D5EDE2", accent: "#4E8F73", print: "TINY SCIENTIST", emoji: "🔬", bg: "#E3F2EC" },
    bestseller: true,
  }),
  product({
    id: "sc-02",
    handle: "future-inventor",
    title: "Future Inventor",
    collection: "baby-scientist",
    price: 749,
    shortDescription: "Currently inventing new ways to avoid naps.",
    description:
      "Every great inventor starts somewhere — usually by taking things apart. A playful tee for the baby whose curiosity has no off switch.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#5FA98D", print: "FUTURE INVENTOR", emoji: "💡", bg: "#E3F2EC" },
  }),
  product({
    id: "sc-03",
    handle: "lab-baby",
    title: "Lab Baby",
    collection: "baby-scientist",
    price: 749,
    shortDescription: "Raised under strict scientific supervision (and cuddles).",
    description:
      "Fresh out of the family lab. For babies of scientists, doctors, and researchers — the most peer-reviewed cuddle in the building.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#CFE3F2", accent: "#5E88AE", print: "LAB BABY", emoji: "🧪", bg: "#E3F2EC" },
  }),
  product({
    id: "sc-04",
    handle: "experiment-loading",
    title: "Experiment Loading…",
    collection: "baby-scientist",
    price: 749,
    shortDescription: "Results expected in 18 years.",
    description:
      "The longest-running experiment in your household. Progress: adorable. A soft, giggle-tested tee for your little work in progress.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#F6D8D3", accent: "#C96F63", print: "EXPERIMENT LOADING…", emoji: "⚗️", bg: "#E3F2EC" },
  }),

  // ——— IT Baby ———
  product({
    id: "it-01",
    handle: "hello-world-im-new-here",
    modelPhotoId: "newborn",
    title: "Hello World, I'm New Here",
    collection: "it-baby",
    price: 749,
    shortDescription: "A soft little outfit for the newest release in your family.",
    description:
      "Version 1.0 of your favorite human just shipped. The perfect welcome-home outfit for babies of developers — no bugs, only features.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#6D9DC9", print: "HELLO WORLD", emoji: "👶", bg: "#E3EDF9" },
    bestseller: true,
  }),
  product({
    id: "it-02",
    handle: "debugging-since-birth",
    title: "Debugging Since Birth",
    collection: "it-baby",
    price: 749,
    shortDescription: "Cries at runtime. Fixed with milk.",
    description:
      "Some issues can only be resolved with a cuddle and a bottle. A playful tee for the tiny troubleshooter keeping the whole family up at night.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#CFE3F2", accent: "#4A7BA6", print: "DEBUGGING SINCE BIRTH", emoji: "🐛", bg: "#E3EDF9" },
  }),
  product({
    id: "it-03",
    handle: "future-coder",
    title: "Future Coder",
    collection: "it-baby",
    price: 749,
    shortDescription: "Already great at repeating loops: eat, sleep, cry.",
    description:
      "while(baby) { love++ }. For the little one destined to out-code their parents — starting with mastering the keyboard smash.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#D5EDE2", accent: "#4E8F73", print: "FUTURE CODER", emoji: "⌨️", bg: "#E3EDF9" },
  }),
  product({
    id: "it-04",
    handle: "tiny-techie",
    title: "Tiny Techie",
    collection: "it-baby",
    price: 749,
    shortDescription: "Small hands, big processing power.",
    description:
      "The cutest gadget in the house doesn't need charging — just cuddles. A soft everyday tee for your resident tiny techie.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#F6D8D3", accent: "#C96F63", print: "TINY TECHIE", emoji: "🤖", bg: "#E3EDF9" },
  }),
  product({
    id: "it-05",
    handle: "alexa-order-cake",
    title: "Alexa, Order Cake — I've Turned One",
    collection: "it-baby",
    price: 849,
    shortDescription: "For the little boss whose first birthday command is cake.",
    description:
      "They said their first words, and it was a voice command. An adorable illustrated tee for the one-year-old who was promised cake — and expects same-day delivery.",
    personalization: { babyName: true, date: true },
    colors: defaultColors,
    images: ["/products/alexa-order-cake.jpg"],
    mockup: { shirt: "#FDFBF7", accent: "#6D9DC9", print: "ALEXA, ORDER CAKE", emoji: "🎂", bg: "#E3EDF9" },
    bestseller: true,
  }),

  // ——— Chef Baby ———
  product({
    id: "ch-01",
    handle: "tiny-chef",
    title: "Tiny Chef",
    collection: "chef-baby",
    price: 749,
    shortDescription: "Head chef of the purée department.",
    description:
      "Michelin stars pending. For the little gourmet who insists on tasting everything twice — floor samples included.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#D9A05B", print: "TINY CHEF", emoji: "👨‍🍳", bg: "#FDF3E3" },
    bestseller: true,
  }),
  product({
    id: "ch-02",
    handle: "milk-sommelier",
    title: "Milk Sommelier",
    collection: "chef-baby",
    price: 749,
    shortDescription: "Notes of warmth, comfort, and 2am service.",
    description:
      "A refined palate that accepts exactly one vintage: warm milk, served immediately. The most sophisticated critic you'll ever feed.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#FDF3E3", accent: "#B8763B", print: "MILK SOMMELIER", emoji: "🍼", bg: "#FDF3E3" },
  }),
  product({
    id: "ch-03",
    handle: "snack-boss",
    title: "Snack Boss",
    collection: "chef-baby",
    price: 749,
    shortDescription: "All snacks report directly to me.",
    description:
      "Negotiates exclusively in giggles, pays in crumbs. A soft tee for the tiny executive running your kitchen from a high chair.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#D5EDE2", accent: "#4E8F73", print: "SNACK BOSS", emoji: "🍪", bg: "#FDF3E3" },
  }),
  product({
    id: "ch-04",
    handle: "master-of-mess",
    title: "Master of Mess",
    collection: "chef-baby",
    price: 749,
    shortDescription: "Every meal is modern art.",
    description:
      "Some call it dinner; they call it a canvas. Machine-washable, mess-approved, and cuter with every splatter.",
    personalization: { babyName: true },
    colors: defaultColors,
    mockup: { shirt: "#F6D8D3", accent: "#C96F63", print: "MASTER OF MESS", emoji: "🎨", bg: "#FDF3E3" },
  }),

  // ——— Custom Name ———
  product({
    id: "cn-01",
    handle: "custom-name-tee",
    title: "Custom Name Tee",
    collection: "custom-name",
    price: 849,
    shortDescription: "Their name, front and center, forever adorable.",
    description:
      "The classic keepsake: your baby's name in warm, gentle lettering on premium soft cotton. Choose a theme to make it entirely theirs.",
    personalization: { babyName: true, ageMonth: true, occasion: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#FDFBF7", accent: "#9B85C4", print: "YOUR BABY'S NAME", emoji: "✨", bg: "#EFE9F8" },
    bestseller: true,
  }),
  product({
    id: "cn-02",
    handle: "custom-birthday-tee",
    title: "Custom Birthday Tee",
    collection: "custom-name",
    price: 899,
    shortDescription: "Name, age, and date — the full birthday special.",
    description:
      "Everything about their big day on one adorable tee: name, age, and birthday date, wrapped in a theme you choose. Gift-ready from the moment it arrives.",
    personalization: { babyName: true, ageMonth: true, occasion: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#F6D8D3", accent: "#C96F63", print: "NAME · AGE · DATE", emoji: "🎂", bg: "#EFE9F8" },
  }),
  product({
    id: "cn-03",
    handle: "custom-theme-romper",
    title: "Custom Theme Romper",
    collection: "custom-name",
    price: 949,
    shortDescription: "Pick a theme, add a name, melt some hearts.",
    description:
      "Scientist, coder, chef, or classic cute — pick the theme, add your baby's details, and we craft a one-of-one romper made just for them.",
    personalization: { babyName: true, ageMonth: true, occasion: true, date: true },
    colors: defaultColors,
    mockup: { shirt: "#CFE3F2", accent: "#5E88AE", print: "MADE FOR ME", emoji: "🧸", bg: "#EFE9F8" },
  }),
];

export function getCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getProductsByCollection(handle: string): Product[] {
  return products.filter((p) => p.collection === handle);
}

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
