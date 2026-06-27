"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (reducedMotion.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Video stays visible — only subtle zoom
      tl.to(
        ".hero-video",
        {
          scale: 1.04,
          ease: "none",
        },
        0
      );

      // Dark overlay rises from bottom
      tl.fromTo(
        ".hero-dark-overlay",
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0
      );

      // Tagline fades out
      tl.to(
        ".hero-tagline",
        {
          opacity: 0,
          y: -15,
          ease: "power2.in",
        },
        0
      );
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: "+=60%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        ".hero-video",
        {
          scale: 1.03,
          ease: "none",
        },
        0
      );

      tl.fromTo(
        ".hero-dark-overlay",
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0
      );

      tl.to(
        ".hero-tagline",
        {
          opacity: 0,
          y: -10,
          ease: "power2.in",
        },
        0
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="hero-scene"
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-black z-0"
      aria-label="Hero section"
    >
      <h1 className="sr-only">
        Reverbex Technologies | Custom Website Development &amp; AI Automation
      </h1>

      {/* Video layer — stays fully visible, only zooms slightly */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="hero-video absolute inset-0 w-full h-full object-cover origin-center"
        style={{ opacity: 0.9 }}
        aria-hidden="true"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/hero-video-desktop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — rises from bottom during scroll, covers video smoothly */}
      <div
        className="hero-dark-overlay absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.6) 60%, transparent 100%)",
          opacity: 0,
        }}
      />

      {/* Bottom gradient for tagline readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      />

      {/* Tagline — fades out on scroll */}
      <div className="hero-tagline absolute bottom-8 left-0 right-0 px-6 md:px-10 z-10 flex justify-between items-end pointer-events-none">
        <div>
          <p
            className="text-white/70 font-medium tracking-widest uppercase text-shadow-body"
            style={{ fontSize: "clamp(9px, 1.1vw, 12px)" }}
          >
            Websites. Ads. Automation.
          </p>
          <p
            className="text-white/40 tracking-wider mt-1"
            style={{ fontSize: "clamp(8px, 0.9vw, 10px)" }}
          >
            Built to scale your revenue.
          </p>
        </div>
        <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase text-emboss">
          Reverbex
        </span>
      </div>
    </section>
  );
}
