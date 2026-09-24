import { CallBand } from "@/components/call-band";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { PopularRoutes } from "@/components/popular-routes";
export default function Home() {
  return (
       <>
      <Header />
        <main className="flex-1">
        <HeroSection />
        <PopularRoutes />
        <HowItWorks />
        <CallBand />
      </main>
      <SiteFooter />  
    </>
  );
}
