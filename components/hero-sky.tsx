"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

// Decorative sky for the hero: clouds in light mode, stars in dark mode.
// Each layer moves at its own speed when you scroll AND when you move the
// mouse. Far layers move a lot (they lag behind), near layers move little.

type Depth = { scroll: number; mouse: number };

// ---------------------------------------------------------------------------
// Parallax plumbing

function usePointer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1); // -1 (left) .. 1 (right)
      y.set((e.clientY / window.innerHeight) * 2 - 1); // -1 (top) .. 1 (bottom)
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  // Springs make the layers glide into place instead of snapping
  return {
    x: useSpring(x, { stiffness: 40, damping: 20 }),
    y: useSpring(y, { stiffness: 40, damping: 20 }),
  };
}

function Layer({
  depth,
  pointer,
  scrollY,
  className,
  children,
}: {
  depth: Depth;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  scrollY: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(pointer.x, (v) => (reduce ? 0 : -v * depth.mouse));
  const y = useTransform([scrollY, pointer.y], ([s, p]: number[]) =>
    reduce ? 0 : Math.min(s, 900) * (depth.scroll / 900) - p * depth.mouse,
  );
  return (
    <motion.div className={`absolute inset-0 will-change-transform ${className ?? ""}`} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Clouds

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 220 90" className={`absolute ${className ?? ""}`} style={style} aria-hidden>
      <defs>
        <linearGradient id="cloud-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcecec" />
        </linearGradient>
      </defs>
      <g fill="url(#cloud-shade)">
        <circle cx="62" cy="55" r="30" />
        <circle cx="105" cy="40" r="40" />
        <circle cx="150" cy="52" r="30" />
        <circle cx="182" cy="64" r="20" />
        <rect x="36" y="55" width="166" height="30" rx="15" />
      </g>
    </svg>
  );
}

// [left %, top %, width rem, opacity]
const farClouds = [
  [4, 10, 7, 0.55], [30, 4, 6, 0.5], [56, 14, 5, 0.45], [78, 6, 7, 0.5], [90, 30, 5, 0.4],
];
const midClouds = [
  [-4, 34, 11, 0.8], [44, 26, 9, 0.7], [70, 48, 10, 0.75],
];
const nearClouds = [
  [-8, 70, 18, 0.9], [60, 78, 20, 0.85], [84, 18, 14, 0.85],
];

function cloudStyle([left, top, width, opacity]: number[]): React.CSSProperties {
  return { left: `${left}%`, top: `${top}%`, width: `${width}rem`, opacity };
}

// ---------------------------------------------------------------------------
// Stars (generated once from a fixed seed, so server and browser match)

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(count: number, seed: number, minSize: number, maxSize: number) {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 85,
    size: minSize + rand() * (maxSize - minSize),
    opacity: 0.4 + rand() * 0.6,
    delay: rand() * 5,
  }));
}

const farStars = makeStars(160, 7, 1, 2);
const midStars = makeStars(70, 21, 2, 3);
const nearStars = makeStars(18, 42, 3, 4.5);

function Stars({ stars, glow = false }: { stars: ReturnType<typeof makeStars>; glow?: boolean }) {
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-white ${glow ? "motion-safe:animate-[twinkle_4s_ease-in-out_infinite]" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            boxShadow: glow ? `0 0 ${s.size * 3}px rgb(255 255 255 / 0.8)` : undefined,
          }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------

export function HeroSky() {
  const pointer = usePointer();
  const { scrollY } = useScroll();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ---------- Light mode: three depths of clouds ---------- */}
      <Layer depth={{ scroll: 260, mouse: 8 }} pointer={pointer} scrollY={scrollY} className="dark:hidden">
        {farClouds.map((c, i) => (
          <Cloud key={i} className="blur-[1px]" style={cloudStyle(c)} />
        ))}
      </Layer>
      <Layer depth={{ scroll: 150, mouse: 20 }} pointer={pointer} scrollY={scrollY} className="dark:hidden">
        {midClouds.map((c, i) => (
          <Cloud key={i} style={cloudStyle(c)} />
        ))}
      </Layer>
      <Layer depth={{ scroll: 50, mouse: 36 }} pointer={pointer} scrollY={scrollY} className="dark:hidden">
        {nearClouds.map((c, i) => (
          <Cloud key={i} className="drop-shadow-[0_8px_16px_rgb(14_81_81/0.12)]" style={cloudStyle(c)} />
        ))}
      </Layer>

      {/* ---------- Dark mode: three depths of stars + a shooting star ---------- */}
      <Layer depth={{ scroll: 280, mouse: 6 }} pointer={pointer} scrollY={scrollY} className="hidden dark:block">
        <Stars stars={farStars} />
      </Layer>
      <Layer depth={{ scroll: 170, mouse: 14 }} pointer={pointer} scrollY={scrollY} className="hidden dark:block">
        <Stars stars={midStars} />
      </Layer>
      <Layer depth={{ scroll: 70, mouse: 26 }} pointer={pointer} scrollY={scrollY} className="hidden dark:block">
        <Stars stars={nearStars} glow />
      </Layer>
      <div className="hidden dark:block">
        <span className="absolute top-[12%] left-[20%] h-px w-28 rotate-[-18deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 motion-safe:animate-[shooting-star_9s_ease-in_infinite]" />
      </div>
    </div>
  );
}