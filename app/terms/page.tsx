import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms and conditions governing the use of ${site.name}.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" intro="These terms and conditions govern the use of ${site.name}.">
      <h2>Who we are</h2>
      <p>...</p>
      {/* more sections */}
    </LegalPage>
  );
}