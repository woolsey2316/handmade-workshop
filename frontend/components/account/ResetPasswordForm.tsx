"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { clearAuth, confirmPasswordReset } from "@/lib/auth";

const inputClass =
  "mt-2 w-full border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const linkMissing = !uid || !token;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (linkMissing) {
      setError("This reset link is missing required information.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirm-password") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      const result = await confirmPasswordReset({
        uid,
        token,
        password,
        confirm_password: confirmPassword,
      });
      clearAuth();
      setSuccess(result.detail);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="font-display text-3xl font-medium text-ink">
        Choose a new password
      </h2>
      <div className="mt-3 h-px w-10 bg-gold" />

      {linkMissing ? (
        <div className="mt-7 space-y-4">
          <p className="text-sm text-red-600" role="alert">
            This password reset link is invalid. Request a new one from the
            login page.
          </p>
          <a
            href="/forgot-password"
            className="inline-block text-sm text-muted transition-colors hover:text-gold"
          >
            Request a new reset link
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className={labelClass}>
            New password *
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Confirm new password *
            <input
              type="password"
              name="confirm-password"
              required
              minLength={8}
              autoComplete="new-password"
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold disabled:opacity-60"
          >
            {pending ? "Saving…" : "Reset password"}
          </button>

          {success && (
            <p className="text-sm text-gold" role="status">
              {success} Redirecting to login…
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
