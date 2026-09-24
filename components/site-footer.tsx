import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-mist-50 dark:bg-teal-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo.svg" alt={site.name} width={150} height={127} className="dark:hidden" />
          <span className="hidden text-xl font-extrabold text-primary dark:block">{site.name}</span>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            An independent travel agency helping you find better fares, with a real person on the other end of the
            phone.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-foreground">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="text-muted-foreground hover:text-primary">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-primary">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {site.name} is an independent travel agency and is not affiliated with any airline.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-primary">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/refunds" className="hover:text-primary">
              Cancellations and refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}