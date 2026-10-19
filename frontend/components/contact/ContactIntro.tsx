const details = [
  {
    label: "Address",
    value: "Great Store London Oxford Street, 012 United Kingdom.",
  },
  {
    label: "Email",
    value: "emailgreatstore@gmail.com",
    href: "mailto:emailgreatstore@gmail.com",
  },
  {
    label: "Phone",
    value: "(+92) 3456 7890",
    href: "tel:+9234567890",
  },
];

export function ContactIntro() {
  return (
    <div>
      <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
        Get in touch
      </h2>
      <div className="mt-4 h-px w-10 bg-gold" />
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
        Nulla mattis mi quis elit porttitor gravida. Ut ut laoreet justo.
        Suspendisse nulla ligula, aliquet sed cursus ut, sodales sit amet metus.
      </p>

      <ul className="mt-8 space-y-5">
        {details.map((item) => (
          <li key={item.label}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="mt-1 block text-sm text-ink transition-colors hover:text-gold"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-1 text-sm text-ink">{item.value}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
