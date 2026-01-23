import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
  title: 'National News - globex.news',
  description: 'Latest national news and updates. Breaking domestic news, politics, and regional coverage.',
  openGraph: {
    title: 'National News - globex.news',
    description: 'Latest national news and updates from across the country.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'National News - globex.news',
    description: 'Latest national news and updates from across the country.',
  },
}

export default function NationalPage() {
  return <CategoryPage category="national" />
}
