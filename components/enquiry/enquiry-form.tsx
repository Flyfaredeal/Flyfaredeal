"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { format, isBefore, startOfToday } from "date-fns";
import { ArrowLeft, ArrowLeftRight, CircleCheck, Loader2, Phone, Plane } from "lucide-react";
import { toast } from "sonner";
import { submitEnquiry } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Airport, findAirport } from "@/lib/airports";
import type { EnquiryState } from "@/lib/enquiry";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AirportCombobox } from "./airport-combobox";
import { DateField } from "./date-field";
import { TravellersField, type Travellers } from "./travellers-field";
import { onPrefill, type Prefill } from "@/lib/prefill";

type TripType = "round" | "oneway";

const initialState: EnquiryState = { status: "idle" };
const tripFields = ["from", "to", "departDate", "returnDate", "infants"];

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  // After "Plan another trip" we hide the old result and show a fresh form
  const [dismissed, setDismissed] = useState<EnquiryState | null>(null);
  const current = state === dismissed ? initialState : state;
  // Latest route picked from "Popular routes" (a new object each time)
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  useEffect(
    () =>
      onPrefill((detail) => {
        setPrefill({ ...detail });
        setDismissed(state); // if the success card is showing, go back to the form
      }),
    [state],
  );

  useEffect(() => {
    if (state.status === "success") toast.success("Request sent. We'll call you soon.");
    if (state.status === "error") toast.error(state.message);
  }, [state]);

  if (current.status === "success") {
    return <Success firstName={current.firstName} route={current.route} onReset={() => setDismissed(state)} />;
  }

  return <TripForm state={current} formAction={formAction} pending={pending} prefill={prefill} />;
}

