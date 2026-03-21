"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);

  const statements = [
    { text: "Agentic Workflows", subtext: "Automating complex processes so your business can scale infinitely" },
    { text: "System Orchestration", subtext: "Connecting disparate data to unlock new enterprise revenue" },
    { text: "Enterprise Intelligence", subtext: "Deploying secure models that reason, execute, and drive growth" },
    { text: "Autonomous Infrastructure", subtext: "We engineer self-sustaining systems that build your bottom line" },
  ];

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setIsVideoLoaded(true);
    const handleCanPlay = () => setIsVideoLoaded(true);

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);

    const fallbackTimer = setTimeout(() => setIsVideoLoaded(true), 3000);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Entrance animation - runs once on mount
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Subtle parallax/darkening effect on video overlay
      if (videoOverlayRef.current) {
        gsap.to(videoOverlayRef.current, {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Entry animation for text when currentIndex changes
  useGSAP(() => {
    const subtext = textContainerRef.current?.querySelector(".hero-subtext");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: SplitHeading handles character animation
      if (subtext) {
        gsap.fromTo(
          subtext,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade up
      const heading = textContainerRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      }
      if (subtext) {
        gsap.fromTo(subtext, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
      }
    });

    return () => mm.revert();
  }, { scope: textContainerRef, dependencies: [currentIndex] });

  // Exit animation with cycleStatement callback
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const chars = textContainerRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length > 0) {
        const tl = gsap.timeline({
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % statements.length);
          },
        });

        tl.to(chars, {
          y: -80,
          opacity: 0,
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
          rotateX: 45,
          stagger: 0.02,
          duration: 0.6,
          ease: "power4.in",
          delay: 4, // Wait 4 seconds before exiting
        });
      }
    });

    return () => mm.revert();
  }, { scope: textContainerRef, dependencies: [currentIndex] });

  const currentStatement = statements[currentIndex];

  const marqueeItems = [
    "MULTI-AGENT SYSTEMS",
    "MCP INTEGRATION",
    "WORKFLOW ORCHESTRATION",
    "LOCALIZED LLMS",
    "AUTONOMOUS INFRASTRUCTURE",
    "DATA PIPELINES",
    "API ABSTRACTION",
    "ENTERPRISE AI",
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-between bg-black overflow-hidden"
    >
      {/* Video Background - Optimized for performance */}
      <div ref={videoWrapRef} className="absolute inset-0 w-full h-full z-0">
        {/* Loading Placeholder */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-yellow-950/20 animate-pulse" />
        )}

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover hw-accelerated transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* WebM first for Chrome/Firefox, MP4 fallback for Safari */}
          <source src="/hero-video.webm" type="video/webm; codecs=vp9,opus" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle contrast overlay */}
        <div ref={videoOverlayRef} className="absolute inset-0 bg-black/25 md:bg-black/20 pointer-events-none" />
      </div>

      {/* Top Navbar Spacer */}
      <div className="h-20 md:h-28 w-full shrink-0 z-10 pointer-events-none" />

      {/* Main Hero Content Area */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex-1 flex flex-col justify-center pb-12 md:pb-24 px-6 md:px-16 xl:px-24 pointer-events-none w-full mx-auto max-w-[1400px]"
      >
        <div className="flex flex-col w-full items-start text-left max-w-lg">
          {/* Desktop: SplitHeading for character-split animation */}
          <SplitHeading
            text={currentStatement.text}
            className="text-[clamp(2rem,4vw,4rem)] md:text-[clamp(2.5rem,5vw,5rem)] text-white mb-2 md:mb-3 tracking-tight leading-[1.15] pt-2 pb-3 drop-shadow-xl font-medium"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              perspective: "1000px",
            }}
          />
          <p
            className="hero-subtext text-white/70 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.15em] uppercase mt-1 drop-shadow-md pb-2"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {currentStatement.subtext}
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee - Pure CSS */}
      <div
        className="relative z-10 w-full overflow-hidden py-4 md:py-6 bg-transparent"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="w-[200%] md:w-max">
          <div
            className="flex whitespace-nowrap items-center hw-accelerated opacity-40 animate-marquee-left"
            style={{ animationDuration: "25s" }}
          >
            {[...Array(2)].map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                {marqueeItems.map((item, index) => (
                  <div key={`${loopIndex}-${index}`} className="flex items-center mx-6 md:mx-10">
                    <span
                      className="text-white/70 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item}
                    </span>
                    <span className="text-yellow-500/60 mx-6 md:mx-10 text-lg md:text-xl font-light">✦</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
