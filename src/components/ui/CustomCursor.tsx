"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const enabled = hasFinePointer && !prefersReducedMotion;
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]")) setHovering(true);
    }
    function handleOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hover]")) setHovering(false);
    }

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-gold"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 68 : 14,
        height: hovering ? 68 : 14,
        backgroundColor: hovering ? "var(--gold)" : "rgba(201, 161, 90, 0)",
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="text-[10px] font-medium uppercase tracking-wide text-ink"
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        Ir
      </motion.span>
    </motion.div>
  );
}
