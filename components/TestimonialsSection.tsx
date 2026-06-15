"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const testimonials = [
  {
    quote: "Reverbex transformed our online presence. We went from zero leads to 500+ in just weeks.",
    author: "Admissions Team",
    company: "MAAC Animation Jaipur"
  },
  {
    quote: "The custom e-commerce platform they built generates sales smoothly. We don't pay any platform fees, saving us thousands.",
    author: "Operations Lead",
    company: "Aarya Clothing"
  },
  {
    quote: "Professional, fast, and they understood our business operations perfectly. The custom ERP has automated our cataloging.",
    author: "Director",
    company: "Khemji Wire Company"
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".test-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const cards = gridRef.current?.querySelectorAll(".test-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="w-full py-24 bg-[#0A0A0A] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <span
            className="test-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Feedback
          </span>
          <h2
            className="test-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            What Our Clients Say.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="test-card p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <p
                className="text-white text-lg md:text-xl font-light italic leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              
              <div className="pt-6 border-t border-[#1A1A1A]">
                <h4
                  className="text-white text-base font-bold"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {item.author}
                </h4>
                <p
                  className="text-[#EAB308] text-xs uppercase tracking-wider font-semibold"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
