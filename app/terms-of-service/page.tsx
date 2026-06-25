import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Reverbex Technologies",
  description: "Terms of Service and usage guidelines for Reverbex Technologies.",
};

export default function TermsOfServicePage() {
  return (
    <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl md:text-5xl font-black mb-8">
          Terms of Service
        </h1>
        <div className="text-[#A0A0A0] text-sm mb-12">Last Updated: October 2023</div>

        <div className="prose prose-invert prose-p:text-[#A0A0A0] prose-headings:text-white max-w-none">
          <p>
            Welcome to Reverbex Technologies. These terms and conditions outline the rules and regulations for the use of Reverbex Technologies's Website, located at reverbex.in.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Reverbex Technologies if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">2. Engineering and Marketing Services</h2>
          <p>
            Reverbex Technologies provides custom software engineering, Next.js development, e-commerce solutions, and digital performance marketing services. Specific project deliverables, timelines, and costs are outlined in individual Statements of Work (SOW) provided to clients prior to engagement.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">3. Code Ownership</h2>
          <p>
            Unless otherwise specified in a custom contract, upon full payment for custom development services, Reverbex Technologies transfers the intellectual property rights of the custom codebase to the client. This does not apply to third-party open-source libraries or underlying frameworks used during development.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">4. User Content</h2>
          <p>
            Parts of this website offer an opportunity for users to submit forms and communicate. Reverbex Technologies reserves the right to monitor all communications and to remove any content which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Contact</h2>
          <p>
            If you have any questions about our Terms of Service, please <Link href="/contact" className="text-[#EAB308] hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
