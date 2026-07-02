import Reveal from "@/components/ui/Reveal";
import ParticleField from "@/components/ui/ParticleField";
import { problem } from "@/config/siteConfig";

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <ParticleField density={12} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl lg:text-6xl">
            {problem.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {problem.body}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-16 text-xs font-medium tracking-[0.3em] text-gold uppercase">
            {problem.painsLabel}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {problem.pains.map((pain, i) => (
            <Reveal key={pain} delay={0.05 * i}>
              <div className="group flex h-full flex-col justify-between gap-8 bg-ink-soft p-8 transition-colors duration-300 hover:bg-surface">
                <span className="font-display text-5xl text-gold/40 transition-colors duration-300 group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-snug text-paper">{pain}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
