export default function ManFooter() {
  return (
    <footer id="man" className="scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:px-8">
        <p className="term-label">$ man init_baby</p>

        <div className="mt-6 grid gap-10 text-[13.5px] leading-relaxed sm:grid-cols-2">
          <div>
            <h3 className="glow text-[13px] font-bold tracking-[0.2em]">NAME</h3>
            <p className="mt-2 text-fg-dim">
              init_baby — dress a very small system administrator
            </p>
            <h3 className="glow mt-6 text-[13px] font-bold tracking-[0.2em]">SYNOPSIS</h3>
            <p className="mt-2 text-fg-dim">
              init_baby [--name=STRING] [--age=0..24M] [--occasion=DATE]
            </p>
            <h3 className="glow mt-6 text-[13px] font-bold tracking-[0.2em]">DESCRIPTION</h3>
            <p className="mt-2 text-fg-dim">
              Compiles personalized baby apparel from 100% combed cotton with
              OEKO-TEX certified inks. All garments link statically against
              softness. No scratchy tags are ever built.
            </p>
          </div>
          <div>
            <h3 className="glow text-[13px] font-bold tracking-[0.2em]">EXIT STATUS</h3>
            <p className="mt-2 text-fg-dim">
              0 — giggles emitted · 1 — nap in progress (retry later)
            </p>
            <h3 className="glow mt-6 text-[13px] font-bold tracking-[0.2em]">FILES</h3>
            <ul className="mt-2 space-y-1 text-fg-dim">
              <li>/etc/shipping.conf — 2–4 days, all-India delivery</li>
              <li>/etc/returns.conf — 7-day exchange window</li>
              <li>/dev/sizes — 0–3M through 18–24M</li>
            </ul>
            <h3 className="glow mt-6 text-[13px] font-bold tracking-[0.2em]">SEE ALSO</h3>
            <p className="mt-2 text-fg-dim">
              nap(8), burp(1), lullaby(5), grandparents(7)
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-edge pt-6 text-[12px] text-fg-dim">
          <p>© {new Date().getFullYear()} init_baby industries · uptime: since birth</p>
          <p>
            <span className="glow">▮</span> no cookies, only crumbs
          </p>
        </div>
      </div>
    </footer>
  );
}
