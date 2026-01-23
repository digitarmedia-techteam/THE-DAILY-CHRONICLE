import type { NewsArticle, NewsCategory, RSSFeedConfig } from './types'
import { RSS_FEEDS } from './rss-config'

// In-memory cache for faster subsequent loads
const newsCache = new Map<string, { data: NewsArticle[]; timestamp: number }>()
const CACHE_TTL = 60 * 1000 // 1 minute cache

function generateId(title: string, source: string): string {
  return Buffer.from(`${title}-${source}`).toString('base64').slice(0, 16)
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

async function parseFeed(feedConfig: RSSFeedConfig): Promise<NewsArticle[]> {
  const cacheKey = feedConfig.url
  const cached = newsCache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(feedConfig.url, {
      next: { revalidate: 60 },
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GlobexNews/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return cached?.data || []
    }

    const xml = await response.text()
    const items: NewsArticle[] = []
    const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || []

    for (const itemXml of itemMatches.slice(0, 10)) { // Limit to 10 items per feed
      const getTagContent = (tag: string): string | null => {
        const cdataMatch = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
        if (cdataMatch) return cdataMatch[1]
        const match = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
        return match ? match[1] : null
      }

      const getAttrContent = (tag: string, attr: string): string | null => {
        const match = itemXml.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, 'i'))
        return match ? match[1] : null
      }

      const title = getTagContent('title')
      const link = getTagContent('link')
      const description = getTagContent('description')
      const pubDate = getTagContent('pubDate')

      if (!title || !link) continue

      let image = getAttrContent('media:content', 'url') ||
                  getAttrContent('media:thumbnail', 'url') ||
                  getAttrContent('enclosure', 'url') ||
                  null

      if (!image && description) {
        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/i)
        if (imgMatch?.[1]) {
          image = imgMatch[1]
        }
      }

      items.push({
        id: generateId(title, feedConfig.name),
        title: stripHtml(title),
        description: description ? stripHtml(description).slice(0, 200) : '',
        link: link.trim(),
        image,
        source: feedConfig.name,
        publishedAt: pubDate ? new Date(pubDate) : new Date(),
        category: feedConfig.category,
      })
    }

    newsCache.set(cacheKey, { data: items, timestamp: Date.now() })
    return items
  } catch (error) {
    // Return cached data if available on error
    return cached?.data || []
  }
}

// Optimized: Single fetch for home page data
export async function fetchHomePageData() {
  // Only fetch essential feeds for homepage
  const essentialFeeds = RSS_FEEDS.filter(
    feed => feed.category === 'home' || feed.category === 'world' || feed.category === 'business'
  ).slice(0, 4) // Limit to 4 feeds for speed

  const results = await Promise.all(essentialFeeds.map(parseFeed))
  const allNews = results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())

  return {
    heroArticle: allNews[0] || null,
    latestNews: allNews.slice(1, 7),
    topStories: allNews.slice(0, 5),
    featuredArticles: allNews.slice(7, 10),
    trending: allNews.slice(0, 10),
    breaking: allNews[0] ? { ...allNews[0], isBreaking: true } : null,
    moreStories: allNews.slice(10, 16),
  }
}

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  const categoryFeeds = RSS_FEEDS.filter(feed => feed.category === category)
  
  if (categoryFeeds.length === 0) {
    const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home').slice(0, 2)
    const results = await Promise.all(homeFeeds.map(parseFeed))
    return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  }

  const results = await Promise.all(categoryFeeds.slice(0, 2).map(parseFeed))
  return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function fetchTrendingNews(): Promise<NewsArticle[]> {
  const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home').slice(0, 2)
  const results = await Promise.all(homeFeeds.map(parseFeed))
  return results.flat()
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 10)
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const feeds = RSS_FEEDS.slice(0, 4) // Limit feeds for performance
  const results = await Promise.all(feeds.map(parseFeed))
  return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home').slice(0, 2)
  const results = await Promise.all(homeFeeds.map(parseFeed))
  const allNews = results.flat()

  const searchTerms = query.toLowerCase().split(' ')
  return allNews.filter(article => {
    const searchText = `${article.title} ${article.description} ${article.source}`.toLowerCase()
    return searchTerms.some(term => searchText.includes(term))
  }).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}
