export function ContactMap() {
  return (
    <section className="relative h-90 w-full overflow-hidden border-b border-line bg-[#e8e4df] md:h-105">
      <iframe
        title="Store location map"
        src="https://maps.google.com/maps?q=Oxford%20Street%2C%20London&t=&z=14&ie=UTF8&iwloc=&output=embed"
        className="h-full w-full border-0 grayscale-20"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
