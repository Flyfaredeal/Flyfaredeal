/**
 * Fly Fare Deal — brand colors for use in TypeScript
 * (charts, OG images, emails, `viewport.themeColor`, etc.)
 *
 * For styling components, prefer the Tailwind classes from theme.css.
 */

export const teal = {
  50: "#f1f8f8",
  100: "#e3f0f0",
  200: "#c9e0e0",
  300: "#a6c9c8",
  400: "#7dacab",
  500: "#568f8e",
  600: "#387474",
  700: "#226060",
  800: "#0e5151", // logo
  900: "#003b3b",
  950: "#002525",
} as const;

export const marigold = {
  50: "#fffaed",
  100: "#fff1d0",
  200: "#fde1a5",
  300: "#f8ce78",
  400: "#f6b840", // main accent
  500: "#ed9f00",
  600: "#cd7d00",
  700: "#ab5e00",
  800: "#8a4600",
  900: "#703500",
  950: "#471e00",
} as const;

export const mist = {
  50: "#f8fbfb",
  100: "#f0f4f4",
  200: "#e0e6e6",
  300: "#cbd3d3",
  400: "#9da7a7",
  500: "#788382",
  600: "#5f6868",
  700: "#485050",
  800: "#373f3f",
  900: "#262d2d",
  950: "#141a1a",
} as const;

export const brand = {
  primary: teal[800],
  primaryForeground: "#ffffff",
  cta: marigold[400],
  ctaForeground: teal[950],
  deal: marigold[700],
  background: "#ffffff",
  foreground: mist[900],
  border: mist[200],
} as const;

export const colors = { teal, marigold, mist, brand } as const;
export default colors;