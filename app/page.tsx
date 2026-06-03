import React from "react";
import Navbar from "../components/Navbar";
import SectionCounter from "../components/SectionCounter";
import {
  HeroVideo,
  WhatWeOffer,
  OurStory,
  ServicesSection,
  FeaturedArchitectures,
  Methodology,
  TechStream,
  Founders,
  ContactSection,
} from "./DynamicComponents";

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-white/30 min-h-screen">
      <Navbar />
      <SectionCounter />
      <HeroVideo />
      <WhatWeOffer />
      <OurStory />
      <ServicesSection />
      <FeaturedArchitectures />
      <Methodology />
      <TechStream />
      <Founders />
      <ContactSection />
    </main>
  );
}
