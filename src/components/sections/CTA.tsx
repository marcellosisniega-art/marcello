import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import ParticleField from "@/components/ui/ParticleField";
import { finalCta, contact } from "@/config/siteConfig";

export default function CTA() {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden bg-ink-soft px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-b from-gold/10 via-transparent to-transparent blur-3xl" />
      <ParticleField density={12} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl lg:text-6xl">
            {finalCta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {finalCta.body}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              {finalCta.whatsappLabel}
            </MagneticButton>
            <MagneticButton href={contact.emailHref} variant="outline">
              {finalCta.emailLabel}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
