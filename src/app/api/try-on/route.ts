import { NextResponse } from "next/server";

/**
 * Try-on preview API — simulated.
 *
 * Replace the body of POST with a real AI image-generation call when
 * credentials are available. Keep keys in environment variables
 * (e.g. process.env.TRYON_API_KEY) — never in source.
 *
 * Expected real flow:
 *   1. Accept the uploaded photo (multipart or signed-upload URL).
 *   2. Call the image-generation provider with photo + product design.
 *   3. Return { status: "generated", previewUrl: "<generated image URL>" }.
 *   4. Delete the uploaded photo after generation — uploads must be
 *      transient and never displayed publicly.
 */
export async function POST(request: Request) {
  const { productTitle } = await request.json().catch(() => ({ productTitle: "this outfit" }));

  // Simulate AI rendering time so the UI's loading state is realistic.
  await new Promise((resolve) => setTimeout(resolve, 2200));

  return NextResponse.json({
    status: "simulated",
    previewUrl: null,
    message: `Preview simulation complete for “${productTitle}”. Connect an AI image API to see real renders.`,
  });
}
