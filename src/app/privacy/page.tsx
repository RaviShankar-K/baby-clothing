import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Photo Uploads",
  description:
    "How Tinyverse handles your data and your baby's photos: uploads are used only to create your try-on preview and are never displayed publicly.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: July 2026</p>

      <div className="mt-8 space-y-8">
        <section className="rounded-3xl bg-blush/50 p-6">
          <h2 className="text-xl font-bold">📸 Your baby&apos;s photos — the short version</h2>
          <p className="mt-3 leading-relaxed">
            <strong>
              Your uploaded photo is used only to create your preview and is not displayed publicly.
            </strong>{" "}
            We never share, sell, publish, or use your baby&apos;s photos for marketing or AI
            training. Ever.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">How photo uploads work today</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            The &ldquo;See Your Baby Wearing This&rdquo; preview has two modes. When AI rendering
            is enabled, your photo is transmitted over an encrypted connection, used once to
            generate your preview, and never stored. When AI rendering is not enabled, face
            detection and the preview are computed entirely in your browser and your photo is not
            uploaded at all. In both cases, when you close the page the photo is gone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">When AI previews launch</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            When we enable real AI-generated previews, your photo will be sent securely to our
            rendering service, used once to generate your preview, and then deleted. Specifically:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
            <li>Photos are transmitted over encrypted connections (HTTPS).</li>
            <li>Photos are deleted automatically after your preview is generated.</li>
            <li>Photos are never added to any public gallery, ad, or social post.</li>
            <li>Photos are never used to train AI models.</li>
            <li>You can request deletion of any data at any time via our contact page.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">Order information</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            When you place an order we collect only what&apos;s needed to make and deliver it: your
            contact details, shipping address, and the personalization text you enter (like your
            baby&apos;s name). Personalization details are printed on your outfit and stored with
            your order record so we can help with reprints or support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Cookies & analytics</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            We use only the cookies needed for the store to function (like your cart). If we add
            analytics, it will be privacy-friendly and aggregated — we care about which outfits are
            loved, not about tracking you around the internet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Questions?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Write to us via the{" "}
            <a href="/contact" className="font-bold text-coral-deep underline underline-offset-2">
              contact page
            </a>{" "}
            — a human (a parent, most likely) will reply.
          </p>
        </section>
      </div>
    </div>
  );
}
