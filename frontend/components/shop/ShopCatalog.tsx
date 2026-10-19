"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/home/ProductCard";
import { shopProducts, sortOptions, type Product } from "@/lib/products";

const PER_PAGE = 12;

function effectivePrice(product: Product) {
  if (product.salePrice && product.salePrice < product.price) {
    return product.salePrice;
  }
  return product.price;
}

function sortProducts(list: Product[], sort: string) {
  const next = [...list];
  switch (sort) {
    case "popularity":
      return next.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "rating":
      return next.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "latest":
      return next.reverse();
    case "price-asc":
      return next.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return next.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    default:
      return next;
  }
}

export function ShopCatalog() {
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => sortProducts(shopProducts, sort), [sort]);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = sorted.slice(start, start + PER_PAGE);
  const showingFrom = total === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PER_PAGE, total);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Showing {showingFrom}–{showingTo} of {total} results
        </p>
        <label className="inline-flex items-center gap-2 text-sm text-muted">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-gold"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Shop pagination"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
            n === currentPage ? (
              <span
                key={n}
                className="inline-flex h-9 w-9 items-center justify-center bg-gold text-sm text-white"
              >
                {n}
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-sm text-ink transition-colors hover:border-gold hover:text-gold"
              >
                {n}
              </button>
            ),
          )}
        </nav>
      )}
    </div>
  );
}
