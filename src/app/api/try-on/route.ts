import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getProduct } from "@/data/products";

/**
 * Try-on preview API.
 *
 * With GEMINI_API_KEY set (in .env.local — never in source), this generates a
 * photorealistic, e-commerce-style render of the uploaded baby wearing the
 * selected outfit (full body, studio backdrop — the "menmoms" reference look)
 * via Google's Gemini image model. The photo is processed in memory for this
 * one render and never stored.
 *
 * Without a key, it returns { status: "simulated" } and the client falls back
 * to the fully local, in-browser composite (the photo is then never uploaded
 * at all — the client checks GET /api/try-on before sending anything).
 */

const GEMINI_MODEL = "gemini-2.5-flash-image";

export async function GET() {
  return NextResponse.json({ aiEnabled: Boolean(process.env.GEMINI_API_KEY) });
}

interface TryOnBody {
  photoDataUrl?: string;
  productHandle?: string;
  productTitle?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const body = (await request.json().catch(() => null)) as TryOnBody | null;
  const productTitle = body?.productTitle ?? "this outfit";

  if (!apiKey) {
    // Simulated mode: no key configured. The demo client normally doesn't
    // even call POST in this state, but answer sensibly if it does.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return NextResponse.json({
      status: "simulated",
      previewUrl: null,
      message: `AI rendering is not configured. Preview simulation complete for “${productTitle}”.`,
    });
  }

  const product = body?.productHandle ? getProduct(body.productHandle) : undefined;
  const photoMatch = body?.photoDataUrl?.match(/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/);
  if (!product || !photoMatch) {
    return NextResponse.json(
      { status: "error", previewUrl: null, message: "A baby photo and a valid product are required." },
      { status: 400 }
    );
  }

  type Part = { text: string } | { inline_data: { mime_type: string; data: string } };
  const parts: Part[] = [{ inline_data: { mime_type: photoMatch[1], data: photoMatch[2] } }];

  // Describe the garment: real artwork image when the product has one,
  // otherwise a textual description of the printed design.
  let designInstruction: string;
  if (product.images[0]) {
    const artworkPath = path.join(process.cwd(), "public", product.images[0]);
    const artwork = await readFile(artworkPath);
    const mime = artworkPath.endsWith(".png") ? "image/png" : "image/jpeg";
    parts.push({ inline_data: { mime_type: mime, data: artwork.toString("base64") } });
    designInstruction =
      "a soft white cotton baby t-shirt printed on the chest with the illustrated design shown in the second image";
  } else {
    designInstruction =
      `a soft white cotton baby t-shirt printed on the chest with a small cute motif and the words ` +
      `"${product.mockup.print}" in rounded lettering (accent color ${product.mockup.accent})`;
  }

  parts.push({
    text:
      `Create a professional e-commerce product photograph. Show the baby from the first image — ` +
      `preserving their face, skin tone, hair, and identity exactly — as a full-body shot, standing ` +
      `or sitting naturally on a warm wooden floor against a soft cream studio wall, wearing ${designInstruction}. ` +
      `The entire garment must be clearly visible with natural fabric drape and realistic fit on a baby's body. ` +
      `Soft warm studio lighting, gentle shadow, photorealistic, adorable and gift-worthy, ` +
      `in the style of premium baby clothing catalog photography.`,
  });

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Gemini try-on request failed:", res.status, detail.slice(0, 500));
      return NextResponse.json(
        { status: "error", previewUrl: null, message: "AI rendering failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const imagePart = data?.candidates?.[0]?.content?.parts?.find(
      (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData?.data
    );
    if (!imagePart) {
      return NextResponse.json(
        { status: "error", previewUrl: null, message: "The AI did not return an image. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: "generated",
      previewUrl: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
      message: `AI preview of your baby wearing “${product.title}”. Your photo was used only for this render and was not stored.`,
    });
  } catch (e) {
    console.error("Gemini try-on error:", e);
    return NextResponse.json(
      { status: "error", previewUrl: null, message: "AI rendering failed. Please try again." },
      { status: 502 }
    );
  }
}
