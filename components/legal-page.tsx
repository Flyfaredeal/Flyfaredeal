import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legal } from "@/lib/legal";
import { SiteFooter } from "./site-footer";
import { Header } from "./header";

// Shared layout for Privacy, Terms and Refunds.
// The content is plain JSX; the classes on <article> style every
// heading, paragraph and list inside it, so the pages stay simple.

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="border-b bg-teal-50 dark:bg-teal-950">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" /> Back to home
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {legal.lastUpdated}</p>
          </div>
        </div>

        <article
          className={[
            "mx-auto max-w-3xl px-4 py-12 text-[0.95rem] leading-7 text-foreground/90 sm:px-6",
            "[&_h2]:mt-10 [&_h2]:scroll-mt-20 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_h2:first-child]:mt-0",
            "[&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-marigold-600",
            "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
            "[&_strong]:font-semibold [&_strong]:text-foreground",
          ].join(" ")}
        >
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}