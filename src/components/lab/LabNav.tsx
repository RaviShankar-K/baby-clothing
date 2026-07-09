export default function LabNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 py-3">
          <FlaskMark />
          <span className="label font-semibold">
            The Tiny Laboratory
          </span>
        </a>
        <nav className="hidden items-stretch md:flex" aria-label="Primary">
          {[
            ["Specimens", "#specimens"],
            ["Protocol", "#protocol"],
            ["Longitudinal Study", "#study"],
            ["Peer Review", "#findings"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="label flex items-center border-l border-ink/15 px-5 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {label}
            </a>
          ))}
          <a
            href="#specimens"
            className="label flex items-center gap-2 border-l border-ink/15 bg-ink px-6 font-semibold text-paper transition-colors hover:bg-litmus"
          >
            Procure&nbsp;→
          </a>
        </nav>
        <a
          href="#specimens"
          className="label flex items-center gap-2 border-l border-ink/15 bg-ink px-4 font-semibold text-paper md:hidden"
        >
          Procure
        </a>
      </div>
    </header>
  );
}

function FlaskMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M10 3h6M11 3v6.2L18.5 21a1.6 1.6 0 0 1-1.4 2.4H8.9A1.6 1.6 0 0 1 7.5 21L15 9.2V3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.4" cy="18.4" r="1.1" fill="var(--litmus)" />
      <circle cx="14.8" cy="20.2" r="0.8" fill="var(--petri)" />
    </svg>
  );
}
