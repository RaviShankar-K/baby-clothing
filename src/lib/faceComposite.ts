/**
 * Browser-local try-on compositing.
 *
 * Detects the baby's face in the uploaded photo with MediaPipe Face Detector
 * (a ~230 KB model + WASM runtime, both served from our own origin) and
 * composites the face onto the illustrated outfit on a canvas. Everything
 * runs on the user's device — the photo is never uploaded anywhere.
 *
 * All assets are local: /mediapipe/wasm (copied from node_modules by
 * scripts/copy-mediapipe-wasm.mjs) and /models/blaze_face_short_range.tflite.
 */

import type { FaceDetector } from "@mediapipe/tasks-vision";
import type { ProductMockupSpec } from "@/data/products";

// Canvas output is 2x the mockup's 400x440 viewBox for crisp results.
const W = 800;
const H = 880;
// Where the illustrated head sits (2x the SVG coordinates: cx=200, cy=130, r≈75).
const FACE_CX = 400;
const FACE_CY = 260;
const FACE_R = 150;

let detectorPromise: Promise<FaceDetector | null> | null = null;

function getDetector(): Promise<FaceDetector | null> {
  if (!detectorPromise) {
    detectorPromise = (async () => {
      try {
        const { FaceDetector, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const fileset = await FilesetResolver.forVisionTasks("/mediapipe/wasm");
        return await FaceDetector.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: "/models/blaze_face_short_range.tflite" },
          runningMode: "IMAGE",
        });
      } catch (e) {
        console.warn("Face detector unavailable, falling back to centered crop", e);
        return null;
      }
    })();
  }
  return detectorPromise;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

interface CropBox {
  x: number;
  y: number;
  size: number;
}

/**
 * Square crop region around the face. The detector's box hugs the features,
 * so we expand it to include forehead and a bit of hair, and shift up.
 */
function faceCrop(img: HTMLImageElement, box: { originX: number; originY: number; width: number; height: number }): CropBox {
  const cx = box.originX + box.width / 2;
  const cy = box.originY + box.height / 2 - box.height * 0.12;
  const size = Math.max(box.width, box.height) * 1.9;
  return clampCrop(img, cx, cy, size);
}

/** Fallback when no face is found: assume it's in the upper-center of the photo. */
function heuristicCrop(img: HTMLImageElement): CropBox {
  const size = Math.min(img.naturalWidth, img.naturalHeight) * 0.62;
  return clampCrop(img, img.naturalWidth / 2, img.naturalHeight * 0.34, size);
}

function clampCrop(img: HTMLImageElement, cx: number, cy: number, size: number): CropBox {
  const s = Math.min(size, img.naturalWidth, img.naturalHeight);
  const x = Math.min(Math.max(cx - s / 2, 0), img.naturalWidth - s);
  const y = Math.min(Math.max(cy - s / 2, 0), img.naturalHeight - s);
  return { x, y, size: s };
}

/**
 * Headless variant of the ProductMockup illustration (body, romper, print —
 * no illustrated head; the real baby's face goes there instead).
 * Coordinates intentionally mirror src/components/ProductMockup.tsx.
 * Uses web-safe fonts: custom fonts and CSS variables don't resolve when an
 * SVG is rasterized onto a canvas.
 */
function outfitSvg(mockup: ProductMockupSpec): string {
  const words = mockup.print.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > 11 && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);

  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const printLines = lines
    .map(
      (line, i) =>
        `<text x="200" y="${278 + i * 20}" text-anchor="middle" font-size="16" font-weight="800" fill="${mockup.accent}" font-family="'Trebuchet MS', Verdana, sans-serif" letter-spacing="0.5">${esc(line)}</text>`
    )
    .join("");

  return `<svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="200" cy="230" rx="185" ry="195" fill="${mockup.bg}"/>
  <ellipse cx="200" cy="408" rx="120" ry="18" fill="rgba(74,59,54,0.06)"/>
  <rect x="152" y="330" width="34" height="62" rx="17" fill="#F6DCC8"/>
  <rect x="214" y="330" width="34" height="62" rx="17" fill="#F6DCC8"/>
  <ellipse cx="169" cy="396" rx="22" ry="13" fill="${mockup.accent}" opacity="0.85"/>
  <ellipse cx="231" cy="396" rx="22" ry="13" fill="${mockup.accent}" opacity="0.85"/>
  <rect x="86" y="222" width="34" height="86" rx="17" fill="${mockup.shirt}" stroke="rgba(74,59,54,0.10)" stroke-width="2" transform="rotate(18 103 265)"/>
  <rect x="280" y="222" width="34" height="86" rx="17" fill="${mockup.shirt}" stroke="rgba(74,59,54,0.10)" stroke-width="2" transform="rotate(-18 297 265)"/>
  <circle cx="88" cy="310" r="15" fill="#F6DCC8"/>
  <circle cx="312" cy="310" r="15" fill="#F6DCC8"/>
  <path d="M126 214 Q126 196 146 194 L254 194 Q274 196 274 214 L274 316 Q274 344 246 344 L154 344 Q126 344 126 316 Z" fill="${mockup.shirt}" stroke="rgba(74,59,54,0.10)" stroke-width="2.5"/>
  <path d="M168 196 Q200 218 232 196" fill="none" stroke="rgba(74,59,54,0.14)" stroke-width="3" stroke-linecap="round"/>
  <text x="200" y="248" text-anchor="middle" font-size="30">${mockup.emoji}</text>
  ${printLines}
</svg>`;
}

export interface CompositeResult {
  dataUrl: string;
  faceDetected: boolean;
}

export async function compositeTryOn(
  photoDataUrl: string,
  mockup: ProductMockupSpec
): Promise<CompositeResult> {
  const photo = await loadImage(photoDataUrl);

  let crop: CropBox;
  let faceDetected = false;
  const detector = await getDetector();
  if (detector) {
    const detections = detector.detect(photo).detections;
    const box = detections[0]?.boundingBox;
    if (box) {
      crop = faceCrop(photo, box);
      faceDetected = true;
    } else {
      crop = heuristicCrop(photo);
    }
  } else {
    crop = heuristicCrop(photo);
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // Outfit illustration (headless) as the base layer
  const svgBlob = new Blob([outfitSvg(mockup)], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  try {
    const outfit = await loadImage(svgUrl);
    ctx.drawImage(outfit, 0, 0, W, H);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }

  // Baby's face, clipped to a circle where the illustrated head would be
  ctx.save();
  ctx.beginPath();
  ctx.arc(FACE_CX, FACE_CY, FACE_R, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(
    photo,
    crop.x,
    crop.y,
    crop.size,
    crop.size,
    FACE_CX - FACE_R,
    FACE_CY - FACE_R,
    FACE_R * 2,
    FACE_R * 2
  );
  ctx.restore();

  // Soft ring around the face for a polished, sticker-like finish
  ctx.beginPath();
  ctx.arc(FACE_CX, FACE_CY, FACE_R, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(FACE_CX, FACE_CY, FACE_R + 6, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(74,59,54,0.10)";
  ctx.stroke();

  return { dataUrl: canvas.toDataURL("image/png"), faceDetected };
}
