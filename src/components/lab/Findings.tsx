import Reveal from "./Reveal";

const REVIEWS = [
  {
    reviewer: "Reviewer №1 — Mother of Specimen, Bengaluru",
    verdict: "ACCEPT",
    color: "var(--petri)",
    quote:
      "The 'Half Way to One' tee survived a full plate of beetroot purée and three wash cycles. Methodology sound. Fabric absurdly soft. Strongly accept.",
  },
  {
    reviewer: "Reviewer №2 — Grandmother, Hyderabad",
    verdict: "ACCEPT WITH TEARS",
    color: "var(--litmus)",
    quote:
      "I have reviewed the naming-ceremony outfit in person. I cried at the personalized date print. Minor revision requested: make one in my size.",
  },
  {
    reviewer: "Reviewer №3 — Father, sleep-deprived, Pune",
    verdict: "ACCEPT",
    color: "var(--cusof)",
    quote:
      "Ordered 'Experiment Loading…' at 3 a.m. during a night feed. Arrived in three days. The snap buttons can be operated with one functioning brain cell. Replicable.",
  },
];

export default function Findings() {
  return (
    <section id="findings" className="rule-b scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="label text-paper/55">Section V — Peer Review</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">
            Referee reports:{" "}
            <span className="display-i text-flame">unanimous.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-paper/20 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={r.reviewer} className="bg-ink p-8 lg:p-10">
            <Reveal
              className={`flex h-full flex-col ${
                i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""
              }`}
            >
              <span
                className="label inline-block self-start border px-3 py-1.5 font-semibold"
                style={{ color: r.color, borderColor: r.color }}
              >
                {r.verdict}
              </span>
              <blockquote className="display mt-8 flex-1 text-[1.35rem] leading-snug text-paper/90">
                “{r.quote}”
              </blockquote>
              <p className="label mt-8 text-paper/50">{r.reviewer}</p>
            </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
