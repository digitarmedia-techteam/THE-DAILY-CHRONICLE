import { NextRequest, NextResponse } from 'next/server'
import { searchNews } from '@/lib/rss-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  try {
    const allNews = await searchNews(query)
    
    const results = allNews.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(query)
      const descriptionMatch = article.description?.toLowerCase().includes(query)
      const sourceMatch = article.source.toLowerCase().includes(query)
      const categoryMatch = article.category.toLowerCase().includes(query)
      
      return titleMatch || descriptionMatch || sourceMatch || categoryMatch
    })

    // Sort by relevance (title matches first) then by date
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query)
      const bTitle = b.title.toLowerCase().includes(query)
      
      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    return NextResponse.json({ results: results.slice(0, 30) })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ results: [] })
  }
}
