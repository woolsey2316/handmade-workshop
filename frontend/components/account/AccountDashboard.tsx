"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearAuth,
  fetchMe,
  getStoredToken,
  getStoredUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth";

const links = [
  { label: "Dashboard", href: "/my-account" },
  { label: "Orders", href: "/my-account" },
  { label: "Addresses", href: "/my-account" },
  { label: "Account details", href: "/my-account" },
  { label: "Shop", href: "/shop" },
];

export function AccountDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const token = getStoredToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      const cached = getStoredUser();
      if (cached && !cancelled) setUser(cached);

      try {
        const me = await fetchMe();
        if (!cancelled) {
          setUser(me);
          localStorage.setItem("hw_auth_user", JSON.stringify(me));
        }
      } catch {
        clearAuth();
        if (!cancelled) router.replace("/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    setError(null);
    try {
      await logoutUser();
      router.push("/login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed.");
      setLoggingOut(false);
    }
  }

  if (loading && !user) {
    return <p className="text-sm text-muted">Loading your account…</p>;
  }

  if (!user) return null;

  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
      <aside>
        <h2 className="font-display text-xl font-medium text-ink">My Account</h2>
        <div className="mt-3 h-px w-10 bg-gold" />
        <nav className="mt-5">
          <ul className="divide-y divide-line border-y border-line text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 text-ink transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="block w-full py-3 text-left text-ink transition-colors hover:text-gold disabled:opacity-60"
              >
                {loggingOut ? "Logging out…" : "Log out"}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <section>
        <h1 className="font-display text-3xl font-medium text-ink md:text-4xl">
          Hello, {displayName}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-line p-5">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Email
            </dt>
            <dd className="mt-2 text-sm text-ink">{user.email}</dd>
          </div>
          <div className="border border-line p-5">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Member since
            </dt>
            <dd className="mt-2 text-sm text-ink">{user.created_at}</dd>
          </div>
        </dl>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
