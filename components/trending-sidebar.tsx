import Image from 'next/image'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'
import { ChevronRight } from 'lucide-react'

interface TrendingSidebarProps {
  title: string
  articles: NewsArticle[]
  variant?: 'default' | 'numbered'
}

export function TrendingSidebar({ title, articles, variant = 'default' }: TrendingSidebarProps) {
  if (variant === 'numbered') {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
          {title}
        </h3>
        <div className="space-y-4">
          {articles.slice(0, 5).map((article, index) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="flex gap-3 group"
            >
              <span className="text-2xl font-bold text-muted-foreground/50 w-6 flex-shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 leading-snug transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.source}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
        {title}
      </h3>
      <div className="space-y-4">
        {articles.slice(0, 5).map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex gap-3 group"
          >
            {article.image && (
              <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 leading-snug transition-colors">
                {article.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(article.publishedAt)}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  )
}
