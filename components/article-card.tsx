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
  if (image) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${aspectRatio}`}>
        <Image
          src={image}
          alt={title}
          fill
          unoptimized // Better for external RSS images
          className={`object-cover transition-transform duration-700 ${className}`}
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
          className={`w-full h-full object-cover transition-transform duration-700 ${className}`}
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
    <div className={`relative w-full h-full ${aspectRatio} bg-muted/50 group-hover:bg-muted transition-colors flex items-center justify-center overflow-hidden`}>
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

  // Small variant (Sidebar style)
  if (variant === 'small') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="flex gap-3 group items-start"
      >
        {showImage && (
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-border/10 shadow-sm relative group-hover:shadow-md transition-shadow">
            <MediaRenderer
              image={article.image}
              video={article.video}
              title={article.title}
              aspectRatio="aspect-square"
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-bold text-foreground leading-[1.3] group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
            {article.title}
          </h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1.5 flex items-center gap-1.5">
            <span>{article.source}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
            <span>{timeAgo}</span>
          </p>
        </div>
      </a>
    )
  }

  // Horizontal variant (Featured grid style)
  if (variant === 'horizontal') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="flex gap-4 group bg-muted/20 hover:bg-muted/40 p-4 rounded-xl border border-border/30 hover:border-border/60 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {showImage && article.image && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden relative shadow-inner group-hover:shadow-md transition-shadow">
            <MediaRenderer
              image={article.image}
              video={article.video}
              title={article.title}
              aspectRatio="aspect-square"
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {showCategory && (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-1.5">
              {article.source}
            </span>
          )}
          <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
            {article.title}
          </h3>
          <p className="text-[10px] text-muted-foreground/60 mt-2 font-bold uppercase tracking-widest">
            {timeAgo}
          </p>
        </div>
      </a>
    )
  }

  // Featured card variant (Large hero)
  if (variant === 'featured') {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="block group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 bg-black"
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          <MediaRenderer
            image={article.image}
            video={article.video}
            title={article.title}
            className="group-hover:scale-105 transition-transform duration-700"
            aspectRatio="aspect-[16/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
          {showCategory && (
            <span className="inline-block bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] text-white px-2 py-0.5 rounded-sm mb-3 sm:mb-4">
              BREAKING
            </span>
          )}
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white leading-[1.15] tracking-tight group-hover:text-blue-400 transition-colors duration-300 drop-shadow-lg break-words">
            {article.title}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base mt-2 sm:mt-4 line-clamp-2 max-w-2xl font-medium leading-relaxed drop-shadow-md">
            {article.description}
          </p>
          <div className="flex items-center gap-2 mt-3 sm:mt-5 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
            <span>{article.source}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </a>
    )
  }

  // Default card (Feed style)
  return (
    <a
      href={article.link}
      target="_blank"
      rel="nofollow noopener sponsored"
      className="block group hover:-translate-y-1 transition-all duration-500"
    >
      {showImage && (
        <div className="mb-5 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 border border-border/10 bg-muted/20 relative">
          <MediaRenderer
            image={article.image}
            video={article.video}
            title={article.title}
            className="group-hover:scale-110 transition-transform duration-1000"
            aspectRatio="aspect-video"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>
      )}
      <div className="space-y-3">
        {showCategory && (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {article.source}
          </span>
        )}
        <h3 className="font-extrabold text-xl leading-[1.2] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium opacity-80">
          {article.description}
        </p>
        <div className="flex items-center gap-2 pt-1 text-[10px] text-muted-foreground/50 font-black uppercase tracking-[0.2em]">
          <span>{article.source}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </a>
  )
}
