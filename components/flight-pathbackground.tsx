"use client";

import { useEffect, useId, useRef } from "react";
import { MapPin, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

// All paths are drawn in a 1200 x 600 box. Give the component a 2:1 size (e.g. w-72 h-36) so nothing stretches.
// Every path starts bottom-left (where the pin sits) and ends top-right.
const VB_W = 1200;
const VB_H = 600;

export const FLIGHT_PATHS = {
  // Pin, little loop, swoop, heart, climb out
  heart:
    "M 60 470 " +
    "C 140 470 190 380 160 345 " +
    "C 130 310 90 360 130 400 " +
    "C 190 460 380 470 490 420 " +
    "C 550 395 590 370 600 330 " +
    "C 480 240 510 110 600 170 " +
    "C 690 110 720 240 600 330 " +
    "C 570 370 650 410 770 370 " +
    "C 910 320 1010 230 1140 110",

  // One clean take-off curve
  swoop: "M 60 500 C 450 520 750 380 1140 100",

  // Gentle up-and-down waves
  wave:
    "M 60 450 " +
    "C 200 250 300 250 400 400 " +
    "S 600 550 700 350 " +
    "S 900 150 1000 300 " +
    "S 1100 250 1140 100",

  // A single big loop-the-loop in the middle
  loop:
    "M 60 480 " +
    "C 300 480 500 450 600 360 " +
    "C 700 270 700 140 600 140 " +
    "C 500 140 480 280 620 330 " +
    "C 800 390 1000 250 1140 100",

  // Two smaller loops along the way
  loops:
    "M 60 480 " +
    "C 250 480 330 400 300 320 " +
    "C 270 250 190 300 230 370 " +
    "C 280 450 520 460 650 380 " +
    "C 760 310 740 220 680 230 " +
    "C 620 240 640 330 720 330 " +
    "C 850 330 1000 230 1140 100",

  // Figure-eight in the middle
  infinity:
    "M 60 480 " +
    "C 250 480 450 400 600 300 " +
    "C 650 230 780 230 780 300 " +
    "C 780 370 650 370 600 300 " +
    "C 550 230 420 230 420 300 " +
    "C 420 370 550 370 600 300 " +
    "C 650 230 900 180 1140 100",

  // Three hops, like a trip with layovers
  hops:
    "M 60 480 " +
    "Q 240 240 420 420 " +
    "Q 600 200 780 360 " +
    "Q 960 140 1140 100",
} as const;

export type FlightPathVariant = keyof typeof FLIGHT_PATHS;

// When the flight runs, as fractions of the viewport height measured from the top.
// Starts when the section's top edge scrolls up to 85% of the screen (just entered),
// lands when it reaches 20% (heading near the top, corner still visible).
const START = 0.85;
const END = 0.2;

type FlightPathProps = {
  /** Which preset route to fly. */
  variant?: FlightPathVariant;
  /** Your own SVG path (in the 1200 x 600 box). Overrides `variant`. */
  path?: string;
  className?: string;
};

/**
 * Small decorative route: a plane flies along a dashed path (drawing it as it goes)
 * while the closest <section> scrolls into view. Position it with `className`.
 */
export function FlightPathBackground({ variant = "heart", path, className }: FlightPathProps) {
  const d = path ?? FLIGHT_PATHS[variant];
  const maskId = `flight-trail-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pathEl = pathRef.current;
    const trail = trailRef.current;
    const plane = planeRef.current;
    const pin = pinRef.current;
    const section = wrap?.closest("section") ?? wrap?.parentElement;
    if (!wrap || !pathEl || !trail || !plane || !pin || !section) return;

    const total = pathEl.getTotalLength();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trail.style.strokeDasharray = `${total}`;
    let w = 0;
    let h = 0;
    let frame = 0;

    const toScreen = (p: DOMPoint) => ({ x: (p.x / VB_W) * w, y: (p.y / VB_H) * h });

    const render = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top;
      const vh = window.innerHeight;

      const raw = (vh * START - top) / (vh * (START - END));
      const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, raw));
      const len = progress * total;

      // Reveal the dashed route up to the plane.
      trail.style.strokeDashoffset = `${total - len}`;

      const p = toScreen(pathEl.getPointAtLength(len));
      const a = toScreen(pathEl.getPointAtLength(Math.max(0, len - 2)));
      const b = toScreen(pathEl.getPointAtLength(Math.min(total, len + 2)));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

      // lucide's Plane points to the top right (-45deg), so add 45 to face the direction of travel.
      plane.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${angle + 45}deg)`;
    };

    const measure = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      const start = toScreen(pathEl.getPointAtLength(0));
      pin.style.transform = `translate(${start.x}px, ${start.y}px) translate(-50%, -100%)`;
      render();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [d]); // re-measure when the path changes

  return (
    <div ref={wrapRef} aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 size-full text-primary">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VB_W} height={VB_H}>
            <path ref={trailRef} d={d} fill="none" stroke="white" strokeWidth={40} strokeLinecap="round" />
          </mask>
        </defs>

        {/* Faint full route, so you can see where it's heading */}
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="4 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-15"
        />

        {/* Travelled part, revealed behind the plane */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="4 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          mask={`url(#${maskId})`}
          className="opacity-70"
        />
      </svg>

      <div ref={pinRef} className="absolute top-0 left-0 text-primary/70">
        <MapPin className="size-4" strokeWidth={2} />
      </div>

      <div ref={planeRef} className="absolute top-0 left-0 text-primary will-change-transform">
        <Plane className="size-5 fill-current" strokeWidth={1.5} />
      </div>
    </div>
  );
}