"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { prefillEnquiry } from "@/lib/prefill";
import type { Trip } from "@/lib/trips";
import { cn } from "@/lib/utils";

type Props = {
  trip: Trip;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex: number;
};

export function TripGallery({ trip, open, onOpenChange, startIndex }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-4xl">
        {/* Mounted fresh on every open, so it starts on the photo that was clicked */}
        {open && <Gallery trip={trip} startIndex={startIndex} onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}

function Gallery({ trip, startIndex, onClose }: { trip: Trip; startIndex: number; onClose: () => void }) {
  const images = trip.images ?? [];
  const count = images.length;
  // [photo index, direction]: direction decides which side the next photo slides in from
  const [[index, direction], setPage] = useState<[number, number]>([startIndex, 0]);
  const reduce = useReducedMotion();

  function go(to: number) {
    setPage([(to + count) % count, to > index ? 1 : -1]);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x + info.velocity.x * 0.2; // a quick flick counts too
    if (swipe < -80) go(index + 1);
    else if (swipe > 80) go(index - 1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  }

  const slide = reduce ? 0 : 60; // how far (%) a photo travels as it slides in

  return (
    <div onKeyDown={onKeyDown} className="min-w-0">
      <div className="p-4 pr-12">
        <DialogTitle className="text-lg font-bold">{trip.title}</DialogTitle>
        <DialogDescription className="mt-1">
          {trip.places} · Photo {index + 1} of {count}
        </DialogDescription>
      </div>

      <div className="relative aspect-3/2 max-h-[65vh] w-full overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: `${d * slide}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -slide}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 32 }, opacity: { duration: 0.25 } }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${trip.title}, photo ${index + 1} of ${count}`}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="pointer-events-none object-cover select-none"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 text-teal-950 hover:bg-white"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 text-teal-950 hover:bg-white"
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition-all",
                i === index ? "ring-marigold-400" : "opacity-60 ring-transparent hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
        <Button
          variant="cta"
          className="h-10"
          onClick={() => {
            onClose();
            prefillEnquiry({ to: trip.airport });
          }}
        >
          Get flights to {trip.airport}
        </Button>
      </div>
    </div>
  );
}