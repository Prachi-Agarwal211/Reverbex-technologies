"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Reverbex transformed our online presence. We went from zero leads to 500+ in just weeks.",
    author: "Marketing Director",
    company: "MAAC Animation Jaipur"
  },
  {
    quote: "The e-commerce platform they built generates revenue while we sleep.",
    author: "Founder",
    company: "Aarya Clothing"
  },
  {
    quote: "Professional, fast, and they understood our business perfectly.",
    author: "Operations Head",
    company: "Khemji Wire Company"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".testimonial-reveal",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const cards = gridRef.current?.querySelectorAll(".testimonial-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
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
      className="w-full py-24 md:py-32 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 mx-auto max-w-3xl">
          <span
            className="testimonial-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Client Success
          </span>
          <h2
            className="testimonial-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            What Our Clients Say.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-card flex flex-col p-8 md:p-10 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl relative"
            >
              <Quote className="w-10 h-10 text-[#1A1A1A] mb-6" fill="currentColor" />
              
              <p
                className="text-white text-lg md:text-xl leading-relaxed font-medium mb-8 flex-grow"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                "{item.quote}"
              </p>

              <div className="flex flex-col mt-auto pt-6 border-t border-[#1A1A1A]">
                <span className="text-white font-bold tracking-tight">
                  {item.author}
                </span>
                <span className="text-[#A0A0A0] text-sm mt-1">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
