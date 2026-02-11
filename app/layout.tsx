import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SplashScreen } from "@/components/splash-screen";
import { StickyBottomAd } from "@/components/sticky-bottom-ad";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://globex.news";

export const metadata: Metadata = {
  title: {
    default: "globex.news - Your Trusted News Source",
    template: "%s | globex.news",
  },
  description:
    "globex.news brings you the latest news from trusted sources worldwide. Breaking news, world affairs, business, sports, and opinion. Extensive coverage of USA and UK current events.",
  keywords: [
    "news",
    "breaking news",
    "world news",
    "business news",
    "sports news",
    "opinion",
    "daily news",
    "current events",
    "USA news",
    "UK news",
    "American politics",
    "British politics",
    "global affairs",
    "international news",
  ],
  authors: [{ name: "globex.news" }],
  creator: "globex.news",
  publisher: "globex.news",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "globex.news",
    title: "globex.news - Your Trusted News Source in USA & UK",
    description:
      "globex.news brings you the latest news from trusted sources worldwide. Comprehensive coverage of USA, UK, and global events.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "globex.news",
      },
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-7084079995330446",
  },
  twitter: {
    card: "summary_large_image",
    title: "globex.news - Your Trusted News Source",
    description:
      "globex.news brings you the latest news from trusted sources worldwide. Core coverage: USA, UK, Business, and Tech.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a2744" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define schemas as constants to ensure consistent serialization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "globex.news",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 112,
      height: 112,
    },
    sameAs: [
      "https://twitter.com/globexnews",
      "https://facebook.com/globexnews",
    ],
    areaServed: ["US", "GB", "IN", "CN"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteUrl}/contact`,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "globex.news",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          suppressHydrationWarning
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7084079995330446"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geist.className} ${lora.variable} font-sans antialiased`}
      >
        <SplashScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
        <StickyBottomAd />
      </body>
    </html>
  );
}
