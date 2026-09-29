import { FaWhatsapp } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

export function CallBand() {
  return (
    <section id="contact" className="scroll-mt-16 bg-teal-900 py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Rather talk it through?</h2>
          <p className="mt-2 max-w-lg text-teal-100">
            Call a travel expert for fares, date changes or help planning a multi-city trip.
          </p>
        </div>
        <a href={whatsappLink()} target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={cn(buttonVariants({ variant: "cta" }), "h-14 gap-2.5 px-6 text-lg")}>
          <FaWhatsapp size={30} className="text-teal-700" />
          {site.phoneDisplay}
        </a>
      </div>
    </section>
  );
}