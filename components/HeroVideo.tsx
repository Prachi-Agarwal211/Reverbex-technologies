"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const statements = [
    { text: "Agentic Workflows", subtext: "Orchestrating autonomous logic across enterprise silos" },
    { text: "System Orchestration", subtext: "Connecting disparate data via Model Context Protocol (MCP)" },
    { text: "Enterprise Intelligence", subtext: "Deploying secure, localized models that reason and execute" },
    { text: "Autonomous Infrastructure", subtext: "Beyond software. We engineer self-sustaining systems" },
  ];

  // Auto-rotate statements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [statements.length]);

  // Scroll animations and marquee
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop } = context.conditions as { isDesktop: boolean };

      // Add a slight parallax/darkening effect only on desktop
      if (isDesktop && videoOverlayRef.current) {
        gsap.to(videoOverlayRef.current, {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          }
        });
      }
    });

    // Seamless Infinite Loop Marquee (works on both mobile & desktop)
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: "-50%", // Moving half its width since we double the items
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    }

    return () => mm.revert();
  }, []);

  // Text Reveal Animation whenever statement changes
  useEffect(() => {
    if (!textContainerRef.current) return;

    const mm = gsap.matchMedia();
    const subtext = textContainerRef.current.querySelector('.hero-subtext');

    mm.add("(min-width: 768px)", () => {
      const chars = textContainerRef.current?.querySelectorAll('.hero-text-char');
      if (chars && chars.length > 0) {
        gsap.fromTo(chars,
          {
            y: 80,
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            rotateX: -45
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            rotateX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power4.out"
          }
        );
      }

      gsap.fromTo(subtext,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    });

    mm.add("(max-width: 767px)", () => {
      const heading = textContainerRef.current?.querySelector('h2');
      if (heading) {
        gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
      gsap.fromTo(subtext,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    });

    return () => mm.revert();
  }, [currentIndex]);

  const currentStatement = statements[currentIndex];

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);

    // Fallback timeout in case events don't fire
    const fallbackTimer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 3000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Helper to split text into words, then characters, avoiding clipping
  const splitText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em] overflow-hidden p-1 -m-1">
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className="hero-text-char inline-block hw-accelerated"
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const marqueeItems = [
    "MULTI-AGENT SYSTEMS", "MCP INTEGRATION", "WORKFLOW ORCHESTRATION", "LOCALIZED LLMS",
    "AUTONOMOUS INFRASTRUCTURE", "DATA PIPELINES", "API ABSTRACTION", "ENTERPRISE AI"
  ];

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen flex flex-col justify-between bg-black overflow-hidden">
      {/* Video Background - Optimized for performance */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Loading Placeholder - Show before video loads */}
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
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle contrast overlay - lighter to showcase video */}
        <div ref={videoOverlayRef} className="absolute inset-0 bg-black/25 md:bg-black/20 pointer-events-none" />
      </div>

      {/* Top Navbar Spacer */}
      <div className="h-20 md:h-28 w-full shrink-0 z-10 pointer-events-none" />

      {/* Main Hero Content Area - Left aligned for video visibility */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pb-12 md:pb-24 px-6 md:px-16 xl:px-24 pointer-events-none w-full mx-auto max-w-[1400px]">
        <div ref={textContainerRef} className="flex flex-col w-full items-start text-left max-w-lg">
          <h2
            className="text-[clamp(2rem,4vw,4rem)] md:text-[clamp(2.5rem,5vw,5rem)] text-white mb-2 md:mb-3 tracking-tight leading-[1.15] pt-2 pb-3 drop-shadow-xl font-medium"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", perspective: "1000px" }}
          >
            {splitText(currentStatement.text)}
          </h2>
          <p className="hero-subtext text-white/70 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.15em] uppercase mt-1 drop-shadow-md pb-2" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {currentStatement.subtext}
          </p>
        </div>
      </div>

      {/* GSAP Infinite Scrolling Marquee */}
      <div
        className="relative z-10 w-full overflow-hidden py-4 md:py-6 bg-transparent"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div className="w-[200%] md:w-max">
          <div ref={marqueeRef} className="flex whitespace-nowrap items-center hw-accelerated opacity-40">
            {[...Array(2)].map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                {marqueeItems.map((item, index) => (
                  <div key={`${loopIndex}-${index}`} className="flex items-center mx-6 md:mx-10">
                    <span className="text-white/70 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
