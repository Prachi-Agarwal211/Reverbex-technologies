import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import { CONTACT, COMPANY, SOCIALS } from "@/lib/config";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reverbex.com'),
  title: {
    default: "Reverbex Technologies",
    template: "%s | Reverbex Technologies",
  },
  description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions for modern enterprises.",
  keywords: ["AI automation", "web development", "mobile apps", "AI agents", "digital transformation", "enterprise solutions"],
  authors: [{ name: "Reverbex Technologies" }],
  creator: "Reverbex Technologies",
  publisher: "Reverbex Technologies",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://reverbex.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reverbex.com",
    siteName: "Reverbex Technologies",
    title: "Reverbex Technologies - Intelligent Architecture for Modern Enterprises",
    description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions for modern enterprises.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reverbex Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverbex Technologies - Intelligent Architecture",
    description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '20.5937;78.9629',
    'ICBM': '20.5937, 78.9629',
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="/" />
        <link rel="preload" as="video" href="/hero-video-mobile.mp4" type="video/mp4" fetchPriority="high" media="(max-width: 768px)" />
        <link rel="preload" as="video" href="/hero-video-desktop.mp4" type="video/mp4" fetchPriority="high" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <style dangerouslySetInnerHTML={{ __html: `
          [data-reveal] { opacity: 0; }
          [data-reveal="fade-up"] { transform: translateY(40px); transition: transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease; }
          [data-reveal="fade-up"][data-visible="true"] { transform: translateY(0); opacity: 1; }
        ` }} />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": COMPANY.name,
              "url": COMPANY.url,
              "logo": `${COMPANY.url}/logo.PNG`,
              "description": "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions for modern enterprises.",
              "foundingDate": String(COMPANY.foundingYear),
              "founders": [
                {
                  "@type": "Person",
                  "name": "Anurag Singh",
                  "jobTitle": "Founder & Lead Architect"
                },
                {
                  "@type": "Person",
                  "name": "Prachi Agarwal",
                  "jobTitle": "Co-Founder & Strategy Lead"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "email": CONTACT.email,
                  "contactType": "customer service",
                  "availableLanguage": "English"
                }
              ],
              "telephone": CONTACT.phone.replace(/\s/g, ""),
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "sameAs": [
                SOCIALS.linkedin,
                SOCIALS.twitter
              ],
              "knowsAbout": [
                "AI Automation",
                "Web Development",
                "Mobile Applications",
                "AI Agents",
                "Digital Transformation",
                "Enterprise Solutions",
                "Model Context Protocol",
                "Multi-Agent Systems"
              ]
            })
          }}
        />
      </head>
      <body className={`${dmSans.className} overflow-x-hidden antialiased bg-black text-white`}>
        {/* Skip to Content Link for Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CustomCursor />
        <main id="main-content" tabIndex={-1}>
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
