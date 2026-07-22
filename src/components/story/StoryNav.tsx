import SunMark from "./SunMark";

export default function StoryNav() {
  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink bg-page/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <SunMark className="h-9 w-9" />
          <span className="story-display text-[19px] leading-tight">
            Once Upon <span className="text-coral">a Onesie</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {[
            ["The Chapters", "#chapters"],
            ["The Collection", "#collection"],
            ["How It Works", "#how"],
            ["Nursery Notes", "#notes"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="story-soft text-[15px] text-ink/70 transition-colors hover:text-coral"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#collection"
          className="pop-hover story-display rounded-full border-[2.5px] border-ink bg-coral px-5 py-2 text-[15px] text-white shadow-[0_4px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          <span className="sm:hidden">Shop</span>
          <span className="hidden sm:inline">Start the story</span>
        </a>
      </div>
    </header>
  );
}
