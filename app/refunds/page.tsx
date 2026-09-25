import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund policy",
  description: `Information about ${site.name}'s refund policies and procedures.`,
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund policy" intro="This policy explains...">
      <h2>Who we are</h2>
      <p>...</p>
      {/* more sections */}
    </LegalPage>
  );
}