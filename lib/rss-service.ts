import type { NewsArticle, NewsCategory, RSSFeedConfig } from "./types";
import { RSS_FEEDS } from "./rss-config";

// In-memory cache for faster subsequent loads
const newsCache = new Map<string, { data: NewsArticle[]; timestamp: number }>();
const CACHE_TTL = 30 * 1000; // 30 seconds cache for immediate updates

// Generate deterministic ID from link to ensure duplicates have same ID
function generateId(link: string): string {
  // Create a simple hash from the link for deterministic IDs
  let hash = 0;
  for (let i = 0; i < link.length; i++) {
    const char = link.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to base36 and ensure positive
  const hashStr = Math.abs(hash).toString(36);
  // Also use base64 encoding for additional uniqueness
  const base64Hash = Buffer.from(link)
    .toString("base64")
    .replace(/[/+=]/g, "")
    .slice(0, 8);
  return `${hashStr}-${base64Hash}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Production-level deduplication utility
 * Removes duplicates by:
 * 1. Exact link match
 * 2. Normalized URL (removes query params, trailing slashes)
 * 3. Headline similarity (prevents same story from different sources)
 */
function deduplicateArticles(articles: NewsArticle[]): NewsArticle[] {
  const seenLinks = new Set<string>();
  const seenNormalizedUrls = new Set<string>();
  const seenHeadlines = new Set<string>();

  const normalizeUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      // Remove query params and hash, normalize trailing slash
      return `${urlObj.origin}${urlObj.pathname}`
        .toLowerCase()
        .replace(/\/$/, "");
    } catch {
      return url.toLowerCase().trim();
    }
  };

  const normalizeHeadline = (headline: string): string => {
    // Remove special chars, extra spaces, convert to lowercase for comparison
    return headline
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  return articles.filter((article) => {
    const link = article.link.trim();
    const normalizedUrl = normalizeUrl(link);
    const normalizedHeadline = normalizeHeadline(article.title);

    // Check for duplicates
    if (seenLinks.has(link)) return false;
    if (seenNormalizedUrls.has(normalizedUrl)) return false;
    if (seenHeadlines.has(normalizedHeadline)) return false;

    // Mark as seen
    seenLinks.add(link);
    seenNormalizedUrls.add(normalizedUrl);
    seenHeadlines.add(normalizedHeadline);

    return true;
  });
}

async function parseFeed(feedConfig: RSSFeedConfig): Promise<NewsArticle[]> {
  const cacheKey = feedConfig.url;
  const cached = newsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // Increased to 8 seconds

    const response = await fetch(feedConfig.url, {
      next: { revalidate: 60 },
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "Cache-Control": "no-cache",
      },
    }).catch(() => {
      // Quietly handle network failures (DNS, Offline, Interrupted)
      return null;
    });

    clearTimeout(timeoutId);

    if (!response || !response.ok) {
      // Log a simple one-liner instead of a full error object
      if (response) {
        console.warn(
          `[RSS] ${feedConfig.name} offline (Status: ${response.status})`,
        );
      } else {
        console.warn(`[RSS] ${feedConfig.name} network timeout/unreachable`);
      }
      return cached?.data || [];
    }

    const xml = await response.text();
    const items: NewsArticle[] = [];

    // Extract more items to cover 4 days
    const itemMatches = xml.match(/<item[^>]*>([\s\S]*?)<\/item>/gi) || [];
    const FOUR_DAYS_AGO = Date.now() - 4 * 24 * 60 * 60 * 1000;

    for (const itemXml of itemMatches.slice(0, 100)) {
      const getTagContent = (tag: string): string | null => {
        const cdataMatch = itemXml.match(
          new RegExp(
            `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
            "i",
          ),
        );
        if (cdataMatch) return cdataMatch[1].trim();
        const match = itemXml.match(
          new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"),
        );
        return match ? match[1].trim() : null;
      };

      const pubDateStr =
        getTagContent("pubDate") ||
        getTagContent("dc:date") ||
        getTagContent("updated");
      const publishedAt = pubDateStr ? new Date(pubDateStr) : new Date();

      // Skip news older than 4 days to keep it "optimized" as requested
      if (publishedAt.getTime() < FOUR_DAYS_AGO) continue;

      const getAttrContent = (tag: string, attr: string): string | null => {
        const match = itemXml.match(
          new RegExp(`<${tag}[^>]*${attr}=["']([^"']*)["']`, "i"),
        );
        return match ? match[1].trim() : null;
      };

      const title = getTagContent("title");
      const link = getTagContent("link") || getTagContent("guid");
      const description =
        getTagContent("description") ||
        getTagContent("content:encoded") ||
        getTagContent("summary");

      if (!title || !link) continue;

      // Extract image
      let image =
        getAttrContent("media:content", "url") ||
        getAttrContent("media:thumbnail", "url") ||
        getAttrContent("media:group[^>]*media:content", "url") ||
        getAttrContent("media:group[^>]*media:thumbnail", "url") ||
        getAttrContent("enclosure", "url") ||
        null;

      if (!image) {
        const anyImgMatch = itemXml.match(
          /https?:\/\/[^"'\s<>]+?\.(?:jpg|jpeg|gif|png|webp|svg)(?:\?[^"'\s<>]+)?/i,
        );
        if (anyImgMatch) image = anyImgMatch[0];
      }

      if (!image && description) {
        const imgMatch = description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
        if (imgMatch?.[1]) image = imgMatch[1];
      }

      // Extract video
      let video =
        getAttrContent('media:content[type*="video"]', "url") ||
        getAttrContent("media:player", "url") ||
        null;

      if (!video) {
        const enclosureType = getAttrContent("enclosure", "type");
        if (enclosureType && enclosureType.includes("video")) {
          video = getAttrContent("enclosure", "url");
        }
      }

      items.push({
        id: generateId(link.trim()),
        title: stripHtml(title),
        description: description ? stripHtml(description).slice(0, 300) : "",
        link: link.trim(),
        image,
        video: video || undefined,
        source: feedConfig.name,
        publishedAt,
        category: feedConfig.category,
      });
    }

    if (items.length > 0) {
      newsCache.set(cacheKey, { data: items, timestamp: Date.now() });
    }

    return items.length > 0 ? items : cached?.data || [];
  } catch (error: any) {
    console.error(
      `[RSS] Unexpected error in ${feedConfig.name}:`,
      error.message || error,
    );
    return cached?.data || [];
  }
}

