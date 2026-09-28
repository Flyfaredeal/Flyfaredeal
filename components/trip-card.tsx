"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { CalendarDays, Check, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prefillEnquiry } from "@/lib/prefill";
import type { Trip } from "@/lib/trips";
import { cn } from "@/lib/utils";
import { TripGallery } from "./trip-gallery";
import { TripPhotos } from "./trip-photos";

export function TripCard({ trip, eager = false }: { trip: Trip; eager?: boolean }) {
    const [flipped, setFlipped] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [photo, setPhoto] = useState(0);
    const reduce = useReducedMotion();

    // Mouse position over the card, 0..1 each way (0.5 = centre)
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const spring = { stiffness: 200, damping: 20 };
    const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
    const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
    const glareX = useTransform(px, (v) => `${v * 100}%`);
    const glareY = useTransform(py, (v) => `${v * 100}%`);
    const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.16), transparent 45%)`;

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (reduce || e.pointerType !== "mouse") return; // no tilt on touch screens
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    }

    function onPointerLeave() {
        px.set(0.5);
        py.set(0.5);
    }

    return (
        <>
            {/* Outer tilt wrapper */}
            <motion.div
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                style={{
                    rotateX: reduce ? 0 : rotateX,
                    rotateY: reduce ? 0 : rotateY,
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d",
                }}
                className="group/trip h-full"
            >
                {/* The flipper: turns 180° to show the back */}
                <motion.div
                    className="relative grid h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                >
                    {/* ---------- Front ---------- */}
                    <Card
                        inert={flipped}
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
                        className={cn(
                            "relative col-start-1 row-start-1 h-full pt-0 transition-shadow duration-300 group-hover/trip:shadow-xl group-hover/trip:shadow-teal-950/15 group-hover/trip:ring-primary/30",
                            flipped && "pointer-events-none", // the hidden side must not catch clicks
                        )}
                    >
                        <TripPhotos
                            images={trip.images ?? []}
                            title={trip.title}
                            duration={trip.duration}
                            eager={eager}
                            onOpen={(i) => { setPhoto(i); setGalleryOpen(true); }}
                        />

                        <CardHeader>
                            <CardTitle className="text-lg font-bold">{trip.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <MapPin className="size-3.5" /> {trip.places}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1">
                            <p className="text-muted-foreground">{trip.blurb}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {trip.tags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="gap-2">
                            <Button variant="outline" className="h-10" onClick={() => setFlipped(true)} aria-label={`Highlights of ${trip.title}`}>
                                <Sparkles /> Highlights
                            </Button>
                            <Button variant="cta" className="h-10 flex-1" onClick={() => prefillEnquiry({ to: trip.airport })}>
                                Get flights to {trip.airport}
                            </Button>
                        </CardFooter>

                        {/* Soft light that follows the mouse (front side only) */}
                        <motion.div
                            aria-hidden
                            style={{ background: glare }}
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/trip:opacity-100"
                        />
                    </Card>

                    {/* ---------- Back ---------- */}
                    <Card
                        inert={!flipped}
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(1px)" }}
                        className={cn("col-start-1 row-start-1 h-full", !flipped && "pointer-events-none")}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">{trip.title}</CardTitle>
                            <CardDescription>Highlights</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto">
                            <ul className="space-y-2.5">
                                {trip.highlights.map((h) => (
                                    <li key={h} className="flex gap-2.5">
                                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-primary">
                                            <Check className="size-3" />
                                        </span>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5 flex items-center gap-2 rounded-lg bg-marigold-50 px-3 py-2 text-sm dark:bg-teal-900/60">
                                <CalendarDays className="size-4 shrink-0 text-marigold-600" />
                                <span>
                                    <span className="font-semibold">Best time to go:</span> {trip.bestTime}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button variant="outline" className="h-10" onClick={() => setFlipped(false)} aria-label="Back to trip summary">
                                <RotateCcw /> Back
                            </Button>
                            <Button variant="cta" className="h-10 flex-1" onClick={() => prefillEnquiry({ to: trip.airport })}>
                                Get flights to {trip.airport}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Outside the tilting card, so moving the mouse in the gallery doesn't tilt it */}
            <TripGallery trip={trip} open={galleryOpen} onOpenChange={setGalleryOpen} startIndex={photo} />
        </>
    );
}