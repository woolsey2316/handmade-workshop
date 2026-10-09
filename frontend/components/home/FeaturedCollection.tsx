import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function FeaturedCollection() {
  const featured = products.slice(0, 8);

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
              Shop Featured Collection
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
              New Arrivals
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-right">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((product) => (
            <div key={product.id} className="min-w-[220px] max-w-[220px] shrink-0 md:min-w-[240px] md:max-w-[240px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
