import Image from 'next/image'
import type { NewsArticle } from '@/lib/types'
import { formatDistanceToNow } from '@/lib/date-utils'

interface ArticleCardProps {
  article: NewsArticle
  variant?: 'default' | 'featured' | 'small' | 'horizontal'
  showImage?: boolean
  showCategory?: boolean
}

// Helper to render media (image or video fallback)
export function MediaRenderer({
  image,
  video,
  title,
  className = '',
  aspectRatio = 'aspect-video'
}: {
  image: string | null | undefined
  video: string | null | undefined
  title: string
  className?: string
  aspectRatio?: string
}) {
  // if image is missing but video is present, we show video
  // if both missing, we might show a placeholder or nothing

  if (image) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${aspectRatio}`}>
        <Image
          src={image}
          alt={title}
          fill
          unoptimized // Better for external RSS images
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    )
  }

  if (video) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${aspectRatio} bg-black`}>
        <video
          src={video}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${className}`}
          preload="metadata"
          muted
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${aspectRatio} bg-muted group-hover:bg-muted/80 transition-colors flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744]/5 to-transparent opacity-20" />
      <img src="/icon.svg" alt="" className="w-12 h-12 opacity-10 filter grayscale group-hover:scale-110 transition-transform duration-700" />
    </div>
  )
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
        {showImage && (
          <div className="w-16 h-16 flex-shrink-0">
            <MediaRenderer
              image={article.image}
              video={article.video}
              title={article.title}
              aspectRatio="aspect-square"
              className="rounded duration-300"
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
        {showImage && (
          <div className="w-24 h-24 flex-shrink-0">
            <MediaRenderer
              image={article.image}
              video={article.video}
              title={article.title}
              aspectRatio="aspect-square"
              className="rounded duration-300"
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
        <div className="relative w-full">
          <MediaRenderer
            image={article.image}
            video={article.video}
            title={article.title}
            aspectRatio="aspect-[16/10]"
            className="duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
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
      {showImage && (
        <div className="mb-3">
          <MediaRenderer
            image={article.image}
            video={article.video}
            title={article.title}
            aspectRatio="aspect-video"
            className="rounded-lg duration-300"
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
