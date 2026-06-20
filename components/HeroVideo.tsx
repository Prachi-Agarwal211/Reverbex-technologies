"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { scrollToSection } from "@/lib/scrollToSection";

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-line",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      ".hero-sub",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.5"
    );

    tl.fromTo(
      ".hero-cta",
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, { scope: containerRef });

  const marqueeItems = [
    "WEBSITES", "E-COMMERCE", "META ADS", "GOOGLE ADS",
    "LEAD GENERATION", "ERP SYSTEMS", "MOBILE APPS",
    "AI SOLUTIONS", "WHATSAPP AUTOMATION", "SEO"
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[600px] flex flex-col overflow-hidden bg-black"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies — Websites, Ads, Automation</h1>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          className="w-full h-full object-cover opacity-80"
          aria-hidden="true"
          poster="/hero-poster.jpg"
        >
          <source srcSet="/hero-video-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source srcSet="/hero-video-desktop.mp4" type="video/mp4" media="(min-width: 769px)" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-grow flex flex-col justify-end pb-0">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-12 xl:px-16 pb-24 sm:pb-16 md:pb-20">
          <div className="max-w-4xl">
            {/* Heading */}
            <h2
              className="hero-line text-white text-[2.2rem] sm:text-[clamp(2.2rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-4 sm:mb-6"
            >
              We Turn Your
              <br />
              <span className="bg-gradient-to-r from-[#EAB308] via-[#f5c842] to-white bg-clip-text text-transparent">Business Into A Brand.</span>
            </h2>

            {/* Subtitle */}
            <p className="hero-sub text-[#888888] text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              Websites, ads, AI, and automation — everything your business needs to grow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="hero-cta px-6 py-3.5 sm:px-7 sm:py-3.5 bg-gradient-to-r from-[#EAB308] via-[#f5c842] to-white text-black text-sm font-bold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] cursor-pointer w-full sm:w-auto text-center"
              >
                Start Your Project
              </button>
              <button
                onClick={() => scrollToSection("architectures")}
                className="hero-cta px-6 py-3.5 sm:px-7 sm:py-3.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                See Our Work
              </button>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-20 w-full overflow-hidden py-3 sm:py-4 border-t border-white/10">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {[...Array(3)].map((_, loopIndex) => (
              <div key={loopIndex} className="flex items-center">
                {marqueeItems.map((item, index) => (
                  <div key={`${loopIndex}-${index}`} className="flex items-center mx-5 sm:mx-6 md:mx-8">
                    <span className="text-white/60 text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                      {item}
                    </span>
                    <span className="text-[#EAB308]/50 mx-5 sm:mx-6 md:mx-8 text-[8px]">●</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
