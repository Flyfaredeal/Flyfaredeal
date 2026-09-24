"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";

// Three.js only runs in the browser, and only loads on large screens.
const HeroGlobe = dynamic(() => import("./hero-globe"), { ssr: false });

export function HeroBackground() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!isDesktop) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-10 -right-20 size-152 animate-in fade-in duration-1000 xl:right-0"
    >
      <HeroGlobe />
    </div>
  );
}