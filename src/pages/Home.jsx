import React from "react";
import MagneticCursor from "@/components/MagneticCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StrategySection from "@/components/StrategySection";
import ProofSection from "@/components/ProofSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import InquiryButton from "@/components/InquiryButton";

export default function Home() {
  return (
    <div className="bg-obsidian min-h-screen">
      <MagneticCursor />
      <Navigation />
      <HeroSection />
      <StrategySection />
      <ProofSection />
      <ContactSection />
      <FooterSection />
      <InquiryButton />
    </div>
  );
}