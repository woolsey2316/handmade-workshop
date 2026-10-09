"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/lib/products";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="hidden border-b border-line bg-[#f9f9f9] text-[12px] text-muted md:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-5">
            <button type="button" className="inline-flex items-center gap-1.5 hover:text-ink">
              <Image src="/en.png" alt="" width={16} height={11} />
              English
            </button>
            <button type="button" className="hover:text-ink">
              USD
            </button>
            <span className="hidden lg:inline">Welcome to Handmade Shop</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent">
              My Account
            </a>
            <a href="#" className="hover:text-accent">
              Wishlist
            </a>
            <a href="#" className="hover:text-accent">
              Blog
            </a>
            <a href="#" className="hover:text-accent">
              Login
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-5">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-line md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </span>
        </button>

        <a href="/" className="mx-auto md:mx-0">
          <Image
            src="/logo.png"
            alt="Handmade Workshop"
            width={180}
            height={72}
            priority
            className="h-14 w-auto md:h-16"
          />
        </a>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            aria-label="Search"
            className="hidden text-ink transition-colors hover:text-accent sm:inline-flex"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <SearchIcon />
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
          >
            <CartIcon />
            <span className="hidden sm:inline">
              <span className="font-medium">0</span>
              <span className="mx-1 text-muted">·</span>
              <span>$0.00</span>
            </span>
          </a>
        </div>
      </div>

      <nav className="hidden border-t border-line md:block">
        <ul className="mx-auto flex max-w-[1200px] items-center justify-center gap-8 px-5 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {searchOpen && (
        <div className="border-t border-line bg-white px-5 py-4">
          <form className="mx-auto flex max-w-[640px] gap-2">
            <input
              type="search"
              placeholder="Enter your keyword"
              className="w-full border border-line px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-line bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-3 text-sm uppercase tracking-[0.14em]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
