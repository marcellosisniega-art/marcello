"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { authority } from "@/config/siteConfig";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function AuthorityStrip() {
  const items = [...authority, ...authority];
  const prefersReducedMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 2000], [-6, 6], { clamp: true });

  const directionRef = useRef(1);
  const baseSpeed = 1.4;

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const deltaSeconds = delta / 1000;
    let moveBy = directionRef.current * baseSpeed * deltaSeconds;

    const currentVelocity = velocityFactor.get();
    if (currentVelocity !== 0) {
      directionRef.current = currentVelocity < 0 ? -1 : 1;
    }
    moveBy += directionRef.current * deltaSeconds * Math.abs(currentVelocity) * 4;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section
      aria-label="Credenciales"
      className="relative overflow-hidden border-y border-line bg-ink-soft py-6"
    >
      <motion.div
        style={{ x: prefersReducedMotion ? undefined : x }}
        className={
          prefersReducedMotion
            ? "animate-marquee flex w-max items-center gap-10 whitespace-nowrap"
            : "flex w-max items-center gap-10 whitespace-nowrap"
        }
      >
        {items.map((label, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm font-medium tracking-wide text-muted sm:text-base">
              {label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
