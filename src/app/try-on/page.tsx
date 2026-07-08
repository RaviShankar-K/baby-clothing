import type { Metadata } from "next";
import BabyTryOnUploader from "@/components/BabyTryOnUploader";

export const metadata: Metadata = {
  title: "See Your Baby Wearing This",
  description:
    "Upload your baby's photo and preview them in any Tinyverse outfit before you buy. Private, fast, and adorable.",
};

interface Props {
  searchParams: Promise<{ product?: string }>;
}

export default async function TryOnPage({ searchParams }: Props) {
  const { product } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">See Your Baby Wearing This ✨</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Upload a photo, pick a design, and preview your little one in it — before it&apos;s even
          stitched. Fair warning: extreme cuteness ahead.
        </p>
      </div>

      <div className="mt-10">
        <BabyTryOnUploader initialProductHandle={product} />
      </div>

      <section className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
        <h2 className="font-bold">How we handle your photos 🔒</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-soft">
          <li>Your uploaded photo is used only to create your preview and is not displayed publicly.</li>
          <li>
            When AI rendering is enabled, your photo is sent securely, used for that one render,
            and never stored. Otherwise, everything runs entirely in your browser and your photo
            never leaves your device.
          </li>
          <li>We never use your baby&apos;s photos for marketing, training, or anything else without your explicit permission.</li>
          <li>
            Read the full details on our{" "}
            <a href="/privacy" className="font-bold text-coral-deep underline underline-offset-2">
              privacy page
            </a>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
