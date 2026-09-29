export const site = {
  name: "Fly Fare Deal",
  tagline: "Discover more. Pay less.",
  phoneDisplay: "+1 (916) 619-7747", // TODO: your real number
  phoneHref: "tel:+19166197747",
  email: "info@flyfaredeal.com",
  hours: "Mon–Sun, 9am–9pm ET", // TODO: your real hours
  // callbackPromise: "within 30 minutes",
  socials: {
    instagram: "https://www.instagram.com/flyfaredeal_",
    facebook: "https://www.facebook.com/login", // TODO: replace with your page URL
    x: "https://x.com/login", // TODO: replace with your profile URL
    linkedin: "https://www.linkedin.com/login", // TODO: replace with your company page URL
  },
  nav: [
    { label: "Flights", href: "/#search" },
    { label: "Popular routes", href: "/#routes" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;