import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Tinyverse sizes, personalization, baby-safe prints, delivery times, returns, and the baby photo try-on.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 md:py-14">
      <h1 className="text-center text-3xl md:text-4xl font-bold">Questions, answered 💬</h1>
      <p className="mt-3 text-center text-ink-soft">
        Everything parents usually ask before ordering. Still curious?{" "}
        <Link href="/contact" className="font-bold text-coral-deep underline underline-offset-2">
          Contact us
        </Link>
        .
      </p>
      <div className="mt-8">
        <FAQ />
      </div>
    </div>
  );
}
