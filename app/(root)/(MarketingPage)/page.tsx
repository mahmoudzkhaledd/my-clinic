"use server";
import { About } from "./_components/About";
import AdvantagesSection from "./_components/AdvantagesSection";
import CardsSection from "./_components/CardsSection";
import HeroSection from "./_components/HeroSection";
import { HowItWorks } from "./_components/HowItWorks";
import PricingSection from "./_components/PricingSection";
import { prisma } from "@/lib/db";

export default async function MarketingPage() {
  const packages = await prisma.package.findMany({
    include: {
      advantages: true,
    }
  });
  return (
    <div className="h-full max-w-[80%] mx-auto space-y-[30px]">
      <HeroSection />
      <PricingSection packages={JSON.parse(JSON.stringify(packages))} />
      <AdvantagesSection />
      <CardsSection />
      <About />
      <HowItWorks />
      <br />
      <br />
      <br />
      {/* <TrustedSection />
      <MarketingSection />
      <StepsForCreatingClinic />
      
      */}
    </div>
  );
}
