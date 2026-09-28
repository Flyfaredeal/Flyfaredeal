import { CallBand } from "@/components/call-band";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { PopularRoutes } from "@/components/popular-routes";
import { ReviewsSection } from "@/components/reviews-section";
import { TripsSection } from "@/components/trips-section";
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularRoutes />
        <HowItWorks />
        <TripsSection />
        <ReviewsSection />
        <CallBand />
      </main>
      <SiteFooter />
    </>
  );
}
