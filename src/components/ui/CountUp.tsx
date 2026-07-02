"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  target: number;
  className?: string;
  padLength?: number;
  duration?: number;
  delay?: number;
};

export default function CountUp({
  target,
  className,
  padLength = 2,
  duration = 1,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState("0".padStart(padLength, "0"));

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(padLength, "0")),
    });

    return () => controls.stop();
  }, [isInView, target, prefersReducedMotion, duration, delay, padLength]);

  const value =
    isInView && prefersReducedMotion ? String(target).padStart(padLength, "0") : display;

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
