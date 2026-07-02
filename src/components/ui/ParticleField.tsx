"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";

type ParticleFieldProps = {
  /** Approximate particle count per 20,000px² of canvas area. */
  density?: number;
  /** Canvas fillStyle color for the particles. */
  color?: string;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
};

const REFERENCE_AREA = 20000;
const MAX_PARTICLES = 140;

export default function ParticleField({
  density = 12,
  color = "#c9a15a",
  className,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const lastScrollYRef = useRef(0);
  const parallaxOffsetRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const seedParticles = (width: number, height: number) => {
      const area = width * height;
      const isMobile = window.innerWidth < 768;
      const targetCount = Math.min(
        MAX_PARTICLES,
        Math.round(density * (area / REFERENCE_AREA) * (isMobile ? 0.5 : 1)),
      );

      particlesRef.current = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06 - 0.015,
        radius: 0.6 + Math.random() * 1.4,
        baseOpacity: 0.1 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      sizeRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(width, height);
    };

    const drawStatic = () => {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        context.globalAlpha = p.baseOpacity;
        context.fillStyle = color;
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      const { width, height } = sizeRef.current;
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;
      parallaxOffsetRef.current += scrollDelta * 0.12;

      context.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const drawY = (((p.y + parallaxOffsetRef.current * 0.2) % height) + height) % height;
        const flicker = 0.7 + 0.3 * Math.sin(time * 0.0006 + p.phase);

        context.globalAlpha = p.baseOpacity * flicker;
        context.fillStyle = color;
        context.beginPath();
        context.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafRef.current != null || prefersReducedMotion) return;
      lastTime = performance.now();
      lastScrollYRef.current = window.scrollY;
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    resize();
    lastScrollYRef.current = window.scrollY;

    if (prefersReducedMotion) {
      drawStatic();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) drawStatic();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, density, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={clsx("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
