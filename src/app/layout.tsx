import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "init_baby — apparel for tiny sysadmins",
    template: "%s · init_baby",
  },
  description:
    "IT-baby tees, milestone releases shipped as semver, and personalized builds. Compiled from 100% combed cotton. Zero itchy dependencies.",
  keywords: [
    "IT baby clothing",
    "nerdy baby onesies",
    "hello world baby tee",
    "programmer baby gifts",
  ],
  openGraph: {
    title: "init_baby",
    description: "Apparel for tiny sysadmins. Zero itchy dependencies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${vt323.variable}`}>
      <body className="crt-overlay crt-flicker min-h-screen">{children}</body>
    </html>
  );
}
