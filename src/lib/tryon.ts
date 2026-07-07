/**
 * Baby photo try-on service.
 *
 * Default mode is fully LOCAL: the photo is analyzed and composited on the
 * user's device (see src/lib/faceComposite.ts) — it never leaves the browser.
 *
 * A remote AI plug point is kept for a future photorealistic upgrade:
 *   1. Implement the provider call inside src/app/api/try-on/route.ts
 *      (server-side, so API keys stay out of the browser — read them from
 *      process.env, never hardcode).
 *   2. Return { status: "generated", previewUrl } pointing at the image.
 *   3. Swap generateRemoteTryOnPreview into generateTryOnPreview below (or
 *      offer it as an "HD preview" option) — the UI needs no changes, it
 *      renders whatever TryOnResult comes back.
 *
 * Privacy: uploaded photos are only used to create the preview. Local mode
 * guarantees this technically — nothing is transmitted. A future remote mode
 * must process uploads transiently and never store or display them publicly.
 */

import type { ProductMockupSpec } from "@/data/products";
import { compositeTryOn } from "./faceComposite";

export interface TryOnRequest {
  /** Data URL of the uploaded baby photo (never leaves the browser in local mode) */
  photoDataUrl: string;
  productHandle: string;
  productTitle: string;
  productMockup: ProductMockupSpec;
}

export interface TryOnResult {
  status: "local" | "simulated" | "generated";
  /** URL (or data URL) of the generated preview image */
  previewUrl: string | null;
  message: string;
}

export async function generateTryOnPreview(request: TryOnRequest): Promise<TryOnResult> {
  try {
    const { dataUrl, faceDetected } = await compositeTryOn(request.photoDataUrl, request.productMockup);
    return {
      status: "local",
      previewUrl: dataUrl,
      message: faceDetected
        ? "Rendered instantly on your device — your photo never left your browser."
        : "We couldn't spot a face clearly, so we centered your photo. A bright, front-facing photo works best. Rendered on your device — nothing was uploaded.",
    };
  } catch {
    // Very old browser (no canvas/WASM)? Fall back to the simulated remote flow.
    return generateRemoteTryOnPreview(request);
  }
}

/**
 * Remote plug point for a future AI image-generation provider.
 * Currently the API route simulates rendering and returns no image.
 * NOTE: in a real integration, send the photo itself (multipart or a
 * signed-upload URL) — the demo intentionally sends only product info.
 */
export async function generateRemoteTryOnPreview(request: TryOnRequest): Promise<TryOnResult> {
  const res = await fetch("/api/try-on", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productHandle: request.productHandle,
      productTitle: request.productTitle,
    }),
  });

  if (!res.ok) {
    throw new Error("Preview generation failed. Please try again.");
  }

  return (await res.json()) as TryOnResult;
}
