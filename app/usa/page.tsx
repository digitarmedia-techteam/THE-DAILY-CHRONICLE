import type { Metadata } from 'next'
import { CategoryPage } from '@/components/category-page'

export const metadata: Metadata = {
    title: 'USA & Canada News - globex.news',
    description: 'Latest news, analysis and coverage from the USA and Canada by BBC News.',
}

export default function USAPage() {
    return <CategoryPage category="usa" />
}
