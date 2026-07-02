"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import SplitText from "@/components/ui/SplitText";
import { hero, contact } from "@/config/siteConfig";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "18%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "35%"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 32,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink"
    >
      {/* Background image with parallax + cinematic zoom-out on load */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_20%] grayscale-[15%]"
        />
      </motion.div>

      {/* Gradient overlays for legibility + mood */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
      <div className="pointer-events-none absolute -top-1/3 right-0 h-[140%] w-1/2 rotate-12 bg-gradient-to-b from-gold/10 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 sm:px-10 sm:pb-28 lg:px-16"
      >
        <div className="max-w-3xl">
          <SplitText
            text={hero.eyebrow}
            as="div"
            splitBy="word"
            delay={0.15}
            className="mb-6 text-xs font-medium tracking-[0.3em] text-gold uppercase"
          />

          <h1 className="font-display text-[16vw] leading-[0.92] font-medium tracking-tight text-paper sm:text-[9vw] lg:text-[7.5vw]">
            <SplitText
              text={hero.headline[0]}
              as="div"
              splitBy="char"
              delay={0.4}
              className="block"
            />
            <SplitText
              text={hero.headline[1]}
              as="div"
              splitBy="char"
              delay={0.75}
              className="block italic text-transparent [-webkit-text-stroke:1.5px_var(--paper)] sm:[-webkit-text-stroke:2px_var(--paper)]"
            />
          </h1>

          <SplitText
            text={hero.name}
            as="div"
            splitBy="word"
            delay={1.05}
            className="mt-5 text-sm font-medium tracking-[0.25em] text-gold uppercase"
          />

          <SplitText
            text={hero.subheadline}
            as="div"
            splitBy="word"
            delay={1.2}
            className="mt-6 max-w-xl text-xl font-medium text-paper sm:text-2xl"
          />

          <motion.div
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              {hero.primaryCta}
            </MagneticButton>
            <MagneticButton href="#temas" variant="outline">
              {hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 sm:right-10 lg:right-16 md:flex"
      >
        <span className="text-xs tracking-[0.25em] text-muted uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-16 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
