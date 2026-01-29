import type { NewsArticle } from '@/lib/types'
import { TrendingUp, Newspaper } from 'lucide-react'

interface TopStoriesProps {
  articles: NewsArticle[]
}

export function TopStories({ articles }: TopStoriesProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Top Stories
      </h3>
      <div className="space-y-3">
        {articles.slice(0, 20).map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex items-start gap-2 group py-2 border-b border-border last:border-0 transition-all duration-200 hover:pl-1"
          >
            <Newspaper className="w-4 h-4 text-muted-foreground group-hover:text-[#1a2744] dark:group-hover:text-blue-400 mt-0.5 flex-shrink-0 transition-colors duration-200" />
            <span className="text-sm text-foreground group-hover:text-[#1a2744] dark:group-hover:text-white line-clamp-2 leading-snug transition-colors duration-200 relative">
              {article.title}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1a2744] dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
