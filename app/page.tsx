"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components for better performance
const HeroVideo = dynamic(() => import("../components/HeroVideo"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const ServicesSection = dynamic(() => import("../components/ServicesSection"), { ssr: false });
const TechStream = dynamic(() => import("../components/TechStream"), { ssr: false });
const ParallaxSection = dynamic(() => import("../components/ParallaxSection"), { ssr: false });
const Founders = dynamic(() => import("../components/Founders"), { ssr: false });
const ContactSection = dynamic(() => import("../components/ContactSection"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-white/30 min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroVideo />

      {/* Parallax Section - Innovation Showcase */}
      <ParallaxSection />

      {/* Services Section with GSAP stagger animations */}
      <ServicesSection />

      {/* Tech Stream / Capabilities Section */}
      <TechStream />

      {/* Founders Section with parallax and particles */}
      <Founders />

      {/* Contact Section with animations and Video Background */}
      <ContactSection />
    </main>
  );
}