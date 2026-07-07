import Link from "next/link";
import { formatPrice, getCollection, type Product } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const collection = getCollection(product.collection);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: product.mockup.bg }}>
        <ProductImage product={product} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-coral-deep shadow-sm">
            ⭐ Bestseller
          </span>
        )}
      </div>
      <div className="p-4">
        {collection && (
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: collection.accent }}>
            {collection.title}
          </p>
        )}
        <h3 className="mt-1 font-bold leading-snug group-hover:text-coral-deep transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{product.shortDescription}</p>
        <p className="mt-2 font-display font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
