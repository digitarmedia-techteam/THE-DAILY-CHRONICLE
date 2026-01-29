import type { RSSFeedConfig } from './types'

export const RSS_FEEDS: RSSFeedConfig[] = [
  // General / Home
  {
    name: 'BBC Top Stories',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    category: 'home',
  },
  // World News
  {
    name: 'BBC World',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    category: 'world',
  },
  // Business News
  {
    name: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    category: 'business',
  },
  // Technology
  {
    name: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    category: 'technology',
  },
  // Politics
  {
    name: 'BBC Politics',
    url: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
    category: 'opinion',
  },
  // National (UK)
  {
    name: 'BBC UK',
    url: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
    category: 'national',
  },
  // Science & Environment (Secondary World source)
  {
    name: 'BBC Science',
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    category: 'world',
  },
  // Entertainment
  {
    name: 'BBC Entertainment',
    url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    category: 'home',
  },
  // USA News
  {
    name: 'BBC USA & Canada',
    url: 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml',
    category: 'usa',
  },
  // China News
  {
    name: 'BBC China',
    url: 'https://feeds.bbci.co.uk/news/world/asia/china/rss.xml',
    category: 'china',
  },
  // India News
  {
    name: 'BBC India',
    url: 'https://feeds.bbci.co.uk/news/world/asia/india/rss.xml',
    category: 'india',
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  home: 'Home',
  world: 'World',
  national: 'National',
  business: 'Business',
  opinion: 'Politics',
  sports: 'Sports',
  technology: 'Technology',
  usa: 'USA & Canada',
  china: 'China News',
  india: 'India News',
}

export const NAV_CATEGORIES = [
  { slug: '', label: 'Home' },
  { slug: 'world', label: 'World' },
  { slug: 'national', label: 'UK News' },
  { slug: 'business', label: 'Business' },
  { slug: 'technology', label: 'Tech' },
  { slug: 'opinion', label: 'Politics' },
  { slug: 'usa', label: 'USA' },
  { slug: 'china', label: 'China' },
  { slug: 'india', label: 'India' },
]
