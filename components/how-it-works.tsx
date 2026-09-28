"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Tell us your trip",
    body: "Share your route, dates and who's travelling. It takes less than a minute.",
  },
  {
    title: "We find your fare",
    body: "A travel expert compares fares across airlines and calls you with the best options.",
  },
  {
    title: "Book and fly",
    body: "Choose your flight over the phone and get your e-ticket by email.",
  },
];

// lucide's Plane icon points up-right; +45° makes it point along the direction of travel.
// If the nose ever looks off, this is the number to tweak.
const PLANE_OFFSET = 45;

export function HowItWorks() {
  const reduce = useReducedMotion();
  const [cursorOn, setCursorOn] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  // Plane cursor position and heading, smoothed with springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const heading = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const sHeading = useSpring(heading, { stiffness: 180, damping: 18 });
  const rotate = useTransform(sHeading, (a) => a + PLANE_OFFSET);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return; // mouse only, no effect on touch
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    const dx = nx - last.current.x;
    const dy = ny - last.current.y;

    // Turn the plane towards where the mouse is heading (ignore tiny jitters)
    if (Math.hypot(dx, dy) > 3) {
      const target = (Math.atan2(dy, dx) * 180) / Math.PI;
      const current = heading.get();
      const diff = ((((target - current) % 360) + 540) % 360) - 180; // shortest way round
      heading.set(current + diff);
    }

    last.current = { x: nx, y: ny };
    if (!cursorOn) {
      // Jump straight to the mouse on entry instead of flying in from the corner
      sx.jump(nx);
      sy.jump(ny);
      setCursorOn(true);
    }
    x.set(nx);
    y.set(ny);
  }

  function onPointerLeave() {
    setCursorOn(false);
    setActiveStep(null);
  }

  return (
    <section
      id="how-it-works"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "relative scroll-mt-16 overflow-hidden bg-teal-50 py-16 sm:py-20 dark:bg-teal-900/40",
        !reduce && "[@media(hover:hover)]:cursor-none",
      )}
    >
      {/* Plane cursor (mouse only) */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          animate={{ opacity: cursorOn ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute top-0 left-0 z-20 hidden [@media(hover:hover)]:block"
        >
          <motion.div
            style={{ rotate }}
            animate={{ scale: activeStep !== null ? 1.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={cn(
              "-mt-4 -ml-4 grid size-8 place-items-center rounded-full transition-colors duration-300",
              activeStep !== null ? "bg-marigold-400 text-teal-950 shadow-lg shadow-marigold-500/30" : "bg-primary text-primary-foreground",
            )}
          >
            <Plane className="size-4" />
          </motion.div>
        </motion.div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">How it works</h2>

        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              onPointerEnter={() => setActiveStep(i)}
              onPointerLeave={() => setActiveStep(null)}
              className="group/step -m-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-lg hover:shadow-teal-950/5 dark:hover:bg-teal-900/60"
            >
              <div className="flex items-center gap-4">
                {/* Step number: turns marigold with a soft pulse ring on hover */}
                <span className="relative grid size-10 shrink-0 place-items-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-2 ring-marigold-400 opacity-0 group-hover/step:opacity-100 motion-safe:group-hover/step:animate-ping"
                  />
                  <span className="relative grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all duration-300 group-hover/step:scale-110 group-hover/step:bg-marigold-400 group-hover/step:text-teal-950">
                    {i + 1}
                  </span>
                </span>

                {/* Dashed "flight path": fills in and a plane flies along it on hover (desktop) */}
                {i < steps.length - 1 && (
                  <span aria-hidden className="relative hidden flex-1 md:block">
                    <span className="block border-t-2 border-dashed border-teal-300 dark:border-teal-700" />
                    <span className="absolute inset-x-0 top-0 origin-left scale-x-0 border-t-2 border-marigold-400 transition-transform duration-700 ease-out group-hover/step:scale-x-100" />
                    <Plane className="absolute -top-2.25 left-0 size-5 rotate-45 text-marigold-500 opacity-0 transition-[left,opacity] duration-700 ease-out group-hover/step:left-[calc(100%-1.25rem)] group-hover/step:opacity-100" />
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground transition-colors duration-300 group-hover/step:text-primary">
                {step.title}
              </h3>
              <p className="mt-1 max-w-xs text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}