# 🌙 Tinyverse

**Little outfits for big little moments.**

A premium, mobile-first ecommerce prototype for personalized baby clothing and milestone
outfits — built with Next.js (App Router) + Tailwind CSS, structured for a smooth migration
to Shopify / Hydrogen.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run build   # production build (also type-checks)
npm run lint    # eslint
```

## Project structure

```
src/
  data/products.ts        # Product catalog + collections (single source of truth)
  lib/tryon.ts            # Try-on service client — the AI API plug point
  app/
    page.tsx              # Home
    shop/                 # All collections + products
    collections/[handle]/ # Collection pages (SSG)
    products/[handle]/    # Product detail pages (SSG)
    personalize/          # Personalization explainer + custom products
    try-on/               # "See Your Baby Wearing This" demo
    about/ faq/ contact/ privacy/
    api/try-on/route.ts   # Simulated try-on endpoint (server-side plug point)
  components/
    Header, Hero, CollectionCard, ProductCard, ProductDetail,
    BabyTryOnUploader, PersonalizationForm, TrustBadges, FAQ,
    Testimonials, Footer, ProductImage, ProductMockup
```

## How to replace mock product images

Products currently render a generated SVG illustration (`ProductMockup`) of a baby wearing
the outfit. To use real photos or AI-generated mockups:

1. Open [`src/data/products.ts`](src/data/products.ts).
2. Add URLs to the product's `images` array:

   ```ts
   product({
     id: "ms-04",
     handle: "half-way-to-one",
     // ...
     images: [
       "https://cdn.shopify.com/.../half-way-front.jpg",
       "https://cdn.shopify.com/.../half-way-closeup.jpg",
     ],
   }),
   ```

3. That's it — `ProductImage` automatically prefers real `images` over the generated mockup,
   everywhere (cards, detail gallery, try-on preview). Local files work too: drop them in
   `public/products/` and use `/products/half-way-front.jpg`.

## How to connect Shopify later

The data model in `src/data/products.ts` deliberately mirrors Shopify's product shape
(handle, title, collection membership, options, price). Two migration paths:

**Option 1 — Headless (recommended): keep this app, fetch from Shopify**

1. Create the products/collections in Shopify Admin (handles should match).
2. Add a Storefront API client (`@shopify/storefront-api-client`) with
   `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN` in `.env.local`.
3. Replace the exports of `src/data/products.ts` with async fetchers that query the
   Storefront API and map results into the existing `Product` / `Collection` interfaces —
   no component changes needed.
4. Wire "Add to Cart" (currently a local UI state) to Shopify's Cart API / checkout URL.
5. Store personalization values as cart line-item attributes — Shopify supports custom
   attributes per line item, which is exactly what `PersonalizationValues` maps to.

**Option 2 — Hydrogen**

Components here are plain React + Tailwind, so they port directly into a Hydrogen
(`npm create @shopify/hydrogen`) project; swap the data layer for Hydrogen's Storefront
API hooks and keep the JSX.

## How to connect the AI try-on API later

The try-on flow is already architected around a single plug point:

1. **UI** (`src/components/BabyTryOnUploader.tsx`) — calls `generateTryOnPreview()` and
   renders whatever comes back. No changes needed.
2. **Client service** (`src/lib/tryon.ts`) — posts to `/api/try-on`. When you go live,
   send the photo itself (multipart or a signed-upload URL) instead of just the product handle.
3. **Server route** (`src/app/api/try-on/route.ts`) — currently simulates a 2-second render
   and returns `{ status: "simulated", previewUrl: null }`. Replace its body with the real
   provider call and return `{ status: "generated", previewUrl: "<image URL>" }`.

Rules baked into the design:

- API keys live in environment variables (`process.env.TRYON_API_KEY`), never in source.
- Uploaded photos must be transient: used once for the render, then deleted.
- The privacy promise shown to users ("used only to create your preview, never displayed
  publicly") is documented in `/privacy` — keep the implementation honest with it.

## Design system

- **Fonts:** Quicksand (display) + Nunito (body), loaded via `next/font`.
- **Palette:** warm cream base, blush/coral primary, mint/sky/butter/lilac collection washes —
  defined as CSS variables in [`src/app/globals.css`](src/app/globals.css) and exposed as
  Tailwind colors (`bg-coral`, `text-ink-soft`, etc.).
- **Shape language:** rounded-3xl cards, pill buttons, soft shadows, generous white space.
