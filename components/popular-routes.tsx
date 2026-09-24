"use client";

import { ArrowRight } from "lucide-react";
import { findAirport } from "@/lib/airports";
import { prefillEnquiry } from "@/lib/prefill";

// TODO: swap in the routes your customers ask for most
const routes: [string, string][] = [
  ["DEL", "YYZ"],
  ["ATQ", "YVR"],
  ["DEL", "JFK"],
  ["BOM", "LHR"],
  ["DEL", "DXB"],
  ["BLR", "SFO"],
];

export function PopularRoutes() {
  return (
    <section id="routes" className="scroll-mt-16 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Popular routes</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Pick a route to start your request. You can change anything before you send it.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map(([fromCode, toCode]) => {
            const from = findAirport(fromCode);
            const to = findAirport(toCode);
            if (!from || !to) return null;
            return (
              <li key={`${fromCode}-${toCode}`}>
                <button
                  type="button"
                  onClick={() => prefillEnquiry({ from: fromCode, to: toCode })}
                  className="group flex w-full items-center justify-between gap-4 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">
                      {from.city} to {to.city}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {from.code} → {to.code}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                    Get fares
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}