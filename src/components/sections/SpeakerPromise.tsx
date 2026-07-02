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
      </div>
    </section>
  );
}
