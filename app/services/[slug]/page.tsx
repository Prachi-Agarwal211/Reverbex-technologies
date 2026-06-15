import React from "react";
import Navbar from "../../../components/Navbar";
import { Check } from "lucide-react";

// Mock database of detailed services content
const servicesData: Record<
  string,
  {
    name: string;
    tagline: string;
    intro: string;
    problem: string;
    solution: string;
    comparison: {
      template: string[];
      custom: string[];
    };
    tech: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  "website-development": {
    name: "Custom Website Development",
    tagline: "High-performance custom Next.js websites built to convert visitors into clients.",
    intro: "A slow website costs you customers. We engineer custom Next.js web applications designed for maximum loading speeds (under 1 second), premium UI layout credibility, and technical SEO structure.",
    problem: "Most agencies sell you bloated WordPress themes that take 3-5 seconds to load, depend on unstable plugins, have security holes, and fail to rank on search engines. Every second of delay costs your business 7% in sales conversion.",
    solution: "We write clean, lightweight Next.js and React code from scratch. Our websites are fully server-side rendered (SSR), ensuring search engines and AI engines (like ChatGPT, Gemini) can index your content instantly. You receive full code ownership, zero license lock-in, and 100/100 PageSpeed scores.",
    comparison: {
      template: [
        "WordPress template everyone uses",
        "3.8s average load times",
        "Plugin vulnerabilities & constant patches",
        "No structured AEO/GEO indexing"
      ],
      custom: [
        "Custom Next.js design unique to you",
        "Under 1 second load times (guaranteed)",
        "Zero plugin dependencies, safe code",
        "Full entity & schema structures for AI search"
      ]
    },
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel", "GSAP"],
    faqs: [
      {
        q: "Why is Next.js better than WordPress?",
        a: "Next.js pages are pre-rendered on the server and served as static HTML instantly to visitors. WordPress compiles PHP, runs database requests, and executes dozens of plugins on every page load, which slows it down."
      },
      {
        q: "Do I own the source code?",
        a: "Yes, 100%. You own the complete Git repository and code. We set it up on your servers or global edge hosts."
      }
    ]
  },
  "e-commerce": {
    name: "E-Commerce Development",
    tagline: "Custom online stores built with smooth checkout flows and 0% platform transaction fees.",
    intro: "Own your storefront. We build e-commerce systems designed to process transactions securely and scale without monthly platform subscriptions.",
    problem: "Standard e-commerce builders charge monthly subscription rates plus 2% to 3% transaction cuts on every single sale. They lock you into their templates and payment processors, eating away at your profit margins.",
    solution: "We develop dedicated e-commerce systems built on modern backend APIs (FastAPI/Node.js) and Next.js. We integrate secure UPI, credit cards, and local gateways (Razorpay, Stripe) directly. You pay zero platform fees, keep full client data, and customize checkout experiences to prevent cart abandonment.",
    comparison: {
      template: [
        "2% to 3% fee on every sale",
        "Limited checkout customizability",
        "Slow catalog load times on mobile",
        "Locked in vendor infrastructure"
      ],
      custom: [
        "0% transaction fees (standard gateway only)",
        "Fully custom interactive checkouts",
        "Sub-second catalog rendering",
        "Full database control & admin dashboard"
      ]
    },
    tech: ["Next.js", "Tailwind CSS", "Razorpay", "Stripe API", "Node.js"],
    faqs: [
      {
        q: "How does e-commerce customization improve sales?",
        a: "We design one-click checkouts, local payment preferences (UPI, net banking), and automated WhatsApp tracking notifications, reducing cart abandonment."
      },
      {
        q: "How secure is custom e-commerce?",
        a: "Our architectures run on serverless security protocols, protecting database instances from injections and utilizing fully-encrypted gateway tokenization."
      }
    ]
  }
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesData[slug] || {
    name: "Custom Digital Service",
    tagline: "High-performance business solutions built to drive ROI.",
    intro: "We build custom systems engineered to get customers, streamline operations, and increase business revenue.",
    problem: "Cheap templates and cookie-cutter setups fail to scale, load slowly, and fail to differentiate your brand in a crowded market.",
    solution: "We design and develop bespoke solutions using cutting-edge technologies, ensuring full ownership, speed, and continuous support.",
    comparison: {
      template: [
        "Cookie-cutter setup",
        "Slow performance",
        "Hidden recurring costs",
        "No post-launch updates"
      ],
      custom: [
        "Tailored layout strategy",
        "Fast response times",
        "Clear one-time pricing",
        "WhatsApp support & optimization"
      ]
    },
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    faqs: [
      {
        q: "What does this service include?",
        a: "Every custom service includes research, design, coding, analytics setup, schema markup, and the 'Reverbex Bond' support."
      }
    ]
  };

  const whatsappNumber = "919929986743";
  const msg = `Hi Reverbex, I am interested in ${service.name}.`;
  const encodedMsg = encodeURIComponent(msg);

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Intro Header */}
        <div className="mb-16 border-b border-[#1A1A1A] pb-12">
          <span
            className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Services Catalog
          </span>
          <h1
            className="text-white text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            {service.name}
          </h1>
          <p
            className="text-[#A0A0A0] text-lg md:text-xl font-light leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {service.tagline}
          </p>
        </div>

        {/* Narrative columns: Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="text-[#666666] text-xs font-semibold tracking-wider uppercase block mb-3">
              The Pain Point
            </span>
            <p
              className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {service.problem}
            </p>
          </div>
          <div>
            <span className="text-[#EAB308] text-xs font-semibold tracking-wider uppercase block mb-3">
              The Reverbex Advantage
            </span>
            <p
              className="text-white text-sm md:text-base leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {service.solution}
            </p>
          </div>
        </div>

        {/* Comparison Details */}
        <div className="mb-20 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
          <h3
            className="text-white text-xl font-bold mb-8"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Performance Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-red-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                Cheap Template Alternative
              </span>
              <ul className="space-y-3">
                {service.comparison.template.map((item, idx) => (
                  <li key={idx} className="text-[#666666] text-sm flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[#EAB308] text-xs font-semibold tracking-widest uppercase block mb-4">
                Reverbex Custom Engineering
              </span>
              <ul className="space-y-3">
                {service.comparison.custom.map((item, idx) => (
                  <li key={idx} className="text-[#F5F5F0] text-sm font-medium flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h3
            className="text-white text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[#1A1A1A] pb-6">
                <h4
                  className="text-white text-base md:text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {faq.q}
                </h4>
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support disclaimer and CTA */}
        <div className="border-t border-[#1A1A1A] pt-12 text-center">
          <p className="text-[#666666] text-xs uppercase tracking-wider mb-6">
            ✓ WhatsApp direct support • ✓ Daily updates • ✓ Complete Code Ownership
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] cursor-pointer"
          >
            Deploy This System
          </a>
        </div>

      </div>
    </main>
  );
}
