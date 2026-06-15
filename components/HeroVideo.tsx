"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Scroll to section with Lenis/Native support
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - offset;

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetPosition, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Entrance animations for text and buttons
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-heading-word",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power4.out",
      }
    );

    tl.fromTo(
      ".hero-subheading",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    gsap.fromTo(
      scrollCueRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        delay: 1.5,
      }
    );
  }, { scope: containerRef });

  const marqueeItems = [
    "WEBSITES",
    "E-COMMERCE",
    "META ADS",
    "GOOGLE ADS",
    "LEAD GENERATION",
    "ERP SYSTEMS",
    "MOBILE APPS",
    "AI SOLUTIONS",
    "WHATSAPP AUTOMATION",
    "LOGO DESIGN",
    "REBRANDING",
    "SEO"
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-[#000000]"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies — Websites, Ads, Automation</h1>

      {/* Video Background */}
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
          className="w-full h-full object-cover opacity-65"
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
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80 z-[1]" />
      </div>

      {/* Film grain overlay */}
      <div className="hero-grain z-10" />

      {/* Spacer to push content down */}
      <div className="flex-grow" />

      {/* Main Hero Content */}
      <div
        ref={textContainerRef}
        className="relative z-20 flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-16 xl:px-24 w-full max-w-5xl"
      >
        <div className="flex flex-col items-start text-left">
          {/* Label Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#EAB308] shrink-0" />
            <span
              className="text-[#EAB308] text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Reverbex v2
            </span>
          </div>

          {/* H1 and H2 Editorial layout */}
          <div className="overflow-hidden mb-2">
            <h2
              className="hero-heading-word text-white text-[clamp(2.5rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.95]"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Websites. Ads. AI.
            </h2>
          </div>
          <div className="overflow-hidden mb-6">
            <h3
              className="hero-heading-word text-white/95 text-[clamp(1.8rem,5vw,4.5rem)] font-extrabold tracking-tighter leading-[1.0]"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Built To Grow Your Business.
            </h3>
          </div>

          {/* Subheading text */}
          <p
            className="hero-subheading text-[#A0A0A0] text-sm md:text-lg font-normal tracking-wide max-w-3xl leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Custom Next.js websites, Meta Ads, Google Ads, lead generation
            systems, ERP software, AI automation, WhatsApp integration, and complete
            digital solutions for businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="hero-cta px-8 py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] cursor-pointer"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => scrollToSection("architectures")}
              className="hero-cta px-8 py-4 bg-transparent border border-[#1A1A1A] hover:bg-[#111111] text-white text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div
        className="relative z-20 w-full overflow-hidden py-4 bg-black/60 border-y border-white/5 backdrop-blur-md"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...Array(2)].map((_, loopIndex) => (
            <React.Fragment key={loopIndex}>
              {marqueeItems.map((item, index) => (
                <div key={`${loopIndex}-${index}`} className="flex items-center mx-8">
                  <span
                    className="text-[#F5F5F0]/60 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item}
                  </span>
                  <span className="text-[#EAB308] mx-8 text-sm">✦</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-24 right-12 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#EAB308] to-transparent animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
}
