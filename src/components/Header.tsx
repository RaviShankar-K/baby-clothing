"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/milestones", label: "Milestones" },
  { href: "/personalize", label: "Personalize" },
  { href: "/try-on", label: "Baby Try-On" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-blush">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Tinyverse home">
            <span aria-hidden className="text-2xl">🌙</span>
            <span className="font-display text-xl font-bold tracking-tight">
              Tiny<span className="text-coral">verse</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-ink-soft hover:text-coral-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="rounded-full bg-coral px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-coral-deep transition-colors"
            >
              Shop Now
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-ink hover:bg-blush"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-blush"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-coral px-4 py-2.5 text-center text-base font-bold text-white"
            >
              Shop Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
