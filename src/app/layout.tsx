import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Tinyverse — Little outfits for big little moments",
    template: "%s · Tinyverse",
  },
  description:
    "Personalized baby milestone and theme outfits made for birthdays, naming ceremonies, festivals, and everyday cuteness. Soft cotton, baby-safe prints, personalized with love.",
  keywords: [
    "baby clothing",
    "milestone outfits",
    "personalized baby gifts",
    "first birthday outfit",
    "naming ceremony outfit",
    "baby tshirts",
  ],
  openGraph: {
    title: "Tinyverse — Little outfits for big little moments",
    description:
      "Personalized baby milestone and theme outfits for birthdays, naming ceremonies, festivals, and everyday cuteness.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
