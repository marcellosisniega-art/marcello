import Reveal from "@/components/ui/Reveal";
import { promise } from "@/config/siteConfig";

export default function SpeakerPromise() {
  return (
    <section className="relative bg-ink-soft px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl lg:text-6xl">
              {promise.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl lg:pt-2">
              {promise.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {promise.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.08 * i}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/10 group-hover:via-transparent group-hover:to-transparent" />
                <span className="font-display text-sm tracking-widest text-gold">
                  {pillar.number}
                </span>
                <h3 className="font-display mt-4 text-3xl font-medium text-paper">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
