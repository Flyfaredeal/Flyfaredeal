import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" intro="This policy explains...">
      <h2>Who we are</h2>
      <p>...</p>
      {/* more sections */}
    </LegalPage>
  );
}