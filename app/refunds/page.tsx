import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellations and refunds",
  description: `How changes, cancellations and refunds work for bookings made with ${site.name}.`,
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Cancellations and refunds"
      intro="Plans change. Here's how changes, cancellations and refunds work, and how we help you through them."
    >
      <h2>The short version</h2>
      <ul>
        <li>What you can change or get back depends on the airline&apos;s rules for your fare.</li>
        <li>We tell you those rules before you book, and help you with every request after.</li>
        <li>
          Contact us as early as possible: <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phoneDisplay}.
        </li>
      </ul>

      <h2>Cancelling soon after booking</h2>
      <p>
        Many airlines let you cancel for free within 24 hours of booking, especially for flights to, from or within the
        United States booked at least 7 days before departure. If your booking qualifies, contact us within that window
        and we will cancel it and arrange a full refund.
      </p>

      <h2>If you cancel later</h2>
      <ul>
        <li>
          <strong>Refundable fares:</strong> you get the fare back, minus any airline cancellation fee.
        </li>
        <li>
          <strong>Non-refundable fares:</strong> the fare usually isn&apos;t returned, but some government taxes may be.
          Some airlines give a travel credit instead, which you can use for a future trip.
        </li>
        <li>
          <strong>No-shows:</strong> if you don&apos;t take a flight without cancelling first, the airline may cancel
          the rest of your ticket, including the return flight.
        </li>
      </ul>

      <h2>Changing your booking</h2>
      <p>
        Date, time or route changes are possible on many fares. You pay any airline change fee plus the difference in
        fare, if the new flight costs more. We confirm the total with you before making any change.
      </p>

      <h2>If the airline cancels or changes your flight</h2>
      <p>
        If the airline cancels your flight or changes it significantly, you are usually entitled to choose between an
        alternative flight or a refund, under the airline&apos;s rules and passenger rights laws. We contact you as soon
        as we hear about it and handle the rebooking or refund with the airline for you.
      </p>

      <h2>Our service fee</h2>
      <p>
        Our service fee ({legal.serviceFee}) covers the work of finding and booking your trip, so it isn&apos;t
        refundable once your ticket has been issued, except when the airline cancels your flight or we made an error.
      </p>

      <h2>How long refunds take</h2>
      <p>
        We request your refund from the airline on the same working day you ask. Airlines usually take 7–30 days to
        process it, and it goes back to the card you paid with. We keep you updated until it arrives.
      </p>

      <h2>How to make a request</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phoneDisplay} with your booking reference
        and the names of the travellers. We confirm every change or cancellation in writing.
      </p>
      <p>
        This policy forms part of our <Link href="/terms">Terms and conditions</Link>.
      </p>
    </LegalPage>
  );
}
