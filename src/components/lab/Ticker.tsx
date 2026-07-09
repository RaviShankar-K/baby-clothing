const FINDINGS = [
  "Hypothesis: softness correlates with nap length — confirmed",
  "Trial 47: subject chewed collar; collar unharmed",
  "Peer-reviewed by 4,000 exhausted parents",
  "Control group wore scratchy sweaters; control group cried",
  "Shrinkage after 40 washes: statistically insignificant",
  "Cuteness levels exceeded instrument range",
];

export default function Ticker() {
  return (
    <div className="ticker overflow-hidden border-b border-ink/15 bg-ink py-3 text-paper">
      <div className="ticker-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center"
            aria-hidden={copy === 1}
          >
            {FINDINGS.map((f) => (
              <span key={f} className="label flex items-center px-6 text-paper/85">
                <span className="mr-6 text-litmus">✳</span>
                {f}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
