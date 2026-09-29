"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

// lucide's Plane icon points up-right; +45° makes it point along the direction of travel.
const PLANE_OFFSET = 45;

type PlaneCursorSectionProps = React.ComponentProps<"section">;

/**
 * A <section> whose mouse cursor becomes a plane that turns toward where it's flying.
 * Any element inside with `data-plane-hover` makes the plane grow and turn marigold while hovered.
 * Any element with `data-plane-off` (forms, inputs) hides the plane and shows the normal cursor.
 * Mouse only: touch devices and reduced-motion users keep the normal cursor.
 */
export function PlaneCursorSection({
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...rest
}: PlaneCursorSectionProps) {
  const reduce = useReducedMotion();
  const [cursorOn, setCursorOn] = useState(false);
  const [active, setActive] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  // Position and heading, smoothed with springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const heading = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const sHeading = useSpring(heading, { stiffness: 180, damping: 18 });
  const rotate = useTransform(sHeading, (a) => a + PLANE_OFFSET);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    onPointerMove?.(e);
    if (reduce || e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;

    // Inside a data-plane-off zone (e.g. a form): hide the plane, normal cursor shows
    if ((e.target as Element).closest?.("[data-plane-off]")) {
      if (cursorOn) setCursorOn(false);
      if (active) setActive(false);
      last.current = { x: nx, y: ny };
      return;
    }
    const dx = nx - last.current.x;
    const dy = ny - last.current.y;

    // Turn toward the direction of movement (ignore tiny jitters)
    if (Math.hypot(dx, dy) > 3) {
      const target = (Math.atan2(dy, dx) * 180) / Math.PI;
      const current = heading.get();
      const diff = ((((target - current) % 360) + 540) % 360) - 180; // shortest way round
      heading.set(current + diff);
    }
    last.current = { x: nx, y: ny };

    if (!cursorOn) {
      // Appear right at the mouse on entry instead of flying in from the corner
      sx.jump(nx);
      sy.jump(ny);
      setCursorOn(true);
    }
    x.set(nx);
    y.set(ny);

    // Highlight while over anything marked data-plane-hover
    const overTarget = !!(e.target as Element).closest?.("[data-plane-hover]");
    if (overTarget !== active) setActive(overTarget);
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLElement>) {
    onPointerLeave?.(e);
    setCursorOn(false);
    setActive(false);
  }

  return (
    <section
      {...rest}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden",
        !reduce && "[@media(hover:hover)]:cursor-none [&_[data-plane-off]]:cursor-auto",
        className,
      )}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          animate={{ opacity: cursorOn ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute top-0 left-0 z-50 hidden [@media(hover:hover)]:block"
        >
          <motion.div
            style={{ rotate }}
            animate={{ scale: active ? 1.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={cn(
              "-mt-4 -ml-4 grid size-8 place-items-center rounded-full transition-colors duration-300",
              active
                ? "bg-marigold-400 text-teal-950 shadow-lg shadow-marigold-500/30"
                : "bg-primary text-primary-foreground",
            )}
          >
            <Plane className="size-4" />
          </motion.div>
        </motion.div>
      )}

      {children}
    </section>
  );
}