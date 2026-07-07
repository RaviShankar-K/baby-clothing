"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-coral focus:ring-2 focus:ring-coral/20";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-10 md:py-14">
      <h1 className="text-center text-3xl md:text-4xl font-bold">Say hello 👋</h1>
      <p className="mt-3 text-center text-ink-soft">
        Questions about an order, sizing, or a custom idea? We usually reply within one business day.
      </p>

      {sent ? (
        <div className="mt-8 rounded-3xl bg-mint p-8 text-center shadow-sm">
          <span aria-hidden className="text-4xl">💌</span>
          <h2 className="mt-3 text-xl font-bold">Message sent!</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Thanks for reaching out — we&apos;ll get back to you soon. (Demo mode: no message was
            actually sent yet.)
          </p>
        </div>
      ) : (
        <form
          className="mt-8 space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold">
              Your name
            </label>
            <input id="name" name="name" type="text" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold">
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="topic" className="mb-1 block text-sm font-semibold">
              Topic
            </label>
            <select id="topic" name="topic" className={inputClass} defaultValue="Order question">
              <option>Order question</option>
              <option>Sizing help</option>
              <option>Custom design idea</option>
              <option>Photo try-on / privacy</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold">
              Message
            </label>
            <textarea id="message" name="message" rows={5} required className={inputClass} />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-coral px-8 py-3.5 font-bold text-white shadow-md shadow-coral/30 transition-colors hover:bg-coral-deep"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
