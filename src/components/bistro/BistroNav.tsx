export default function BistroNav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-choc bg-butter/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <ToqueMark />
          <div className="leading-none">
            <p className="menu-display-black text-lg tracking-tight">
              Sous Chef Society
            </p>
            <p className="tag mt-1 text-[9px] text-choc/55">
              Fine dining · tiny diners
            </p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {[
            ["Tasting Menu", "#menu"],
            ["House Recipes", "#recipes"],
            ["The Method", "#method"],
            ["Reviews", "#reviews"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="tag text-choc/70 transition-colors hover:text-tomato"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#reserve"
          className="tag whitespace-nowrap rounded-full border-2 border-choc bg-tomato px-5 py-2.5 text-butter shadow-[3px_3px_0_0_var(--choc)] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_5px_0_0_var(--choc)]"
        >
          <span className="sm:hidden">Reserve</span>
          <span className="hidden sm:inline">Reserve a table</span>
        </a>
      </div>
    </header>
  );
}

function ToqueMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="16" fill="var(--tomato)" stroke="var(--choc)" strokeWidth="1.6" />
      {/* chef's toque */}
      <path
        d="M11 15.5a4.2 4.2 0 0 1 1.4-8.2 5 5 0 0 1 9.2 0A4.2 4.2 0 0 1 23 15.5V20H11Z"
        fill="var(--butter)"
        stroke="var(--choc)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <rect x="11" y="20.5" width="12" height="4.5" rx="1.2" fill="var(--butter)" stroke="var(--choc)" strokeWidth="1.4" />
      <path d="M14.5 15.5v3M19.5 15.5v3" stroke="var(--choc)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
