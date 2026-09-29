import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle"; // ← new

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Image src="/logo-mark.svg" alt="" width={46} height={43} priority />
          <span className="text-lg font-extrabold tracking-tight text-primary">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle /> {/* ← new: sun/moon button */}
          <a href={site.phoneHref} className={cn(buttonVariants(), "rounded-full")}>
            <FaWhatsapp size={24} color="#25D366" />
            <span className="hidden sm:inline">{site.phoneDisplay}</span>
            <span className="sm:hidden">Call us</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}