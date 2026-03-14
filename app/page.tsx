"use client";

import React, { useRef, Suspense, lazy } from "react";
import ImageSequenceScroll from "../components/ImageSequenceScroll";
import TechStream from "../components/TechStream";
import ContactSection from "../components/ContactSection";
import Founders from "../components/Founders";

// Lazy load WebGL background - it's heavy and not critical for initial paint
const WebGLBackground = lazy(() => 
  import("../components/WebGLBackground").then(mod => ({ default: mod.default }))
);

// Loading skeleton for WebGL
function WebGLSkeleton() {
  return (
    <div className="fixed inset-0 bg-[#030610] overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-yellow-600/20 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e40af_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#854d0e_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/70" />
    </div>
  );
}

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

      {/* Atmospheric Background - Lazy loaded */}
      <Suspense fallback={<WebGLSkeleton />}>
        <WebGLBackground />
      </Suspense>

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
