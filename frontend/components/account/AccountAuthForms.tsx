"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getStoredToken, loginUser, registerUser } from "@/lib/auth";

const inputClass =
  "mt-2 w-full border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function AccountAuthForms() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginPending, setLoginPending] = useState(false);
  const [registerPending, setRegisterPending] = useState(false);

  useEffect(() => {
    if (getStoredToken()) {
      router.replace("/my-account");
    }
  }, [router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError(null);
    setLoginPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await loginUser({
        email: String(form.get("email") || "").trim(),
        password: String(form.get("password") || ""),
      });
      router.push("/my-account");
      router.refresh();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoginPending(false);
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterError(null);
    setRegisterPending(true);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirm-password") || "");

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      setRegisterPending(false);
      return;
    }

    try {
      await registerUser({
        email: String(form.get("email") || "").trim(),
        password,
        confirm_password: confirmPassword,
        first_name: String(form.get("first_name") || "").trim(),
        last_name: String(form.get("last_name") || "").trim(),
      });
      router.push("/my-account");
      router.refresh();
    } catch (error) {
      setRegisterError(
        error instanceof Error ? error.message : "Registration failed.",
      );
    } finally {
      setRegisterPending(false);
    }
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
      <section>
        <h2 className="font-display text-3xl font-medium text-ink">Login</h2>
        <div className="mt-3 h-px w-10 bg-gold" />

        <form onSubmit={handleLogin} className="mt-7 space-y-5">
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

          <label className={labelClass}>
            Password *
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <button
              type="submit"
              disabled={loginPending}
              className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold disabled:opacity-60"
            >
              {loginPending ? "Logging in…" : "Log in"}
            </button>
          </div>

          <a
            href="#"
            className="inline-block text-sm text-muted transition-colors hover:text-gold"
          >
            Lost your password?
          </a>

          {loginError && (
            <p className="text-sm text-red-600" role="alert">
              {loginError}
            </p>
          )}
        </form>
      </section>

      <section>
        <h2 className="font-display text-3xl font-medium text-ink">Register</h2>
        <div className="mt-3 h-px w-10 bg-gold" />

        <form onSubmit={handleRegister} className="mt-7 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              First name
              <input
                type="text"
                name="first_name"
                autoComplete="given-name"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Last name
              <input
                type="text"
                name="last_name"
                autoComplete="family-name"
                className={inputClass}
              />
            </label>
          </div>

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

          <label className={labelClass}>
            Password *
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
            Confirm Password *
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
            disabled={registerPending}
            className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold disabled:opacity-60"
          >
            {registerPending ? "Creating…" : "Register"}
          </button>

          {registerError && (
            <p className="text-sm text-red-600" role="alert">
              {registerError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
