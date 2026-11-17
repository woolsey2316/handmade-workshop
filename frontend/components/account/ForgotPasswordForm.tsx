"use client";

import { useState, type FormEvent } from "react";
import { requestPasswordReset } from "@/lib/auth";

const inputClass =
  "mt-2 w-full border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const result = await requestPasswordReset(
        String(form.get("email") || "").trim(),
      );
      setSuccess(result.detail);
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="font-display text-3xl font-medium text-ink">
        Lost your password?
      </h2>
      <div className="mt-3 h-px w-10 bg-gold" />
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Enter your account email and we will send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <label className={labelClass}>
          Email address *
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send reset link"}
        </button>

        <a
          href="/login"
          className="block text-sm text-muted transition-colors hover:text-gold"
        >
          Back to login
        </a>

        {success && (
          <p className="text-sm text-gold" role="status">
            {success}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
