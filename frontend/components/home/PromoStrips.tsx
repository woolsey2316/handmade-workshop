const promos = [
  {
    title: (
      <>
        FREE SHIPPING, <strong>EVERY DAY, EVERY ORDER</strong>
      </>
    ),
    detail: "use code FREESHIP | details",
  },
  {
    title: (
      <>
        <strong>LASTDAY ONLINE ONLY</strong>
      </>
    ),
    detail: (
      <>
        Take <strong>$75 OFF</strong> Your #300 Order use code SAKS41 | details
      </>
    ),
  },
  {
    title: (
      <>
        Get <strong>SAKSFIRST DOUBLE POINTS</strong>
      </>
    ),
    detail: "when you shop beauty & fragrance online & in stores | shop now",
  },
];

export function PromoStrips() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {promos.map((promo, i) => (
          <a
            key={i}
            href="#"
            className="group px-6 py-8 text-center transition-colors hover:bg-[#fafafa] md:px-8"
          >
            <p className="text-[13px] leading-relaxed text-ink [&_strong]:font-semibold">
              {promo.title}
            </p>
            <p className="mt-2 text-[12px] text-muted transition-colors group-hover:text-accent">
              {promo.detail}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
