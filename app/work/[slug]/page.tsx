import React from "react";
import Navbar from "../../../components/Navbar";

const casesData: Record<
  string,
  {
    name: string;
    tagline: string;
    metric: string;
    problem: string;
    research: string;
    solution: string;
    tech: string[];
    results: string[];
    testimonial: { quote: string; author: string };
  }
> = {
  "maac-animation": {
    name: "MAAC Animation Jaipur",
    tagline: "Education • Web Design • Ads",
    metric: "500+ Qualified Leads Generated",
    problem: "MAAC Animation Jaipur is a leading design academy. They had a traditional brick-and-mortar marketing presence but lacked a digital channel to acquire students. They needed a repeatable system to generate high-intent admissions queries.",
    research: "We analyzed competitors in the education training market. Most were running ads to a simple homepage with zero tracking or conversion flows. We identified that parents and students require immediate details via WhatsApp, and value-focused video testimonials drive enrollment decisions.",
    solution: "We designed a conversion-optimized landing page targeting animation aspirants. We ran precision Facebook and Instagram Lead Campaigns, targeting specific radius grids in Jaipur. The leads were integrated with a custom database that triggered auto-alerts to counselors via WhatsApp API.",
    tech: ["Next.js", "Meta Ads Manager", "WhatsApp Business API", "Tailwind CSS"],
    results: [
      "500+ qualified leads generated in 4 weeks",
      "Over 40% reduction in client acquisition costs",
      "Counselor callback delays reduced to under 5 minutes"
    ],
    testimonial: {
      quote: "Reverbex transformed our admissions pipeline. We went from zero online inquiries to 500+ leads in just weeks.",
      author: "Admissions Director, MAAC Animation"
    }
  },
  "aarya-clothing": {
    name: "Aarya Clothing",
    tagline: "E-Commerce • Full Stack • Payments",
    metric: "₹3+ Lakh Sales in Launch Month",
    problem: "Aarya Clothing designs premium clothing. They were selling exclusively on Instagram DM channels, which resulted in manual ordering confusion, order loss, high cart abandonment, and scalability bottlenecks.",
    research: "We audited standard storefront themes. Standard e-commerce templates took 4+ seconds to load catalogs on mobile networks, causing high bounce rates. They also carried recurring transaction percentages that reduced the client's gross profit margins.",
    solution: "We engineered a lightweight headless e-commerce application using Next.js. We built a custom checkout system with integrated UPI and cards via Razorpay. We set up Meta ads targeting lookalike audiences to drive traffic directly to the storefront.",
    tech: ["Next.js (SSR)", "Razorpay API", "Meta Ads", "Tailwind CSS"],
    results: [
      "₹3+ Lakh in automated revenue generated",
      "Average catalog load times reduced to 0.7 seconds",
      "0 platform subscription fees paid (saving ₹3,000 monthly)"
    ],
    testimonial: {
      quote: "Our new automated store generates revenue while we sleep. No complex transaction fees — we retain all our profits.",
      author: "Founder, Aarya Clothing"
    }
  },
  "khemji-wire": {
    name: "Khemji Wire Company",
    tagline: "Corporate • Catalogue • Rebranding",
    metric: "Complete Modern Digital Rebranding",
    problem: "Khemji Wire Company is a leading manufacturer of premium wires. Their legacy catalog site was built in 2012, loaded slowly, looked outdated to B2B distributors, and failed to generate quote requests.",
    research: "We audited B2B client behavior. B2B buyers look for structured specifications, test certifications, and clear WhatsApp communication directories. A clean and fast editorial layout provides high credibility.",
    solution: "We redesigned the brand identity and visual systems. We engineered a Next.js digital catalog with full Server-Side Rendering. We implemented local schema structures and technical SEO configurations to rank specifications on Google search queries.",
    tech: ["Next.js", "Schema Markup", "Branding Design", "Tailwind CSS"],
    results: [
      "Complete visual B2B brand transformation",
      "100/100 performance scores on Google Lighthouse",
      "Organic B2B quote inquiries doubled in the first month"
    ],
    testimonial: {
      quote: "The team understood our industrial B2B buyers perfectly. The rebranding has elevated our company image.",
      author: "Director, Khemji Wire"
    }
  }
};

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const caseStudy = casesData[slug] || {
    name: "Bespoke Client Success",
    tagline: "Custom System Design & ROI Delivery",
    metric: "High Impact Revenue System",
    problem: "The client lacked a modern performance channel, causing loss of market share and slow conversion processing.",
    research: "We audited competitors and analyzed bottlenecks to build a detailed target specification.",
    solution: "We developed custom websites, configured ads, and integrated automated WhatsApp notifications.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    results: [
      "Significant lead conversion improvements",
      "Instant loading speeds across mobile connections",
      "Operational efficiency optimized"
    ],
    testimonial: {
      quote: "Professional, fast execution that directly impacted our growth.",
      author: "Operations Manager"
    }
  };

  const whatsappNumber = "919929986743";
  const msg = `Hi Reverbex, I saw the case study on ${caseStudy.name} and want to discuss similar growth options for my business.`;
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
            {caseStudy.tagline}
          </span>
          <h1
            className="text-white text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            {caseStudy.name}
          </h1>
          <p
            className="text-[#EAB308] text-lg md:text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Key Outcome: {caseStudy.metric}
          </p>
        </div>

        {/* Challenge, Research, Solution blocks */}
        <div className="space-y-12 mb-20">
          <div>
            <span className="text-[#666666] text-xs font-semibold tracking-wider uppercase block mb-3">
              The Challenge
            </span>
            <p
              className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {caseStudy.problem}
            </p>
          </div>

          <div>
            <span className="text-[#666666] text-xs font-semibold tracking-wider uppercase block mb-3">
              Our Research
            </span>
            <p
              className="text-[#A0A0A0] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {caseStudy.research}
            </p>
          </div>

          <div>
            <span className="text-[#EAB308] text-xs font-semibold tracking-wider uppercase block mb-3">
              What We Engineered
            </span>
            <p
              className="text-white text-sm md:text-base leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
          <h3
            className="text-white text-lg font-bold mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs tracking-wide font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-20">
          <h3
            className="text-white text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Measurable Results
          </h3>
          <ul className="space-y-4">
            {caseStudy.results.map((r, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white text-base font-semibold">
                <span className="text-[#EAB308] font-bold">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial Quote */}
        <div className="mb-20 p-8 border-l border-[#EAB308] bg-[#0A0A0A] rounded-r-xl">
          <p
            className="text-white text-lg md:text-xl font-light italic leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            &ldquo;{caseStudy.testimonial.quote}&rdquo;
          </p>
          <span
            className="text-[#EAB308] text-sm font-bold uppercase tracking-wider block"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            — {caseStudy.testimonial.author}
          </span>
        </div>

        {/* CTA */}
        <div className="border-t border-[#1A1A1A] pt-12 text-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodedMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-[#050505] text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.5)] cursor-pointer"
          >
            Get Similar Results For Your Business
          </a>
        </div>

      </div>
    </main>
  );
}
