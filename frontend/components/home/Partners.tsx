import Image from "next/image";

const partners = [
  "/partner-1.jpg",
  "/partner-2.jpg",
  "/partner-3.jpg",
  "/partner-4.jpg",
  "/partner-5.jpg",
];

export function Partners() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-8 px-5 md:gap-12">
        {partners.map((src) => (
          <div
            key={src}
            className="relative h-10 w-28 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-12 md:w-32"
          >
            <Image
              src={src}
              alt="Partner logo"
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
