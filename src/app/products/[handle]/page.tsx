import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProductsByCollection, products } from "@/data/products";

interface Props {
  params: Promise<{ handle: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} · Tinyverse`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const related = getProductsByCollection(product.collection)
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-bold">You may also love</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
