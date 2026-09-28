"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { trips } from "@/lib/trips";
import { TripCard } from "./trip-card"; // adjust the path to wherever trip-card.tsx lives

export function TripsSection() {
  return (
    <section id="trips" className="scroll-mt-16 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Carousel opts={{ align: "start" }} aria-label="Trip ideas">
          {/* ...heading + arrows unchanged... */}

          <CarouselContent className="mt-8">
            {trips.map((trip, i) => (
              <CarouselItem key={trip.title} className="basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <TripCard trip={trip} eager={i < 2} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}