import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { collections, getCollection, getProductsByCollection } from "@/data/products";

interface Props {
  params: Promise<{ handle: string }>;
}

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const items = getProductsByCollection(collection.handle);

  return (
    <div>
      <section className="py-12 md:py-16 text-center" style={{ backgroundColor: collection.bg }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <span aria-hidden className="text-5xl">{collection.emoji}</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold">{collection.title}</h1>
          <p className="mt-2 font-bold" style={{ color: collection.accent }}>
            {collection.tagline}
          </p>
          <p className="mt-3 text-ink-soft leading-relaxed">{collection.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <p className="text-sm font-semibold text-ink-soft">{items.length} adorable outfits</p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
