import { authority } from "@/config/siteConfig";

export default function AuthorityStrip() {
  const items = [...authority, ...authority];

  return (
    <section
      aria-label="Credenciales"
      className="relative overflow-hidden border-y border-line bg-ink-soft py-6"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((label, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm font-medium tracking-wide text-muted sm:text-base">
              {label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
