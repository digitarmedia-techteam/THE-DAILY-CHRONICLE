import { NextResponse } from 'next/server'
import { fetchAllNews, fetchNewsByCategory } from '@/lib/rss-service'
import type { NewsCategory } from '@/lib/types'

export const revalidate = 300 // Cache for 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as NewsCategory | null

  try {
    let articles = []
    if (category === 'trending') {
      const { fetchTrendingNews } = await import('@/lib/rss-service')
      articles = await fetchTrendingNews()
    } else if (category) {
      const { fetchNewsByCategory } = await import('@/lib/rss-service')
      articles = await fetchNewsByCategory(category)
    } else {
      const { fetchAllNews } = await import('@/lib/rss-service')
      articles = await fetchAllNews()
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    })
  } catch (error) {
    console.error('Error fetching RSS:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
