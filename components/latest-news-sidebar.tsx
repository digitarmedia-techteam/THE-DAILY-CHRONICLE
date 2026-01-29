import { MediaRenderer } from '@/components/article-card'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'

interface LatestNewsSidebarProps {
  articles: NewsArticle[]
}

export function LatestNewsSidebar({ articles }: LatestNewsSidebarProps) {
  return (
    <div>
      <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
        Latest News
      </h3>
      <div className="space-y-4">
        {articles.slice(0, 30).map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex gap-3 group pb-4 border-b border-border last:border-0"
          >
            <div className="w-16 h-16 flex-shrink-0">
              <MediaRenderer
                image={article.image}
                video={article.video}
                title={article.title}
                aspectRatio="aspect-square"
                className="rounded duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 leading-snug transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {article.source}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(article.publishedAt)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
