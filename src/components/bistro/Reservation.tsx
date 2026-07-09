import Reveal from "./Reveal";

function TicketRow({ n, item, price }: { n: string; item: string; price: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-0.5 font-mono text-[11.5px] leading-tight text-choc/80">
      <span className="shrink-0">{n}</span>
      <span className="flex-1">{item}</span>
      <span className="shrink-0">{price === "0" ? "—" : price === "incl." ? "incl." : `₹${price}`}</span>
    </div>
  );
}

export default function Reservation() {
  return (
    <section id="reserve" className="relative scroll-mt-20 overflow-hidden border-b-2 border-choc bg-tomato text-butter">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[7fr_5fr] lg:py-28">
        <Reveal className="text-center lg:text-left">
          <p className="tag text-butter/75">Reservations · walk-ins welcome</p>
          <h2 className="menu-display-black mt-6 text-[clamp(2.8rem,6.5vw,5.6rem)]">
            Book the highchair.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-butter/85 lg:mx-0">
            Seatings for guests aged 0–24 months. Cover charge from ₹449.
            Every reservation includes one impossibly soft garment and a
            lifetime of photo evidence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#menu"
              className="tag rounded-full border-2 border-choc bg-choc px-8 py-4 text-butter transition-transform hover:-translate-y-0.5"
            >
              Reserve now
            </a>
            <a
              href="#recipes"
              className="tag rounded-full border-2 border-butter/70 px-8 py-4 text-butter transition-colors hover:bg-butter hover:text-tomato"
            >
              Browse recipes
            </a>
          </div>
        </Reveal>

        {/* kitchen order ticket */}
        <Reveal className="reveal-late mx-auto w-full max-w-xs">
          <div style={{ transform: "rotate(2.5deg)" }}>
            <div className="bg-plate px-6 pb-7 pt-6 text-choc shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),97%_100%,92%_calc(100%-7px),86%_100%,80%_calc(100%-7px),74%_100%,68%_calc(100%-7px),62%_100%,56%_calc(100%-7px),50%_100%,44%_calc(100%-7px),38%_100%,32%_calc(100%-7px),26%_100%,20%_calc(100%-7px),14%_100%,8%_calc(100%-7px),3%_100%,0_calc(100%-8px))]">
              <p className="text-center font-mono text-[11px] tracking-[0.2em] text-choc/60">
                ★ SOUS CHEF SOCIETY ★
              </p>
              <p className="mt-0.5 text-center font-mono text-[11px] text-choc/60">
                TABLE 01 · HIGHCHAIR · 6:30 PM
              </p>
              <div className="my-4 border-t-2 border-dashed border-choc/25" />
              <TicketRow n="1×" item="TINY CHEF TEE (9–12M)" price="749" />
              <TicketRow n="1×" item="NAME PRINT: «ANAYA»" price="0" />
              <TicketRow n="1×" item="MILK PAIRING" price="incl." />
              <TicketRow n="1×" item="BIB (EMERGENCY)" price="199" />
              <div className="my-4 border-t-2 border-dashed border-choc/25" />
              <div className="flex justify-between font-mono text-[13px] font-bold">
                <span>TOTAL</span>
                <span>₹948</span>
              </div>
              <p className="mt-4 text-center font-mono text-[10.5px] text-choc/55">
                GRATUITY: ONE (1) GIGGLE — PAID IN FULL
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* rotating plate seal */}
      <div className="pointer-events-none absolute -right-10 -top-10 hidden h-44 w-44 lg:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
          <defs>
            <path id="plate-arc" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <circle cx="50" cy="50" r="48" fill="var(--choc)" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="var(--butter)" strokeWidth="1" opacity="0.6" />
          <text fontSize="8.4" fontFamily="var(--font-body)" fontWeight="700" letterSpacing="1.8" fill="var(--butter)">
            <textPath href="#plate-arc">BON APPÉTIT · PETIT APPÉTIT · </textPath>
          </text>
          <text x="50" y="55" textAnchor="middle" fontSize="16">🍽️</text>
        </svg>
      </div>

      <p
        aria-hidden="true"
        className="menu-italic pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[20vw] leading-none text-butter/10 select-none"
      >
        bon appétit
      </p>
      <div className="scallop absolute bottom-0 left-0 right-0 rotate-180" aria-hidden="true" />
    </section>
  );
}
