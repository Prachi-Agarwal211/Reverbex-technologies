"use client";

import React, { useRef, Suspense } from "react";
import dynamic from 'next/dynamic';
import ImageSequenceScroll from "../components/ImageSequenceScroll";

// Dynamically import heavy and below-the-fold components
const WebGLBackground = dynamic(() => import("../components/WebGLBackground"), {
  ssr: false, // Ensure this only runs on the client
});

const TechStream = dynamic(() => import("../components/TechStream"), {
  ssr: false,
});

const Founders = dynamic(() => import("../components/Founders"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("../components/ContactSection"), {
  ssr: false,
});

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
