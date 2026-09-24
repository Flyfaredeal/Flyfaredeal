"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  name: string; // submitted as yyyy-MM-dd
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate: Date; // no earlier dates can be picked
  open?: boolean; // optional: let the parent open it
  onOpenChange?: (open: boolean) => void;
  error?: string;
};

export function DateField({ id, label, name, value, onChange, minDate, open, onOpenChange, error }: Props) {
  // Works both ways: the parent can control "open", or the field handles it itself
  const [ownOpen, setOwnOpen] = useState(false);
  const isOpen = open ?? ownOpen;
  const setOpen = onOpenChange ?? setOwnOpen;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              aria-invalid={!!error}
              className={cn(
                "mt-1 h-10 w-full justify-start gap-2 px-3 font-medium",
                !value && "font-normal text-muted-foreground",
              )}
            />
          }
        >
          <CalendarDays className="text-muted-foreground" />
          {value ? format(value, "EEE, d MMM") : "Pick a date"}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            defaultMonth={value ?? minDate}
            disabled={{ before: minDate }}
            startMonth={minDate}
            className="[--cell-size:--spacing(9)]"
          />
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={value ? format(value, "yyyy-MM-dd") : ""} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}