import { z } from "zod";

// One place that defines what a valid enquiry looks like.
// The server action uses it; the form shows its messages.

const cabins = ["Economy", "Premium economy", "Business", "First"] as const;

const iata = z.string().regex(/^[A-Z]{3}$/, "Choose an airport from the list");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date");

export const enquirySchema = z
  .object({
    tripType: z.enum(["round", "oneway"]),
    from: iata,
    to: iata,
    departDate: isoDate,
    returnDate: z.string().optional(),
    adults: z.coerce.number().int().min(1).max(9),
    children: z.coerce.number().int().min(0).max(8),
    infants: z.coerce.number().int().min(0).max(4),
    cabin: z.enum(cabins),
    name: z.string().trim().min(2, "Enter your name").max(80),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{7,20}$/, "Enter a phone number with country code"),
    email: z.email("Enter a valid email").max(120),
    notes: z.string().trim().max(500).optional(),
    consent: z.literal("on", { error: "Tick the box so we can call you back" }),
  })
  .superRefine((d, ctx) => {
    if (d.from === d.to) {
      ctx.addIssue({ code: "custom", path: ["to"], message: "Pick a different destination" });
    }
    // Allow "yesterday" in UTC so customers in any time zone can pick their own today
    const earliest = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (d.departDate < earliest) {
      ctx.addIssue({ code: "custom", path: ["departDate"], message: "Choose a future date" });
    }
    if (d.tripType === "round") {
      if (!d.returnDate || !/^\d{4}-\d{2}-\d{2}$/.test(d.returnDate)) {
        ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Choose a return date" });
      } else if (d.returnDate < d.departDate) {
        ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Return must be after departure" });
      }
    }
    if (d.infants > d.adults) {
      ctx.addIssue({ code: "custom", path: ["infants"], message: "One infant per adult" });
    }
  });

export type Enquiry = z.infer<typeof enquirySchema>;

// What the server action sends back to the form
export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[] | undefined> }
  | { status: "success"; firstName: string; route: string };