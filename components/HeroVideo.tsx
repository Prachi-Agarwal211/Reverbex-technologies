"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/scrollToSection";
import MouseDistortion from "./MouseDistortion";
import Sparkles from "./Sparkles";

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // ---- Split headline into per-character spans ----
      const headline = sectionRef.current!.querySelector(".hero-headline");
      if (headline) {
        const walker = document.createTreeWalker(
          headline,
          NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
          null,
        );
        let html = "";
        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || "";
            html += text
              .split("")
              .map(
                (char) =>
                  `<span class="hero-char inline-block">${char === " " ? "&nbsp;" : char}</span>`
              )
              .join("");
          } else if ((node as Element).tagName === "BR") {
            html += "<br>";
          }
        }
        headline.innerHTML = html;
      }

      const chars = sectionRef.current!.querySelectorAll(".hero-char");
      const subtitle = sectionRef.current!.querySelector(".hero-sub");
      const ctas = sectionRef.current!.querySelectorAll(".hero-cta");
      const marquee = sectionRef.current!.querySelector(".hero-marquee");

      if (prefersReducedMotion) {
        gsap.set([chars, subtitle, ctas, marquee], { opacity: 1, y: 0 });
        return;
      }

      // ---- Intro timeline ----
      const tl = gsap.timeline();

      tl.fromTo(
        chars,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.9, ease: "expo.out" }
      );

      tl.fromTo(
        subtitle,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ctas,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power2.out" },
        "-=0.25"
      );

      tl.fromTo(
        marquee,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.15"
      );

      // ---- Parallax on the video ----
      const video = sectionRef.current!.querySelector("video");
      if (video) {
        gsap.to(video, {
          y: 80,
          scale: 1.04,
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Fade the headline up slightly as we leave
      gsap.to(headline, {
        y: -40,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "20% top",
          end: "50% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const marqueeItems = [
    "WEBSITES", "E-COMMERCE", "META ADS", "GOOGLE ADS",
    "LEAD GENERATION", "ERP SYSTEMS", "MOBILE APPS",
    "AI SOLUTIONS", "WHATSAPP AUTOMATION", "SEO"
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero section"
    >
      <h1 className="sr-only">Reverbex Technologies — Websites, Ads, Automation</h1>
      
      <div className="absolute inset-0 z-0">
        <HeroForeground />
      </div>

      {/* Mouse-following particle distortion */}
      <MouseDistortion />

      {/* Gold sparkles overlay */}
      <Sparkles />

      <HeroContent marqueeItems={marqueeItems} />
    </section>
  );
}

function HeroForeground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      {/* DESKTOP: video background */}
      <div className="hidden md:block absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/new.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none hero-gradient-mask" />
      </div>

      {/* MOBILE: video top, dark bottom */}
      <div className="flex md:hidden flex-col absolute inset-0">
        <div className="relative w-full h-[45%] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/new.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        <div className="relative w-full h-[55%] bg-transparent" />
      </div>
    </div>
  );
}

function HeroContent({ marqueeItems }: { marqueeItems: string[] }) {
  return (
    <div className="relative z-[60] w-full h-full flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-end pb-0 px-5 sm:px-6 md:px-12 xl:px-16 md:pb-20 pt-[45vh] md:pt-0">
        <div className="max-w-xl lg:max-w-2xl">
          <h2 className="hero-headline text-white font-extrabold tracking-[-0.02em] leading-[1.05] mb-4 sm:mb-6 text-[2.2rem] sm:text-[clamp(2.2rem,5vw,4rem)] md:text-[clamp(2.5rem,5vw,4.5rem)] lg:text-[clamp(2.8rem,5vw,5rem)]">
            We Turn Your
            <br />
            Business
            <br />
            Into <span className="text-[#EAB308]">A Brand.</span>
          </h2>

          <p className="hero-sub text-[#A0A0A0] text-sm sm:text-base font-normal leading-relaxed max-w-md mb-6 sm:mb-8 md:mb-10">
            Websites, ads, AI, and automation — everything your business needs to grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="hero-cta px-6 py-3 sm:px-7 sm:py-3.5 bg-[#EAB308] text-black text-sm font-bold rounded-lg transition-all duration-200 hover:bg-[#d4a007] cursor-pointer w-full sm:w-auto text-center"
            >
              Start Your Project
            </button>
            <button
              onClick={() => scrollToSection("architectures")}
              className="hero-cta px-6 py-3 sm:px-7 sm:py-3.5 bg-transparent hover:bg-white/5 text-white text-sm font-semibold rounded-lg border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
            >
              See Our Work
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[45%]" />

      {/* Marquee */}
      <div className="hero-marquee absolute bottom-0 left-0 right-0 z-[60] w-full overflow-hidden py-3 sm:py-4 border-t border-white/10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...Array(3)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex items-center">
              {marqueeItems.map((item, index) => (
                <div key={`${loopIndex}-${index}`} className="flex items-center mx-5 sm:mx-6 md:mx-8">
                  <span className="text-white/60 text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                    {item}
                  </span>
                  <span className="text-[#EAB308]/50 mx-5 sm:mx-6 md:mx-8 text-[8px]">&bull;</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
