"use client";

import { useRef } from "react";
import MouseDistortion from "./MouseDistortion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrustedBy from "./TrustedBy";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const trustedWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !videoWrapperRef.current || !trustedWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: 1,
        pin: true,
        pinSpacing: true, // Use true here so it pushes the next section instead of overlapping weirdly
      }
    });

    tl.to(videoWrapperRef.current, {
      opacity: 0, filter: "blur(10px)", duration: 1,
    }, 0);

    tl.fromTo(trustedWrapperRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, pointerEvents: "auto" },
    0.2);
  }, { scope: containerRef });

  return (
    <section
      id="hero-scene"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black z-0"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies | Custom Website Development & AI Automation</h1>

      {/* Scene 1: Pure Video + Minimal Tagline */}
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay loop muted playsInline preload="metadata"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          aria-hidden="true"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video-desktop.mp4" type="video/mp4" />
        </video>

        {/* Minimal gradient at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-32" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)"
        }} />

        <MouseDistortion />

        {/* Empty hero — minimal tagline at the bottom */}
        <div className="absolute bottom-6 left-0 right-0 px-6 md:px-10 z-10 flex justify-between items-end pointer-events-none">
          <p className="text-[10px] md:text-xs text-white/50 font-medium tracking-widest uppercase">
            Websites. Ads. Automation. Built to scale your revenue.
          </p>
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">Reverbex</span>
        </div>
      </div>

      {/* Scene 2: TrustedBy Layer */}
      <div
        ref={trustedWrapperRef}
        className="absolute inset-0 w-full h-full z-10 opacity-0 pointer-events-none flex flex-col justify-center items-center"
        style={{ background: "#03050F" }}
      >
        <TrustedBy />
      </div>
    </section>
  );
}
