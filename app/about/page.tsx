import React from "react";
import Navbar from "../../components/Navbar";

export default function AboutPage() {
  const whatsappNumber = "919929986743";
  const msg = "Hi Reverbex, I would like to learn more about your services.";
  const encodedMsg = encodeURIComponent(msg);

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <span
          className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Company Story
        </span>
        <h1
          className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-tight mb-12"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          About Reverbex.
        </h1>

        <div className="border-t border-[#1A1A1A] pt-12 space-y-8 max-w-3xl">
          <p
            className="text-white text-lg md:text-xl font-medium leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Reverbex Technologies is a digital growth engineering partner. We build custom high-performance websites, run targeted lead generation advertising, and design business operations automations.
          </p>

          <p
            className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            We don&apos;t use generic templates, slow WordPress engines, or locked SaaS subscriptions. We write modern Next.js systems from scratch, ensuring code ownership, instant mobile loads (under 1 second), and robust technical structures that search engines and AI queries cite cleanly.
          </p>

          <div className="p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl my-12">
            <h3
              className="text-white text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              The Reverbex Promise
            </h3>
            <p
              className="text-[#A0A0A0] text-sm leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              We treat your business like our business. The &apos;Reverbex Bond&apos; guarantees direct founder availability via WhatsApp, proactive performance analysis, and zero surprise fees for updates. We are fully aligned with your revenue expansion.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-xs font-bold rounded-full uppercase tracking-wider transition-colors duration-300"
            >
              Talk to our team on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
