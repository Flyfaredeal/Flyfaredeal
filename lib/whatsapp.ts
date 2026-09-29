// Your WhatsApp number in international format, digits only (no +, spaces or dashes).
// e.g. US +1 (916) 619-7747 -> "19166197747". Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const DEFAULT_MESSAGE = "Hi Fly Fare Deal! I'd like help with a flight booking.";

/** Builds a click-to-chat link that opens WhatsApp with a pre-typed message. Safe in server and client components. */
export function whatsappLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}