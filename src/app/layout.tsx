import type { Metadata } from "next";
import { Fredoka, Caveat, Figtree } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Once Upon a Onesie — a picture book you can wear",
    template: "%s · Once Upon a Onesie",
  },
  description:
    "Storybook milestone tees for tiny heroes: hand-illustrated chapters from six months to the big number one, printed on impossibly soft cotton.",
  keywords: [
    "baby milestone tees",
    "first birthday shirt",
    "illustrated baby clothing",
    "storybook baby gifts",
  ],
  openGraph: {
    title: "Once Upon a Onesie",
    description: "A picture book you can wear — storybook milestone tees for tiny heroes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${caveat.variable} ${figtree.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
