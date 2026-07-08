/**
 * Baby photo try-on service.
 *
 * Two modes, chosen automatically:
 *
 * 1. AI mode (GEMINI_API_KEY configured on the server): the photo is sent to
 *    /api/try-on, which renders a photorealistic full-body image of the baby
 *    wearing the outfit (studio catalog style). The photo is processed in
 *    memory for that one render and never stored.
 * 2. Local mode (no key): everything runs in the browser via
 *    src/lib/faceComposite.ts — the photo never leaves the device. The client
 *    checks GET /api/try-on first, so in local mode nothing is ever uploaded.
 *
 * Privacy: uploaded photos are only ever used to create the preview, and are
 * never stored or displayed publicly in either mode.
 */

import type { ProductMockupSpec } from "@/data/products";
import { compositeTryOn } from "./faceComposite";

export interface TryOnRequest {
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

let aiEnabledCache: boolean | null = null;

async function isAiEnabled(): Promise<boolean> {
  if (aiEnabledCache !== null) return aiEnabledCache;
  try {
    const res = await fetch("/api/try-on");
    const data = await res.json();
    aiEnabledCache = Boolean(data.aiEnabled);
  } catch {
    aiEnabledCache = false;
  }
  return aiEnabledCache;
}

export async function generateTryOnPreview(request: TryOnRequest): Promise<TryOnResult> {
  if (await isAiEnabled()) {
    try {
      const res = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoDataUrl: request.photoDataUrl,
          productHandle: request.productHandle,
          productTitle: request.productTitle,
        }),
      });
      if (res.ok) {
        const result = (await res.json()) as TryOnResult;
        if (result.status === "generated" && result.previewUrl) return result;
      }
      // AI failed — fall through to the local composite so the user still
      // gets a preview rather than an error.
    } catch {
      // network error — fall through to local
    }
  }

  const { dataUrl, faceDetected } = await compositeTryOn(request.photoDataUrl, request.productMockup);
  return {
    status: "local",
    previewUrl: dataUrl,
    message: faceDetected
      ? "Rendered instantly on your device — your photo never left your browser."
      : "We couldn't spot a face clearly, so we centered your photo. A bright, front-facing photo works best. Rendered on your device — nothing was uploaded.",
  };
}
