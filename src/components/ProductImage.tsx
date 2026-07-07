/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/data/products";
import ProductMockup from "./ProductMockup";

/**
 * Renders the primary visual for a product: a real image when the product
 * has `images` (Shopify CDN / AI-generated / local files), otherwise the
 * generated baby-model illustration.
 */
export default function ProductImage({
  product,
  imageIndex = 0,
  className = "",
}: {
  product: Product;
  imageIndex?: number;
  className?: string;
}) {
  const src = product.images[imageIndex];
  if (src) {
    return (
      <img
        src={src}
        alt={`Baby wearing the ${product.title} outfit`}
        className={`object-cover ${className}`}
      />
    );
  }
  return <ProductMockup mockup={product.mockup} title={product.title} className={className} />;
}
