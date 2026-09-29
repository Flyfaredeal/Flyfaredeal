import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa6";
import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";

import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

// Only socials with a real URL in lib/site.ts are shown, so no dead "#" links.
const socials: { label: string; href?: string; icon: IconType }[] = [
  { label: "Facebook", href: site.socials.facebook, icon: FaFacebookF },
  { label: "Instagram", href: site.socials.instagram, icon: FaInstagram },
  { label: "X", href: site.socials.x, icon: FaXTwitter },
  { label: "LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn },
];

const payments: { label: string; icon: IconType; color: string }[] = [
  { label: "Visa", icon: FaCcVisa, color: "#1434CB" },
  { label: "Mastercard", icon: FaCcMastercard, color: "#EB001B" },
  { label: "American Express", icon: FaCcAmex, color: "#006FCF" },
  { label: "Discover", icon: FaCcDiscover, color: "#FF6000" },
  { label: "PayPal", icon: FaPaypal, color: "#003087" },
  { label: "Apple Pay", icon: FaApplePay, color: "#000000" },
  { label: "Google Pay", icon: FaGooglePay, color: "#4285F4" },
];

const help = [
  { label: "Contact us", href: "/#contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cancellations and refunds", href: "/refunds" },
];

const iconButton =
  "flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold tracking-wide text-foreground">{children}</h2>;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-mist-50 dark:bg-teal-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:gap-8">
        {/* Brand + social */}
        <div>
          <Link href="/" aria-label={`${site.name} home`} className="inline-block">
            <Image src="/logo.svg" alt={site.name} width={120} height={102} className="h-auto w-28 dark:hidden" />
            <span className="hidden text-xl font-extrabold text-primary dark:block">{site.name}</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            An independent travel agency helping you find better fares, with a real person on the other end of the phone.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {socials
              .filter((s) => s.href)
              .map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconButton}>
                  <Icon size={15} />
                </a>
              ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`${iconButton} hover:border-[#25D366] hover:bg-[#25D366] hover:text-white`}
            >
              <FaWhatsapp size={17} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Explore">
          <ColumnTitle>Explore</ColumnTitle>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:underline transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Help */}
        <nav aria-label="Help">
          <ColumnTitle>Help</ColumnTitle>
          <ul className="mt-4 space-y-2.5 text-sm">
            {help.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:underline transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + payments */}
        <div>
          <ColumnTitle>Contact</ColumnTitle>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2.5 text-muted-foreground transition hover:text-primary">
                <Phone className="size-4 shrink-0 text-primary" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all text-muted-foreground transition hover:text-primary">
                <Mail className="size-4 shrink-0 text-primary" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              {site.hours}
            </li>
          </ul>

          <div className="mt-7">
            <ColumnTitle>We accept</ColumnTitle>
            <ul className="mt-3 grid w-fit grid-cols-4 gap-2">
              {payments.map(({ label, icon: Icon, color }) => (
                <li
                  key={label}
                  title={label}
                  className="flex h-8 w-12 items-center justify-center rounded-md border border-black/10 bg-white shadow-xs"
                >
                  <Icon size={26} color={color} aria-label={label} role="img" />
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Payments are processed securely.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs leading-relaxed text-muted-foreground sm:px-6">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            {site.name} is an independent travel agency and is not affiliated with any airline. Fares are subject to
            availability and may change until tickets are issued.
          </p>
        </div>
      </div>
    </footer>
  );
}