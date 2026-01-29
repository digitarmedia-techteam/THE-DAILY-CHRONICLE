import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
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

export async function CategoryContent({ category }: CategoryContentProps) {
  noStore() // Ensure fresh data on every request

  const [articles, trending] = await Promise.all([
    fetchNewsByCategory(category),
    fetchTrendingNews(),
  ])

  const heroArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <main className="container max-w-[1600px] mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-8 bg-[#1a2744] dark:bg-blue-500 rounded-full" />
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          {CATEGORY_LABELS[category] || category}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-9 space-y-10">
          {/* Hero Article */}
          {heroArticle && (
            <div className="mb-6 md:mb-8">
              <ArticleCard article={heroArticle} variant="featured" />
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                {heroArticle.description}
              </p>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar - shows below on mobile */}
        <aside className="lg:col-span-3 mt-6 lg:mt-0">
          <div className="sticky top-24 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
            <TrendingSidebar title="Trending in Section" articles={trending.slice(0, 10)} />
            <TrendingSidebar title="Global Top News" articles={trending.slice(10, 20)} variant="numbered" />
          </div>
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
        {/* @ts-ignore */}
        <CategoryContent category={category} />
      </Suspense>
      <Footer />
    </div>
  )
}
