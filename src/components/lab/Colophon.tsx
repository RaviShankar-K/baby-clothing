export default function Colophon() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="display text-4xl">
              The Tiny{" "}
              <span className="display-i text-litmus">Laboratory.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-ink/60">
              An independent institute publishing soft, personalized garments
              for the study of small humans. All findings 100% cotton.
              Replication encouraged.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FootCol
              head="Departments"
              items={["Milestone Studies", "Applied Chemistry", "Culinary Sciences", "Computer Babyence"]}
            />
            <FootCol
              head="Administration"
              items={["Shipping Policy", "Returns & Exchanges", "Size Calibration", "Contact the Dean"]}
            />
            <FootCol
              head="Ethics"
              items={["OEKO-TEX inks", "Combed cotton only", "No scratchy tags", "Photo credits: Pexels"]}
            />
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="label text-ink/45">
            © {new Date().getFullYear()} The Tiny Laboratory · Published weekly by very tired editors
          </p>
          <p className="label text-ink/45">
            doi:10.1000/adorable · ISSN 0000-BABY
          </p>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div>
      <p className="label font-semibold text-ink">{head}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a href="#top" className="text-[13px] text-ink/60 transition-colors hover:text-litmus">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
