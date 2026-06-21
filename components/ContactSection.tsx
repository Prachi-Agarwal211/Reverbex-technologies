"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CONTACT } from "@/lib/config";
import BackgroundBeams from "./BackgroundBeams";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    const element = containerRef.current;
    if (!video || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 0.8;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Clip-path wipe reveal on the massive heading
      const headingMask = containerRef.current?.querySelector(".contact-heading-mask");
      if (headingMask) {
        gsap.fromTo(
          headingMask,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stagger in the contact grid
      const gridItems = containerRef.current?.querySelectorAll(".contact-grid-item");
      if (gridItems) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Eyebrow slide in
      const eyebrow = containerRef.current?.querySelector(".contact-eyebrow");
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      const reveals = containerRef.current?.querySelectorAll(".mobile-reveal");
      if (reveals) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-[100dvh] overflow-hidden overflow-x-hidden bg-transparent flex flex-col justify-end"
    >
      {/* Absolute Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-50 hidden md:block"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 w-full h-full md:hidden animate-ken-burns"
          style={{
            backgroundImage: "url(/contact-fallback.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#050505]/30 z-10 pointer-events-none hidden md:block mix-blend-multiply" />

        {/* Animated background beams */}
        <BackgroundBeams />
      </div>

      {/* Content — editorial left-aligned */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-28 md:pb-20 pb-safe flex flex-col items-start justify-end pointer-events-none pt-24 md:pt-0">
        {/* Eyebrow */}
        <div className="contact-eyebrow flex items-center gap-3 mb-6 pointer-events-auto">
          <span className="w-8 h-[1px] bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[clamp(0.65rem,1.5vw,0.85rem)] font-semibold tracking-[0.25em] uppercase">
            Get In Touch
          </span>
        </div>

        {/* Massive heading — clip-path masked, left-aligned, HUGE */}
        <div className="w-full mb-12 md:mb-20 pointer-events-auto">
          <div className="contact-heading-mask" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
            <h2 className="display-text text-white">
              Ready to
              <br />
              <span className="text-[#EAB308]">scale?</span>
            </h2>
          </div>
          <p className="mobile-reveal text-white/60 text-sm md:text-base font-light tracking-[0.05em] mt-6 max-w-xl leading-relaxed">
            Stop losing customers to slow websites and bad ads. Tell us about your project — we&apos;ll show you the math.
          </p>
        </div>

        {/* Two-column editorial grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-white/10 pt-10 md:pt-16 pointer-events-auto">
          {/* Left: CTA + contact info (wider) */}
          <div className="contact-grid-item md:col-span-5 flex flex-col items-start gap-8">
            <a
              href="https://wa.me/919929986743"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#EAB308] text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Message Us on WhatsApp
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                  Email
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-white text-base md:text-lg font-light hover:text-[#EAB308] transition-colors"
                >
                  {CONTACT.emailDisplay}
                </a>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                  Location
                </span>
                <p className="text-white text-base md:text-lg font-light">
                  {CONTACT.location}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form (wider) */}
          <div className="contact-grid-item md:col-span-7 flex flex-col items-start gap-6 bg-[#0A0A0A] p-6 md:p-8 rounded-2xl border border-[#1A1A1A]">
            <span className="text-white/90 text-lg font-medium tracking-tight">
              Tell us about your project
            </span>
            {formSubmitted ? (
              <div className="w-full py-12 text-center">
                <span className="text-[#EAB308] text-4xl block mb-4">
                  &#10003;
                </span>
                <p className="text-white text-lg font-medium">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="w-full flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors"
                  />
                </div>
                <input
                  type="url"
                  name="website"
                  placeholder="Business URL (Optional)"
                  className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your needs..."
                  rows={4}
                  required
                  className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg px-4 py-3 text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#EAB308] transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#EAB308] text-black font-bold py-3 rounded-lg hover:bg-[#d4a007] transition-colors mt-2"
                >
                  Tell Us About Your Project
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
