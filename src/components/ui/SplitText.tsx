"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import clsx from "clsx";

type SplitTextProps = {
  text: string;
  className?: string;
  unitClassName?: string;
  splitBy?: "word" | "char";
  delay?: number;
  staggerChildren?: number;
  as?: "span" | "div";
};

export default function SplitText({
  text,
  className,
  unitClassName,
  splitBy = "word",
  delay = 0,
  staggerChildren,
  as = "span",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const units = splitBy === "char" ? Array.from(text) : text.split(" ");
  const defaultStagger = splitBy === "char" ? 0.025 : 0.07;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : (staggerChildren ?? defaultStagger),
        delayChildren: delay,
      },
    },
  };

  const unit: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 16,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const Wrapper = motion[as];

  return (
    <Wrapper
      className={clsx(className, splitBy === "char" && "whitespace-nowrap")}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {units.map((unitText, i) => (
        <motion.span key={i} variants={unit} className={clsx("inline-block", unitClassName)}>
          {unitText}
          {splitBy === "word" && i < units.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Wrapper>
  );
}
