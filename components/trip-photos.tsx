"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { Clock, Expand, Images } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
type Props = {
  images: string[];
  title: string;
  duration: string;
  eager?: boolean;
  onOpen: (index: number) => void;
};

export function TripPhotos({ images, title, duration, eager = false, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover)");
  const inView = useInView(ref, { amount: 0.6 });

  // Touch screens: slideshow while at least 60% of the card is visible
  useEffect(() => {
    if (canHover || reduce || !inView || images.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [canHover, reduce, inView, images.length]);

  // Mouse: the position across the photo picks which photo shows
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    setActive(Math.min(images.length - 1, Math.max(0, Math.floor(x * images.length))));
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(0)}
      className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-teal-600 via-teal-800 to-teal-950"
    >
      {/* All photos are stacked; only the active one is visible, with a slow zoom */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          loading={eager && i === 0 ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className={cn(
            "object-cover transition-[opacity,scale] ease-out",
            i === active ? "scale-105 opacity-100 duration-[600ms,6000ms]" : "scale-100 opacity-0 duration-[600ms,0ms]",
          )}
        />
      ))}

      {/* Darker edges so the white labels stay readable on bright photos */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/45" />

      {images.length > 0 && (
        <>
          <span className="absolute bottom-3 left-3 ...">
            <Images className="size-3.5" /> {active + 1}/{images.length}
          </span>

          <span className="absolute right-3 bottom-3 ...">
            <Expand className="size-3.5" /> View photos
          </span>

          <button
            type="button"
            onClick={() => onOpen(active)}
            aria-label={`View ${images.length} photos of ${title}`}
            className="absolute inset-0 cursor-zoom-in ..."
          />
        </>
      )}

      <span className="absolute top-6 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        <Clock className="size-3.5" /> {duration}
      </span>

      <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        <Images className="size-3.5" /> {active + 1}/{images.length}
      </span>

      <span className="absolute right-3 bottom-3 flex translate-y-2 items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-teal-900 opacity-0 transition-all duration-300 group-hover/trip:translate-y-0 group-hover/trip:opacity-100">
        <Expand className="size-3.5" /> View photos
      </span>

      {/* The whole photo is one button that opens the gallery */}
      <button
        type="button"
        onClick={() => onOpen(active)}
        aria-label={`View ${images.length} photos of ${title}`}
        className="absolute inset-0 cursor-zoom-in outline-none focus-visible:ring-4 focus-visible:ring-marigold-400 focus-visible:ring-inset"
      />
    </div>
  );
}