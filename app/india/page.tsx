import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
    title: 'India News - globex.news',
    description: 'Latest updates, politics, and social news from India by BBC News.',
}

export default function IndiaPage() {
    return <CategoryPage category="india" />
}
