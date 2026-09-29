import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { WhatsAppButton } from "@/components/whatsapp-button";
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans", // globals.css reads this variable
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fly Fare Deal",
  description: "Discover more. Pay less.",
};

// Browser bar colour for each theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#002525" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning is its own attribute, not part of className.
    // next-themes adds class="dark" in the browser before React loads,
    // and this tells React that difference on <html> is expected.
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
             <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}