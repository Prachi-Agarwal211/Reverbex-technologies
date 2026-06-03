"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// SplitChars - Pure render component (no animation logic)
interface SplitCharsProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function SplitChars({ text, className = "", style }: SplitCharsProps) {
  const words = text.split(" ");

  return (
    <h2 className={className} style={style}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap mr-[0.3em] overflow-hidden p-1 -m-1"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="hero-char inline-block"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

// Category label component with white line
interface CategoryLabelProps {
  label: string;
}

function CategoryLabel({ label }: CategoryLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-[1px] bg-white shrink-0" />
      <span
        className="text-white/90 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const radialVignetteRef = useRef<HTMLDivElement>(null);
  const sideVignetteRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const DWELL_MS = prefersReducedMotion ? 2000 : 5000; // Faster cycling for reduced motion

  // Statements with label field
  const statements = [
    {
      label: "Agentic Workflows",
      text: "Agentic Workflows",
      subtext: "Automating complex processes so your business can scale infinitely",
    },
    {
      label: "System Orchestration",
      text: "System Orchestration",
      subtext: "Connecting disparate data to unlock new enterprise revenue",
    },
    {
      label: "Enterprise Intelligence",
      text: "Enterprise Intelligence",
      subtext: "Deploying secure models that reason, execute, and drive growth",
    },
    {
      label: "Autonomous Infrastructure",
      text: "Autonomous Infrastructure",
      subtext: "We engineer self-sustaining systems that build your bottom line",
    },
  ];

  // Hook 1: Entrance animation - runs once on mount
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Subtle parallax/darkening effect on main overlay (scrubbed with scroll)
      if (videoOverlayRef.current) {
        gsap.to(videoOverlayRef.current, {
          opacity: 0.88,
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
  }, {});

  // Hook 2: Entry animation for text when currentIndex changes
  useGSAP(() => {
    // Kill previous timelines before creating new ones
    if (exitTlRef.current) exitTlRef.current.kill();

    const subtext = textContainerRef.current?.querySelector(".hero-subtext");
    const mm = gsap.matchMedia();

    // Animate progress line
    if (progressLineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          transformOrigin: "left",
        }
      );
    }

    // Animate counter bounce
    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.15,
        }
      );
    }

    mm.add("(min-width: 768px)", () => {
      // Desktop: Cleaner text entrance - simpler animation
      const chars = textContainerRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }
      if (subtext) {
        gsap.fromTo(
          subtext,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Simple fade up
      const heading = textContainerRef.current?.querySelector("h2");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
      if (subtext) {
        gsap.fromTo(
          subtext,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power2.out" }
        );
      }
    });

    // Fade in scroll cue after entrance
    if (scrollCueRef.current) {
      gsap.to(scrollCueRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 1,
      });
    }

