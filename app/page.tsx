"use client";

import React, { useRef, Suspense } from "react";
import ImageSequenceScroll from "../components/ImageSequenceScroll";
import TechStream from "../components/TechStream";
import ContactSection from "../components/ContactSection";
import Founders from "../components/Founders";
import WebGLBackground from "../components/WebGLBackground";

function WebGLSkeleton() {
  return <div className="fixed inset-0 bg-[#030610] z-0" />;
}

export default function Home() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="w-full relative text-white selection:bg-white/30 min-h-screen overflow-x-hidden">
      
      {/* Z-Index Architecture for Performance */}
      <Suspense fallback={<WebGLSkeleton />}>
        <WebGLBackground />
      </Suspense>

      {/* Hero Section */}
      <div className="relative z-10">
        <section id="home">
          <div id="services">
            <ImageSequenceScroll />
          </div>
        </section>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-20 bg-transparent">
        <TechStream />
        <Founders />
        <ContactSection />
      </div>

    </main>
  );
}
