"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { slug: "website-development", num: "01", name: "Custom Websites", line: "Sub-second. Built to convert.", tags: ["Next.js", "React", "Vercel"], accent: "#EAB308" },
  { slug: "e-commerce", num: "02", name: "E-Commerce", line: "Custom stores. Zero platform fees.", tags: ["Razorpay", "Stripe", "Custom"], accent: "#FCD34D" },
  { slug: "mobile-apps", num: "03", name: "Mobile Apps", line: "Native iOS & Android.", tags: ["React Native", "Flutter", "Firebase"], accent: "#3B82F6" },
  { slug: "meta-ads", num: "04", name: "Meta Ads", line: "Facebook & Instagram → customers.", tags: ["Facebook", "Instagram", "CAPI"], accent: "#A78BFA" },
  { slug: "google-ads", num: "05", name: "Google Ads", line: "Search & Display. Built for ROI.", tags: ["Search", "Display", "YouTube"], accent: "#60A5FA" },
  { slug: "lead-generation", num: "06", name: "Lead Generation", line: "High-converting funnels. 24/7.", tags: ["Funnels", "Landing Pages", "Auto"], accent: "#F472B6" },
  { slug: "erp-systems", num: "07", name: "ERP & CRM", line: "Automate operations. Own your data.", tags: ["ERP", "CRM", "PostgreSQL"], accent: "#10B981" },
  { slug: "whatsapp-automation", num: "08", name: "WhatsApp", line: "Official API. Instant lead routing.", tags: ["WhatsApp API", "Chatbot", "Webhooks"], accent: "#22C55E" },
  { slug: "ai-solutions", num: "09", name: "AI Solutions", line: "Trained on your data.", tags: ["LLM", "RAG", "Automation"], accent: "#06B6D4" },
  { slug: "seo", num: "10", name: "SEO + AI", line: "Ranked on Google AND by ChatGPT.", tags: ["AEO", "GEO", "Schema"], accent: "#34D399" },
  { slug: "logo-branding", num: "11", name: "Branding", line: "Identity systems that stand out.", tags: ["Logo", "Identity", "Guidelines"], accent: "#EAB308" },
  { slug: "rebranding", num: "12", name: "Rebranding", line: "Complete refresh. Strategy to deploy.", tags: ["Strategy", "Design", "Deploy"], accent: "#C084FC" },
];

const gradients: Record<string, string> = {
  "01": "radial-gradient(ellipse at 30% 40%, rgba(234,179,8,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "02": "radial-gradient(ellipse at 70% 60%, rgba(252,211,77,0.08) 0%, rgba(8,8,16,0.95) 70%)",
  "03": "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "04": "radial-gradient(ellipse at 40% 70%, rgba(167,139,250,0.08) 0%, rgba(8,8,16,0.95) 70%)",
  "05": "radial-gradient(ellipse at 60% 40%, rgba(96,165,250,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "06": "radial-gradient(ellipse at 30% 60%, rgba(244,114,182,0.08) 0%, rgba(8,8,16,0.95) 70%)",
  "07": "radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "08": "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, rgba(8,8,16,0.95) 70%)",
  "09": "radial-gradient(ellipse at 40% 40%, rgba(6,182,212,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "10": "radial-gradient(ellipse at 60% 60%, rgba(52,211,153,0.08) 0%, rgba(8,8,16,0.95) 70%)",
  "11": "radial-gradient(ellipse at 50% 50%, rgba(234,179,8,0.10) 0%, rgba(8,8,16,0.95) 70%)",
  "12": "radial-gradient(ellipse at 40% 60%, rgba(192,132,252,0.08) 0%, rgba(8,8,16,0.95) 70%)",
};

export default function ServicesFlipSection() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (reducedMotion.current) return;

    gsap.fromTo(
      ".srv-heading",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 78%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".srv-label",
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 78%",
          once: true,
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".srv-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full overflow-hidden z-10"
      style={{ background: "rgba(5,5,5,0.4)" }}
      aria-label="Our services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-32 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-24">
          <div>
            <p className="srv-label text-[#EAB308]/50 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 text-emboss">
              Capabilities
            </p>
            <h2
              className="srv-heading text-white leading-none tracking-tight text-heading-lift"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
              }}
            >
              What we
              <br />
              <span
                className="text-[#EAB308]"
                style={{
                  fontWeight: 600,
                  fontStyle: "normal",
                  textShadow:
                    "0 0 30px rgba(234,179,8,0.25), 0 0 60px rgba(234,179,8,0.08), 0 2px 4px rgba(0,0,0,0.4)",
                }}
              >
                build.
              </span>
            </h2>
          </div>
          <p
            className="text-white/20 font-light max-w-[220px] leading-relaxed text-shadow-body"
            style={{ fontSize: "12px" }}
          >
            12 capabilities. All engineered in-house. No outsourcing. No templates.
          </p>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="srv-card group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: gradients[service.num] || gradients["01"],
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease",
              }}
            >
              <div
                className="p-7 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[260px]"
              >
                {/* Top: number + tags */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-black tabular-nums text-white/15 text-emboss"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {service.num}
                  </span>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-white/30 rounded text-letterpress"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: name + line + CTA */}
                <div>
                  <h3
                    className="text-white leading-[0.9] tracking-tight mb-2 text-heading-lift group-hover:text-white transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-white/30 text-xs tracking-wide text-shadow-body mb-4">
                    {service.line}
                  </p>
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/15 group-hover:text-white/50 transition-colors duration-300 text-emboss">
                    Explore
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.accent}60, transparent)` }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px -20px ${service.accent}15, 0 0 40px -15px ${service.accent}10`,
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden px-6 py-12 space-y-4">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="srv-card block relative rounded-xl overflow-hidden text-shadow-body"
            style={{
              background: gradients[service.num] || gradients["01"],
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[#EAB308]/40 text-[8px] font-bold uppercase tracking-[0.2em] block mb-1 text-emboss">
                  {service.num}
                </span>
                <h3
                  className="text-white leading-[0.95] tracking-tight text-heading-lift"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {service.name}
                </h3>
                <p className="text-white/30 text-[11px] mt-1">{service.line}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/15 flex-shrink-0 ml-4"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${service.accent}40, transparent)` }}
            />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-white/20 font-light leading-relaxed max-w-sm text-shadow-body" style={{ fontSize: "13px" }}>
            Not sure which service fits your business? Let&apos;s talk.
          </p>
          <a
            href="https://wa.me/919929986743"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-[#EAB308] hover:text-white transition-colors duration-300 text-emboss"
          >
            WhatsApp Us
            <span className="w-10 h-[1px] bg-current inline-block" />
          </a>
        </div>
      </div>
    </section>
  );
}
