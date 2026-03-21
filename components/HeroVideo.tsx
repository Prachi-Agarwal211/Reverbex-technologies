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

// Category label component with yellow line
interface CategoryLabelProps {
  label: string;
}

function CategoryLabel({ label }: CategoryLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-[1px] bg-yellow-500 shrink-0" />
      <span
        className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase"
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

  const DWELL_MS = 5000; // 5 seconds per statement

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
          duration: 0.8,
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
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    }

    mm.add("(min-width: 768px)", () => {
      // Desktop: Character entrance animation
      const chars = textContainerRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            y: 80,
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            rotateX: -45,
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            rotateX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power4.out",
          }
        );
      }
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
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
      if (subtext) {
        gsap.fromTo(
          subtext,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
        );
      }
    });

    // Fade in scroll cue after entrance
    if (scrollCueRef.current) {
      gsap.to(scrollCueRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 1.5,
      });
    }

    return () => mm.revert();
  }, { scope: textContainerRef, dependencies: [currentIndex] });

  // Hook 3: Exit animation with cycling - single setInterval
  useEffect(() => {
    const mm = gsap.matchMedia();

    const setupExitAnimation = () => {
      // Kill previous timeline before creating new one
      if (exitTlRef.current) exitTlRef.current.kill();

      mm.add("(min-width: 768px)", () => {
        const chars = textContainerRef.current?.querySelectorAll(".hero-char");
        if (chars && chars.length > 0) {
          exitTlRef.current = gsap.timeline({
            onComplete: () => {
              setCurrentIndex((prev) => (prev + 1) % statements.length);
            },
          });

          exitTlRef.current.to(chars, {
            y: -80,
            opacity: 0,
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
            rotateX: 45,
            stagger: 0.02,
            duration: 0.6,
            ease: "power4.in",
            delay: DWELL_MS / 1000 - 1,
          });
        }
      });
    };

    setupExitAnimation();

    // Fade out scroll cue on cycle
    if (scrollCueRef.current) {
      gsap.to(scrollCueRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: DWELL_MS / 1000 - 1.5,
      });
    }

    return () => {
      mm.revert();
      if (exitTlRef.current) exitTlRef.current.kill();
    };
  }, [currentIndex, statements.length]);

  // Hook 4: Progress line animation - single timeline with proper cleanup
  useEffect(() => {
    if (exitTlRef.current) exitTlRef.current.kill();

    const progressTl = gsap.timeline({
      repeat: -1,
      delay: 0,
    });

    if (progressLineRef.current) {
      progressTl.to(progressLineRef.current, {
        scaleX: 1,
        duration: DWELL_MS / 1000,
        ease: "none",
        transformOrigin: "left",
      });
    }

    return () => {
      progressTl.kill();
    };
  }, [currentIndex]);

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
      id="home"
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col justify-between bg-black overflow-hidden overflow-x-hidden"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies — Intelligent Architecture</h1>

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
          poster="/hero-poster.webp"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video.webm" type="video/webm; codecs=vp9,opus" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ALL OVERLAYS REMOVED - Pure video showcase */}

      {/* Top Navbar Spacer */}
      <div className="h-20 md:h-28 w-full shrink-0 z-10 pointer-events-none" />

      {/* Main Hero Content - MUCH SMALLER TEXT, MIDDLE-BOTTOM POSITION */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 xl:px-24 pointer-events-none w-full"
      >
        <div className="flex flex-col w-full items-start text-left max-w-xl">
          <CategoryLabel label={currentStatement.label} />

          <SplitChars
            text={currentStatement.text}
            className="text-left text-[clamp(1.5rem,3vw,3rem)] md:text-[clamp(1.75rem,3.5vw,3.5rem)] text-white mb-2 tracking-tight leading-[1.15] font-medium"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              perspective: "1000px",
            }}
          />
          <p
            className="hero-subtext text-white/90 text-[clamp(0.65rem,1vw,0.8rem)] font-light tracking-[0.1em] uppercase mt-1 text-left"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {currentStatement.subtext}
          </p>

          <div className="w-full max-w-md h-[1px] bg-white/20 mt-4 overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-yellow-500/70"
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="flex justify-start w-full mt-2">
            <div
              ref={counterRef}
              className="text-white/60 text-[clamp(0.65rem,1vw,0.8rem)] font-light tracking-[0.1em]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
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
          <div className="w-[1px] h-12 bg-gradient-to-b from-yellow-500 to-transparent animate-bounce-slow" />
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div
        className="relative z-10 w-full overflow-hidden py-4 md:py-6 bg-transparent"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="w-[200%] md:w-max">
          <div
            className="flex whitespace-nowrap items-center opacity-40 animate-marquee-left"
            style={{ animationDuration: "25s" }}
          >
            {[...Array(2)].map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                {marqueeItems.map((item, index) => (
                  <div key={`${loopIndex}-${index}`} className="flex items-center mx-6 md:mx-10">
                    <span
                      className="text-white/70 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {item}
                    </span>
                    <span className="text-yellow-500/60 mx-6 md:mx-10 text-lg md:text-xl font-light">
                      ✦
                    </span>
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
