import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Reverbex Technologies",
  description: "Privacy Policy and data protection guidelines for Reverbex Technologies.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30">
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl md:text-5xl font-black mb-8">
          Privacy Policy
        </h1>
        <div className="text-[#A0A0A0] text-sm mb-12">Last Updated: October 2023</div>

        <div className="prose prose-invert prose-p:text-[#A0A0A0] prose-headings:text-white max-w-none">
          <p>
            At Reverbex Technologies, accessible from reverbex.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Reverbex Technologies and how we use it.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#A0A0A0]">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">3. Log Files</h2>
          <p>
            Reverbex Technologies follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">4. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-[#EAB308] hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
