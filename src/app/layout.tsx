import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "The Tiny Laboratory — Institute for the Study of Small Humans",
    template: "%s · The Tiny Laboratory",
  },
  description:
    "Peer-reviewed baby clothing for tiny scientists. Milestone tees, lab-grade onesies, and personalized field equipment for specimens aged 0–24 months.",
  keywords: [
    "baby scientist clothing",
    "milestone baby tees",
    "personalized baby onesies",
    "nerdy baby gifts",
  ],
  openGraph: {
    title: "The Tiny Laboratory",
    description:
      "Peer-reviewed baby clothing for tiny scientists. Specimens aged 0–24 months.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${plexMono.variable}`}>
      <body className="graph-field grain min-h-screen">{children}</body>
    </html>
  );
}
