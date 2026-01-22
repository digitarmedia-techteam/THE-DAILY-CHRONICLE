import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
  title: 'Business News - The Daily Chronicle',
  description: 'Latest business news, market updates, and financial analysis. Stock market, economy, and corporate news.',
  openGraph: {
    title: 'Business News - The Daily Chronicle',
    description: 'Latest business news, market updates, and financial analysis.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business News - The Daily Chronicle',
    description: 'Latest business news, market updates, and financial analysis.',
  },
}

export default function BusinessPage() {
  return <CategoryPage category="business" />
}
