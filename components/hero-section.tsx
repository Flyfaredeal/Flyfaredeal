import { Clock, Plane, Wallet } from "lucide-react";
import { site } from "@/lib/site";
import { EnquiryForm } from "./enquiry/enquiry-form";
import { HeroBackground } from "./hero-background";
import { HeroSky } from "./hero-sky";
import { PlaneCursorSection } from "./plane-cursor-section";

const promises = [
  { icon: Plane, text: "Fares across many airlines" },
  { icon: Clock, text: `Callback ` },
  { icon: Wallet, text: "No payment to get a quote" },
];

export function HeroSection() {
  return (
    <PlaneCursorSection
      id="search"
      className="hero-sky scroll-mt-16 text-teal-950 dark:text-white"
    >
      {/* Clouds (light) or stars (dark), then the globe */}
      <HeroSky />
      <HeroBackground />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">{site.tagline}</h1>
        <p className="mt-4 max-w-xl text-lg text-mist-700 dark:text-teal-100">
          Tell us where you&apos;re headed. A travel expert finds your fare and calls you back.
        </p>

        <div className="mt-10" data-plane-off>
          <EnquiryForm />
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mist-700 dark:text-teal-100">
          {promises.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="size-4 text-marigold-600 dark:text-marigold-300" /> {text}
            </li>
          ))}
        </ul>
      </div>
    </PlaneCursorSection>
  );
}