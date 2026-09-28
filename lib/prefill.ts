// A tiny "message" other parts of the page can send to the enquiry form.
// Popular routes use it to fill in From and To.

export type Prefill = { from?: string; to?: string };

const EVENT = "ffd:prefill";

export function prefillEnquiry(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(EVENT, { detail }));
  document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onPrefill(handler: (detail: Prefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<Prefill>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}