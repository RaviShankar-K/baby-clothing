import WordRotator from "./WordRotator";

export default function HeroBistro() {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-choc">
      {/* floating pantry doodles */}
      <Doodle className="left-[4%] top-24 hidden lg:block" r="-12deg" delay="0s" kind="pea" />
      <Doodle className="right-[6%] top-32 hidden lg:block" r="9deg" delay="1.2s" kind="spoon" />
      <Doodle className="left-[8%] bottom-24 hidden lg:block" r="6deg" delay="0.6s" kind="carrot" />
      <Doodle className="right-[12%] bottom-16 hidden lg:block" r="-7deg" delay="1.8s" kind="egg" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[6fr_5fr] lg:gap-6 lg:pb-28 lg:pt-24">
        {/* ——— left: the pitch ——— */}
        <div>
          <p className="tag flex items-center gap-3 text-choc/60">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-tomato" />
            Est. at 3 a.m. · during a night feed
          </p>

          <h1 className="menu-display mt-7 text-[clamp(3.2rem,7.6vw,6.6rem)]">
            Tonight we&apos;re
            <br />
            serving <WordRotator />
          </h1>

          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-choc/70">
            Sous Chef Society dresses the smallest people in the kitchen —
            chef-baby tees, milk-sommelier onesies, and milestone tasting
            menus. Personalized, pre-washed, plated with love.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="tag rounded-full border-2 border-choc bg-choc px-7 py-4 text-butter transition-transform hover:-translate-y-0.5"
            >
              View the tasting menu
            </a>
            <a
              href="#recipes"
              className="tag rounded-full border-2 border-choc bg-plate px-7 py-4 text-choc shadow-[3px_3px_0_0_var(--choc)] transition-transform hover:-translate-y-0.5"
            >
              House recipes
            </a>
          </div>

          <p className="menu-italic mt-10 text-lg text-choc/60">
            “Michelin has stars. We have snap buttons.”
          </p>
        </div>

        {/* ——— right: the cloche ——— */}
        <button
          type="button"
          aria-label="Lift the cloche to reveal tonight's special: the Tiny Chef tee"
          className="group relative mx-auto block w-full max-w-md cursor-pointer select-none outline-none"
        >
          <ClochePlate />
          <p className="tag mt-6 text-center text-choc/55">
            Lift the cloche to reveal tonight&apos;s special
          </p>
        </button>
      </div>
    </section>
  );
}

/**
 * A dinner cloche that lifts on hover to reveal a tiny chef tee on the plate,
 * with steam wisps rising underneath.
 */
function ClochePlate() {
  return (
    <div className="relative aspect-[10/9]">
      <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
        {/* steam (visible behind the lid rim) */}
        {[0, 1, 2].map((s) => (
          <path
            key={s}
            d={`M${168 + s * 32} 178 q -8 -18 0 -34 q 8 -16 0 -30`}
            fill="none"
            stroke="var(--choc-45)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              animation: `steam-rise 3.2s ease-out ${s * 1.05}s infinite`,
              transformOrigin: `${168 + s * 32}px 178px`,
            }}
          />
        ))}

        {/* the special: a tiny tee on the plate (revealed when lid lifts) */}
        <g>
          <ellipse cx="200" cy="268" rx="118" ry="16" fill="var(--choc-18)" />
          <path
            d="M162 200 200 210 238 200l26 16-10 18-10-4v44a6 6 0 0 1-6 6h-76a6 6 0 0 1-6-6v-44l-10 4-10-18Z"
            fill="var(--cream-plate)"
            stroke="var(--choc)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <text x="200" y="243" textAnchor="middle" fontSize="15">👨‍🍳</text>
          <text
            x="200"
            y="263"
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-body)"
            fontWeight="800"
            letterSpacing="1"
            fill="var(--tomato)"
          >
            TINY CHEF
          </text>
        </g>

        {/* plate */}
        <ellipse cx="200" cy="290" rx="150" ry="22" fill="var(--cream-plate)" stroke="var(--choc)" strokeWidth="2.4" />
        <ellipse cx="200" cy="286" rx="110" ry="13" fill="none" stroke="var(--choc-18)" strokeWidth="2" />

        {/* cloche lid — lifts on group hover */}
        <g
          className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.5,1)] group-hover:-translate-y-24 group-hover:rotate-[-7deg] group-focus-visible:-translate-y-24 group-focus-visible:rotate-[-7deg] group-active:-translate-y-24 group-active:rotate-[-7deg]"
          style={{ transformOrigin: "200px 240px" }}
        >
          <path
            d="M78 268c0-72 54-124 122-124s122 52 122 124Z"
            fill="var(--tomato)"
            stroke="var(--choc)"
            strokeWidth="2.6"
          />
          <path
            d="M96 252c8-48 42-84 88-92"
            fill="none"
            stroke="var(--butter)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="200" cy="132" r="13" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2.6" />
        </g>
      </svg>
    </div>
  );
}

function Doodle({
  className,
  r,
  delay,
  kind,
}: {
  className?: string;
  r: string;
  delay: string;
  kind: "pea" | "spoon" | "carrot" | "egg";
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={
        {
          "--r": r,
          animation: `float-y 6s ease-in-out ${delay} infinite`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {kind === "pea" && (
        <svg width="64" height="40" viewBox="0 0 64 40">
          <path d="M4 26C14 10 50 10 60 26c-8 10-48 10-56 0Z" fill="var(--olive)" stroke="var(--choc)" strokeWidth="2" />
          {[18, 32, 46].map((x) => (
            <circle key={x} cx={x} cy="24" r="6.5" fill="#7d9150" stroke="var(--choc)" strokeWidth="2" />
          ))}
        </svg>
      )}
      {kind === "spoon" && (
        <svg width="30" height="76" viewBox="0 0 30 76">
          <ellipse cx="15" cy="16" rx="12" ry="15" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2" />
          <rect x="11.5" y="30" width="7" height="42" rx="3.5" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2" />
        </svg>
      )}
      {kind === "carrot" && (
        <svg width="44" height="70" viewBox="0 0 44 70">
          <path d="M22 66C10 48 8 32 12 20h20c4 12 2 28-10 46Z" fill="var(--tomato)" stroke="var(--choc)" strokeWidth="2" />
          <path d="M14 18C10 10 12 4 12 4s8 2 10 8c2-6 10-8 10-8s2 6-2 14" fill="var(--olive)" stroke="var(--choc)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )}
      {kind === "egg" && (
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="23" fill="var(--cream-plate)" stroke="var(--choc)" strokeWidth="2" />
          <circle cx="26" cy="27" r="10" fill="var(--saffron)" stroke="var(--choc)" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}
