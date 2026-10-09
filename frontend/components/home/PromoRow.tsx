import Image from "next/image";

export function PromoRow() {
  return (
    <section className="mx-auto grid max-w-[1200px] gap-5 px-5 py-10 md:grid-cols-2 md:py-14">
      <a
        href="#"
        className="group relative min-h-[220px] overflow-hidden bg-[#f3f3f3]"
      >
        <Image
          src="/banner-11.jpg"
          alt="Handmade gift box with fabric hearts"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
        <div className="absolute inset-0 flex flex-col justify-end p-7 text-white md:p-9">
          <p className="max-w-xs text-sm leading-relaxed text-white/90 md:text-base">
            What items do your favorite brands and bloggers love?
          </p>
          <span className="mt-4 inline-flex w-fit border border-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors group-hover:bg-white group-hover:text-ink">
            Browse Favorite
          </span>
        </div>
      </a>

      <a
        href="#"
        className="group relative min-h-[220px] overflow-hidden bg-[#f3f3f3]"
      >
        <Image
          src="/banner-2.jpg"
          alt="Hands knitting with teal yarn"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
        <div className="absolute inset-0 flex items-end p-7 md:p-9">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
            Knitting stuffs
          </h2>
        </div>
      </a>
    </section>
  );
}
