import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Reverbex Technologies",
  description: "Custom digital solutions for education, manufacturing, e-commerce, logistics, retail, and startups. Industry-specific engineering from Reverbex Technologies, Jaipur.",
  openGraph: {
    title: "Industries We Serve | Reverbex Technologies",
    description: "Industry-specific digital solutions for education, manufacturing, e-commerce, logistics, and startups.",
    url: "https://reverbex.in/industries",
  },
  alternates: { canonical: "https://reverbex.in/industries" },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
