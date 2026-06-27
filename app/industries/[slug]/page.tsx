import type { Metadata } from "next";
import Link from "next/link";
import IndustryClient from "../../../components/IndustryClient";
import { industriesData } from "../../../lib/industriesData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const industry = industriesData[slug];

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    };
  }

  return {
    title: `${industry.name} IT Solutions & Services | Reverbex Technologies`,
    description: industry.tagline,
    openGraph: {
      title: `${industry.name} IT Solutions & Services | Reverbex Technologies`,
      description: industry.tagline,
      type: "website",
      url: `https://reverbex.in/industries/${slug}`,
    }
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const industry = industriesData[slug];

  if (!industry) {
    return (
      <main className="w-full text-white min-h-screen pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
        <Link href="/industries" className="text-[#EAB308] hover:underline">Return to Industries</Link>
      </main>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${industry.name} Solutions`,
            "description": industry.tagline,
            "provider": {
              "@type": "Organization",
              "name": "Reverbex Technologies",
              "url": "https://reverbex.in"
            }
          })
        }}
      />

      <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <nav className="mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#888] font-mono tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors">HOME</Link></li>
              <li>/</li>
              <li><Link href="/industries" className="hover:text-white transition-colors">INDUSTRIES</Link></li>
              <li>/</li>
              <li className="text-[#EAB308]">{industry.name.toUpperCase()}</li>
            </ol>
          </nav>

          <IndustryClient industry={industry} />
        </div>
      </main>
    </>
  );
}
