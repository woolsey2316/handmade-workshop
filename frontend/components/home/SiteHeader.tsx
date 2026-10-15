"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@/lib/products";
import { Language } from '@/types/languages'
import { OptionalMenuList } from "@/components/ui/MenuList"
import { Currency } from '@/types/currency'

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 bg-white">
      <div className="hidden border-b border-line bg-[#f9f9f9] text-[12px] text-muted md:block">
        <div className="mx-auto flex max-w-300 items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-5">
            <OptionalMenuList
              optionList={Language}
              defaultValue="en"
              showImage={true} />
            <OptionalMenuList
              optionList={Currency}
              defaultValue="usd" 
              showImage={false}
              showKey={true} />
            <span className="hidden lg:inline">Welcome to Handmade Shop</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="my-account" className="hover:text-gold transition duration-300">
              My Account
            </a>
            <span className="text-muted mb-1">|</span>
            <a href="wishlist" className="hover:text-gold transition duration-300">
              Wishlist
            </a>
            <span className="text-muted mb-1">|</span>
            <a href="blog" className="hover:text-gold transition duration-300">
              Blog
            </a>
            <span className="text-muted mb-1">|</span>
            <a href="login" className="hover:text-gold transition duration-300">
              Login
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-300 items-center justify-between gap-6 px-5 py-5">
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
            className="h-16 w-auto md:h-18"
          />
        </a>
        <div className="flex sm:items-center gap-6 sm:w-3/4">
          <div className="hidden sm:block bg-white px-5 py-4 w-full">
            <form className="mx-auto flex max-w-300 w-full gap-0">
              <input
                type="search"
                placeholder="Enter your keyword"
                className="w-full border border-line px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-accent"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3 md:gap-5 float-right">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent relative"
            >
              <CartIcon />
              <span className="inline bg-black rounded-full px-2 py-px absolute left-4 -top-2.5">
                <span className="font-medium text-white text-xs">0</span>
              </span>
              <span className="inline rounded-full px-2 py-px">
                <span className="font-medium text-black text-sm">$0.00</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <nav className="hidden border-t border-line md:block">
        <ul className="mx-auto flex max-w-300 items-center justify-center gap-8 px-5 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

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
    <svg fill="#dec18c" width="25" height="25" viewBox="-1.5 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M14.252 4.59a.924.924 0 0 1 .921.92v3.602a1.048 1.048 0 0 1-.916 1.017l-8.511.883a.573.573 0 0 1-.145.019.577.577 0 1 0 0 1.154h8.488a.563.563 0 1 1 0 1.126h-.91a1.03 1.03 0 1 1-1.104 0H6.849a1.03 1.03 0 1 1-1.104 0H5.6a1.703 1.703 0 1 1 0-3.406.585.585 0 0 1 .128.014L3.111 3.911H1.39a.563.563 0 1 1 0-1.125h2.09a.562.562 0 0 1 .515.337l.64 1.466h9.617z"/></svg>
  );
}
