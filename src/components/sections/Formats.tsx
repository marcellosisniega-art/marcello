import Reveal from "@/components/ui/Reveal";
import { formats } from "@/config/siteConfig";

export default function Formats() {
  return (
    <section className="relative bg-ink-soft px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Formatos disponibles
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((format, i) => (
            <Reveal key={format.title} delay={0.06 * i}>
              <div className="flex h-full flex-col gap-4 bg-ink p-8 transition-colors duration-300 hover:bg-surface">
                <span className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
                  {format.duration}
                </span>
                <h3 className="font-display text-2xl font-medium text-paper">
                  {format.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{format.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
