import type { ProductMockupSpec } from "@/data/products";

/**
 * Generated placeholder mockup: a cute illustrated baby wearing the product.
 *
 * Rendered whenever a product has no real `images`. To replace with real
 * photography or AI-generated mockups, add image URLs to the product's
 * `images` array in src/data/products.ts — ProductImage will use those
 * automatically and this illustration will no longer render.
 */
export default function ProductMockup({
  mockup,
  title,
  className = "",
}: {
  mockup: ProductMockupSpec;
  title: string;
  className?: string;
}) {
  // Wrap the printed text into short lines so long prints stay readable
  const words = mockup.print.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > 11 && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);

  return (
    <svg
      viewBox="0 0 400 440"
      role="img"
      aria-label={`Illustration of a baby wearing the ${title} outfit`}
      className={className}
    >
      {/* soft background blob */}
      <ellipse cx="200" cy="230" rx="185" ry="195" fill={mockup.bg} />
      <ellipse cx="200" cy="408" rx="120" ry="18" fill="rgba(74,59,54,0.06)" />

      {/* legs */}
      <rect x="152" y="330" width="34" height="62" rx="17" fill="#F6DCC8" />
      <rect x="214" y="330" width="34" height="62" rx="17" fill="#F6DCC8" />
      {/* booties */}
      <ellipse cx="169" cy="396" rx="22" ry="13" fill={mockup.accent} opacity="0.85" />
      <ellipse cx="231" cy="396" rx="22" ry="13" fill={mockup.accent} opacity="0.85" />

      {/* arms */}
      <rect x="86" y="222" width="34" height="86" rx="17" fill={mockup.shirt} stroke="rgba(74,59,54,0.10)" strokeWidth="2" transform="rotate(18 103 265)" />
      <rect x="280" y="222" width="34" height="86" rx="17" fill={mockup.shirt} stroke="rgba(74,59,54,0.10)" strokeWidth="2" transform="rotate(-18 297 265)" />
      {/* hands */}
      <circle cx="88" cy="310" r="15" fill="#F6DCC8" />
      <circle cx="312" cy="310" r="15" fill="#F6DCC8" />

      {/* romper body */}
      <path
        d="M126 214 Q126 196 146 194 L254 194 Q274 196 274 214 L274 316 Q274 344 246 344 L154 344 Q126 344 126 316 Z"
        fill={mockup.shirt}
        stroke="rgba(74,59,54,0.10)"
        strokeWidth="2.5"
      />
      {/* collar */}
      <path d="M168 196 Q200 218 232 196" fill="none" stroke="rgba(74,59,54,0.14)" strokeWidth="3" strokeLinecap="round" />

      {/* printed design on the chest */}
      <text x="200" y="248" textAnchor="middle" fontSize="30">
        {mockup.emoji}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x="200"
          y={278 + i * 20}
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill={mockup.accent}
          fontFamily="var(--font-quicksand), ui-rounded, sans-serif"
          letterSpacing="0.5"
        >
          {line}
        </text>
      ))}

      {/* head */}
      <circle cx="200" cy="130" r="74" fill="#F6DCC8" />
      {/* ears */}
      <circle cx="128" cy="132" r="13" fill="#F6DCC8" />
      <circle cx="272" cy="132" r="13" fill="#F6DCC8" />
      {/* hair curl */}
      <path d="M200 56 Q206 42 220 48 Q210 50 208 62" fill="none" stroke="#8a746c" strokeWidth="5" strokeLinecap="round" />
      {/* happy closed eyes */}
      <path d="M162 132 Q172 122 182 132" fill="none" stroke="#4a3b36" strokeWidth="5" strokeLinecap="round" />
      <path d="M218 132 Q228 122 238 132" fill="none" stroke="#4a3b36" strokeWidth="5" strokeLinecap="round" />
      {/* rosy cheeks */}
      <circle cx="154" cy="154" r="11" fill="#F3B8AD" opacity="0.7" />
      <circle cx="246" cy="154" r="11" fill="#F3B8AD" opacity="0.7" />
      {/* smile */}
      <path d="M188 160 Q200 172 212 160" fill="none" stroke="#4a3b36" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
