"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import OurStory from "../components/OurStory";
import ServicesSection from "../components/ServicesSection";
import FeaturedArchitectures from "../components/FeaturedArchitectures";
import Methodology from "../components/Methodology";
import TechStream from "../components/TechStream";
import Founders from "../components/Founders";
import ContactSection from "../components/ContactSection";
import Preloader from "../components/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Hide loading state after preloader completes
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = 'auto';
      // Ensure body scroll is restored
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main 
        className="w-full relative text-white selection:bg-white/30 min-h-screen"
        aria-hidden={isLoading}
        inert={isLoading ? true : undefined}
      >
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