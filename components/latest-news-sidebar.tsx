import { ArticleCard } from '@/components/article-card'
import type { NewsArticle } from '@/lib/types'

interface LatestNewsSidebarProps {
  articles: NewsArticle[]
}

export function LatestNewsSidebar({ articles }: LatestNewsSidebarProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1 h-5 bg-blue-600 rounded-full" />
        <h3 className="font-black text-xs uppercase text-foreground tracking-[0.2em]">
          Latest Stream
        </h3>
      </div>
      <div className="space-y-6">
        {articles.slice(0, 30).map((article) => (
          <div key={article.id} className="pb-4 border-b border-border/40 last:border-0 last:pb-0 transition-all duration-200 hover:border-border">
            <ArticleCard article={article} variant="small" />
          </div>
        ))}
      </div>
    </div>
  )
}
