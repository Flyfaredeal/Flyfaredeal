import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/whatsapp";

/** Floating chat button, fixed to the bottom-right of every page. */
export function WhatsAppButton({ message, className }: { message?: string; className?: string }) {
  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-lg",
        "transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-[#25D366]/50 focus-visible:outline-none",
        "sm:right-6 sm:bottom-6",
        className,
      )}
    >
      <FaWhatsapp className="size-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}