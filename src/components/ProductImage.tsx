/* eslint-disable @next/next/no-img-element */
import { getModelPhoto, type Product } from "@/data/products";
import ProductMockup from "./ProductMockup";
import BabyPhotoMockup from "./BabyPhotoMockup";

/**
 * A product has an ordered list of visual "views":
 *   1. photo  — real baby model photo with the design overlaid (primary)
 *   2. image  — each real artwork/product image URL in `images`
 *   3. mockup — the generated SVG illustration
 * ProductCard shows view 0; ProductDetail offers all of them as a gallery.
 */
export type ProductView =
  | { type: "photo"; label: string }
  | { type: "image"; src: string; label: string }
  | { type: "mockup"; label: string };

export function getProductViews(product: Product): ProductView[] {
  return [
    { type: "photo", label: "On a baby model" },
    ...product.images.map((src, i) => ({
      type: "image" as const,
      src,
      label: i === 0 ? "Design artwork" : `Design artwork ${i + 1}`,
    })),
    { type: "mockup", label: "Cute illustration" },
  ];
}

export default function ProductImage({
  product,
  imageIndex = 0,
  className = "",
}: {
  product: Product;
  imageIndex?: number;
  className?: string;
}) {
  const views = getProductViews(product);
  const view = views[Math.min(imageIndex, views.length - 1)];

  if (view.type === "photo") {
    return <BabyPhotoMockup product={product} photo={getModelPhoto(product)} className={className} />;
  }
  if (view.type === "image") {
    return (
      <img
        src={view.src}
        alt={`${product.title} design artwork`}
        className={`object-cover ${className}`}
      />
    );
  }
  return <ProductMockup mockup={product.mockup} title={product.title} className={className} />;
}
