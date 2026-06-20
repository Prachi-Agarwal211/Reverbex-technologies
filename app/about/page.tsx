import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import ReverbexBond from "../../components/ReverbexBond";

export const metadata: Metadata = {
  title: "About Us | Reverbex Technologies",
  description: "Learn about the engineering philosophy, culture, and team behind Reverbex Technologies. No templates. No junior devs.",
  openGraph: {
    title: "About Us | Reverbex Technologies",
    description: "The engineering philosophy and culture of Reverbex Technologies.",
    type: "website",
    url: "https://reverbex.in/about",
  }
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Reverbex Technologies",
              "foundingDate": "2024",
              "description": "A premium software engineering and digital marketing agency.",
              "url": "https://reverbex.in"
            }
          })
        }}
      />
      <main className="w-full bg-[#050505] text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
        <Navbar />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <div className="mb-32">
             <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
              Our Philosophy
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-12" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              Engineering Without Compromise.
            </h1>
            
            <div className="text-[#A0A0A0] text-xl md:text-2xl font-light leading-relaxed space-y-8 max-w-4xl">
              <p>
                The digital agency model is broken. Most agencies function as middlemen—selling you a custom project, but delivering a cheap WordPress template modified by junior developers. 
              </p>
              <p>
                We started Reverbex Technologies to build the antithesis of that model.
              </p>
              <p className="text-white font-medium border-l-4 border-[#EAB308] pl-6 py-2 bg-[#1A1A1A]/30">
                "We don't use templates. We don't farm work out to junior developers. We don't hide behind account managers."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-heading), sans-serif" }}>The Reverbex Standard</h2>
              <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8">
                Every line of code we write is custom. Every campaign we launch is built on raw data. We are a team of senior engineers and performance marketers who treat your business as our own. When you hire us, you speak directly with the people building your product.
              </p>
              <ul className="space-y-4 text-white font-medium">
                <li className="flex items-center gap-3"><span className="text-[#EAB308]">✓</span> Direct access to senior engineers</li>
                <li className="flex items-center gap-3"><span className="text-[#EAB308]">✓</span> 100% custom codebase ownership</li>
                <li className="flex items-center gap-3"><span className="text-[#EAB308]">✓</span> Zero template usage</li>
                <li className="flex items-center gap-3"><span className="text-[#EAB308]">✓</span> Transparent, data-driven marketing</li>
              </ul>
            </div>
            
            <div className="bg-[#111111] p-12 border border-[#1A1A1A] flex flex-col justify-center text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150"></div>
              <h3 className="text-6xl font-black text-[#EAB308] mb-4 relative z-10" style={{ fontFamily: "var(--font-heading), sans-serif" }}>100%</h3>
              <p className="text-[#A0A0A0] uppercase tracking-widest text-sm font-semibold relative z-10">In-House Engineering</p>
            </div>
          </div>

          <div className="mb-32">
            <ReverbexBond />
          </div>

          <div className="border-t border-[#1A1A1A] pt-20 flex flex-col items-center pb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              Work with the best.
            </h2>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-[#EAB308] text-black text-lg font-bold hover:bg-white transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
