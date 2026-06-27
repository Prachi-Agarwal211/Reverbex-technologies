"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/config";
import ContactSection from "../../components/ContactSection";

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (!prefersReducedMotion && !isMobile) {
      gsap.fromTo(
        ".contact-left-content > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
      );

      gsap.fromTo(
        ".contact-right-content",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 bg-[#030303]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">

          {/* Left Side: Sticky Information */}
          <div className="lg:col-span-1">
            <div className="contact-left-content sticky top-40 pt-10">
              <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
                Start a Conversation
              </span>
              <h1 className="text-[clamp(3.5rem,6vw,6rem)] font-black tracking-tighter leading-[0.95] mb-8">
                Let&apos;s build something.
              </h1>
              <p className="text-[#D0D0D0] text-xl font-medium leading-relaxed max-w-md mb-16 text-shadow-body">
                Whether you need a massive enterprise ERP, a blazing fast Next.js e-commerce site, or a performance marketing engine&mdash;our team of senior engineers is ready.
              </p>

              {/* Direct Contact Methods */}
              <div className="space-y-8 border-t border-[#1A1A1A] pt-12">
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-6 p-4 -ml-4 hover:bg-[#0A0A0A] rounded-2xl transition-colors duration-300">
                  <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[#888] text-xs font-semibold uppercase tracking-widest mb-1">Email Us</div>
                    <div className="text-xl font-bold group-hover:text-[#EAB308] transition-colors duration-300">{CONTACT.emailDisplay}</div>
                  </div>
                </a>

                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-4 -ml-4 hover:bg-[#0A0A0A] rounded-2xl transition-colors duration-300">
                  <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[#888] text-xs font-semibold uppercase tracking-widest mb-1">Call / WhatsApp</div>
                    <div className="text-xl font-bold group-hover:text-[#EAB308] transition-colors duration-300">{CONTACT.phone}</div>
                  </div>
                </a>

                <div className="group flex items-center gap-6 p-4 -ml-4 hover:bg-[#0A0A0A] rounded-2xl transition-colors duration-300">
                  <div className="w-14 h-14 bg-[#111] rounded-full flex items-center justify-center text-[#EAB308] group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[#888] text-xs font-semibold uppercase tracking-widest mb-1">Location</div>
                    <div className="text-xl font-bold group-hover:text-[#EAB308] transition-colors duration-300">Remote / Global</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-1">
            <div className="contact-right-content">
              <ContactSection />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
