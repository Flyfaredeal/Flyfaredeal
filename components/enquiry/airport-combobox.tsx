"use client";

import { type Airport, airports, matchesAirport } from "@/lib/airports";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Props = {
  id: string;
  label: string;
  name: string; // form field name; the selected airport's code is submitted
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  align?: "left" | "right";
  error?: string;
};

export function AirportCombobox({ id, label, name, value, onChange, align = "left", error }: Props) {
  const right = align === "right";

  return (
    <div className={cn("min-w-0", right && "sm:text-right")}>
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>

      {/* Big boarding-pass code, e.g. DEL */}
      <div
        aria-hidden
        className={cn(
          "text-4xl font-extrabold tracking-tight sm:text-5xl",
          value ? "text-primary" : "text-mist-300",
        )}
      >
        {value?.code ?? "---"}
      </div>

      <Combobox
        items={airports}
        value={value}
        onValueChange={onChange}
        itemToStringLabel={(a: Airport) => a.city}
        itemToStringValue={(a: Airport) => a.code}
        isItemEqualToValue={(a: Airport, b: Airport) => a.code === b.code}
        filter={matchesAirport}
        limit={8}
        autoHighlight
        name={name}
      >
        <ComboboxInput
          id={id}
          placeholder="City or airport"
          showTrigger={false}
          aria-invalid={!!error}
          onFocus={(e) => e.currentTarget.select()}
          className={cn("mt-1 w-full", right && "sm:[&_input]:text-right")}
        />
        <ComboboxContent align={right ? "end" : "start"} className="min-w-72">
          <ComboboxEmpty>No airports found.</ComboboxEmpty>
          <ComboboxList>
            {(a: Airport) => (
              <ComboboxItem key={a.code} value={a} className="gap-3 py-2">
                <span className="w-9 shrink-0 font-bold text-primary">{a.code}</span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{a.city}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {a.name}, {a.country}
                  </span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}