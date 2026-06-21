"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Reverbex transformed our online presence. We went from zero leads to 500+ in just weeks.",
    author: "Marketing Director",
    company: "MAAC Animation Jaipur",
    metric: "500+ leads generated",
  },
  {
    quote:
      "The e-commerce platform they built generates revenue while we sleep. Zero platform fees, full control.",
    author: "Founder",
    company: "Aarya Clothing",
    metric: "3+ lakh revenue",
  },
  {
    quote:
      "Professional, fast, and they understood our business perfectly. Our digital presence finally matches our quality.",
    author: "Operations Head",
    company: "Khemji Wire Company",
    metric: "Complete transformation",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + testimonials.length) % testimonials.length;
      if (nextIndex === activeIndex) return;

      // Animate out
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setActiveIndex(nextIndex);
            // Animate in
            gsap.fromTo(
              quoteRef.current!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
          },
        });
      } else {
        setActiveIndex(nextIndex);
      }
    },
    [activeIndex]
  );

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Header entrance
    const header = containerRef.current.querySelector(".test-header");
    if (header) {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Spotlight card entrance
    const spotlight = containerRef.current.querySelector(".test-spotlight");
    if (spotlight) {
      gsap.fromTo(
        spotlight,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: spotlight,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Dots entrance
    const dots = containerRef.current.querySelector(".test-dots");
    if (dots) {
      gsap.fromTo(
        dots,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: dots,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  const current = testimonials[activeIndex];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — left-aligned */}
        <div className="test-header text-left mb-16 md:mb-20 max-w-3xl">
          <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Results
          </span>
          <h2 className="display-text text-white mb-6">
            Numbers That
            <br />
            Speak.
          </h2>
        </div>

        {/* Spotlight — one large quote at a time */}
        <div className="test-spotlight relative">
          {/* Big metric number */}
          <div className="mb-8 md:mb-12">
            <span className="text-white text-[clamp(2rem,6vw,5rem)] font-black tracking-[-0.03em] leading-none">
              {current.metric}
            </span>
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="min-h-[200px]">
            <blockquote className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium mb-8 max-w-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {current.author.charAt(0)}
                </span>
              </div>
              <div>
                <span className="text-white font-bold tracking-tight block text-lg">
                  {current.author}
                </span>
                <span className="text-[#A0A0A0] text-sm">
                  {current.company}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="test-dots flex items-center gap-6 mt-10 md:mt-14">
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="w-10 h-10 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-[#EAB308]/50 transition-all duration-300 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                    i === activeIndex
                      ? "w-8 bg-[#EAB308]"
                      : "w-2 bg-[#1A1A1A] hover:bg-[#333]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(activeIndex + 1)}
              className="w-10 h-10 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-[#EAB308]/50 transition-all duration-300 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
