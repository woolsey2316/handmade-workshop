import Image from "next/image";
import { Stars } from "@/components/ui/Stars";
import {
  categories,
  colorFilters,
  productTags,
  topRatedProducts,
} from "@/lib/products";

export function ShopSidebar() {
  return (
    <aside className="space-y-10">
      <section>
        <h2 className="font-display text-xl font-medium text-ink">
          Search the product
        </h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <form className="mt-5 flex">
          <input
            type="search"
            placeholder="Search products…"
            className="w-full border border-line px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="bg-ink px-4 text-white transition-colors hover:bg-gold"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">Categories</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href="#"
                className="flex items-center justify-between py-3 text-sm text-foreground transition-colors hover:text-gold"
              >
                <span>{category.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">
          Filter by color
        </h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 space-y-3">
          {colorFilters.map((color) => (
            <li key={color.name}>
              <a
                href="#"
                className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-gold"
              >
                <span
                  className="inline-block h-4 w-4 rounded-full border border-line"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden
                />
                <span>
                  {color.name} ({color.count})
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">Top Rated</h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <ul className="mt-5 space-y-5">
          {topRatedProducts.map((product) => (
            <li key={product.id} className="flex gap-3">
              <a
                href="#"
                className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#f4f4f4]"
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </a>
              <div className="min-w-0">
                <a
                  href="#"
                  className="line-clamp-2 text-sm font-medium text-ink transition-colors hover:text-gold"
                >
                  {product.name}
                </a>
                {product.rating !== undefined && (
                  <div className="mt-1">
                    <Stars rating={product.rating} />
                  </div>
                )}
                <p className="mt-1 text-sm font-medium text-ink">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink">
          Product Tags
        </h2>
        <div className="mt-4 h-px w-10 bg-gold" />
        <div className="mt-5 flex flex-wrap gap-2">
          {productTags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-gold hover:text-gold"
            >
              {tag}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
