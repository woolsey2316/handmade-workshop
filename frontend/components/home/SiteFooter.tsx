import Image from "next/image";

const payments = [
  "/master_card.jpg",
  "/visa.jpg",
  "/paypal.jpg",
  "/weston_union.jpg",
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-[#2b2b2b] text-[#cfcfcf]">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/banner-31.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Handmade Workshop"
              width={160}
              height={64}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#bdbdbd]">
              Letterpress, gold foil stamping, and more. Quality, sustainable
              materials like thick 100% PCW paper and veg-based inks.
            </p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
              Information
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "About Us",
                "Delivery Information",
                "Privacy policy",
                "Terms & Conditions",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-accent">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
              Extras
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {["Brands", "Gift Vouchers", "Affiliates", "Specials", "Site Map"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-accent">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
              Contact us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Great Store London Oxford Street, 012 United Kingdom.</li>
              <li>
                <a
                  href="mailto:emailgreatstore@gmail.com"
                  className="transition-colors hover:text-accent"
                >
                  emailgreatstore@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+9234567890"
                  className="transition-colors hover:text-accent"
                >
                  (+92) 3456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-5 text-xs text-[#9a9a9a] md:flex-row">
        <p>© Copyright 2015. Powered by Next.js · Theme inspired by G5Theme</p>
        <div className="flex items-center gap-2">
          {payments.map((src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={40}
              height={24}
              className="h-6 w-auto rounded-sm bg-white object-contain p-0.5"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
