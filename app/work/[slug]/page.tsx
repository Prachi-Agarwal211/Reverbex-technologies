import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CaseStudyClient from "../../../components/CaseStudyClient";
import { caseStudiesData } from "../../../lib/caseStudiesData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const study = caseStudiesData[slug];

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${study.client} | Case Study | Reverbex Technologies`,
    description: study.resultTitle,
    openGraph: {
      title: `${study.client} | Case Study | Reverbex Technologies`,
      description: study.resultTitle,
      type: "article",
      url: `https://reverbex.in/work/${slug}`,
    }
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const study = caseStudiesData[slug];

  if (!study) {
    return (
      <main className="w-full text-white min-h-screen pt-32 pb-24 text-center">
        <Navbar />
        <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
        <Link href="/work" className="text-[#EAB308] hover:underline">Return to Work</Link>
      </main>
    );
  }

  return (
    <>
      {/* Schema Markup for AEO / GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${study.client} - ${study.resultTitle}`,
            "author": {
              "@type": "Organization",
              "name": "Reverbex Technologies"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Reverbex Technologies",
              "logo": {
                "@type": "ImageObject",
                "url": "https://reverbex.in/reverbex logo.png"
              }
            },
            "about": {
              "@type": "Thing",
              "name": study.tags.join(", ")
            },
            "description": study.problem
          })
        }}
      />

      <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden">
        <Navbar />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#666666] font-mono tracking-wider">
              <li><Link href="/" className="hover:text-white transition-colors">HOME</Link></li>
              <li>/</li>
              <li><Link href="/work" className="hover:text-white transition-colors">WORK</Link></li>
              <li>/</li>
              <li className="text-[#EAB308]">{study.client.toUpperCase()}</li>
            </ol>
          </nav>

          <CaseStudyClient study={study} />
        </div>
      </main>
    </>
  );
}
