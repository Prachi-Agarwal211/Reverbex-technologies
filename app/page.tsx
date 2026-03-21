"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components for better performance
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const HeroVideo = dynamic(() => import("../components/HeroVideo"), { ssr: false });
const OurStory = dynamic(() => import("../components/OurStory"), { ssr: false });
const ServicesSection = dynamic(() => import("../components/ServicesSection"), { ssr: false });
const FeaturedArchitectures = dynamic(() => import("../components/FeaturedArchitectures"), { ssr: false });
const Methodology = dynamic(() => import("../components/Methodology"), { ssr: false });
const TechStream = dynamic(() => import("../components/TechStream"), { ssr: false });
const Founders = dynamic(() => import("../components/Founders"), { ssr: false });
const ContactSection = dynamic(() => import("../components/ContactSection"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-white/30 min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroVideo />
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