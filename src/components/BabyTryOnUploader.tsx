"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { products, type Product } from "@/data/products";
import { generateTryOnPreview, type TryOnResult } from "@/lib/tryon";
import ProductMockup from "./ProductMockup";

type Step = "upload" | "ready" | "generating" | "done";

/**
 * “See Your Baby Wearing This” flow.
 *
 * The uploaded photo stays in the browser (data URL) in demo mode. The
 * actual rendering call lives in src/lib/tryon.ts → /api/try-on, which is
 * where a real AI image-generation API plugs in later.
 */
export default function BabyTryOnUploader({ initialProductHandle }: { initialProductHandle?: string }) {
  const validInitial = products.some((p) => p.handle === initialProductHandle);
  const [photo, setPhoto] = useState<string | null>(null);
  const [productHandle, setProductHandle] = useState(
    validInitial ? (initialProductHandle as string) : products[0].handle
  );
  const [step, setStep] = useState<Step>("upload");
  const [result, setResult] = useState<TryOnResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = products.find((p) => p.handle === productHandle) as Product;

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, or HEIC).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("That photo is a bit too big — please use one under 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setStep("ready");
      setResult(null);
    };
    reader.readAsDataURL(file);
  }

  async function handleGenerate() {
    if (!photo) return;
    setStep("generating");
    setError(null);
    try {
      const res = await generateTryOnPreview({
        photoDataUrl: photo,
        productHandle: product.handle,
        productTitle: product.title,
      });
      setResult(res);
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStep("ready");
    }
  }

  function reset() {
    setPhoto(null);
    setResult(null);
    setStep("upload");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Left: controls */}
      <div className="space-y-6">
        {/* Step 1: upload */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
          <h3 className="font-bold">1 · Upload your baby&apos;s photo</h3>
          <label
            htmlFor="baby-photo"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-coral/40 bg-blush/40 px-6 py-8 text-center transition-colors hover:border-coral hover:bg-blush/70"
          >
            <span aria-hidden className="text-3xl">📸</span>
            <span className="mt-2 font-bold text-coral-deep">
              {photo ? "Change photo" : "Tap to upload a photo"}
            </span>
            <span className="mt-1 text-xs text-ink-soft">JPG or PNG, up to 8 MB · A clear front-facing photo works best</span>
          </label>
          <input
            ref={fileInputRef}
            id="baby-photo"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {photo && (
            <div className="mt-4 flex items-center gap-3">
              <img
                src={photo}
                alt="Preview of your uploaded baby photo"
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-coral/30"
              />
              <div className="text-sm">
                <p className="font-bold text-ink">Photo ready 💛</p>
                <button type="button" onClick={reset} className="font-semibold text-coral-deep underline underline-offset-2">
                  Remove photo
                </button>
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="mt-3 rounded-xl bg-blush px-3 py-2 text-sm font-semibold text-coral-deep">
              {error}
            </p>
          )}
        </div>

        {/* Step 2: pick design */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
          <h3 className="font-bold">2 · Pick an outfit design</h3>
          <label htmlFor="tryon-product" className="sr-only">
            Outfit design
          </label>
          <select
            id="tryon-product"
            value={productHandle}
            onChange={(e) => {
              setProductHandle(e.target.value);
              if (step === "done") setStep("ready");
            }}
            className="mt-3 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
          >
            {products.map((p) => (
              <option key={p.handle} value={p.handle}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: generate */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!photo || step === "generating"}
          className="w-full rounded-full bg-coral px-8 py-4 text-lg font-bold text-white shadow-md shadow-coral/30 transition-colors hover:bg-coral-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === "generating" ? "Sprinkling baby magic… ✨" : "Generate Try-On Preview"}
        </button>

        <p className="rounded-2xl bg-mint px-4 py-3 text-sm font-semibold text-ink">
          🔒 Your uploaded photo is used only to create your preview and is not displayed publicly.
        </p>
      </div>

      {/* Right: preview panel */}
      <div className="rounded-3xl p-6 shadow-sm ring-1 ring-ink/5" style={{ backgroundColor: product.mockup.bg }} aria-live="polite">
        <h3 className="font-bold">Your preview</h3>

        {step === "generating" ? (
          <div className="mt-4 flex aspect-square flex-col items-center justify-center rounded-2xl bg-white/70 text-center">
            <span aria-hidden className="animate-bounce text-4xl">🧸</span>
            <p className="mt-3 font-bold">Creating your preview…</p>
            <p className="mt-1 text-sm text-ink-soft">Fitting {product.title} on your little one</p>
          </div>
        ) : step === "done" && result ? (
          <div className="mt-4">
            <div className="relative overflow-hidden rounded-2xl bg-white/70">
              {result.previewUrl ? (
                <img src={result.previewUrl} alt={`Generated preview of your baby wearing ${product.title}`} className="aspect-square w-full object-cover" />
              ) : (
                <>
                  <ProductMockup mockup={product.mockup} title={product.title} className="w-full" />
                  {photo && (
                    <img
                      src={photo}
                      alt=""
                      aria-hidden
                      className="absolute right-3 top-3 h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                  )}
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm">
                    ✨ Demo preview — AI rendering coming soon
                  </span>
                </>
              )}
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">
              {product.title} — looking adorable already 💛
            </p>
            <p className="mt-1 text-xs text-ink-soft">{result.message}</p>
            <button type="button" onClick={handleGenerate} className="mt-3 text-sm font-bold text-coral-deep underline underline-offset-2">
              Regenerate preview
            </button>
          </div>
        ) : (
          <div className="mt-4 flex aspect-square flex-col items-center justify-center rounded-2xl bg-white/70 text-center px-6">
            <ProductMockup mockup={product.mockup} title={product.title} className="w-40" />
            <p className="mt-2 font-bold">{product.title}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {photo ? "Ready! Tap “Generate Try-On Preview”." : "Upload a photo to see your baby in this outfit."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
