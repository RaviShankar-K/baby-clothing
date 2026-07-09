import Reveal from "./Reveal";
import { getProduct } from "@/data/products";

/** Milestone tees shipped as semantic-versioned releases. */

const RELEASES: {
  version: string;
  handle: string;
  tag?: string;
  notes: string[];
}[] = [
  {
    version: "v0.1.0",
    handle: "one-month-old",
    notes: ["First stable smile shipped", "Sleep scheduler still experimental"],
  },
  {
    version: "v0.2.0",
    handle: "two-months-old",
    notes: ["Added cooing API", "Fixed: grip now holds fingers reliably"],
  },
  {
    version: "v0.3.0",
    handle: "three-months-old",
    notes: ["Head-tracking module stable", "Laughter subsystem in beta"],
  },
  {
    version: "v0.6.0",
    handle: "half-way-to-one",
    tag: "LTS",
    notes: ["Rolling release (literally)", "Solid-food ingestion pipeline enabled"],
  },
  {
    version: "v1.0.0",
    handle: "im-one-now",
    tag: "MAJOR",
    notes: [
      "BREAKING: subject now walks",
      "Speech API returns first words",
      "Cake-smash module ships enabled by default",
    ],
  },
  {
    version: "v2.0.0",
    handle: "officially-two",
    tag: "MAJOR",
    notes: [
      "BREAKING: the word 'no' implemented everywhere",
      "Running performance doubled; supervision requirements doubled",
    ],
  },
];

export default function Changelog() {
  return (
    <section id="releases" className="scroll-mt-16 border-b border-edge">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <p className="term-label">$ cat CHANGELOG.md</p>
          <h2 className="pixel glow mt-4 text-[clamp(2.6rem,6vw,4.4rem)] leading-none">
            Milestone releases
          </h2>
          <p className="mt-4 max-w-lg text-[14px] text-fg-dim">
            Every stage of the tiny human, shipped as a tee. Semantic
            versioning strictly observed: minor versions add features,
            major versions break your furniture.
          </p>
        </Reveal>

        <div className="mt-12 border-l border-edge pl-6 sm:pl-9">
          {RELEASES.map((r, i) => {
            const product = getProduct(r.handle);
            if (!product) return null;
            return (
              <Reveal key={r.version} className={`relative pb-10 ${i % 2 ? "reveal-late" : ""}`}>
                {/* commit dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full border border-phos bg-crt sm:-left-[42px]"
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="glow text-xl font-bold">{r.version}</h3>
                  <span className="text-[15px] text-fg">— {product.title}</span>
                  {r.tag && (
                    <span
                      className={`border px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] ${
                        r.tag === "MAJOR"
                          ? "border-magenta text-magenta"
                          : "border-amber text-amber"
                      }`}
                    >
                      {r.tag}
                    </span>
                  )}
                  <span className="ml-auto text-[14px] text-fg-dim">₹{product.price}</span>
                </div>
                <ul className="mt-2.5 space-y-1 text-[13.5px] text-fg-dim">
                  {r.notes.map((n) => (
                    <li key={n}>
                      <span className="mr-2 text-phos-dim">+</span>
                      {n.startsWith("BREAKING") ? (
                        <>
                          <span className="font-bold text-magenta">BREAKING</span>
                          {n.slice(8)}
                        </>
                      ) : (
                        n
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href="#deploy"
                  className="mt-3 inline-block text-[12.5px] text-cyber underline decoration-dotted underline-offset-4 hover:text-phos"
                >
                  git checkout {r.version} → add to cart
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
