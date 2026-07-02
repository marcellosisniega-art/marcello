import Reveal from "@/components/ui/Reveal";
import { socialProof } from "@/config/siteConfig";

export default function SocialProof() {
  return (
    <section className="relative bg-ink px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            {socialProof.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {socialProof.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {socialProof.testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.author} delay={0.08 * i}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-ink-soft p-8">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-base leading-relaxed text-paper">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="text-xs font-medium tracking-[0.1em] text-muted uppercase">
                  {testimonial.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
