import type { Metadata } from "next";
import Link from "next/link";
import ServiceClient from "../../../components/ServiceClient";
import { servicesData } from "../../../lib/servicesData";
import { COMPANY, CONTACT } from "../../../lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: `${service.name} | Reverbex Technologies`,
    description: service.tagline,
    keywords: [service.name, "Reverbex", ...service.tech],
    alternates: {
      canonical: `https://reverbex.in/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} | Reverbex Technologies`,
      description: service.tagline,
      type: "website",
      url: `https://reverbex.in/services/${slug}`,
    }
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Default fallback if not found
  const service = servicesData[slug] || {
    name: "Custom Digital Service",
    tagline: "High-performance business solutions built to drive ROI.",
    intro: "We build custom systems engineered to get customers, streamline operations, and increase business revenue.",
    problem: "Cheap templates and cookie-cutter setups fail to scale, load slowly, and fail to differentiate your brand in a crowded market.",
    solution: "We design and develop bespoke solutions using cutting-edge technologies, ensuring full ownership, speed, and continuous support.",
    comparison: {
      template: ["Cookie-cutter setup", "Slow performance", "Hidden recurring costs", "No post-launch updates"],
      custom: ["Tailored layout strategy", "Fast response times", "Clear one-time pricing", "WhatsApp support & optimization"]
    },
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    faqs: [
      { q: "What does this service include?", a: "Every custom service includes research, design, coding, analytics setup, schema markup, and the 'Reverbex Bond' support." }
    ]
  };

  const whatsappNumber = "919929986743";
  const msg = `Hi Reverbex, I am interested in ${service.name}.`;
  const encodedMsg = encodeURIComponent(msg);

  return (
    <>
      {/* Schema Markup for AEO / GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": service.name,
            "provider": {
              "@type": "Organization",
              "name": COMPANY.name,
              "url": "https://reverbex.in"
            },
            "description": service.tagline,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Service Features",
              "itemListElement": service.tech.map((t, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": t
                },
                "position": index + 1
              }))
            }
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://reverbex.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://reverbex.in/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": service.name,
                "item": `https://reverbex.in/services/${slug}`
              }
            ]
          })
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": service.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#888] font-mono tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors">HOME</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">SERVICES</Link></li>
              <li>/</li>
              <li className="text-[#EAB308]">{service.name.toUpperCase()}</li>
            </ol>
          </nav>

          <ServiceClient service={service} whatsappNumber={whatsappNumber} encodedMsg={encodedMsg} />
        </div>
      </main>
    </>
  );
}