// Optimized: Single fetch for home page data
// Optimized: Grouped fetch for home page data with strict de-duplication
export async function fetchHomePageData() {
  const homeFeeds = RSS_FEEDS.filter((f) => f.category === "home");
  const worldFeeds = RSS_FEEDS.filter(
    (f) =>
      f.category === "world" ||
      f.category === "usa" ||
      f.category === "china" ||
      f.category === "india",
  );
  const businessFeeds = RSS_FEEDS.filter((f) => f.category === "business");
  const techFeeds = RSS_FEEDS.filter((f) => f.category === "technology");

  const [homeNews, worldNews, businessNews, techNews] = await Promise.all([
    Promise.all(homeFeeds.map(parseFeed)).then((r) => r.flat()),
    Promise.all(worldFeeds.map(parseFeed)).then((r) => r.flat()),
    Promise.all(businessFeeds.map(parseFeed)).then((r) => r.flat()),
    Promise.all(techFeeds.map(parseFeed)).then((r) => r.flat()),
  ]);

  const sortDesc = (a: NewsArticle, b: NewsArticle) =>
    b.publishedAt.getTime() - a.publishedAt.getTime();

  // Helper to remove duplicates by link
  const unique = (articles: NewsArticle[]) => {
    const seen = new Set();
    return articles.filter((a) => {
      const isDuplicate = seen.has(a.link);
      seen.add(a.link);
      return !isDuplicate;
    });
  };

  const allHome = unique(homeNews.sort(sortDesc));
  const allWorld = unique(worldNews.sort(sortDesc));
  const allBusiness = unique(businessNews.sort(sortDesc));
  const allTech = unique(techNews.sort(sortDesc));

  const heroArticle = allHome[0] || null;
  const latestNews = allHome.slice(1, 31); // Increased to 30

  // Keep track of articles already shown to prevent section-to-section repetition
  const shownIds = new Set([
    heroArticle?.link,
    ...latestNews.map((a) => a.link),
  ]);

  return {
    heroArticle,
    latestNews,
    topStories: allHome.slice(0, 20), // Increased to 20
    featuredArticles: allWorld
      .filter((a) => !shownIds.has(a.link))
      .slice(0, 15), // Increased to 15
    trending: allHome.slice(0, 30), // Increased to 30
    breaking: heroArticle ? { ...heroArticle, isBreaking: true } : null,
    moreStories: unique([...allBusiness, ...allTech])
      .filter((a) => !shownIds.has(a.link))
      .sort(sortDesc)
      .slice(0, 20), // Increased to 20
  };
}

export async function fetchNewsByCategory(
  category: NewsCategory,
): Promise<NewsArticle[]> {
  const categoryFeeds = RSS_FEEDS.filter((feed) => feed.category === category);

  if (categoryFeeds.length === 0) {
    const homeFeeds = RSS_FEEDS.filter(
      (feed) => feed.category === "home",
    ).slice(0, 3);
    const results = await Promise.all(homeFeeds.map(parseFeed));
    const allArticles = results
      .flat()
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return deduplicateArticles(allArticles).slice(0, 50);
  }

  const results = await Promise.all(categoryFeeds.map(parseFeed));
  const allArticles = results
    .flat()
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return deduplicateArticles(allArticles).slice(0, 50);
}

export async function fetchTrendingNews(): Promise<NewsArticle[]> {
  const homeFeeds = RSS_FEEDS.filter((feed) => feed.category === "home").slice(
    0,
    3,
  );
  const results = await Promise.all(homeFeeds.map(parseFeed));
  const allArticles = results
    .flat()
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return deduplicateArticles(allArticles).slice(0, 30);
}

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.all(RSS_FEEDS.map(parseFeed));
  const allArticles = results
    .flat()
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return deduplicateArticles(allArticles);
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  // Search across all feeds for comprehensive results
  const allFeeds = RSS_FEEDS.slice(0, 10); // Search top 10 feeds for performance
  const results = await Promise.all(allFeeds.map(parseFeed));
  const allNews = results.flat();

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 2); // Ignore terms shorter than 3 chars

  // Score each article for relevance
  const scoredArticles = allNews.map((article) => {
    let score = 0;
    const title = article.title.toLowerCase();
    const description = (article.description || "").toLowerCase();
    const source = article.source.toLowerCase();
    const category = article.category.toLowerCase();

    searchTerms.forEach((term) => {
      // Title matches are most important
      if (title.includes(term)) score += 10;
      // Exact word match in title is even better
      if (title.split(" ").includes(term)) score += 5;
      // Description matches
      if (description.includes(term)) score += 3;
      // Source matches
      if (source.includes(term)) score += 2;
      // Category matches
      if (category.includes(term)) score += 1;
    });

    return { article, score };
  });

  // Filter articles with score > 0 and sort by score then date
  const searchResults = scoredArticles
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return b.article.publishedAt.getTime() - a.article.publishedAt.getTime();
    })
    .map(({ article }) => article);

  // Deduplicate and return top 50 results
  return deduplicateArticles(searchResults).slice(0, 50);
}
