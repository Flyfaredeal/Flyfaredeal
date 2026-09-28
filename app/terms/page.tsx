import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: `The terms that apply when you use the ${site.name} website and book travel with us.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      intro={`These terms apply to every trip and travel service you book with ${site.name}. Please read them carefully before you book, and ask us if anything is unclear.`}
    >
      <p>
        These terms and conditions (&quot;Terms&quot;) apply to all travel and travel-related services offered or sold
        by {legal.companyName}, together with its employees, agents and contractors (&quot;
        {site.name}&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). You can reach us on {site.phoneDisplay}{" "}
        or at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        Every booking is also subject to the terms and conditions of the airline, hotel or other supplier providing the
        service. If a supplier&apos;s terms conflict with these Terms, these Terms decide what {site.name} is and is not
        responsible for.
      </p>
      <p>
        <strong>
          By confirming a booking with us, whether by phone, email or in writing, and by making a payment, you agree to
          these Terms on behalf of yourself and everyone travelling with you.
        </strong>{" "}
        If you book for other people, you confirm that you have told them about these Terms and that they accept them.
      </p>

      <h2 id="definitions">Definitions</h2>
      <ul>
        <li>
          <strong>&quot;Services&quot;</strong> means travel planning and advice, flights, hotels and other
          accommodation, car rentals, transfers, tours, travel insurance referrals and any other travel product we
          offer, sell or arrange.
        </li>
        <li>
          <strong>&quot;Trip&quot;</strong> means any Service or combination of Services you book with us.
        </li>
        <li>
          <strong>&quot;Supplier&quot;</strong> means the airline, hotel, car rental company or other business that
          actually provides a Service.
        </li>
        <li>
          <strong>&quot;Itinerary&quot;</strong> means the schedule of your Trip as confirmed to you.
        </li>
        <li>
          <strong>&quot;You&quot;</strong> and <strong>&quot;Traveler&quot;</strong> mean each person travelling on a
          Trip and the person who books or pays for it.
        </li>
      </ul>

      <h2 id="eligibility">Eligibility</h2>
      <p>
        Our Services are offered to residents of the United States who have full legal capacity to enter into these
        Terms. You must be at least {legal.minAge} years old to book a Trip. Travel for children must be booked by a
        parent or legal guardian.
      </p>

      <h2 id="changes-to-terms">Changes to these terms</h2>
      <p>
        We may update these Terms at any time. Changes do not affect Trips already booked: the version in force on the
        day you book applies to that booking. Please read these Terms each time you book, as they may have changed since
        your last booking.
      </p>

      <h2 id="payments">Payments</h2>
      <p>
        We accept major credit and debit cards and bank transfers. Your travel expert will confirm the payment options
        available for your booking.
      </p>
      <p>
        We never ask for card details through our website form or by plain email. Payments are taken securely by our
        agents or through our payment provider. Your booking is confirmed only when payment has been received and we
        have sent you an e-ticket or confirmation number.
      </p>
      <p>
        If a balance you owe us remains unpaid and no payment arrangement is agreed, we may refer the account to a
        collection agency. Where the law allows, you will be responsible for the reasonable costs of collection. You
        agree that we, or a collection agency acting for us, may contact you about an unpaid balance by phone, text or
        email using the contact details you gave us.
      </p>

      <h2 id="prices">Prices</h2>
      <p>
        Fares change constantly and depend on availability. A price is only guaranteed once your ticket has been issued.
        Once a booking is confirmed and paid, we cannot accept claims about its price. Unless your quote says otherwise,
        prices do <strong>not</strong> include:
      </p>
      <ul>
        <li>checked or excess baggage fees, seat selection and other optional airline extras</li>
        <li>passport, visa, immigration and customs fees</li>
        <li>departure taxes charged locally by some countries</li>
        <li>hotel resort fees, city taxes, deposits and incidental charges</li>
        <li>travel insurance</li>
        <li>airport parking, transfers, meals, tips and personal expenses</li>
        <li>anything not listed as included in your quote</li>
      </ul>
      <p>Our service fee is {legal.serviceFee}. It is shown in your quote before you book.</p>

      <h2 id="cancellations">Changes and cancellations</h2>
      <p>
        Change and cancellation rules depend on the fare and the Supplier, and are sent to you in writing before you
        pay. Most discounted airfares are <strong>non-refundable</strong> unless your fare rules say otherwise. Full
        details, including refund timelines, are in our <Link href="/refunds">Cancellations and refunds policy</Link>,
        which forms part of these Terms.
      </p>

      <p>
        <strong>Changes and cancellations you make</strong>
      </p>
      <ul>
        <li>
          All changes after purchase are subject to the airline&apos;s fare rules and availability. You pay any airline
          change fee, any difference in fare, and our service fee for the change. We confirm the total with you before
          making any change.
        </li>
        <li>
          A change is usually treated by the airline as a cancellation followed by a new booking, so cancellation
          charges may apply.
        </li>
        <li>
          To cancel, contact us by phone. We will confirm your request by email. That confirmation is an
          acknowledgement, not a guarantee of a refund.
        </li>
        <li>
          Refunds are possible only when the fare rules allow them, or when the airline agrees to a waiver. Unused
          flights, missed flights (&quot;no-shows&quot;) and shortened trips are generally not refundable.
        </li>
        <li>Approved refunds usually take 4 to 6 weeks to reach you, depending on the airline.</li>
      </ul>

      <p>
        <strong>Changes and cancellations by us or the Supplier</strong>
      </p>
      <p>
        Airlines sometimes change schedules or cancel flights. If a Supplier makes a significant change to your Trip
        before departure, or cancels it, we will tell you as soon as we can and help you choose between:
      </p>
      <ul>
        <li>accepting the changed arrangements,</li>
        <li>an alternative of a similar standard, if available, or</li>
        <li>cancelling and receiving the refund the Supplier provides.</li>
      </ul>
      <p>
        We are not liable for compensation where a change or cancellation is caused by events beyond our control (see
        &quot;Events beyond our control&quot;), or where we cancel because you did not meet these Terms, for example by
        not paying on time.
      </p>

      <p>
        <strong>California and Illinois residents</strong>
      </p>
      <p>
        If transportation or travel services are cancelled and you are not at fault and have not cancelled in breach of
        terms clearly disclosed to you and agreed by you, all sums paid to us for services not provided will be promptly
        refunded, unless you tell us otherwise in writing after the cancellation. In California, this does not apply
        where we have passed your payment to another registered seller of travel or a carrier without obtaining a
        refund, and that party fails to provide the service. In that case we will give you a written statement, with
        bank records, showing where your payment was sent.
      </p>

      <h2 id="travel-documents">Tickets and travel documents</h2>
      <p>
        We issue e-tickets and confirmations by email to the person who made the booking. Please check every detail as
        soon as you receive them, including names, dates, times and airports, and tell us straight away if anything is
        wrong.
      </p>
      <p>
        Some airline rules, for example for infants, groups or certain partner airlines, can make it impossible to issue
        an e-ticket even when a seat appeared available. If this happens, we will offer you an alternative, which may
        cost more. If you decline, or no alternative exists, we will cancel the booking and refund you in full within 30
        days.
      </p>
      <p>
        We are not responsible if your Trip is affected because you gave us incorrect information or did not receive
        documents sent to the email address you provided.
      </p>

      <h2 id="insurance">Travel insurance</h2>
      <p>
        We strongly recommend comprehensive travel insurance covering cancellation, medical emergencies, evacuation, and
        lost or delayed baggage for every Trip. We can suggest insurers, but choosing suitable cover and understanding
        its limits is your responsibility. We are not responsible for losses that insurance would have covered.
      </p>

      <h2 id="passports-visas">Passports, visas, health and travel risks</h2>
      <p>
        <strong>
          You are responsible for having a valid passport, all required visas and transit visas, and any health
          documents for every country on your Itinerary.
        </strong>{" "}
        We can point you to useful information, but we do not guarantee it.
      </p>
      <ul>
        <li>
          <strong>Names:</strong> every traveler&apos;s name on the booking must match their passport exactly.
          Correcting a name can be costly, and some airlines do not allow it.
        </li>
        <li>
          <strong>Passport validity:</strong> many countries, including India, require a passport valid for at least six
          months after your trip ends.
        </li>
        <li>
          <strong>Visas:</strong> most visitors to India need a visa or e-Visa before travel. Entry rules change often,
          sometimes with little notice. Check the Embassy of India website and{" "}
          <a href="https://travel.state.gov" target="_blank" rel="noreferrer">
            travel.state.gov
          </a>{" "}
          before booking and again shortly before you travel. Non-US citizens should check with the relevant consulate.
        </li>
        <li>
          <strong>Onward tickets:</strong> some countries require proof of a return or onward ticket, or of funds or
          insurance, before they let you in.
        </li>
        <li>
          <strong>Domestic US flights:</strong> adults need an acceptable government photo ID, such as a REAL
          ID-compliant license or a passport.
        </li>
        <li>
          <strong>Health:</strong> check vaccination and health requirements with your doctor and the{" "}
          <a href="https://wwwnc.cdc.gov/travel" target="_blank" rel="noreferrer">
            CDC travel health pages
          </a>
          .
        </li>
      </ul>
      <p>
        WE ARE NOT RESPONSIBLE IF YOU ARE REFUSED BOARDING OR ENTRY TO ANY COUNTRY BECAUSE YOU DO NOT HAVE THE CORRECT
        DOCUMENTS. IF THIS RESULTS IN FINES OR CHARGES BEING IMPOSED ON US, YOU AGREE TO REIMBURSE US.
      </p>
      <p>
        Some destinations carry greater risks than others. By selling travel to a destination, we do not represent that
        travel there is safe or advisable. Please review the US State Department&apos;s travel advisories before you
        book and before you travel.
      </p>

      <h2 id="hotels-cars">Hotels and car rentals</h2>
      <p>
        Hotels, other accommodation and car rentals are provided by independent Suppliers. We do not own or manage them
        and cannot guarantee their location, facilities or service. If a problem arises during your stay or rental,
        please raise it with the Supplier straight away, and let us know so we can help.
      </p>
      <ul>
        <li>Room prices are for double occupancy unless stated otherwise. A single supplement may apply.</li>
        <li>
          Hotels require the lead guest to show a valid photo ID and a credit card at check-in, for incidentals and any
          fees not included in the room rate, such as resort fees or parking.
        </li>
        <li>
          Car rentals require the named driver to be present with their own valid driving license and credit card.
        </li>
      </ul>

      <h2 id="air-travel">Air travel</h2>
      <p>
        Your flights are operated by the airline, under its conditions of carriage. The airline, not {site.name}, is
        responsible for operating your flight, including schedules, aircraft, delays, cancellations, denied boarding and
        baggage, subject to passenger rights laws.
      </p>

      <p>
        <strong>Schedule changes</strong>
      </p>
      <p>
        Airlines can change flight times, flight numbers, aircraft and operating airline at any time. We will pass on
        any change we are told about, as soon as we can. If a flight is delayed or cancelled on the day, work with the
        airline at the airport to be re-accommodated, and contact us if you need help.
      </p>

      <p>
        <strong>Connections and airport changes</strong>
      </p>
      <p>
        A &quot;direct&quot; flight may make stops. If your Itinerary requires you to change airports, for example
        between two London airports, allow plenty of time. The cost of travelling between airports is yours. If you book
        separate flights yourself to connect with ours, we recommend flexible tickets, as we cannot be responsible for
        missed connections on tickets we did not issue.
      </p>

      <p>
        <strong>No-shows</strong>
      </p>
      <p>
        If you do not take any flight on your ticket, the airline will usually cancel all remaining flights, including
        your return. If you cannot make a flight, contact us <strong>before</strong> departure so we can try to protect
        the rest of your ticket.
      </p>

      <p>
        <strong>Check-in and reconfirmation</strong>
      </p>
      <p>
        Check in within the airline&apos;s deadlines and check your flight times with the airline 72 hours before each
        flight, especially your return.
      </p>

      <p>
        <strong>Baggage</strong>
      </p>
      <p>
        Baggage allowances and fees are set by each airline and can differ between flights on the same trip. Excess or
        oversized baggage fees are paid to the airline. If your baggage is lost, delayed or damaged, report it to the
        airline before leaving the airport and keep your boarding pass and baggage tag. The airline&apos;s liability is
        limited by international conventions, so we recommend insurance for valuable items.
      </p>

      <p>
        <strong>Infants, children and pregnancy</strong>
      </p>
      <p>
        Infants under 2 usually travel on an adult&apos;s lap on a reduced fare, and each adult may take only one lap
        infant. Airlines set their own rules for travel late in pregnancy, which often require a medical certificate.
        Please check these rules before booking. We are not responsible for charges if the airline refuses boarding.
      </p>

      <h2 id="local-laws">Local customs and laws</h2>
      <p>
        The countries you visit may have customs, standards and laws that differ from those at home. You must obey local
        laws, and you accept the risks that come with international travel. We are not responsible for costs or
        consequences arising from a traveler breaking local laws.
      </p>

      <h2 id="conduct">Conduct</h2>
      <p>
        A Supplier may refuse to carry or accommodate anyone whose behavior puts other people at risk or breaks the law.
        If this happens, you are responsible for arranging and paying for your own replacement travel and accommodation.
      </p>

      <h2 id="information">Information and images on our website</h2>
      <p>
        We take care to make the information on our website accurate, but routes, prices and descriptions are for
        guidance only and can change. Photos are illustrations and are not a guarantee of what you will receive. We will
        only use your name, words or photos in our marketing with your prior permission.
      </p>

      <h2 id="medical">Medical conditions and emergencies</h2>
      <p>
        You are responsible for managing your own health, medication and any medical conditions while travelling, and
        for making sure you are fit to fly. Medical care abroad varies in quality and can be very expensive. We are not
        responsible for the cost or quality of any medical treatment you need during your Trip. Travel insurance with
        medical and evacuation cover is strongly recommended.
      </p>

      <h2 id="force-majeure">Events beyond our control</h2>
      <p>
        We are not responsible for failing to perform, or for delays in performing, our obligations when this is caused
        by events beyond our reasonable control. These include severe weather, natural disasters, fire, war, terrorism,
        civil unrest, strikes, epidemics and public health measures, government orders and travel advisories, airline or
        Supplier failures, and power or systems outages. In these cases we will help you with whatever the Supplier
        offers, but refunds depend on what the Supplier returns to us.
      </p>

      <h2 id="liability">Limitation of liability</h2>
      <p>
        {site.name.toUpperCase()} ACTS ONLY AS AN AGENT FOR THE AIRLINES AND OTHER SUPPLIERS WHOSE SERVICES WE SELL. WE
        DO NOT OWN, OPERATE OR CONTROL THEM. TO THE FULLEST EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY INJURY,
        DAMAGE, LOSS, ACCIDENT, DELAY OR OTHER IRREGULARITY CAUSED BY THE ACTS OR OMISSIONS OF ANY SUPPLIER, GOVERNMENT
        AUTHORITY OR OTHER THIRD PARTY, OR BY YOU.
      </p>
      <p>
        WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING LOST
        PROFITS OR LOST OPPORTUNITIES. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO A TRIP WILL NOT EXCEED THE AMOUNT
        YOU PAID US FOR THAT TRIP.
      </p>
      <p>
        Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law,
        including your rights under consumer protection laws.
      </p>

      <h2 id="warranties">Disclaimer of warranties</h2>
      <p>
        EXCEPT AS STATED IN THESE TERMS, OUR WEBSITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
        AVAILABLE&quot;. TO THE EXTENT PERMITTED BY LAW, WE DISCLAIM ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. Some states do not allow the exclusion of
        implied warranties, so this may not apply to you.
      </p>

      <h2 id="indemnity">Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {site.name} and its employees and agents from claims, losses and costs,
        including reasonable attorneys&apos; fees, arising from your breach of these Terms, from information you gave us
        that was false or incomplete, or from your conduct during a Trip.
      </p>

      <h2 id="your-promises">Your promises to us</h2>
      <p>You confirm that:</p>
      <ul>
        <li>you have the legal authority to accept these Terms for yourself and everyone on your booking;</li>
        <li>all information you give us is true, complete and accurate; and</li>
        <li>you will follow the laws and rules that apply to your Trip.</li>
      </ul>

      <h2 id="notices">Notices</h2>
      <p>
        Notices to us under these Terms should be sent by email to <a href={`mailto:${site.email}`}>{site.email}</a> or
        by post to {legal.address}. We will send notices to you at the email address on your booking.
      </p>

      <h2 id="disputes">Governing law and disputes</h2>
      <p>If you have a complaint, please contact us first. Most issues can be resolved quickly by talking to us.</p>
      <p>
        These Terms, and any dispute relating to them, your Trip, our website or our{" "}
        <Link href="/privacy">Privacy policy</Link>, are governed by the laws of {legal.governingLaw}, without regard to
        its conflict of law rules. You and we agree that the courts of that jurisdiction will have jurisdiction over any
        such dispute. In any legal action to enforce these Terms, the prevailing party may recover its reasonable
        attorneys&apos; fees and costs, where the law allows.
      </p>

      <h2 id="general">General terms</h2>
      <ul>
        <li>
          <strong>Assignment.</strong> You may not transfer your rights or obligations under these Terms without our
          written consent.
        </li>
        <li>
          <strong>Severability.</strong> If any part of these Terms is found to be unenforceable, the rest remains in
          effect, and the invalid part is replaced by a valid one as close as possible to its original intent.
        </li>
        <li>
          <strong>Survival.</strong> Terms that by their nature should continue after your Trip, such as limitation of
          liability and governing law, continue to apply.
        </li>
        <li>
          <strong>No waiver.</strong> If we do not enforce a right straight away, we have not given it up.
        </li>
        <li>
          <strong>Entire agreement.</strong> These Terms, together with our{" "}
          <Link href="/refunds">Cancellations and refunds policy</Link>, your booking confirmation and the fare rules
          sent to you, form the whole agreement between you and us about your Trip.
        </li>
      </ul>
    </LegalPage>
  );
}
