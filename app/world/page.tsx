import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
  title: 'World News - globex.news',
  description: 'Latest world news from trusted sources around the globe. Breaking international news, analysis, and coverage.',
  openGraph: {
    title: 'World News - globex.news',
    description: 'Latest world news from trusted sources around the globe.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World News - globex.news',
    description: 'Latest world news from trusted sources around the globe.',
  },
}

export default function WorldPage() {
  return <CategoryPage category="world" />
}
