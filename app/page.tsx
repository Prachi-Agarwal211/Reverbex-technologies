"use client";

import React, { useState, useEffect } from "react";
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
const Preloader = dynamic(() => import("../components/Preloader"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Hide loading state after preloader completes
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoading]);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      <main className={`w-full relative text-white selection:bg-white/30 min-h-screen ${
        isLoading ? 'invisible' : 'visible'
      }`}>
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
    </>
  );
}