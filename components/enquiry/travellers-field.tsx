"use client";

import { ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";

export const cabinClasses = ["Economy", "Premium economy", "Business", "First"] as const;
export type Cabin = (typeof cabinClasses)[number];

export type Travellers = {
  adults: number;
  children: number;
  infants: number;
  cabin: Cabin;
};

const rows = [
  { key: "adults", label: "Adults", hint: "12+ years", min: 1, max: 9 },
  { key: "children", label: "Children", hint: "2–11 years", min: 0, max: 8 },
  { key: "infants", label: "Infants", hint: "Under 2, on lap", min: 0, max: 4 },
] as const;

export function TravellersField({ value, onChange }: { value: Travellers; onChange: (v: Travellers) => void }) {
  const total = value.adults + value.children + value.infants;

  function setCount(key: (typeof rows)[number]["key"], n: number) {
    const next = { ...value, [key]: n };
    // Airlines allow one lap infant per adult
    next.infants = Math.min(next.infants, next.adults);
    onChange(next);
  }

  return (
    <div className="min-w-0">
      <span id="travellers-label" className="text-xs font-medium text-muted-foreground">
        Travellers and cabin
      </span>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              aria-labelledby="travellers-label"
              className="mt-1 h-10 w-full justify-between px-3 font-medium"
            />
          }
        >
          <span className="truncate">
            {total} traveller{total > 1 ? "s" : ""}, {value.cabin}
          </span>
          <ChevronDown className="text-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent align="end" className="w-80 gap-4 p-4">
          <PopoverTitle className="sr-only">Travellers and cabin</PopoverTitle>

          <div className="space-y-3">
            {rows.map((r) => {
              const n = value[r.key];
              const max = r.key === "infants" ? Math.min(r.max, value.adults) : r.max;
              return (
                <div key={r.key} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.hint}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      aria-label={`Fewer ${r.label.toLowerCase()}`}
                      disabled={n <= r.min}
                      onClick={() => setCount(r.key, n - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-4 text-center font-semibold tabular-nums" aria-live="polite">
                      {n}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      aria-label={`More ${r.label.toLowerCase()}`}
                      disabled={n >= max}
                      onClick={() => setCount(r.key, n + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Cabin</div>
            <div className="grid grid-cols-2 gap-2">
              {cabinClasses.map((c) => (
                <Button
                  key={c}
                  variant={value.cabin === c ? "default" : "outline"}
                  aria-pressed={value.cabin === c}
                  onClick={() => onChange({ ...value, cabin: c })}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Values the server action will read */}
      <input type="hidden" name="adults" value={value.adults} />
      <input type="hidden" name="children" value={value.children} />
      <input type="hidden" name="infants" value={value.infants} />
      <input type="hidden" name="cabin" value={value.cabin} />
    </div>
  );
}