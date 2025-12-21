import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reverbex Technologies',
  description: 'Building Solutions with Creativity',
}

import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}