import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/config/siteConfig";

export default function Experience() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
              {experience.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl lg:pt-2">
              {experience.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {experience.images.map((image, i) => (
            <Reveal key={image.src} delay={0.05 * i} className={i === 0 ? "col-span-2 sm:col-span-1" : undefined}>
              <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-line">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
