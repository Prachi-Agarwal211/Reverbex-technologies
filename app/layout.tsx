import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import SmoothScroll from "../components/SmoothScroll";
import Navbar from "../components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Reverbex Technologies | AI-Powered Solutions',
  description: 'We architect autonomous systems that transform how modern enterprises operate. Custom AI, scalable neural architecture, and intelligent software solutions.',
  keywords: ['AI', 'Artificial Intelligence', 'Software Development', 'Neural Networks', 'Enterprise Solutions', 'Reverbex'],
  authors: [{ name: 'Anurag Singh' }, { name: 'Prachi Agarwal' }],
  openGraph: {
    title: 'Reverbex Technologies | AI-Powered Solutions',
    description: 'We architect autonomous systems that transform how modern enterprises operate.',
    url: 'https://reverbex.com',
    siteName: 'Reverbex Technologies',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverbex Technologies | AI-Powered Solutions',
    description: 'We architect autonomous systems that transform how modern enterprises operate.',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="/" />
        <link rel="dns-prefetch" href="/" />
        <link rel="preload" as="image" href="/images/frame_000_delay-0.041s.jpg" />
        <link rel="preload" as="image" href="/logo.PNG" />
      </head>
      <body className={`${inter.className} overflow-x-hidden antialiased bg-black text-white`}>
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
