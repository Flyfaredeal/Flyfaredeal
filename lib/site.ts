export const site = {
  name: "Fly Fare Deal",
  tagline: "Discover more. Pay less.",
  phoneDisplay: "+1 (000) 000-0000", // TODO: your real number
  phoneHref: "tel:+10000000000",
  email: "info@flyfaredeal.com",
  // callbackPromise: "within 30 minutes",
  nav: [
    { label: "Flights", href: "/#search" },
    { label: "Popular routes", href: "/#routes" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;