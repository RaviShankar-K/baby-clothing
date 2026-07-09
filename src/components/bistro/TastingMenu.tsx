import Reveal from "./Reveal";
import { getProduct } from "@/data/products";

/** The product list, plated as a bistro tasting menu with dotted leaders. */

const COURSES: {
  course: string;
  handle: string;
  note: string;
}[] = [
  {
    course: "Amuse-bouche",
    handle: "milk-sommelier",
    note: "A confident nose of 2 a.m. entitlement. Pairs with everything.",
  },
  {
    course: "Entrée",
    handle: "tiny-chef",
    note: "Our signature. Toque sold separately; attitude included.",
  },
  {
    course: "Plat principal",
    handle: "master-of-mess",
    note: "Deconstructed dinner, floor-plated. A bold, expressive course.",
  },
  {
    course: "Fromage",
    handle: "snack-boss",
    note: "Assertive. Negotiates exclusively in crackers.",
  },
  {
    course: "Dessert",
    handle: "first-birthday",
    note: "The cake-smash tasting. Limited seating: one per lifetime.",
  },
  {
    course: "Digestif",
    handle: "custom-name-tee",
    note: "Made to order with the guest of honour's name. Chef's kiss.",
  },
];

export default function TastingMenu() {
  return (
    <section id="menu" className="scroll-mt-20 border-b-2 border-choc bg-plate">
      <div className="scallop" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-14 sm:px-8 lg:pb-28 lg:pt-20">
        <Reveal className="text-center">
          <p className="tag text-tomato">Menu dégustation</p>
          <h2 className="menu-display-black mt-4 text-[clamp(2.6rem,5.5vw,4.6rem)]">
            The Tasting Menu
          </h2>
          <p className="menu-italic mt-4 text-xl text-choc/60">
            six courses · sizes 0–24 months · gratuity is a giggle
          </p>
        </Reveal>

        <div className="mt-14 space-y-9">
          {COURSES.map((c, i) => {
            const product = getProduct(c.handle);
            if (!product) return null;
            return (
              <Reveal key={c.handle} className={i % 2 ? "reveal-late" : ""}>
                <div className="group">
                  <p className="tag text-[10px] text-olive">{c.course}</p>
                  <div className="mt-1.5 flex items-baseline">
                    <h3 className="menu-display text-2xl transition-colors group-hover:text-tomato sm:text-[1.7rem]">
                      {product.title}
                    </h3>
                    <span className="leader" aria-hidden="true" />
                    <span className="menu-display shrink-0 text-2xl sm:text-[1.7rem]">
                      ₹{product.price}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-[15px] text-choc/60">
                    {c.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <p className="tag text-choc/50">
            All courses 100% combed cotton · allergen-free inks · no scratchy
            tags, ever
          </p>
        </Reveal>
      </div>
    </section>
  );
}
