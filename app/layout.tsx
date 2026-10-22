import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/Chrome';
import { JsonLd } from '@/components/JsonLd';
import Motion from '@/components/Motion';
import Aurora from '@/components/Aurora';
import { MobileBar } from '@/components/MobileBar';
import { SITE, BRAND, EMAIL, PHONE_E164, LINKEDIN, plans } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

// Avoid a late font swap rewrapping the hero after first paint; Next preloads both fonts.
const display = Sora({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-display', display: 'optional' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'optional' });

export const metadata: Metadata = {
  ...pageMetadata('AI Systems Studio in Jaipur', 'Reverbex Technology builds AI agents, MCP servers, automations, Next.js websites, Flutter apps and CRMs. Based in Jaipur, India. Plans from Rs 15,000/month.', '/'),
  metadataBase: new URL(SITE),
  title: { default: 'AI Systems Studio in Jaipur | Reverbex Technology', template: '%s | Reverbex Technology' },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#07080B', width: 'device-width', initialScale: 1 };

const org = {
  '@type': ['Organization', 'ProfessionalService'], '@id': `${SITE}/#org`,
  name: BRAND, url: SITE, logo: `${SITE}/logo.png`, image: `${SITE}/og-default.png`,
  email: EMAIL, telephone: PHONE_E164, priceRange: '₹15,000–₹70,000 per month',
  address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
  areaServed: ['IN', 'Worldwide'],
  founder: { '@type': 'Person', name: 'Anurag Singh', '@id': `${SITE}/about#anurag` },
  sameAs: [LINKEDIN],
  knowsAbout: ['AI agents', 'Model Context Protocol', 'MCP servers', 'n8n automation', 'WhatsApp AI agents', 'RAG chatbots', 'Next.js', 'Flutter', 'Python', 'CRM development'],
  makesOffer: plans.map((p) => ({
    '@type': 'Offer', '@id': `${SITE}/pricing#${p.id}-offer`, name: `${p.name} monthly plan`,
    url: `${SITE}/pricing#${p.id}`, price: p.price, priceCurrency: 'INR',
    description: `INR ${p.price} per month. ${p.items.join('; ')}. Scope, taxes, setup costs and commitment are agreed in the proposal.`,
    priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'INR', billingDuration: 'P1M', unitCode: 'MON', unitText: 'month' },
    itemOffered: { '@type': 'Service', name: `${p.name} plan`, provider: { '@id': `${SITE}/#org` } },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-mode="night" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-brand focus:p-3 focus:text-eclipse">Skip to content</a>
        <JsonLd data={{ '@context': 'https://schema.org', '@graph': [org, { '@type': 'WebSite', '@id': `${SITE}/#website`, name: BRAND, url: SITE, inLanguage: 'en-IN', publisher: { '@id': `${SITE}/#org` } }] }} />
        <Aurora />
        <Header />
        <main id="main" className="relative z-[1]">{children}</main>
        <Footer />
        <MobileBar />
        <Motion />
      </body>
    </html>
  );
}
