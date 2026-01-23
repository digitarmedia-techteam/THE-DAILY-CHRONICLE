import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
  title: 'Opinion - globex.news',
  description: 'Opinion pieces, editorials, and commentary from leading journalists and thought leaders.',
  openGraph: {
    title: 'Opinion - globex.news',
    description: 'Opinion pieces, editorials, and commentary from leading journalists.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opinion - globex.news',
    description: 'Opinion pieces, editorials, and commentary from leading journalists.',
  },
}

export default function OpinionPage() {
  return <CategoryPage category="opinion" />
}
