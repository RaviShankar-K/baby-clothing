export default function TermNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-crt/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="term-dot bg-magenta" />
            <span className="term-dot bg-amber" />
            <span className="term-dot bg-phos" />
          </span>
          <span className="glow text-[15px] font-bold tracking-tight">
            ~/init_baby
          </span>
          <span className="hidden text-[12px] text-fg-dim sm:inline">— bash · 80×24</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {[
            ["./releases", "#releases"],
            ["./packages", "#packages"],
            ["./logs", "#logs"],
            ["man page", "#man"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-fg-dim transition-colors hover:text-phos"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#deploy"
          className="border border-phos-dim bg-phos/10 px-4 py-2 text-[12px] font-bold tracking-[0.12em] text-phos transition-colors hover:bg-phos hover:text-crt"
        >
          $ deploy
        </a>
      </div>
    </header>
  );
}
