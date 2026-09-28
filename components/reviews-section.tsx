"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { type Review, reviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";

// Sample reviews only show while developing; the live site shows real ones only.
const visibleReviews = reviews.filter((r) => !r.sample || process.env.NODE_ENV !== "production");

export function ReviewsSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [selected, setSelected] = useState(0);
    const [count, setCount] = useState(0);

    // Keep the dots in sync with the carousel
    useEffect(() => {
        if (!api) return;
        const update = () => {
            setSelected(api.selectedScrollSnap());
            setCount(api.scrollSnapList().length);
        };
        update();
        api.on("select", update);
        api.on("reInit", update);
        return () => {
            api.off("select", update);
            api.off("reInit", update);
        };
    }, [api]);

    // No real reviews yet: hide the section rather than show an empty one
    if (visibleReviews.length === 0) return null;

    return (
        <section id="reviews" className="scroll-mt-16 bg-teal-50 py-16 sm:py-20 dark:bg-teal-900/40">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <Carousel setApi={setApi} opts={{ align: "start", loop: true }} aria-label="Customer reviews">
                    <div className="flex items-end justify-between gap-4">
                        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">What travelers say</h2>
                        <div className="flex shrink-0 gap-2">
                            <CarouselPrevious className="static my-0 size-10" />
                            <CarouselNext className="static my-0 size-10" />
                        </div>
                    </div>

                    <CarouselContent className="mt-8">
                        {visibleReviews.map((review, i) => (
                            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                                <ReviewCard review={review} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Dots: one per "page" of the carousel */}
                {count > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to review ${i + 1}`}
                                aria-current={i === selected}
                                onClick={() => api?.scrollTo(i)}
                                className={cn(
                                    "h-2 rounded-full transition-all",
                                    i === selected ? "w-6 bg-primary" : "w-2 bg-mist-300 hover:bg-mist-400",
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

const CLAMP_AT = 180; // characters before "Read more" appears

function ReviewCard({ review }: { review: Review }) {
    const [expanded, setExpanded] = useState(false);
    const long = review.text.length > CLAMP_AT;

    return (
        <Card className="group/review h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/10 hover:ring-primary/30">
            <CardContent className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                style={{ transitionDelay: `${i * 40}ms` }}
                                className={cn(
                                    "size-4 transition-transform duration-300 group-hover/review:scale-125",
                                    i < review.rating ? "fill-marigold-400 text-marigold-400" : "fill-mist-200 text-mist-200",
                                )}
                            />
                        ))}
                    </div>
                    {review.sample && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">Sample</span>
                    )}
                </div>
                <Quote className="mt-4 size-6 text-teal-200 transition-colors duration-300 group-hover/review:text-marigold-400 dark:text-teal-700" aria-hidden />
                <blockquote className={cn("mt-2 text-base leading-relaxed text-foreground", long && !expanded && "line-clamp-4")}>
                    {review.text}
                </blockquote>
                {long && (
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        className="mt-2 text-sm font-semibold text-primary hover:underline"
                    >
                        {expanded ? "Show less" : "Read more"}
                    </button>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-0.5">
                <div className="font-semibold text-foreground">{review.name}</div>
                <div className="text-xs text-muted-foreground">
                    {[review.location, review.trip, review.date].filter(Boolean).join(" · ")}
                    {review.source && <> · via {review.source}</>}
                </div>
            </CardFooter>
        </Card>
    );
}
