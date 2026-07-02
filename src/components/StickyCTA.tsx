"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, hero } from "@/config/siteConfig";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop floating CTA */}
          <motion.a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 hidden items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium tracking-wide text-ink uppercase shadow-lg shadow-black/30 transition-colors hover:bg-gold-bright md:inline-flex"
          >
            {hero.primaryCta}
          </motion.a>

          {/* Mobile bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 p-3 backdrop-blur md:hidden"
          >
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-medium tracking-wide text-ink uppercase"
            >
              {hero.primaryCta}
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
