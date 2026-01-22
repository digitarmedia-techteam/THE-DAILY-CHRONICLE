import { NextResponse } from 'next/server'
import { fetchAllNews, fetchNewsByCategory } from '@/lib/rss-service'
import type { NewsCategory } from '@/lib/types'

export const revalidate = 300 // Cache for 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as NewsCategory | null

  try {
    const articles = category
      ? await fetchNewsByCategory(category)
      : await fetchAllNews()

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
