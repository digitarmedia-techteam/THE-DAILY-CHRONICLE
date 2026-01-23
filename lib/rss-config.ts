import type { RSSFeedConfig } from './types'

export const RSS_FEEDS: RSSFeedConfig[] = [
  // World News
  {
    name: 'BBC World',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    category: 'world',
  },
  {
    name: 'Al Jazeera',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    category: 'world',
  },
  // Business News
  {
    name: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    category: 'business',
  },
  {
    name: 'CNBC',
    url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147',
    category: 'business',
  },
  // Technology
  {
    name: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    category: 'technology',
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'technology',
  },
  // Sports
  {
    name: 'BBC Sport',
    url: 'https://feeds.bbci.co.uk/sport/rss.xml',
    category: 'sports',
  },
  {
    name: 'ESPN',
    url: 'https://www.espn.com/espn/rss/news',
    category: 'sports',
  },
  // Opinion/Editorial
  {
    name: 'BBC News',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    category: 'opinion',
  },
  // National/UK News
  {
    name: 'BBC UK',
    url: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
    category: 'national',
  },
  // General/Home
  {
    name: 'BBC Top Stories',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    category: 'home',
  },
  {
    name: 'NPR News',
    url: 'https://feeds.npr.org/1001/rss.xml',
    category: 'home',
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  home: 'Home',
  world: 'World',
  national: 'National',
  business: 'Business',
  opinion: 'Opinion',
  sports: 'Sports',
  technology: 'Technology',
  culture: 'Culture',
  innovation: 'Innovation',
}

export const NAV_CATEGORIES = [
  { slug: '', label: 'Home' },
  { slug: 'world', label: 'World' },
  { slug: 'national', label: 'National' },
  { slug: 'business', label: 'Business' },
  { slug: 'opinion', label: 'Opinion' },
  { slug: 'sports', label: 'Sports' },
]
