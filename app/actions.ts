"use server";

import { Resend } from "resend";
import { z } from "zod";
import { findAirport } from "@/lib/airports";
import { enquirySchema, type Enquiry, type EnquiryState } from "@/lib/enquiry";
import { site } from "@/lib/site";

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: a hidden field people never see. Bots fill in every field, so if
  // it has a value we pretend it worked and quietly drop the request.
  if (formData.get("company")) {
    return { status: "success", firstName: "there", route: "" };
  }

  // Never trust the browser: check everything again on the server
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const enquiry = parsed.data;

  try {
    await sendEmails(enquiry);
  } catch (error) {
    console.error("[enquiry] email failed", error);
    return {
      status: "error",
      message: `We couldn't send your request. Please try again or call us on ${site.phoneDisplay}.`,
    };
  }

  return {
    status: "success",
    firstName: enquiry.name.split(" ")[0],
    route: `${enquiry.from} → ${enquiry.to}`,
  };
}

// ---------------------------------------------------------------------------

function airportLabel(code: string) {
  const a = findAirport(code);
  return a ? `${a.city} (${a.code})` : code;
}

// Stop people injecting HTML into our emails through the form
function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function summaryRows(e: Enquiry): [string, string][] {
  return [
    ["Trip", e.tripType === "round" ? "Round trip" : "One way"],
    ["From", airportLabel(e.from)],
    ["To", airportLabel(e.to)],
    ["Depart", e.departDate],
    ...(e.tripType === "round" ? ([["Return", e.returnDate ?? ""]] as [string, string][]) : []),
    ["Travellers", `${e.adults} adult(s), ${e.children} child(ren), ${e.infants} infant(s)`],
    ["Cabin", e.cabin],
    ["Name", e.name],
    ["Phone", e.phone],
    ["Email", e.email],
    ["Notes", e.notes || "—"],
  ];
}

function tableHtml(rows: [string, string][]) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5f6868">${label}</td>` +
        `<td style="padding:6px 0;font-weight:600;color:#262d2d">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${body}</table>`;
}

async function sendEmails(e: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL; // e.g. "Fly Fare Deal <bookings@flyfaredeal.com>"
  const to = process.env.ENQUIRY_TO_EMAIL; // e.g. "info@flyfaredeal.com"
  const rows = summaryRows(e);

  // Not set up yet (local development): print instead of sending
  if (!apiKey || !from || !to) {
    console.log("[enquiry] email not configured. Would have sent:", Object.fromEntries(rows));
    return;
  }

  const resend = new Resend(apiKey);

  // 1. To your team. Must succeed, otherwise the customer sees an error.
  const team = await resend.emails.send({
    from,
    to,
    replyTo: e.email, // hitting "Reply" answers the customer directly
    subject: `Fare request: ${e.from} → ${e.to}, ${e.departDate} (${e.name})`,
    html: `<h2 style="font-family:Arial,sans-serif;color:#0e5151">New fare request</h2>${tableHtml(rows)}`,
  });
  if (team.error) throw new Error(team.error.message);

  // 2. Confirmation to the customer. Nice to have, so a failure is only logged.
  const firstName = escapeHtml(e.name.split(" ")[0]);
  const customer = await resend.emails.send({
    from,
    to: e.email,
    replyTo: to,
    subject: `We've got your fare request: ${e.from} → ${e.to}`,
    html:
      `<div style="font-family:Arial,sans-serif;color:#262d2d">` +
      `<h2 style="color:#0e5151">Thanks, ${firstName}. Your request is in.</h2>` +
      `<p>A ${site.name} travel expert will call you on <b>${escapeHtml(e.phone)}</b> ${site.callbackPromise} with fares for your trip.</p>` +
      tableHtml(rows) +
      `<p>Need us sooner? Call ${site.phoneDisplay}.</p></div>`,
  });
  if (customer.error) console.error("[enquiry] confirmation email failed", customer.error);
}