import Image from "next/image";
import type { Product } from "@/lib/products";

function Stars({ rating = 0 }: { rating?: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center justify-center gap-0.5 text-[11px] text-[#f0b429]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={i < filled ? "opacity-100" : "opacity-25"}
        >
          ★
        </span>
      ))}
      <span className="sr-only">Rated {rating} out of 5</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 1000) /
        10
      : null;

  return (
    <article className="product-card group relative flex flex-col text-center">
      <div className="relative mb-4 overflow-hidden bg-[#f4f4f4]">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="product-image object-cover transition-transform duration-500"
          />
        </div>

        {(product.badge || discount) && (
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.badge && (
              <span className="bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                {product.badge}
              </span>
            )}
            {discount !== null && (
              <span className="bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                {discount}%
              </span>
            )}
          </div>
        )}

        <div className="product-actions absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-2 bg-white/95 px-3 py-3 opacity-0 transition-all duration-300">
          <button
            type="button"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
          >
            Add to Wishlist
          </button>
          <span className="text-line">|</span>
          <button
            type="button"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
          >
            Add to cart
          </button>
        </div>
      </div>

      <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-ink transition-colors group-hover:text-accent">
        <a href="#">{product.name}</a>
      </h3>
      <div className="mt-1 flex items-center justify-center gap-2 text-sm">
        {product.priceMax ? (
          <span className="font-medium text-ink">
            ${product.price.toFixed(2)} – ${product.priceMax.toFixed(2)}
          </span>
        ) : product.salePrice && product.salePrice < product.price ? (
          <>
            <span className="text-muted line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="font-medium text-accent">
              ${product.salePrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="font-medium text-ink">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>
      {product.rating !== undefined && (
        <div className="mt-1.5">
          <Stars rating={product.rating} />
        </div>
      )}
    </article>
  );
}
