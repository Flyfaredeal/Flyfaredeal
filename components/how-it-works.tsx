import { Plane } from "lucide-react";
import { PlaneCursorSection } from "@/components/plane-cursor-section";

const steps = [
  {
    title: "Tell us your trip",
    body: "Share your route, dates and who's travelling. It takes less than a minute.",
  },
  {
    title: "We find your fare",
    body: "A travel expert compares fares across airlines and calls you with the best options.",
  },
  {
    title: "Book and fly",
    body: "Choose your flight over the phone and get your e-ticket by email.",
  },
];

export function HowItWorks() {
  return (
    <PlaneCursorSection
      id="how-it-works"
      className="scroll-mt-16 bg-teal-50 py-16 sm:py-20 dark:bg-teal-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">How it works</h2>

        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-plane-hover
              className="group/step -m-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-lg hover:shadow-teal-950/5 dark:hover:bg-teal-900/60"
            >
              <div className="flex items-center gap-4">
                {/* Step number: turns marigold with a soft pulse ring on hover */}
                <span className="relative grid size-10 shrink-0 place-items-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-2 ring-marigold-400 opacity-0 group-hover/step:opacity-100 motion-safe:group-hover/step:animate-ping"
                  />
                  <span className="relative grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all duration-300 group-hover/step:scale-110 group-hover/step:bg-marigold-400 group-hover/step:text-teal-950">
                    {i + 1}
                  </span>
                </span>

                {/* Dashed "flight path": fills in and a plane flies along it on hover (desktop) */}
                {i < steps.length - 1 && (
                  <span aria-hidden className="relative hidden flex-1 md:block">
                    <span className="block border-t-2 border-dashed border-teal-300 dark:border-teal-700" />
                    <span className="absolute inset-x-0 top-0 origin-left scale-x-0 border-t-2 border-marigold-400 transition-transform duration-700 ease-out group-hover/step:scale-x-100" />
                    <Plane className="absolute -top-2.25 left-0 size-5 rotate-45 text-marigold-500 opacity-0 transition-[left,opacity] duration-700 ease-out group-hover/step:left-[calc(100%-1.25rem)] group-hover/step:opacity-100" />
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground transition-colors duration-300 group-hover/step:text-primary">
                {step.title}
              </h3>
              <p className="mt-1 max-w-xs text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </PlaneCursorSection>
  );
}