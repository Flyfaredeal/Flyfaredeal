import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`Your privacy matters to us. This policy explains what information ${site.name} collects, how we use and protect it, and the choices you have.`}
    >
      <p>
        {legal.companyName} (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;), owns and operates this website (the &quot;Site&quot;). We are an independent travel agency,
        not an airline. This policy applies to personal information, meaning information that identifies you or could be
        used to identify you, that we collect through the Site or when you contact us.
      </p>

      <h2 id="collection">Information we collect</h2>
      <p>
        <strong>Information you give us</strong>
      </p>
      <p>When you request a fare, call us or book a trip, we may collect:</p>
      <ul>
        <li>your name, email address and phone number</li>
        <li>trip details: departure and destination cities, dates, number of travelers and cabin class</li>
        <li>any notes or preferences you share with us</li>
        <li>
          when you book: each traveler&apos;s full name as shown on their passport, date of birth, gender, and passport
          or frequent flyer details where the airline requires them
        </li>
        <li>
          payment details, which are handled by our payment provider (see &quot;How we protect your information&quot;)
        </li>
      </ul>

      <p>
        <strong>Information collected automatically</strong>
      </p>
      <p>
        When you visit the Site, our hosting provider automatically records basic technical information, such as your IP
        address, browser and device type, the pages you visit and the date and time of your visit. We use this to keep
        the Site secure, prevent spam and fix problems.
      </p>

      <h2 id="use">How we use your information</h2>
      <p>We use personal information only to provide, support and improve our services, including to:</p>
      <ul>
        <li>respond to your fare request and contact you about it</li>
        <li>search for, quote, book and issue tickets and other travel services for you</li>
        <li>send confirmations, e-tickets, schedule changes and other updates about your booking</li>
        <li>handle changes, cancellations, refunds and customer service requests</li>
        <li>process payments and prevent fraud</li>
        <li>improve the Site and our service based on how it is used and the feedback you give us</li>
        <li>meet our legal, accounting and tax obligations</li>
        <li>
          send you travel offers and news, <strong>only if you have agreed to receive them</strong>. Every marketing
          email includes a link to unsubscribe.
        </li>
      </ul>
      <p>
        We do not sell, rent or trade your personal information, and we do not share it for other companies&apos;
        advertising.
      </p>

      <h2 id="communications">Calls, texts and emails</h2>
      <p>
        When you submit a fare request and tick the consent box, you agree that we may contact you by phone, text
        message and email about that request, using the details you gave us. Message and data rates may apply. You do
        not have to give this consent to buy anything from us.
      </p>
      <p>
        You can withdraw your consent at any time: reply <strong>STOP</strong> to any text message, click
        &quot;unsubscribe&quot; in any marketing email, or ask us to stop calling. We will still send messages you need
        about a booking you have made, such as tickets and schedule changes.
      </p>

      <h2 id="consent">Consent and international transfers</h2>
      <p>By giving us personal information, you agree to it being used as described in this policy.</p>
      <p>
        We and our service providers may store and process your information in the United States and in other countries,
        including India, where our team and providers are located. Privacy laws in those countries may differ from the
        laws where you live. We take steps to make sure your information is protected wherever it is processed, as
        described in this policy.
      </p>

      <h2 id="protection">How we protect your information</h2>
      <p>We use a range of measures to keep your information safe, including:</p>
      <ul>
        <li>encrypted connections (HTTPS/TLS) for every page of the Site</li>
        <li>access to customer information limited to the staff who need it to help you</li>
        <li>reputable service providers that are required to keep your information confidential and secure</li>
      </ul>
      <p>
        Card payments are processed by our payment provider over encrypted connections. We do not store full card
        numbers on our systems after a transaction. Please never send card details through our enquiry form or by plain
        email.
      </p>
      <p>
        No website or system can be guaranteed to be completely secure, but we work to protect your information and will
        tell you if a breach affects you, as the law requires.
      </p>

      <h2 id="cookies">Cookies and similar technologies</h2>
      <p>
        Cookies are small files that a website stores in your browser. Similar technologies include local storage and
        &quot;pixel tags&quot; (also called clear GIFs or web beacons).
      </p>
      <p>
        <strong>What we use today:</strong> the Site stores one preference in your browser, whether you chose the light
        or dark display. We do not currently use advertising cookies, tracking pixels or third-party analytics.
      </p>
      <p>
        If we add analytics or similar tools in the future, we will update this policy before we start. You can set your
        browser to refuse or delete cookies. The Site will still work, but it may not remember your display preference.
      </p>

      <h2 id="do-not-track">Do Not Track signals</h2>
      <p>
        Some browsers send a &quot;Do Not Track&quot; signal. Because we do not track visitors across other websites,
        the Site works the same way whether or not this signal is turned on.
      </p>

      <h2 id="disclosure">Who we share information with</h2>
      <p>We share personal information only in these situations:</p>
      <ul>
        <li>
          <strong>Travel suppliers:</strong> airlines, hotels, car rental companies and other suppliers, when needed to
          book and deliver your trip.
        </li>
        <li>
          <strong>Service providers:</strong> companies that help us run our business, such as website hosting, email,
          email delivery, phone systems and payment processing. They may use your information only to provide their
          service to us, and must keep it confidential.
        </li>
        <li>
          <strong>Legal reasons:</strong> when required by law or by government authorities (for example, airline
          security and immigration rules), to enforce our <Link href="/terms">Terms and conditions</Link>, or to protect
          the rights, property or safety of our customers, our business or others.
        </li>
        <li>
          <strong>Business transfer:</strong> if our business is sold or merged, customer information may transfer to
          the new owner, who must continue to protect it under this policy.
        </li>
        <li>
          <strong>With your consent:</strong> in any other case, only when you have agreed.
        </li>
      </ul>

      <h2 id="third-party-links">Links to other websites</h2>
      <p>
        The Site may link to other websites, such as airline, embassy or government sites. This policy does not cover
        those websites. We do not control them and are not responsible for their privacy practices, so please read their
        privacy policies before giving them any information.
      </p>

      <h2 id="retention">How long we keep your information</h2>
      <p>
        We keep fare requests that do not lead to a booking for up to {legal.retention}, so we can help with follow-up
        questions, and then delete them. Booking and payment records are kept for as long as the law requires for
        accounting, tax and legal purposes.
      </p>

      <h2 id="your-rights">Your choices and rights</h2>
      <p>You can ask us at any time to:</p>
      <ul>
        <li>tell you what personal information we hold about you and how we use it</li>
        <li>correct information that is wrong or incomplete</li>
        <li>delete your information, unless we must keep it by law or to complete your booking</li>
        <li>stop sending you marketing messages, or stop calling or texting you</li>
      </ul>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phoneDisplay}. We may need to confirm your
        identity before acting on a request. We will not treat you differently for exercising these rights. Depending on
        the state where you live, you may have additional rights under state privacy laws, and we will honor them.
      </p>

      <h2 id="california">California privacy rights (CalOPPA)</h2>
      <p>In line with the California Online Privacy Protection Act (CalOPPA):</p>
      <ul>
        <li>anyone can visit the Site without telling us who they are;</li>
        <li>this policy is linked from every page of the Site;</li>
        <li>we will notify you of changes to this policy on this page;</li>
        <li>
          you can review or change your personal information by contacting us, as described in &quot;Your choices and
          rights&quot;; and
        </li>
        <li>we explain how we respond to Do Not Track signals above.</li>
      </ul>
      <p>We do not share personal information with third parties for their own direct marketing purposes.</p>

      <h2 id="children">Children&apos;s privacy (COPPA)</h2>
      <p>
        In line with the Children&apos;s Online Privacy Protection Act (COPPA), we do not knowingly collect personal
        information from children under 13. Our Site and services are intended for adults; bookings must be made by
        someone at least {legal.minAge} years old. We collect children&apos;s travel details only from a parent or
        guardian who books for them. If you believe a child has sent us personal information, please contact us and we
        will delete it.
      </p>

      <h2 id="scope">Online privacy policy only</h2>
      <p>
        This policy covers information collected through the Site and when you contact us by phone, text or email about
        a fare request or booking. It does not cover information collected by airlines, hotels or other suppliers, which
        is governed by their own privacy policies.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Any changes will be posted on this page with a new &quot;Last
        updated&quot; date. Please check this page whenever you give us personal information, as the policy may have
        changed since your last visit.
      </p>

      <h2 id="contact">Contact us</h2>
      <p>
        Questions about this policy or your information? Email <a href={`mailto:${site.email}`}>{site.email}</a>, call{" "}
        {site.phoneDisplay}, or write to {legal.companyName}, {legal.address}.
      </p>
    </LegalPage>
  );
}
