import Image from "next/image";

export function PageHero({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <Image
          src="/banner-31.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>
      <div className="relative mx-auto max-w-300 px-5 py-14 text-center md:py-20">
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-4 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-line">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="transition-colors hover:text-gold">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-ink">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
