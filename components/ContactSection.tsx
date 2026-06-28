"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/config";
import BackgroundBeams from "./BackgroundBeams";
import DotGrid from "./DotGrid";

gsap.registerPlugin(ScrollTrigger);

const inputClass = `
  w-full bg-[#111111] text-sm text-white placeholder-white/30
  border border-white/10 rounded-xl px-4 py-3.5
  focus:outline-none focus:border-yellow-500/50 focus:bg-[#151515]
  transition-all duration-250
`;

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleMagneticEnter = () => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    // Clean up previous listeners if any
    cleanupRef.current?.();
    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      cleanupRef.current = null;
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    cleanupRef.current = () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { cleanupRef.current?.(); };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(".contact-heading > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    );

    const gridItems = containerRef.current.querySelectorAll(".contact-grid-item");
    gsap.fromTo(gridItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
      }
    );

    // No pinning needed for ContactSection.

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full overflow-hidden py-20 md:py-28 z-[60]"
      style={{
        background: "transparent",
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 50% 0%,  rgba(26,58,107,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 55% 55% at 10% 75%, rgba(26,58,107,0.06) 0%, transparent 50%)
        `,
      }}
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#1A1A1A"
          activeColor="#EAB308"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Background beams */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <BackgroundBeams />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines-blue opacity-20 pointer-events-none" />

      {/* Orbs */}
      <div className="orb w-80 h-80 -top-20 left-1/2 -translate-x-1/2 opacity-10" style={{ background: "rgba(26,58,107,0.5)" }} />
      <div className="orb orb-2 w-64 h-64 bottom-0 right-10 opacity-10" style={{ background: "rgba(26,58,107,0.4)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="contact-heading mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-4 h-[1.5px] rounded bg-yellow-400" />
            <span className="section-label text-yellow-400">Let&apos;s Talk</span>
          </div>
          <h2 className="section-heading text-white mb-3">
            Let&apos;s build{" "}
            <span className="text-gradient-gold">something</span>.
          </h2>
          <p className="text-sm text-white/60 max-w-lg leading-relaxed">
            Tell us about your project. We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left: Contact Info */}
          <div className="contact-grid-item lg:col-span-5 flex flex-col gap-4">

            {/* Info cards */}
            {[
              {
                href: `mailto:${CONTACT.email}`,
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
                value: CONTACT.emailDisplay,
                color: "#EAB308",
              },
              {
                href: "https://wa.me/919929986743",
                icon: <Phone className="w-4 h-4" />,
                label: "Call / WhatsApp",
                value: CONTACT.phoneDisplay,
                color: "#3B82F6",
              },
              {
                href: undefined,
                icon: <MapPin className="w-4 h-4" />,
                label: "Location",
                value: CONTACT.location,
                color: "#10B981",
              },
            ].map((item, i) => {
              const sharedClass = "group flex items-center gap-4 p-4 rounded-xl transition-all duration-300";
              const sharedStyle: React.CSSProperties = {
                background: "#111111",
                border: `1px solid rgba(255,255,255,0.08)`,
              };
              const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.borderColor = `${item.color}35`;
                e.currentTarget.style.background = `${item.color}08`;
                e.currentTarget.style.transform = "translateX(4px)";
              };
              const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.borderColor = `rgba(255,255,255,0.08)`;
                e.currentTarget.style.background = "#111111";
                e.currentTarget.style.transform = "";
              };
              const inner = (
                <>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45 mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white/90">
                      {item.value}
                    </div>
                  </div>
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={sharedClass}
                    style={sharedStyle}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <div
                  key={i}
                  className={sharedClass}
                  style={sharedStyle}
                >
                  {inner}
                </div>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919929986743"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between px-5 py-4 rounded-2xl group transition-all duration-300"
              style={{
                background: "#111111",
                border: "1px solid rgba(234,179,8,0.2)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(234,179,8,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div>
                <div className="text-xs font-semibold text-white/50 mb-0.5">Fastest response</div>
                <div className="text-sm font-bold text-yellow-400">Chat on WhatsApp →</div>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(234,179,8,0.12)", color: "#EAB308" }}>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* Right: Form */}
          <div className="contact-grid-item lg:col-span-7">
            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {formSubmitted ? (
                <div className="min-h-[340px] flex flex-col items-center justify-center text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(59,130,246,0.15)", color: "#60A5FA" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Message received</h3>
                  <p className="text-sm text-white/50">A senior engineer will review your request within 24 hours.</p>
                </div>
              ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setFormLoading(true);
                      setFormError(false);
                      const form = e.currentTarget;
                      const data = {
                        name: (form.elements.namedItem("name") as HTMLInputElement).value,
                        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
                        website: (form.elements.namedItem("website") as HTMLInputElement).value,
                        message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                      };
                      try {
                        const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
                        if (!res.ok) throw new Error("Failed");
                        setFormSubmitted(true);
                      } catch {
                        setFormError(true);
                      } finally {
                        setFormLoading(false);
                      }
                    }}
                    className="flex flex-col gap-4"
                    aria-label="Contact form"
                  >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Your name *" required className={inputClass} />
                    <input type="tel" name="phone" placeholder="Phone number *" required className={inputClass} />
                  </div>
                  <input type="url" name="website" placeholder="Business URL (optional)" className={inputClass} />
                  <textarea
                    name="message" placeholder="Tell us about your project..." rows={4}
                    required className={inputClass + " resize-none"}
                  />
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    disabled={formLoading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-shadow duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #EAB308, #D97706)",
                      color: "#030510",
                      boxShadow: "0 4px 20px rgba(234,179,8,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(234,179,8,0.5)";
                      handleMagneticEnter();
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(234,179,8,0.3)";
                    }}
                  >
                    {formLoading ? "Sending..." : "Send Message"}
                    {!formLoading && <ArrowUpRight className="w-4 h-4" />}
                  </button>

                  {formError && (
                    <p className="text-center text-xs text-red-400 mt-2">
                      Something went wrong. Please try again or WhatsApp us directly.
                    </p>
                  )}

                  <p className="text-center text-[10px] text-white/25 leading-relaxed">
                    No spam. We respond within 24 hours. Your data is safe.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
