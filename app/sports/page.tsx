import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
  title: 'Sports News - The Daily Chronicle',
  description: 'Latest sports news, scores, and updates. Coverage of football, basketball, tennis, and more.',
  openGraph: {
    title: 'Sports News - The Daily Chronicle',
    description: 'Latest sports news, scores, and updates.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports News - The Daily Chronicle',
    description: 'Latest sports news, scores, and updates.',
  },
}

export default function SportsPage() {
  return <CategoryPage category="sports" />
}
