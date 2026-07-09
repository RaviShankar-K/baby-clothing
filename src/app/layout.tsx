import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Sous Chef Society — Fine Dining for Tiny Diners",
    template: "%s · Sous Chef Society",
  },
  description:
    "A bistro of baby clothing: chef-baby tees, milk-sommelier onesies, and milestone tasting menus. Personalized, pre-washed, and plated with love.",
  keywords: [
    "chef baby clothing",
    "funny baby onesies",
    "personalized baby tees",
    "foodie baby gifts",
  ],
  openGraph: {
    title: "Sous Chef Society",
    description: "Fine dining for tiny diners — a bistro of baby clothing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body className="grain min-h-screen">{children}</body>
    </html>
  );
}