function TripForm({
  state,
  formAction,
  pending,
  prefill,
}: {
  state: EnquiryState;
  formAction: (formData: FormData) => void;
  pending: boolean;
  prefill: Prefill | null;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [attempted, setAttempted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [tripType, setTripType] = useState<TripType>("round");
  const [from, setFrom] = useState<Airport | null>(() => findAirport(prefill?.from) ?? null);
  const [to, setTo] = useState<Airport | null>(() => findAirport(prefill?.to) ?? null);
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [returnOpen, setReturnOpen] = useState(false);
  const [travellers, setTravellers] = useState<Travellers>({
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
  });

  const today = startOfToday();
  const pax = travellers.adults + travellers.children + travellers.infants;

  function pickDepart(date: Date | undefined) {
    setDepartDate(date);
    // A return before the new departure no longer makes sense
    if (date && returnDate && isBefore(returnDate, date)) setReturnDate(undefined);
    // Round trip: open the return calendar straight away
    if (date && tripType === "round" && !returnDate) setReturnOpen(true);
  }

  // Step 1 checks. They're worked out on every render, but only shown after the
  // first "Find my fare" click, so each message disappears as soon as it's fixed.
  const tripErrors: Record<string, string> = {};
  if (!from) tripErrors.from = "Choose where you're flying from";
  if (!to) tripErrors.to = "Choose your destination";
  if (from && to && from.code === to.code) tripErrors.to = "Pick a different destination";
  if (!departDate) tripErrors.departDate = "Choose a date";
  if (tripType === "round" && !returnDate) tripErrors.returnDate = "Choose a return date";
  // Errors the server sent back (it checks everything again)
  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const err = (field: string) => (attempted ? tripErrors[field] : undefined) ?? serverErrors[field]?.[0];

  // If the server rejected a trip field, take the user back to step 1 to fix it.
  // (Adjusting state while rendering, when "state" changes, is React's recommended
  // alternative to doing it in an effect.)
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error" && Object.keys(state.fieldErrors ?? {}).some((f) => tripFields.includes(f))) {
      setStep(1);
    }
  }

  // A popular route was picked: fill in From and To, keep everything else
  const [seenPrefill, setSeenPrefill] = useState(prefill);
  if (prefill !== seenPrefill) {
    setSeenPrefill(prefill);
    if (prefill) {
      setFrom(findAirport(prefill.from) ?? null);
      setTo(findAirport(prefill.to) ?? null);
      setStep(1);
    }
  }

  function goToStep2() {
    setAttempted(true);
    if (Object.keys(tripErrors).length === 0) setStep(2);
  }

  // Put the cursor in "Full name" when step 2 appears
  useEffect(() => {
    if (step === 2) nameRef.current?.focus();
  }, [step]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <form
      // We call the action ourselves instead of using action={formAction}.
      // With action={...}, React 19 clears every field after each submit,
      // so a customer who gets an error would have to retype everything.
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="relative grid rounded-2xl bg-card text-card-foreground shadow-2xl shadow-teal-950/30 lg:grid-cols-[minmax(0,1fr)_16rem]"
    >
      <input type="hidden" name="tripType" value={tripType} />

      {/* Honeypot: hidden from people and screen readers, bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* ---------- Main panel ---------- */}
      <div className="min-w-0 p-5 sm:p-7">
        {/* Step 1: the trip. Hidden (not removed) on step 2 so its values still get sent. */}
        <div hidden={step !== 1}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="radiogroup" aria-label="Trip type" className="inline-flex rounded-full bg-muted p-1">
              {(
                [
                  ["round", "Round trip"],
                  ["oneway", "One way"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={tripType === value}
                  onClick={() => setTripType(value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    tripType === value
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">Step 1 of 2</span>
          </div>

          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3 sm:gap-6">
            <AirportCombobox
              id="from-airport"
              label="From"
              name="from"
              value={from}
              error={err("from")}
              onChange={(a) => {
                setFrom(a);
                // Jump straight to "To" if it's still empty
                if (a && !to) document.getElementById("to-airport")?.focus();
              }}
            />
            <div className="pt-7 sm:pt-9">
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                aria-label="Swap origin and destination"
                onClick={swap}
                className="rounded-full text-primary"
              >
                <ArrowLeftRight />
              </Button>
            </div>
            <AirportCombobox
              id="to-airport"
              label="To"
              name="to"
              align="right"
              value={to}
              onChange={setTo}
              error={err("to")}
            />
          </div>

          <div className="mt-6 grid gap-4 border-t border-dashed pt-6 sm:grid-cols-3">
            <DateField
              id="depart-date"
              label="Depart"
              name="departDate"
              value={departDate}
              onChange={pickDepart}
              minDate={today}
              error={err("departDate")}
            />

            {tripType === "round" ? (
              <DateField
                id="return-date"
                label="Return"
                name="returnDate"
                value={returnDate}
                onChange={setReturnDate}
                minDate={departDate ?? today}
                open={returnOpen}
                onOpenChange={setReturnOpen}
                error={err("returnDate")}
              />
            ) : (
              <div className="min-w-0">
                <span className="text-xs font-medium text-muted-foreground">Return</span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTripType("round")}
                  className="mt-1 h-10 w-full justify-start border-dashed px-3 font-normal text-muted-foreground"
                >
                  Add a return
                </Button>
              </div>
            )}

            <TravellersField value={travellers} onChange={setTravellers} />
          </div>
        </div>

        {/* Step 2: contact details */}
        <div hidden={step !== 2}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-primary">Where should we send your fares?</h2>
            <span className="text-xs text-muted-foreground">Step 2 of 2</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            A travel expert checks fares across airlines and calls you back {site.callbackPromise}.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                ref={nameRef}
                id="name"
                name="name"
                autoComplete="name"
                required
                aria-invalid={!!err("name")}
                className="h-10"
              />
              <FieldError message={err("name")} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Phone (with country code)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                required
                aria-invalid={!!err("phone")}
                className="h-10"
              />
              <FieldError message={err("phone")} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={!!err("email")}
                className="h-10"
              />
              <FieldError message={err("email")} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="notes">Anything else? (optional)</Label>
              <Input id="notes" name="notes" placeholder="Flexible dates, preferred airline…" className="h-10" />
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <Checkbox id="consent" name="consent" required className="mt-0.5" />
            <Label htmlFor="consent" className="block text-xs leading-relaxed font-normal text-muted-foreground">
              I agree that {site.name} may call, text or email me about this request. Consent isn&apos;t a condition of
              purchase, and I can opt out anytime.
            </Label>
          </div>
          <FieldError message={err("consent")} />
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-5 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.message}
          </p>
        )}
      </div>

      {/* ---------- Ticket stub ---------- */}
      <div
        className={cn(
          "relative flex flex-col justify-between gap-5 rounded-b-2xl border-t-2 border-dashed border-mist-200 bg-marigold-50 p-5 sm:p-7",
          "lg:rounded-r-2xl lg:rounded-bl-none lg:border-t-0 lg:border-l-2",
          "dark:border-teal-700 dark:bg-teal-900",
          // Half-circle notches where the tear line meets the edge
          "before:absolute before:-top-3 before:-left-3 before:size-6 before:rounded-full before:bg-teal-800",
          "after:absolute after:-top-3 after:-right-3 after:size-6 after:rounded-full after:bg-teal-800",
          "lg:after:top-auto lg:after:right-auto lg:after:-bottom-3 lg:after:-left-3",
        )}
      >
        <div>
          <div className="text-xs font-medium text-muted-foreground">Your trip</div>
          <div className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-primary">
            <span className={cn(!from && "text-mist-300")}>{from?.code ?? "---"}</span>
            <Plane className="size-4 shrink-0 text-marigold-600" />
            <span className={cn(!to && "text-mist-300")}>{to?.code ?? "---"}</span>
          </div>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Dates</dt>
              <dd className="text-right font-medium">
                {departDate
                  ? `${format(departDate, "d MMM")}${tripType === "round" && returnDate ? ` – ${format(returnDate, "d MMM")}` : ""}`
                  : "Not set"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Travellers</dt>
              <dd className="text-right font-medium">
                {pax}, {travellers.cabin}
              </dd>
            </div>
          </dl>
        </div>

        {step === 1 ? (
          <Button type="button" variant="cta" onClick={goToStep2} className="h-12 w-full text-base">
            Find my fare
          </Button>
        ) : (
          <div className="grid gap-2">
            <Button type="submit" variant="cta" disabled={pending} className="h-12 w-full text-base">
              {pending && <Loader2 className="animate-spin" />}
              {pending ? "Sending…" : "Request my callback"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-primary">
              <ArrowLeft /> Edit trip
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

function Success({ firstName, route, onReset }: { firstName: string; route: string; onReset: () => void }) {
  return (
    <div role="status" className="rounded-2xl bg-card p-7 text-card-foreground shadow-2xl shadow-teal-950/30 sm:p-10">
      <CircleCheck className="size-10 text-success" />
      <h2 className="mt-4 text-2xl font-bold text-primary">Thanks, {firstName}. Your request is in.</h2>
      <p className="mt-2 max-w-prose text-muted-foreground">
        {route && <>We&apos;re checking fares for {route}. </>}
        Keep your phone nearby: a travel expert will call you {site.callbackPromise}. We&apos;ve also emailed you a copy
        of your request.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href={site.phoneHref} className={cn(buttonVariants(), "h-10 px-4")}>
          <Phone /> Call now: {site.phoneDisplay}
        </a>
        <Button variant="ghost" onClick={onReset} className="h-10 text-primary">
          Plan another trip
        </Button>
      </div>
    </div>
  );
}