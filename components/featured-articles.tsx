import { MediaRenderer } from '@/components/article-card'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'
import { CATEGORY_LABELS } from '@/lib/rss-config'

interface FeaturedArticlesProps {
  articles: NewsArticle[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const featured = articles.slice(0, 15)

  return (
    <div>
      <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
        Featured Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {featured.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="group"
          >
            <div className="mb-3">
              <MediaRenderer
                image={article.image}
                video={article.video}
                title={article.title}
                aspectRatio="aspect-[4/3]"
                className="rounded-lg duration-300"
              />
            </div>
            <span className="inline-block text-xs font-semibold uppercase text-[#c9a227] mb-1">
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            <h4 className="font-semibold text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 leading-snug transition-colors">
              {article.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {article.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {article.source} &middot; {formatDistanceToNow(article.publishedAt)}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
