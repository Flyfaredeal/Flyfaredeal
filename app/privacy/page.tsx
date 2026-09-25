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
      intro={`This policy explains what information ${site.name} collects when you use our website or ask us for a fare, how we use it, and the choices you have.`}
    >
      <h2>Who we are</h2>
      <p>
        {site.name} ({legal.companyName}, {legal.address}) is an independent travel agency. We are not an airline and
        are not affiliated with any airline. In this policy, &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean{" "}
        {site.name}.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you request a fare, we collect:
      </p>
      <ul>
        <li>your name, email address and phone number</li>
        <li>your trip details: route, dates, number of travellers and cabin class</li>
        <li>anything you choose to add in the notes field</li>
      </ul>
      <p>
        If you go on to book, we will also ask for the details the airline needs, such as each traveller&apos;s full
        name as shown on their passport, date of birth and, where required, passport information.
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most websites, our hosting provider records basic
        technical information when you visit, such as your IP address, browser type and the pages you view. This is used
        to keep the website secure and working.
      </p>
      <p>
        <strong>Cookies and similar storage.</strong> We don&apos;t use advertising or tracking cookies. Your browser
        stores one small preference: whether you chose the light or dark look for the site. If we add analytics in the
        future, we will update this policy first.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>to contact you by phone, text or email about the fare request you made</li>
        <li>to find, quote and book flights and other travel services for you</li>
        <li>to send you confirmations, e-tickets and updates about your booking</li>
        <li>to help with changes, cancellations, refunds and other questions</li>
        <li>to keep our website secure and prevent spam and fraud</li>
        <li>to meet our legal, accounting and tax obligations</li>
      </ul>
      <p>
        We only contact you about your request unless you agree to hear from us about offers. You can ask us to stop at
        any time (see &quot;Your choices and rights&quot; below).
      </p>

      <h2>Who we share it with</h2>
      <p>We never sell your personal information. We share it only with:</p>
      <ul>
        <li>
          <strong>Airlines and travel suppliers</strong>, when you ask us to book, so they can issue your tickets
        </li>
        <li>
          <strong>Service providers</strong> who help us run our business, such as our website host, our email provider
          and our email-sending service, under agreements to protect your information
        </li>
        <li>
          <strong>Authorities</strong>, when the law requires it, for example airline security and immigration rules
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep fare requests for up to {legal.retention} so we can help with follow-up questions, then delete them.
        Booking records are kept for as long as the law requires for accounting and tax purposes.
      </p>

      <h2>How we protect it</h2>
      <p>
        Our website uses encrypted connections (HTTPS), and access to customer information is limited to the people who
        need it to help you. No system is completely secure, so please never send card numbers through our enquiry
        form.
      </p>

      <h2>Your choices and rights</h2>
      <p>You can ask us at any time to:</p>
      <ul>
        <li>tell you what information we hold about you</li>
        <li>correct anything that is wrong</li>
        <li>delete your information, unless we must keep it by law</li>
        <li>stop calling, texting or emailing you</li>
      </ul>
      <p>
        To stop text messages, reply STOP. For anything else, email <a href={`mailto:${site.email}`}>{site.email}</a> or
        call {site.phoneDisplay}. Depending on where you live, you may have further rights under local privacy laws;
        we will honour them.
      </p>

      <h2>Where your information is stored</h2>
      <p>
        Our service providers may store and process information in countries other than your own, including the United
        States and India. We use providers that protect personal information to recognised standards.
      </p>

      <h2>Children</h2>
      <p>
        Our services are meant for adults. Travel for children is booked by a parent or guardian, and we don&apos;t
        knowingly collect information directly from anyone under {legal.minAge}.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will update the date at the top of this page. Significant changes will be
        highlighted on our website.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about your privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a>, call {site.phoneDisplay},
        or write to us at {legal.address}. See also our <Link href="/terms">Terms and conditions</Link>.
      </p>
    </LegalPage>
  );
}
