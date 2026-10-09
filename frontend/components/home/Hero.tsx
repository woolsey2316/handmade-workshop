import Image from "next/image";
import { categories } from "@/lib/products";

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-line lg:block">
          <div className="border-b border-line bg-ink px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
            Categories
          </div>
          <ul>
            {categories.map((cat) => (
              <li key={cat.name} className="border-b border-line">
                <a
                  href="#"
                  className="flex items-center justify-between px-5 py-3.5 text-sm text-foreground transition-colors hover:bg-[#fafafa] hover:text-accent"
                >
                  <span>{cat.name}</span>
                  <span className="text-muted">({cat.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
          <Image
            src="/banner-home-1.jpg"
            alt="Handmade knitting supplies arranged on wood"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="animate-soft-zoom object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className="max-w-md text-white">
              <p className="animate-fade-up font-[family-name:var(--font-script)] text-3xl text-white/90 md:text-4xl">
                Welcome
              </p>
              <h1 className="animate-fade-up delay-1 mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold md:text-5xl">
                How to decorate a birthday gift box
              </h1>
              <div className="animate-shimmer-line delay-2 mt-4 h-px w-16 bg-white/80" />
              <a
                href="#"
                className="animate-fade-up delay-3 mt-7 inline-flex items-center border border-white/80 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-ink"
              >
                View more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
