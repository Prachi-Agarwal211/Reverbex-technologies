import React from "react";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  const whatsappNumber = "919929986743";
  const msg = "Hi Reverbex, I want to discuss a new digital systems project for my business.";
  const encodedMsg = encodeURIComponent(msg);

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <span
          className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Project Inquiry
        </span>
        <h1
          className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-tight mb-12"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Let&apos;s Work Together.
        </h1>

        <div className="border-t border-[#1A1A1A] pt-12 max-w-3xl space-y-12">
          <p
            className="text-white text-lg md:text-xl font-medium leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Ready to grow your business? Partner with us to deploy high-performance custom websites, performance Meta/Google Ads, and operations automations built around business ROI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl flex flex-col justify-between">
              <div>
                <h3
                  className="text-white text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  Direct WhatsApp
                </h3>
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed mb-6 font-normal"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Message our team directly on WhatsApp. We respond within hours to answer specifications or setup consultation slots.
                </p>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl flex flex-col justify-between">
              <div>
                <h3
                  className="text-white text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  Email Inquiry
                </h3>
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed mb-6 font-normal"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Prefer writing emails? Send us your project requirements, target goals, and constraints.
                </p>
              </div>
              <a
                href="mailto:15anuragsingh2003@gmail.com"
                className="inline-block text-center px-6 py-3 bg-[#111111] hover:bg-[#1A1A1A] text-white border border-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-wider transition-colors duration-300"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
