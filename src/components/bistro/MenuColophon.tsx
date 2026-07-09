export default function MenuColophon() {
  return (
    <footer className="bg-butter">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="menu-display-black text-3xl">Sous Chef Society</p>
            <p className="menu-italic mt-2 text-lg text-tomato">
              fine dining for tiny diners
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-choc/65">
              A bistro of baby clothing. Every garment made to order for one
              specific, very important small person. Kitchen never closes;
              neither do they.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FootCol
              head="Hours"
              items={[
                "Mon–Sun: 24 hours",
                "Especially 2–4 a.m.",
                "Nap service daily",
                "Closed: never",
              ]}
            />
            <FootCol
              head="The kitchen"
              items={[
                "Shipping across India",
                "Returns & exchanges",
                "Size guide (0–24M)",
                "Care instructions",
              ]}
            />
            <FootCol
              head="House rules"
              items={[
                "OEKO-TEX inks only",
                "Pre-washed cotton",
                "No scratchy tags",
                "Bibs optional",
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-choc/15 pt-6">
          <p className="tag text-choc/45">
            © {new Date().getFullYear()} Sous Chef Society · est. during a night feed
          </p>
          <p className="tag text-choc/45">Corkage: one (1) burp cloth</p>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div>
      <p className="tag text-choc">{head}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="text-[14px] text-choc/60">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
