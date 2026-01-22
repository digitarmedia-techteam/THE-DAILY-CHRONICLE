import Image from 'next/image'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'

interface ArticleCardProps {
  article: NewsArticle
  variant?: 'default' | 'featured' | 'small' | 'horizontal'
  showImage?: boolean
  showCategory?: boolean
}

export function ArticleCard({
  article,
  variant = 'default',
  showImage = true,
  showCategory = false,
}: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(article.publishedAt)

  if (variant === 'small') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="flex gap-3 group"
      >
        {showImage && article.image && (
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
            {article.source} &middot; {timeAgo}
          </p>
        </div>
      </a>
    )
  }

  if (variant === 'horizontal') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow group"
      >
        {showImage && article.image && (
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {article.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {article.source} &middot; {timeAgo}
          </p>
        </div>
      </a>
    )
  }

  if (variant === 'featured') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="block group relative overflow-hidden rounded-lg"
      >
        <div className="relative aspect-[16/10] w-full">
          {article.image ? (
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {showCategory && (
            <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-[#c9a227] text-white rounded mb-3">
              Breaking
            </span>
          )}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight text-balance">
            {article.title}
          </h2>
          <p className="text-white/80 text-sm mt-3 line-clamp-2">{article.description}</p>
          <p className="text-white/60 text-xs mt-3">
            {article.source} &middot; {timeAgo}
          </p>
        </div>
      </a>
    )
  }

  // Default card
  return (
    <a
      href={article.link}
      target="_blank"
      rel="nofollow noopener sponsored"
      className="block group"
    >
      {showImage && article.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      {showCategory && (
        <span className="inline-block text-xs font-semibold uppercase text-[#c9a227] mb-1">
          {article.category}
        </span>
      )}
      <h3 className="font-semibold text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white/80 line-clamp-2 leading-snug transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.description}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {article.source} &middot; {timeAgo}
      </p>
    </a>
  )
}
