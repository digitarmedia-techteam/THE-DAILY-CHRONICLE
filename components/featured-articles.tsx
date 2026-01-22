import Image from 'next/image'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'
import { CATEGORY_LABELS } from '@/lib/rss-config'

interface FeaturedArticlesProps {
  articles: NewsArticle[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const featured = articles.slice(0, 3)

  return (
    <div>
      <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
        Featured Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="group"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-3">
              {article.image ? (
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
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
