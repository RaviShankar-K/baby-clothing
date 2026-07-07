/**
 * Baby photo try-on service.
 *
 * This module is the single plug point for a real AI image-generation API.
 * Today it simulates rendering with a delay and returns a placeholder result.
 *
 * To connect a real provider later:
 *   1. Implement the provider call inside src/app/api/try-on/route.ts
 *      (server-side, so API keys stay out of the browser — read them from
 *      process.env, never hardcode).
 *   2. Return { previewUrl } pointing at the generated image.
 *   3. Nothing in the UI needs to change — BabyTryOnUploader already calls
 *      generateTryOnPreview() and renders whatever comes back.
 *
 * Privacy: uploaded photos are only used to create the preview. In this
 * prototype the photo never leaves the browser (the simulated API receives
 * only the product handle). When wiring a real API, ensure uploads are
 * processed transiently and never stored or displayed publicly.
 */

export interface TryOnRequest {
  /** Data URL of the uploaded baby photo (stays client-side in the demo) */
  photoDataUrl: string;
  productHandle: string;
  productTitle: string;
}

export interface TryOnResult {
  status: "simulated" | "generated";
  /** URL of the generated preview image; null while in simulated mode */
  previewUrl: string | null;
  message: string;
}

export async function generateTryOnPreview(request: TryOnRequest): Promise<TryOnResult> {
  // The photo itself is intentionally NOT sent to the server in demo mode.
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
