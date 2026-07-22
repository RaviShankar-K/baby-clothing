/**
 * TeeMockup — a design printed on a soft cream baby tee, echoing the
 * product-photo reference: ribbed crew collar, drop shoulders, and the
 * artwork sitting on the chest with proper margins, under gentle fabric
 * shading.
 */
export default function TeeMockup({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const id = src.replace(/[^a-z0-9]/gi, "");
  return (
    <svg viewBox="0 0 240 236" className={className} role="img" aria-label={alt}>
      <defs>
        <clipPath id={`chest-${id}`}>
          <rect x="86" y="92" width="68" height="86" rx="5" />
        </clipPath>
        <linearGradient id={`fab-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#f2e9d8" />
        </linearGradient>
      </defs>

      {/* drop shadow */}
      <ellipse cx="120" cy="226" rx="84" ry="8" fill="#4d3b2a" opacity="0.09" />

      {/* sleeves (drawn under the torso) */}
      <g fill={`url(#fab-${id})`} stroke="#4d3b2a" strokeWidth="3" strokeLinejoin="round">
        <path d="M78 52 40 74c-6 4-8 12-4 18l10 16 34-20Z" />
        <path d="M162 52l38 22c6 4 8 12 4 18l-10 16-34-20Z" />
      </g>

      {/* torso */}
      <path
        d="M78 52h84c8 0 14 6 14 14v138c0 8-6 14-14 14H78c-8 0-14-6-14-14V66c0-8 6-14 14-14Z"
        fill={`url(#fab-${id})`}
        stroke="#4d3b2a"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* collar: rib band */}
      <path
        d="M96 52c4 12 14 19 24 19s20-7 24-19"
        fill="var(--page, #fdf8ef)"
        stroke="#4d3b2a"
        strokeWidth="3"
      />
      <path
        d="M101 52c3 8 10 13 19 13s16-5 19-13"
        fill="none"
        stroke="#4d3b2a"
        strokeWidth="1.4"
        opacity="0.35"
      />

      {/* seam + hem stitches */}
      <path d="M64 200h112" stroke="#4d3b2a" strokeWidth="1.4" opacity="0.22" strokeDasharray="4 4" />
      <path d="M50 106l14-8M190 106l-14-8" stroke="#4d3b2a" strokeWidth="1.4" opacity="0.3" />

      {/* the printed design, with margins like the reference photo */}
      <g clipPath={`url(#chest-${id})`}>
        <image
          href={src}
          x="86"
          y="92"
          width="68"
          height="86"
          preserveAspectRatio="xMidYMid slice"
        />
        {/* fabric shading over the print */}
        <rect x="86" y="92" width="68" height="86" fill="#4d3b2a" opacity="0.03" />
      </g>
      <rect x="86" y="92" width="68" height="86" rx="5" fill="none" stroke="#4d3b2a" strokeWidth="1.2" opacity="0.18" />

      {/* soft fold hints */}
      <path
        d="M76 120c3 30 3 64 0 92M164 120c-3 30-3 64 0 92"
        stroke="#4d3b2a"
        strokeWidth="1.4"
        opacity="0.1"
        fill="none"
      />
    </svg>
  );
}
