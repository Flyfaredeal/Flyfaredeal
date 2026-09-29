"use client";

import { useEffect, useId, useRef } from "react";
import { MapPin, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

// Route drawn in a 1200 x 600 box. Give the component a 2:1 size (e.g. w-72 h-36) so nothing stretches.
// Pin + little loop -> swoop -> heart -> climb out to the top right.
const VB_W = 1200;
const VB_H = 600;
const FLIGHT_PATH =
  "M 60 470 " +
  "C 140 470 190 380 160 345 " + // curl up from the pin
  "C 130 310 90 360 130 400 " + // small loop
  "C 190 460 380 470 490 420 " + // long swoop right
  "C 550 395 590 370 600 330 " + // up to the heart's tip
  "C 480 240 510 110 600 170 " + // left lobe
  "C 690 110 720 240 600 330 " + // right lobe, back to the tip
  "C 570 370 650 410 770 370 " + // out of the heart
  "C 910 320 1010 230 1140 110"; // climb to the top right

// When the flight runs, as fractions of the viewport height measured from the top.
// Starts when the section's top edge scrolls up to 85% of the screen (just entered),
// lands when it reaches 20% (heading near the top, corner still visible).
const START = 0.85;
const END = 0.2;

/**
 * Small decorative route: a plane flies along a dashed path (drawing it as it goes)
 * while the closest <section> scrolls into view. Position it with `className`.
 */
export function FlightPathBackground({ className }: { className?: string }) {
  const maskId = `flight-trail-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const trail = trailRef.current;
    const plane = planeRef.current;
    const pin = pinRef.current;
    const section = wrap?.closest("section") ?? wrap?.parentElement;
    if (!wrap || !path || !trail || !plane || !pin || !section) return;

    const total = path.getTotalLength();
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

      const p = toScreen(path.getPointAtLength(len));
      const a = toScreen(path.getPointAtLength(Math.max(0, len - 2)));
      const b = toScreen(path.getPointAtLength(Math.min(total, len + 2)));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

      // lucide's Plane points to the top right (-45deg), so add 45 to face the direction of travel.
      plane.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${angle + 45}deg)`;
    };

    const measure = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      const start = toScreen(path.getPointAtLength(0));
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
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 size-full text-primary">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VB_W} height={VB_H}>
            <path ref={trailRef} d={FLIGHT_PATH} fill="none" stroke="white" strokeWidth={40} strokeLinecap="round" />
          </mask>
        </defs>

        {/* Faint full route, so you can see where it's heading */}
        <path
          d={FLIGHT_PATH}
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
          d={FLIGHT_PATH}
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