import Image from "next/image";

const tiles = [
  {
    title: "Giftcards",
    image: "/banner-11.jpg",
    href: "#",
  },
  {
    title: "Knitting",
    image: "/banner-2.jpg",
    href: "#",
  },
  {
    title: "Accessories",
    image: "/banner-3.jpg",
    href: "#",
  },
  {
    title: "Handmade soaps",
    image: "/banner-4.jpg",
    href: "#",
  },
];

export function CategoryTiles() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <a
            key={tile.title}
            href={tile.href}
            className="group relative min-h-[260px] overflow-hidden border-b border-line sm:border-r last:border-r-0 lg:border-b-0"
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white drop-shadow-sm">
                {tile.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
