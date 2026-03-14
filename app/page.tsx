"use client";

import React, { useRef } from "react";
import ImageSequenceScroll from "../components/ImageSequenceScroll";
import TechStream from "../components/TechStream";
import ContactSection from "../components/ContactSection";
import Founders from "../components/Founders";
import WebGLBackground from "../components/WebGLBackground";

export default function Home() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="w-full relative text-white selection:bg-white/30 min-h-screen overflow-x-hidden">
      
      {/* 
          Z-Index Stack:
          - WebGLBackground: fixed, z-0
          - ImageSequenceScroll: sticky/pinned, z-20 (overrides BG)
          - Content Sections: relative, z-10 (shows BG through transparency)
      */}

      {/* Atmospheric Background - Fixed across the whole experience */}
      <WebGLBackground />

      {/* Hero & Image Sequence - High Priority Z-Index */}
      <div className="relative z-20">
        <section id="home">
          <div id="services">
            <ImageSequenceScroll />
          </div>
        </section>
      </div>

      {/* Content Sections - Transparent BG to reveal WebGL */}
      <div className="relative z-10 bg-transparent">
        <TechStream />
        <Founders />
        <ContactSection />
      </div>

    </main>
  );
}
