import type { Metadata } from "next";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Reverbex Technologies services — custom websites, e-commerce, mobile apps, Meta/Google Ads, lead generation, ERP systems, AI solutions, and more.",
};

const services = [
  { slug: "website-development", name: "Custom Website Development" },
  { slug: "e-commerce", name: "E-Commerce Development" },
  { slug: "mobile-apps", name: "Mobile App Development" },
  { slug: "meta-ads", name: "Meta Ads Management" },
  { slug: "google-ads", name: "Google Ads Management" },
  { slug: "lead-generation", name: "Lead Generation" },
  { slug: "erp-systems", name: "ERP System Development" },
  { slug: "whatsapp-automation", name: "WhatsApp Automation" },
  { slug: "ai-solutions", name: "AI Solutions & Automation" },
  { slug: "logo-branding", name: "Logo Design & Branding" },
  { slug: "rebranding", name: "Complete Rebranding" },
  { slug: "seo", name: "SEO Services" }
];

export default function ServicesPage() {
  return (
    <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <span
          className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          Capabilities Catalog
        </span>
        <h1
          className="text-white text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter leading-tight mb-16"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          Our Services.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1A1A1A] pt-12">
          {services.map((service, idx) => (
            <a
              key={idx}
              href={`/services/${service.slug}`}
              className="group flex flex-col justify-between p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] transition-colors duration-300"
            >
              <div>
                <span className="text-[#666666] text-xs font-semibold tracking-widest uppercase block mb-4">
                  {String(idx + 1).padStart(2, '0')} / Service
                </span>
                <h3
                  className="text-white text-2xl font-bold group-hover:text-[#EAB308] transition-colors duration-300 mb-2"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.name}
                </h3>
              </div>
              <div className="text-[#666666] group-hover:text-white transition-colors duration-300 text-xs font-semibold uppercase tracking-wider mt-8">
                Read specifications →
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
