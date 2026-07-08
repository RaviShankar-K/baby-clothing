/* eslint-disable @next/next/no-img-element */
import type { ModelPhoto, Product } from "@/data/products";

/**
 * A real (licensed stock) baby model photo with the product's design
 * composited onto the chest. Placement comes from the photo's
 * PrintPlacement config in src/data/products.ts; the print blends into
 * the fabric via mix-blend-multiply so it reads as printed-on.
 *
 * If the product has artwork in `images`, that artwork is the print;
 * otherwise the text design (emoji + print lines) is rendered as SVG.
 */
export default function BabyPhotoMockup({
  product,
  photo,
  mockup,
  personalizedName,
  personalizedSub,
  className = "",
}: {
  product: Product;
  photo: ModelPhoto;
  /** Override the printed design (e.g. live personalization); defaults to the product's */
  mockup?: Product["mockup"];
  personalizedName?: string;
  personalizedSub?: string;
  className?: string;
}) {
  const p = photo.print;
  const artwork = product.images[0];
  const spec = mockup ?? product.mockup;

  // Same line-wrapping as ProductMockup so both mockups match
  const words = spec.print.split(" ");
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
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={photo.src}
        alt={`Baby model wearing the ${product.title} outfit`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: `${p.width}%`,
          transform: `rotate(${p.rotate}deg)`,
          mixBlendMode: "multiply",
          opacity: 0.9,
        }}
      >
        {artwork ? (
          <img
            src={artwork}
            alt=""
            className="w-full"
            style={{
              // Feather the artwork edges so the print melts into the fabric;
              // multiply blending already hides its light background.
              WebkitMaskImage: "radial-gradient(closest-side, black 68%, transparent 99%)",
              maskImage: "radial-gradient(closest-side, black 68%, transparent 99%)",
            }}
          />
        ) : (
          <svg viewBox="0 0 100 84" className="w-full">
            <text x="50" y="24" textAnchor="middle" fontSize="20">
              {spec.emoji}
            </text>
            {lines.map((line, i) => (
              <text
                key={line}
                x="50"
                y={42 + i * 13}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="800"
                fill={spec.accent}
                fontFamily="'Trebuchet MS', Verdana, sans-serif"
                letterSpacing="0.3"
              >
                {line}
              </text>
            ))}
            {personalizedName && (
              <text
                x="50"
                y={44 + lines.length * 13}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fontStyle="italic"
                fill="#4a3b36"
                fontFamily="'Trebuchet MS', Verdana, sans-serif"
              >
                {personalizedName}
              </text>
            )}
            {personalizedSub && (
              <text
                x="50"
                y={(personalizedName ? 54 : 45) + lines.length * 13}
                textAnchor="middle"
                fontSize="6"
                fontWeight="600"
                fill="#6a5850"
                fontFamily="'Trebuchet MS', Verdana, sans-serif"
              >
                {personalizedSub}
              </text>
            )}
          </svg>
        )}
      </div>
    </div>
  );
}
