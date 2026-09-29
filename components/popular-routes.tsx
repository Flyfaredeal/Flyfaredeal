"use client";

import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { findAirport } from "@/lib/airports";
import { prefillEnquiry } from "@/lib/prefill";
import { FlightPathBackground } from "./flight-pathbackground";
// Big US departure cities, each with the Indian cities customers fly to most.
// To add a city, add its airport code (it must exist in lib/airports.ts).
const origins = ["JFK", "LAX", "ORD", "SFO", "DFW", "IAD"];
const destinations = ["DEL", "BOM", "MAA"];

export function PopularRoutes() {
  return (
    <section id="routes" className="scroll-mt-16 py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FlightPathBackground className="absolute top-0 right-6 hidden h-36 w-72 lg:block" />

        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Popular routes from the US to India</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Pick a route to start your request. You can change anything before you send it.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {origins.map((fromCode) => {
            const from = findAirport(fromCode);
            if (!from) return null;
            return (
              <li key={fromCode} className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <PlaneTakeoff className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground">From {from.city}</div>
                    <div className="text-sm text-muted-foreground">{from.code}</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {destinations.map((toCode) => {
                    const to = findAirport(toCode);
                    if (!to) return null;
                    return (
                      <button
                        key={toCode}
                        type="button"
                        onClick={() => prefillEnquiry({ from: fromCode, to: toCode })}
                        aria-label={`Get fares from ${from.city} to ${to.city}`}
                        className="group flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:border-primary/40 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <span className="min-w-0 truncate">
                          <span className="font-medium text-foreground">{to.city}</span>
                          <span className="text-muted-foreground"> · {to.code}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 font-semibold text-primary">
                          Get fares
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}