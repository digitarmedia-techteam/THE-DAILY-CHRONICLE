import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { TrendingSidebar } from '@/components/trending-sidebar'
import { fetchNewsByCategory, fetchTrendingNews } from '@/lib/rss-service'
import { Skeleton } from '@/components/ui/skeleton'
import type { NewsCategory } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/rss-config'

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

interface CategoryContentProps {
  category: NewsCategory
}

async function CategoryContent({ category }: CategoryContentProps) {
  const [articles, trending] = await Promise.all([
    fetchNewsByCategory(category),
    fetchTrendingNews(),
  ])

  const heroArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        {CATEGORY_LABELS[category] || category}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-9">
          {/* Hero Article */}
          {heroArticle && (
            <div className="mb-8">
              <ArticleCard article={heroArticle} variant="featured" />
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <TrendingSidebar title="Trending Now" articles={trending.slice(0, 5)} />
          <TrendingSidebar title="Most Read" articles={trending.slice(5, 10)} variant="numbered" />
        </aside>
      </div>
    </main>
  )
}

interface CategoryPageProps {
  category: NewsCategory
}

export function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-8"><LoadingSkeleton /></div>}>
        <CategoryContent category={category} />
      </Suspense>
      <Footer />
    </div>
  )
}
