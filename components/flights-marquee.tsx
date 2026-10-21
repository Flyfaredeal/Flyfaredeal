"use client";

import { Plane } from "lucide-react";
import { prefillEnquiry } from "@/lib/prefill";
import { cn } from "@/lib/utils";

type Route = {
  from: { code: string; city: string };
  to: { code: string; city: string };
  tag?: string; // optional small label, e.g. "Popular"
};

// Edit these to match the routes you actually book most.
const rowOne: Route[] = [
  { from: { code: "JFK", city: "New York" }, to: { code: "DEL", city: "Delhi" }, tag: "Popular" },
  { from: { code: "ORD", city: "Chicago" }, to: { code: "BOM", city: "Mumbai" } },
  { from: { code: "SFO", city: "San Francisco" }, to: { code: "BLR", city: "Bengaluru" } },
  { from: { code: "IAH", city: "Houston" }, to: { code: "HYD", city: "Hyderabad" } },
  { from: { code: "EWR", city: "Newark" }, to: { code: "AMD", city: "Ahmedabad" } },
  { from: { code: "DFW", city: "Dallas" }, to: { code: "DEL", city: "Delhi" } },
  { from: { code: "LAX", city: "Los Angeles" }, to: { code: "MAA", city: "Chennai" } },
  { from: { code: "IAD", city: "Washington" }, to: { code: "ATQ", city: "Amritsar" } },
];

const rowTwo: Route[] = [
  { from: { code: "JFK", city: "New York" }, to: { code: "DXB", city: "Dubai" } },
  { from: { code: "SEA", city: "Seattle" }, to: { code: "SIN", city: "Singapore" } },
  { from: { code: "ATL", city: "Atlanta" }, to: { code: "CDG", city: "Paris" } },
  { from: { code: "BOS", city: "Boston" }, to: { code: "LHR", city: "London" }, tag: "Popular" },
  { from: { code: "LAX", city: "Los Angeles" }, to: { code: "BKK", city: "Bangkok" } },
  { from: { code: "ORD", city: "Chicago" }, to: { code: "COK", city: "Kochi" } },
  { from: { code: "SFO", city: "San Francisco" }, to: { code: "CCU", city: "Kolkata" } },
  { from: { code: "MIA", city: "Miami" }, to: { code: "CUN", city: "Cancún" } },
];

export function FlightsMarquee() {
  return (
    <section aria-labelledby="routes-heading" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="routes-heading" className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Flights we book every day
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Domestic and international, one-way or round trip. Tap a route to get a quote.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <MarqueeRow routes={rowOne} />
        <MarqueeRow routes={rowTwo} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ routes, reverse = false }: { routes: Route[]; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "group/marquee overflow-hidden",
        // Soft fade at both edges
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        // Reduced motion: no animation, just a row you can scroll sideways
        "motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]",
      )}
    >
      {/* Two identical sets side by side; the track slides by exactly one set, then loops */}
      <div
        className={cn(
          "flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <RouteSet routes={routes} />
        <RouteSet routes={routes} duplicate />
      </div>
    </div>
  );
}

function RouteSet({ routes, duplicate = false }: { routes: Route[]; duplicate?: boolean }) {
  return (
    // pr-3 (not gap on the track) keeps spacing identical across the loop seam
    <ul aria-hidden={duplicate || undefined} className={cn("flex shrink-0 gap-3 pr-3", duplicate && "motion-reduce:hidden")}>
      {routes.map((route) => (
        <li key={`${route.from.code}-${route.to.code}`}>
          <button
            type="button"
            tabIndex={duplicate ? -1 : undefined}
            onClick={() => prefillEnquiry({ to: route.to.code })}
            aria-label={`Get a quote for ${route.from.city} to ${route.to.city}`}
            className="group/route flex items-center gap-3 rounded-2xl border border-teal-100 bg-card px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold-300 hover:shadow-lg hover:shadow-teal-950/10 focus-visible:ring-4 focus-visible:ring-marigold-400 focus-visible:outline-none dark:border-teal-800"
          >
            <Airport code={route.from.code} city={route.from.city} />

            {/* Little flight path: the plane slides across on hover */}
            <span aria-hidden className="relative w-14">
              <span className="block border-t-2 border-dashed border-teal-200 dark:border-teal-700" />
              <Plane className="absolute -top-[9px] left-0 size-4 rotate-45 text-primary transition-[left,color] duration-500 ease-out group-hover/route:left-[calc(100%-1rem)] group-hover/route:text-marigold-500" />
            </span>

            <Airport code={route.to.code} city={route.to.city} />

            {route.tag && (
              <span className="ml-1 rounded-full bg-marigold-100 px-2 py-0.5 text-[11px] font-semibold text-marigold-700 dark:bg-marigold-500/20 dark:text-marigold-300">
                {route.tag}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Airport({ code, city }: { code: string; city: string }) {
  return (
    <span className="flex flex-col leading-tight">
      <span className="text-base font-bold tracking-wide text-foreground">{code}</span>
      <span className="text-xs whitespace-nowrap text-muted-foreground">{city}</span>
    </span>
  );
}