import Reveal from "./Reveal";

/** Parent testimonials as kernel log lines. */

const LOGS = [
  {
    ts: "[ 3742.001 ]",
    level: "info",
    msg: "'Hello World' onesie survived 14 wash cycles. Print integrity: 100%. Grandfather (retired sysadmin) wept.",
    src: "— parent process, Bengaluru",
  },
  {
    ts: "[ 8121.442 ]",
    level: "ok",
    msg: "Ordered 'Debugging Since Birth' at 2:47 a.m. while actually debugging since birth. Delivered in 3 days. Extremely soft. Zero regressions.",
    src: "— on-call parent, Pune",
  },
  {
    ts: "[ 9634.257 ]",
    level: "info",
    msg: "v1.0.0 'I'm One Now' release tee performed flawlessly at production launch (birthday). Cake writes to shirt were rolled back in one wash.",
    src: "— release manager (mom), Hyderabad",
  },
];

export default function Dmesg() {
  return (
    <section id="logs" className="scroll-mt-16 border-b border-edge">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <p className="term-label">$ dmesg | grep parent</p>
          <h2 className="pixel glow mt-4 text-[clamp(2.6rem,6vw,4.4rem)] leading-none">
            System logs
          </h2>
        </Reveal>

        <div className="term-window mt-12">
          <div className="term-bar">
            <span className="term-dot bg-magenta" />
            <span className="term-dot bg-amber" />
            <span className="term-dot bg-phos" />
            <span className="ml-2 text-[11px] text-fg-dim">/var/log/parents.log</span>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            {LOGS.map((l, i) => (
              <Reveal key={l.ts} className={i === 1 ? "reveal-late" : i === 2 ? "reveal-later" : ""}>
                <p className="text-[13.5px] leading-relaxed">
                  <span className="text-fg-dim">{l.ts} </span>
                  <span className={l.level === "ok" ? "glow" : "glow-amber"}>
                    {l.level === "ok" ? "[ OK ]" : "[INFO]"}
                  </span>{" "}
                  <span className="text-fg">{l.msg}</span>
                </p>
                <p className="mt-1.5 text-[12px] text-fg-dim">{l.src}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
