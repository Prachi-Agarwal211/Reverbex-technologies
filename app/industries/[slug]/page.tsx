import React from "react";
import Navbar from "../../../components/Navbar";

const industriesData: Record<
  string,
  {
    name: string;
    tagline: string;
    intro: string;
    problems: string[];
    solutions: string[];
    caseStudyName: string;
    caseStudyLink: string;
  }
> = {
  education: {
    name: "Education",
    tagline: "Student lead acquisition funnels and custom database tools for coaching institutes and academies.",
    intro: "Education institutions require reliable digital lead capture channels. We build high-converting landing pages, integrate counselling pipelines, and configure CRM dashboards.",
    problems: [
      "No automated student lead pipeline (relying on walk-ins)",
      "Slow callback rates due to manual data routing",
      "Wasted marketing spend on generic branding pages"
    ],
    solutions: [
      "Bespoke landing pages built for animation, academic, and training coaches",
      "Instant lead delivery to sales teams via WhatsApp notifications",
      "Consolidated B2C databases with granular tracking metrics"
    ],
    caseStudyName: "MAAC Animation Jaipur: 500+ Qualified Leads",
    caseStudyLink: "/work/maac-animation"
  },
  manufacturing: {
    name: "Manufacturing",
    tagline: "Custom catalog displays, B2B quote interfaces, and light ERP software systems.",
    intro: "Elevate your corporate manufacturing credibility. We construct fast database catalogues to display specifications and collect inquiry quotes.",
    problems: [
      "Outdated catalog websites that fail to reflect modern operations",
      "No direct channel for distributors to request product pricing certificates",
      "Disjointed inventory lists causing sales delays"
    ],
    solutions: [
      "Custom Next.js catalogs with fast search filters",
      "Structured B2B quote interfaces mapped to sales teams",
      "Secure cloud database tracking of steel/wire inventory"
    ],
    caseStudyName: "Khemji Wire Company: B2B Digital Transformation",
    caseStudyLink: "/work/khemji-wire"
  }
};

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const industry = industriesData[slug] || {
    name: "Bespoke Industry Solutions",
    tagline: "Tailored software systems and ads built for custom verticals.",
    intro: "We configure websites, lead pipelines, and database automations customized around your specific industry problems.",
    problems: [
      "Outdated legacy operations",
      "Slow conversion response times",
      "Inability to track customer lifecycles"
    ],
    solutions: [
      "Custom Next.js architectures",
      "Automated WhatsApp notification integrations",
      "Integrated analytics dashboard reporting"
    ],
    caseStudyName: "Explore our success stories",
    caseStudyLink: "/work"
  };

  const whatsappNumber = "919929986743";
  const msg = `Hi Reverbex, I want to talk about digital growth options for our business in the ${industry.name} sector.`;
  const encodedMsg = encodeURIComponent(msg);

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Intro */}
        <div className="mb-16 border-b border-[#1A1A1A] pb-12">
          <span
            className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Industries We Serve
          </span>
          <h1
            className="text-white text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            {industry.name}
          </h1>
          <p
            className="text-[#A0A0A0] text-lg md:text-xl font-light leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {industry.tagline}
          </p>
        </div>

        {/* Narratives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-red-500 text-sm font-bold uppercase tracking-wider mb-6">
              Industry Pain Points
            </h3>
            <ul className="space-y-4">
              {industry.problems.map((p, idx) => (
                <li key={idx} className="text-[#A0A0A0] text-sm flex items-start gap-2">
                  <span className="text-red-500">✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#EAB308] text-sm font-bold uppercase tracking-wider mb-6">
              Reverbex Solutions
            </h3>
            <ul className="space-y-4">
              {industry.solutions.map((s, idx) => (
                <li key={idx} className="text-[#F5F5F0] text-sm font-medium flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Case Study Feature */}
        <div className="mb-20 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
          <span className="text-[#666666] text-xs font-semibold uppercase tracking-wider block mb-2">
            Related Case Study
          </span>
          <h4
            className="text-white text-xl font-bold mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            {industry.caseStudyName}
          </h4>
          <a
            href={industry.caseStudyLink}
            className="inline-block text-[#EAB308] hover:text-white text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
          >
            Read documentary proof →
          </a>
        </div>

        {/* CTA */}
        <div className="border-t border-[#1A1A1A] pt-12 text-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] cursor-pointer"
          >
            Optimize Your Industry System
          </a>
        </div>

      </div>
    </main>
  );
}
