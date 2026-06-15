import React from "react";
import Navbar from "../components/Navbar";
import SectionCounter from "../components/SectionCounter";
import {
  HeroVideo,
  TrustedBy,
  WhatWeOffer,
  LiveResults,
  FeaturedArchitectures,
  WhyReverbex,
  PremiumPositioning,
  OurStory,
  Methodology,
  IndustriesSection,
  TestimonialsSection,
  FAQSection,
  Founders,
  ContactSection,
} from "./DynamicComponents";

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-[#EAB308]/30 min-h-screen">
      <Navbar />
      <SectionCounter />
      <HeroVideo />
      <TrustedBy />
      <WhatWeOffer />
      <LiveResults />
      <FeaturedArchitectures />
      <WhyReverbex />
      <PremiumPositioning />
      <OurStory />
      <Methodology />
      <IndustriesSection />
      <TestimonialsSection />
      <FAQSection />
      <Founders />
      <ContactSection />
    </main>
  );
}
