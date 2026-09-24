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
    <section id="how-it-works" className="scroll-mt-16 bg-teal-50 py-16 sm:py-20 dark:bg-teal-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">How it works</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <div className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {/* Dashed "flight path" joining the steps on desktop */}
                {i < steps.length - 1 && (
                  <span aria-hidden className="hidden flex-1 border-t-2 border-dashed border-teal-300 md:block" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 max-w-xs text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}