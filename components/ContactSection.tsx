"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

import { CONTACT } from "@/lib/config";
import BackgroundBeams from "./BackgroundBeams";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Heading reveal
    gsap.fromTo(
      ".contact-heading > *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // Grid items stagger
    const gridItems = containerRef.current.querySelectorAll(".contact-grid-item");
    gsap.fromTo(
      gridItems,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#050505] py-24 md:py-32"
    >
      {/* Animated background beams & glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <BackgroundBeams />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#EAB308]/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#EAB308]/5 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="contact-heading mb-16 md:mb-24 text-center md:text-left">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Initiate Project
          </span>
          <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-black tracking-tighter leading-[0.95] text-white">
            Ready to <span className="text-[#EAB308]">Scale?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Contact Info Cards */}
          <div className="contact-grid-item md:col-span-5 flex flex-col gap-6">
            <p className="text-[#A0A0A0] text-lg md:text-xl font-light leading-relaxed mb-8">
              Stop losing customers to slow websites and generic templates. Tell us about your project—we'll show you the math.
            </p>

            {/* Glassmorphic Info Cards */}
            <a href="mailto:15anuragsingh2003@gmail.com" className="group flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 hover:border-[#EAB308]/30 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]">
              <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] border border-white/5 group-hover:scale-110 group-hover:bg-[#EAB308]/10 transition-all duration-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[#666666] text-xs font-semibold uppercase tracking-widest mb-1">Email Us</div>
                <div className="text-lg md:text-xl font-bold text-white group-hover:text-[#EAB308] transition-colors duration-500">{CONTACT.emailDisplay}</div>
              </div>
            </a>

            <a href="https://wa.me/919929986743" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 hover:border-[#EAB308]/30 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]">
              <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] border border-white/5 group-hover:scale-110 group-hover:bg-[#EAB308]/10 transition-all duration-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[#666666] text-xs font-semibold uppercase tracking-widest mb-1">Call / WhatsApp</div>
                <div className="text-lg md:text-xl font-bold text-white group-hover:text-[#EAB308] transition-colors duration-500">{CONTACT.phoneDisplay}</div>
              </div>
            </a>

            <div className="group flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 hover:border-[#EAB308]/30 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]">
              <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] border border-white/5 group-hover:scale-110 group-hover:bg-[#EAB308]/10 transition-all duration-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[#666666] text-xs font-semibold uppercase tracking-widest mb-1">Location</div>
                <div className="text-lg md:text-xl font-bold text-white group-hover:text-[#EAB308] transition-colors duration-500">{CONTACT.location}</div>
              </div>
            </div>
          </div>

          {/* Right: Ultra-Minimalist Form */}
          <div className="contact-grid-item md:col-span-7 relative">
            <div className="bg-[#0A0A0A]/50 backdrop-blur-xl border border-[#1A1A1A] p-8 md:p-12 rounded-[2rem] relative z-10">
              
              {formSubmitted ? (
                <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[#EAB308]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-[#EAB308] text-4xl block">&#10003;</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                  <p className="text-[#A0A0A0] text-lg">
                    Thank you. A senior engineer will review your request and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = {
                      name: (form.elements.namedItem("name") as HTMLInputElement).value,
                      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
                      website: (form.elements.namedItem("website") as HTMLInputElement).value,
                      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                    };
                    try {
                      await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                      });
                    } catch {}
                    setFormSubmitted(true);
                  }}
                  className="w-full flex flex-col gap-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        required
                        className="w-full bg-transparent border-b border-[#333] px-0 py-4 text-white text-lg placeholder-[#666] focus:outline-none focus:border-[#EAB308] transition-colors peer"
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-500 peer-focus:w-full" />
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        required
                        className="w-full bg-transparent border-b border-[#333] px-0 py-4 text-white text-lg placeholder-[#666] focus:outline-none focus:border-[#EAB308] transition-colors peer"
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-500 peer-focus:w-full" />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="url"
                      name="website"
                      placeholder="Business URL (Optional)"
                      className="w-full bg-transparent border-b border-[#333] px-0 py-4 text-white text-lg placeholder-[#666] focus:outline-none focus:border-[#EAB308] transition-colors peer"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-500 peer-focus:w-full" />
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      name="message"
                      placeholder="Tell us about your technical requirements..."
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-[#333] px-0 py-4 text-white text-lg placeholder-[#666] focus:outline-none focus:border-[#EAB308] transition-colors resize-none peer"
                    ></textarea>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-500 peer-focus:w-full" />
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden bg-[#1A1A1A] border border-[#333] text-white font-bold py-5 rounded-xl hover:border-[#EAB308] transition-all duration-500 flex items-center justify-center gap-3 mt-4"
                  >
                    {/* Hover fill effect */}
                    <div className="absolute inset-0 bg-[#EAB308] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-0" />
                    
                    <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                      Submit Project Details
                    </span>
                    <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:text-black transition-colors duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
