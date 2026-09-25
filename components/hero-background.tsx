"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Three.js only runs in the browser, and only loads on large screens.
const HeroGlobe = dynamic(() => import("./hero-globe"), { ssr: false });

export function HeroBackground() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // The globe sinks a little as you scroll, so it feels behind the form
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 160]);

  if (!isDesktop) return null;

  return (
    <motion.div
      aria-hidden
      style={{ y }}
      className="pointer-events-none absolute -top-10 -right-20 size-152 xl:right-0"
    >
      <div className="size-full animate-in fade-in duration-1000">
        <HeroGlobe tone={resolvedTheme === "dark" ? "dark" : "light"} />
      </div>
    </motion.div>
  );
}