"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Your name*
          </span>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Your email*
          </span>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Your message
        </span>
        <textarea
          name="message"
          rows={8}
          className="w-full resize-y border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <button
        type="submit"
        className="bg-ink px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold"
      >
        Send message
      </button>

      {submitted && (
        <p className="text-sm text-gold" role="status">
          Thank you — your message has been received.
        </p>
      )}
    </form>
  );
}
