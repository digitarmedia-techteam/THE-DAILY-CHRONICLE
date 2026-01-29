export interface NewsArticle {
  id: string
  title: string
  description: string
  link: string
  image: string | null
  video?: string | null
  source: string
  publishedAt: Date
  category: NewsCategory
  isBreaking?: boolean
}

export type NewsCategory =
  | 'home'
  | 'world'
  | 'national'
  | 'business'
  | 'opinion'
  | 'sports'
  | 'technology'
  | 'culture'
  | 'innovation'
  | 'trending'
  | 'usa'
  | 'china'
  | 'india'

export interface RSSFeedConfig {
  name: string
  url: string
  category: NewsCategory
  logo?: string
}

export interface RSSItem {
  title?: string
  description?: string
  link?: string
  pubDate?: string
  enclosure?: {
    url?: string
    type?: string
  }
  'media:content'?: {
    $?: {
      url?: string
      type?: string
    }
  }
  'media:thumbnail'?: {
    $?: {
      url?: string
    }
  }
  'media:video'?: {
    $?: {
      url?: string
    }
  }
}
