"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { topics, topicsIntro } from "@/config/siteConfig";

export default function Topics() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="temas" className="relative scroll-mt-24 bg-ink px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
            {topicsIntro.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-4 max-w-2xl text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            {topicsIntro.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <Reveal key={topic.title} delay={0.05 * i}>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink-soft p-8 transition-colors duration-300 hover:border-gold/50"
              >
                <div>
                  <span className="font-display text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-medium leading-snug text-paper">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {topic.subtitle}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="mt-8 flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13L13 3M13 3H5M13 3V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
