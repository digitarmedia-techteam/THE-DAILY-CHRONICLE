import Image from 'next/image'
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
        {articles.slice(0, 6).map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex gap-3 group pb-4 border-b border-border last:border-0"
          >
            {article.image && (
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="64px"
                />
              </div>
            )}
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
