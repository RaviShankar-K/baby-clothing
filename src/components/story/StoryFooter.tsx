import SunMark from "./SunMark";

export default function StoryFooter() {
  return (
    <footer className="bg-page">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          <div>
            <div className="flex items-center gap-3">
              <SunMark className="h-10 w-10" />
              <p className="story-display text-[24px]">
                Once Upon <span className="text-coral">a Onesie</span>
              </p>
            </div>
            <p className="script mt-2 text-[22px] text-sage-deep">
              a picture book you can wear
            </p>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-ink/60">
              Hand-illustrated milestone tees, printed to order for one very
              specific small person. Written with love; drooled on with
              enthusiasm.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FootCol
              head="The book"
              items={["The chapters", "The collection", "Personalization", "Gift wrapping"]}
            />
            <FootCol
              head="The practical page"
              items={["Shipping (2–4 days)", "Returns & exchanges", "Size guide 0–24M", "Care instructions"]}
            />
            <FootCol
              head="The fine print"
              items={["100% combed cotton", "Baby-safe inks", "Pre-washed fabric", "No scratchy tags"]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink/10 pt-6 text-[13px] text-ink/50">
          <p>© {new Date().getFullYear()} Once Upon a Onesie · the end (of the page, not the story)</p>
          <p className="script text-[19px] text-ink/60">drawn, printed & posted with love ♥</p>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div>
      <p className="story-display text-[15px]">{head}</p>
      <ul className="mt-3.5 space-y-2">
        {items.map((i) => (
          <li key={i} className="text-[14px] text-ink/60">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
