import Link from "next/link";
import type { Collection } from "@/data/products";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group block rounded-3xl p-6 shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-md"
      style={{ backgroundColor: collection.bg }}
    >
      <span aria-hidden className="text-4xl">{collection.emoji}</span>
      <h3 className="mt-3 text-lg font-bold group-hover:underline decoration-2 underline-offset-4">
        {collection.title}
      </h3>
      <p className="mt-1 text-sm font-semibold" style={{ color: collection.accent }}>
        {collection.tagline}
      </p>
      <span className="mt-4 inline-block text-sm font-bold text-ink-soft group-hover:text-ink transition-colors">
        Explore →
      </span>
    </Link>
  );
}
