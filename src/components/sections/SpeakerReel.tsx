"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { speakerReel, experience } from "@/config/siteConfig";

export default function SpeakerReel() {
  const backdrop = experience.images[1];
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <section className="relative bg-ink-soft px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            {speakerReel.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={cardRef}
            className="group relative mx-auto mt-14 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-line"
          >
            <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imageY }}>
              <Image
                src={backdrop.src}
                alt={backdrop.alt}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover opacity-40 blur-[1px] transition-opacity duration-500 group-hover:opacity-55"
              />
            </motion.div>
            <div className="absolute inset-0 bg-ink/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-ink/70 backdrop-blur transition-transform duration-300 group-hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5.5V18.5L19 12L8 5.5Z" fill="var(--gold)" />
                </svg>
              </span>
              <p className="text-sm font-medium tracking-[0.2em] text-paper uppercase">
                {speakerReel.body}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted">
            {speakerReel.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
