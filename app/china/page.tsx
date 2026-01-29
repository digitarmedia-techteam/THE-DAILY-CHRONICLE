import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
    title: 'China News - globex.news',
    description: 'Breaking news and in-depth analysis from China by BBC News.',
}

export default function ChinaPage() {
    return <CategoryPage category="china" />
}
