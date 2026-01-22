import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailychronicle.com'

export const metadata: Metadata = {
  title: {
    default: 'The Daily Chronicle - Your Trusted News Source',
    template: '%s | The Daily Chronicle',
  },
  description:
    'The Daily Chronicle brings you the latest news from trusted sources worldwide. Breaking news, world affairs, business, sports, and opinion.',
  keywords: [
    'news',
    'breaking news',
    'world news',
    'business news',
    'sports news',
    'opinion',
    'daily news',
    'current events',
  ],
  authors: [{ name: 'The Daily Chronicle' }],
  creator: 'The Daily Chronicle',
  publisher: 'The Daily Chronicle',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'The Daily Chronicle',
    title: 'The Daily Chronicle - Your Trusted News Source',
    description:
      'The Daily Chronicle brings you the latest news from trusted sources worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Daily Chronicle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Daily Chronicle - Your Trusted News Source',
    description:
      'The Daily Chronicle brings you the latest news from trusted sources worldwide.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a2744' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// JSON-LD Organization Schema
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Daily Chronicle',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: ['https://twitter.com/dailychronicle', 'https://facebook.com/dailychronicle'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${siteUrl}/contact`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// JSON-LD WebSite Schema
function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Daily Chronicle',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${geist.className} ${lora.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
