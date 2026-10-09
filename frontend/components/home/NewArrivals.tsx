"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const tabs = ["Birthday Gifts", "Personal", "Special Goods"] as const;

export function NewArrivals() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Birthday Gifts");

  const filtered = useMemo(
    () => products.filter((p) => p.category === active).slice(0, 8),
    [active],
  );

  return (
    <section className="bg-[#fafafa] py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-10 text-center">
          <p className="font-[family-name:var(--font-script)] text-3xl text-accent">
            Discover
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            New Arrivals
          </h2>
          <div className="mx-auto mt-4 h-px w-14 bg-accent" />
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`px-2 py-1 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${
                active === tab
                  ? "text-accent"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
