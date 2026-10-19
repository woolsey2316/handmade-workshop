"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function AccountAuthForms() {
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginMessage("Signed in (demo).");
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterMessage("Account created (demo).");
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
      <section>
        <h2 className="font-display text-3xl font-medium text-ink">Login</h2>
        <div className="mt-3 h-px w-10 bg-gold" />

        <form onSubmit={handleLogin} className="mt-7 space-y-5">
          <label className={labelClass}>
            Username or email address *
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
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
              className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold"
            >
              Log in
            </button>
          </div>

          <a
            href="#"
            className="inline-block text-sm text-muted transition-colors hover:text-gold"
          >
            Lost your password?
          </a>

          {loginMessage && (
            <p className="text-sm text-gold" role="status">
              {loginMessage}
            </p>
          )}
        </form>
      </section>

      <section>
        <h2 className="font-display text-3xl font-medium text-ink">Register</h2>
        <div className="mt-3 h-px w-10 bg-gold" />

        <form onSubmit={handleRegister} className="mt-7 space-y-5">
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
              autoComplete="new-password"
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="bg-ink px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-gold"
          >
            Register
          </button>

          {registerMessage && (
            <p className="text-sm text-gold" role="status">
              {registerMessage}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
