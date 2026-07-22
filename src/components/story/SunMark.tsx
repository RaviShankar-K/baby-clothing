/** A smiling storybook sun with slowly spinning rays. */
export default function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g className="sun-spin">
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const x1 = 24 + Math.cos(a) * 16;
          const y1 = 24 + Math.sin(a) * 16;
          const x2 = 24 + Math.cos(a) * 21.5;
          const y2 = 24 + Math.sin(a) * 21.5;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--apricot)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <circle cx="24" cy="24" r="12.5" fill="var(--butter)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="19.5" cy="22.5" r="1.6" fill="var(--ink)" />
      <circle cx="28.5" cy="22.5" r="1.6" fill="var(--ink)" />
      <path d="M19.5 27.5q4.5 3.6 9 0" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16.5" cy="26" r="1.7" fill="var(--coral)" opacity="0.45" />
      <circle cx="31.5" cy="26" r="1.7" fill="var(--coral)" opacity="0.45" />
    </svg>
  );
}
