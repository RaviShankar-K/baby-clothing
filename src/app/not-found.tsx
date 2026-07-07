import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <span aria-hidden className="text-6xl">🧸</span>
      <h1 className="mt-4 text-3xl font-bold">Oops, this page crawled away</h1>
      <p className="mt-3 text-ink-soft">
        We looked everywhere — under the crib, behind the couch — but this page isn&apos;t here.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-white shadow-md shadow-coral/30 hover:bg-coral-deep transition-colors"
      >
        Back to the Tinyverse
      </Link>
    </div>
  );
}
