import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import MorphingMenu from "../components/MorphingMenu";
import MobileBottomNav from "../components/MobileBottomNav";
import Footer from "../components/Footer";
import { CONTACT, COMPANY, SOCIALS } from "@/lib/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reverbex.in'),
  title: {
    default: "Reverbex Technologies | Websites, Ads & Automation",
    template: "%s | Reverbex Technologies",
  },
  description: "Websites. Ads. Automation. Built To Grow Businesses. We build custom Next.js websites, run performance Meta/Google Ads, and engineer operations automation systems.",
  keywords: ["custom website development", "nextjs development", "meta ads management", "facebook ads agency", "google ads expert", "lead generation company", "custom erp software", "whatsapp automation", "business automation", "rebranding services"],
  authors: [{ name: "Reverbex Technologies" }],
  creator: "Reverbex Technologies",
  publisher: "Reverbex Technologies",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://reverbex.in',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://reverbex.in",
    siteName: "Reverbex Technologies",
    title: "Reverbex Technologies | Websites, Ads & Automation for Business Growth",
    description: "Websites. Ads. Automation. Built To Grow Businesses. High-performance custom web systems, advertising campaigns, and operational automations.",
    images: [
      {
        url: "https://reverbex.in/reverbex logo.png",
        width: 1200,
        height: 630,
        alt: "Reverbex Technologies - Websites, Ads & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverbex Technologies | Custom Web Systems, Ads & Automation",
    description: "Websites. Ads. Automation. Built To Grow Businesses. High-performance custom websites, Meta/Google ads management, and process automation.",
    images: ["https://reverbex.in/reverbex logo.png"],
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
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preload" as="video" href="/hero-video-mobile.mp4" type="video/mp4" fetchPriority="high" media="(max-width: 768px)" />
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": COMPANY.name,
              "url": "https://reverbex.in",
              "logo": "https://reverbex.in/reverbex logo.png",
              "description": "Websites. Ads. Automation. Built To Grow Businesses. We build custom Next.js websites, run performance Meta/Google Ads, and engineer operations automation systems.",
              "foundingDate": String(COMPANY.foundingYear),
              "founders": [
                {
                  "@type": "Person",
                  "name": "Anurag Singh",
                  "jobTitle": "Founder & Lead Developer"
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
                "Custom Website Development",
                "E-Commerce Development",
                "Meta Ads Management",
                "Google Ads Management",
                "Lead Generation",
                "ERP & CRM System Development",
                "Mobile App Development",
                "AI Solutions",
                "WhatsApp Automation",
                "Logo Design & Branding",
                "Complete Rebranding",
                "SEO Services"
              ]
            })
          }}
        />

        {/* JSON-LD LocalBusiness Schema for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": COMPANY.name,
              "url": "https://reverbex.in",
              "telephone": CONTACT.phone.replace(/\s/g, ""),
              "email": CONTACT.email,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jaipur",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.9124,
                "longitude": 75.7873
              },
              "priceRange": "$$",
              "openingHours": "Mo-Su 09:00-21:00",
              "sameAs": [
                SOCIALS.linkedin,
                SOCIALS.twitter
              ]
            })
          }}
        />

        {/* JSON-LD FAQPage Schema for rich snippets + AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does Reverbex Technologies do?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reverbex Technologies builds custom Next.js websites, runs Meta and Google Ads campaigns, and engineers business automation systems including ERP/CRM, WhatsApp automation, and AI solutions. Based in Jaipur, serving businesses across India."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does a custom website cost in India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Custom website costs vary based on requirements. Reverbex provides free consultations and custom quotes. Unlike template agencies, custom websites from Reverbex load under 1 second, score 100/100 on PageSpeed, and include full code ownership."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why choose Reverbex over a template website agency?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reverbex builds custom code, not templates. Their websites load 5x faster (under 1 second vs 3-5 seconds for templates), rank higher on Google with AEO/GEO optimization, and include zero platform fees. You own everything — no monthly subscriptions, no vendor lock-in."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Reverbex work outside Jaipur?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Reverbex is based in Jaipur but works with businesses across India and globally. They are remote-first and serve clients in education, manufacturing, e-commerce, logistics, retail, and startups."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many leads has Reverbex generated for clients?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Reverbex has generated 500+ qualified leads for MAAC Animation Jaipur and generated ₹3+ lakh revenue for Aarya Clothing. They also manage ₹10 lakh+ in ad spend across Meta and Google Ads campaigns."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is AEO and GEO optimization?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are techniques that help your business get cited by AI search engines like ChatGPT, Gemini, and Perplexity. Reverbex implements structured data, schema markup, and answer blocks so AI engines can find and cite your business information."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${dmSans.className} overflow-x-hidden antialiased text-[#F5F5F0]`}>
        {/* Skip to Content Link for Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="ambient-bg" aria-hidden="true" />
        <div className="ambient-veil" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <MorphingMenu />
        <main id="main-content" tabIndex={-1}>
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <Footer />
        <MobileBottomNav />
        <WhatsAppButton />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
