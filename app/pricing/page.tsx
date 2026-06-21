import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import ReverbexBond from "../../components/ReverbexBond";

export const metadata: Metadata = {
  title: "Pricing & Engagement | Reverbex Technologies",
  description: "Transparent pricing for premium custom engineering and marketing solutions. No hidden fees.",
  openGraph: {
    title: "Pricing | Reverbex Technologies",
    description: "Transparent pricing for premium custom engineering and marketing solutions.",
    type: "website",
    url: "https://reverbex.in/pricing",
  }
};

const tiers = [
  {
    name: "Foundational Infrastructure",
    price: "Custom Quote",
    description: "Perfect for businesses needing a high-performance digital presence to build trust and capture search intent.",
    features: [
      "Custom Next.js Web Development",
      "Sub-second Load Times Guarantee",
      "Technical SEO & Schema Markup",
      "100% Code Ownership",
      "Analytics & Tag Setup"
    ]
  },
  {
    name: "The Growth Engine",
    price: "Custom Quote",
    description: "For established businesses looking to actively generate leads, automate follow-ups, and scale revenue.",
    features: [
      "Everything in Foundational",
      "High-Converting Landing Pages",
      "Meta & Google Ads Management",
      "WhatsApp Business API Automation",
      "CRM Lead Routing Integration",
      "Weekly Performance Reporting"
    ],
    highlight: true
  },
  {
    name: "Enterprise Engineering",
    price: "Custom Quote",
    description: "Complex system architecture for manufacturing, e-commerce, and corporate operations.",
    features: [
      "Custom ERP System Development",
      "Full B2B E-Commerce Portals",
      "Zero Platform Transaction Fees",
      "Custom Backend APIs (Node/PostgreSQL)",
      "Serverless Scalable Infrastructure",
      "SLA-Backed 24/7 Support"
    ]
  }
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Pricing - Reverbex Technologies",
            "description": "Transparent pricing for premium custom engineering.",
            "provider": {
              "@type": "Organization",
              "name": "Reverbex Technologies",
              "url": "https://reverbex.in"
            }
          })
        }}
      />
      <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-20 text-center max-w-4xl mx-auto">
             <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
              Investment
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              Transparent Value.
            </h1>
            <p className="text-[#A0A0A0] text-xl font-light leading-relaxed">
              We don't charge per-user licenses. We don't take transaction cuts on your e-commerce store. You pay for premium engineering and performance management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
            {tiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`p-10 flex flex-col bg-[#0A0A0A] border ${tier.highlight ? 'border-[#EAB308]/50 shadow-[0_0_30px_rgba(234,179,8,0.05)] relative' : 'border-[#1A1A1A]'}`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EAB308] text-black text-xs font-bold uppercase tracking-widest px-4 py-1">
                    Most Requested
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                  {tier.name}
                </h3>
                <p className="text-[#A0A0A0] text-sm mb-8 h-16">{tier.description}</p>
                
                <div className="text-3xl font-black text-[#EAB308] mb-8 pb-8 border-b border-[#1A1A1A]" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                  {tier.price}
                </div>
                
                <ul className="space-y-6 mb-12 flex-grow">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4 text-white text-sm">
                      <span className="text-[#EAB308] mt-0.5 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact"
                  className={`w-full py-4 text-center font-bold transition-colors duration-300 ${tier.highlight ? 'bg-[#EAB308] text-black hover:bg-white' : 'bg-[#1A1A1A] text-white hover:bg-[#333333]'}`}
                >
                  Request Quote
                </Link>
              </div>
            ))}
          </div>

          <div className="mb-32">
            <ReverbexBond />
          </div>

        </div>
      </main>
    </>
  );
}
