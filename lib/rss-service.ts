import type { NewsArticle, NewsCategory, RSSFeedConfig } from './types'
import { RSS_FEEDS } from './rss-config'

function generateId(title: string, source: string): string {
  return Buffer.from(`${title}-${source}`).toString('base64').slice(0, 16)
}

function extractImage(item: Record<string, unknown>): string | null {
  // Try media:content
  const mediaContent = item['media:content'] as { $?: { url?: string } } | undefined
  if (mediaContent?.$?.url) {
    return mediaContent.$.url
  }

  // Try media:thumbnail
  const mediaThumbnail = item['media:thumbnail'] as { $?: { url?: string } } | undefined
  if (mediaThumbnail?.$?.url) {
    return mediaThumbnail.$.url
  }

  // Try enclosure
  const enclosure = item.enclosure as { $?: { url?: string } } | { url?: string } | undefined
  if (enclosure) {
    if ('$' in enclosure && enclosure.$?.url) {
      return enclosure.$.url
    }
    if ('url' in enclosure && enclosure.url) {
      return enclosure.url
    }
  }

  // Try to extract from description
  const description = item.description as string | undefined
  if (description) {
    const imgMatch = description.match(/<img[^>]+src="([^">]+)"/i)
    if (imgMatch?.[1]) {
      return imgMatch[1]
    }
  }

  return null
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
  try {
    const response = await fetch(feedConfig.url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)',
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch ${feedConfig.name}: ${response.status}`)
      return []
    }

    const xml = await response.text()
    
    // Simple XML parsing for RSS items
    const items: NewsArticle[] = []
    const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || []

    for (const itemXml of itemMatches.slice(0, 20)) {
      const getTagContent = (tag: string): string | null => {
        // Handle CDATA
        const cdataMatch = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
        if (cdataMatch) return cdataMatch[1]
        
        // Handle regular content
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

      // Extract image from various sources
      let image = getAttrContent('media:content', 'url') ||
                  getAttrContent('media:thumbnail', 'url') ||
                  getAttrContent('enclosure', 'url') ||
                  null

      // Try to extract from description if no image found
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

    return items
  } catch (error) {
    console.error(`Error parsing feed ${feedConfig.name}:`, error)
    return []
  }
}

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsArticle[]> {
  const categoryFeeds = RSS_FEEDS.filter(feed => feed.category === category)
  
  if (categoryFeeds.length === 0) {
    // If no specific category feeds, get from home
    const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home')
    const results = await Promise.all(homeFeeds.map(parseFeed))
    return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  }

  const results = await Promise.all(categoryFeeds.map(parseFeed))
  return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.all(RSS_FEEDS.map(parseFeed))
  return results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function fetchBreakingNews(): Promise<NewsArticle | null> {
  // Get the most recent news item as "breaking"
  const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home')
  const results = await Promise.all(homeFeeds.map(parseFeed))
  const allNews = results.flat().sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  
  if (allNews.length > 0) {
    return { ...allNews[0], isBreaking: true }
  }
  return null
}

export async function fetchTrendingNews(): Promise<NewsArticle[]> {
  const allNews = await fetchAllNews()
  // Return top 10 most recent as "trending"
  return allNews.slice(0, 10)
}

export async function fetchTopStories(): Promise<NewsArticle[]> {
  const homeFeeds = RSS_FEEDS.filter(feed => feed.category === 'home')
  const results = await Promise.all(homeFeeds.map(parseFeed))
  return results.flat()
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 5)
}