    return () => mm.revert();
  }, { scope: textContainerRef, dependencies: [currentIndex] });

  // Hook 3: Combined Exit & Progress animation
  useEffect(() => {
    if (exitTlRef.current) {
      exitTlRef.current.kill();
      exitTlRef.current = null;
    }

    let progressTween: gsap.core.Tween | null = null;
    let cycleTimer: ReturnType<typeof setTimeout> | null = null;

    const mm = gsap.matchMedia();

    // Animate progress line fresh for this statement
    if (progressLineRef.current) {
      gsap.set(progressLineRef.current, { scaleX: 0 });
      progressTween = gsap.to(progressLineRef.current, {
        scaleX: 1,
        duration: DWELL_MS / 1000,
        ease: "none",
        transformOrigin: "left",
      });
    }

    // Schedule exit after DWELL_MS - 600ms
    mm.add("(min-width: 768px)", () => {
      const chars = textContainerRef.current?.querySelectorAll(".hero-char");

      cycleTimer = setTimeout(() => {
        if (chars && chars.length > 0) {
          exitTlRef.current = gsap.timeline({
            onComplete: () => setCurrentIndex((prev) => (prev + 1) % statements.length),
          });
          exitTlRef.current.to(chars, {
            y: -40,
            opacity: 0,
            stagger: 0.015,
            duration: 0.4,
            ease: "power2.in",
          });
        } else {
          setCurrentIndex((prev) => (prev + 1) % statements.length);
        }
      }, DWELL_MS - 600);
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: simple cycle, no exit animation needed
      cycleTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % statements.length);
      }, DWELL_MS);
    });

    return () => {
      mm.revert();
      if (progressTween) progressTween.kill();
      if (cycleTimer) clearTimeout(cycleTimer);
      if (exitTlRef.current) {
        exitTlRef.current.kill();
        exitTlRef.current = null;
      }
    };
  }, [currentIndex, statements.length]);

  // Hook 5: GSAP marquee on desktop
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const marqueeElement = document.querySelector(".animate-marquee-left");
      if (marqueeElement) {
        gsap.set(marqueeElement, { clearProps: "animation" });

        gsap.to(marqueeElement, {
          xPercent: -50,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => mm.revert();
  }, {});

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
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-[#020202]"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies — Intelligent Architecture</h1>

      {/* Mobile ambient layer — pure CSS, zero JS */}
      <div className="absolute inset-0 pointer-events-none z-[1] md:hidden overflow-hidden">
        <div className="mobile-orb-1 absolute w-64 h-64 rounded-full"
          style={{ top: '10%', right: '-20%', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
        <div className="mobile-orb-2 absolute w-48 h-48 rounded-full"
          style={{ bottom: '20%', left: '-15%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
        <div className="mobile-orb-3 absolute w-32 h-32 rounded-full"
          style={{ top: '50%', right: '10%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />
        {/* Enhanced dark overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Desktop dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[2] md:block hidden" aria-hidden="true" />

      {/* Video Background - will-change only on videoWrapRef (transform only) */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover"
          aria-hidden="true"
          poster="/hero-poster.jpg"
        >
          <source
            srcSet="/hero-video-mobile.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source
            srcSet="/hero-video-desktop.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          <source srcSet="/hero-video.webm" type="video/webm" />
          {/* Fallback to original for older browsers */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ALL OVERLAYS REMOVED - Pure video showcase */}

      {/* Top Navbar Spacer */}
      <div className="h-20 md:h-28 w-full shrink-0 z-10 pointer-events-none" />

      {/* Main Hero Content - ALIGNED LEFT, BOTTOM POSITION */}
      <div
        ref={textContainerRef}
        className="relative z-[5] flex flex-col justify-end pb-20 md:pb-20 px-4 md:px-16 xl:px-24 pointer-events-none w-full flex-grow"
      >
        <div className="flex flex-col w-full items-start text-left max-w-2xl">
          <CategoryLabel label={currentStatement.label} />

          <SplitChars
            text={currentStatement.text}
            className="text-left text-[clamp(1.8rem,5vw,2.8rem)] md:text-[clamp(3.5rem,5.5vw,5.5rem)] text-white mb-2 tracking-tight leading-[1.1] font-semibold drop-shadow-lg"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              perspective: "1000px",
              textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)'
            }}
          />
          <p
            className="hero-subtext text-white text-[clamp(0.7rem,1.5vw,0.85rem)] md:text-[clamp(0.85rem,1.2vw,1rem)] font-light tracking-[0.15em] uppercase mt-2 text-left drop-shadow-md"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              textShadow: '0 1px 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.5)'
            }}
          >
            {currentStatement.subtext}
          </p>

          <div className="w-[100px] md:w-[200px] h-[2px] bg-white/20 mt-4 md:mt-6 overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-white"
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-start gap-2 mt-3 md:mt-4">
            {statements.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === currentIndex ? '20px' : '5px',
                  height: '3px',
                  background: i === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <div className="flex justify-start w-full mt-2 md:mt-3">
            <div
              ref={counterRef}
              className="text-white/70 text-[clamp(0.65rem,1.2vw,0.85rem)] font-mono tracking-[0.2em]"
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(statements.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-bounce-slow" />
        </div>
      </div>

      {/* Infinite Scrolling Marquee - Balanced visibility */}
      <div
        className="relative z-[5] w-full overflow-hidden py-3 md:py-5 bg-gradient-to-t from-black/70 to-black/40 backdrop-blur-md"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="w-[200%] md:w-max">
          <div
            className="flex whitespace-nowrap items-center opacity-55 md:opacity-45 animate-marquee-left"
            style={{ animationDuration: "25s" }}
          >
            {[...Array(2)].map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                {marqueeItems.map((item, index) => (
                  <div key={`${loopIndex}-${index}`} className="flex items-center mx-4 md:mx-10">
                    <span
                      className="text-white md:text-white/85 text-[10px] md:text-sm font-semibold tracking-[0.15em] uppercase drop-shadow-md"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {item}
                    </span>
                    <span className="text-white/60 md:text-white/50 mx-4 md:mx-10 text-sm md:text-lg font-light">
                      ✦
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #020202)' }}
      />
    </section>
  );
}
