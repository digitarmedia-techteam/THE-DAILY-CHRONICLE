import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { LatestNewsSidebar } from '@/components/latest-news-sidebar'
import { TopStories } from '@/components/top-stories'
import { TrendingSidebar } from '@/components/trending-sidebar'
import { FeaturedArticles } from '@/components/featured-articles'
import { BreakingNewsTicker } from '@/components/breaking-news-ticker'
import { fetchHomePageData } from '@/lib/rss-service'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="hidden md:block lg:col-span-3">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-16 h-16 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <Skeleton className="h-64 md:h-80 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 mt-4" />
          <Skeleton className="h-4 w-full mt-2" />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function HomeContent() {
  const data = await fetchHomePageData()
  
  const {
    heroArticle,
    latestNews,
    topStories,
    featuredArticles,
    trending,
    breaking,
    moreStories,
  } = data

  const trendingOpinion = trending.slice(0, 5)
  const trendingNow = trending.slice(5, 10)

  return (
    <>
      {breaking && <BreakingNewsTicker article={breaking} />}
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          <aside className="hidden md:block lg:col-span-3 md:col-span-1 order-2 lg:order-1">
            <LatestNewsSidebar articles={latestNews} />
          </aside>

          <div className="lg:col-span-6 md:col-span-1 order-1 lg:order-2">
            {heroArticle && (
              <ArticleCard
                article={heroArticle}
                variant="featured"
                showCategory
              />
            )}
            <p className="text-sm text-muted-foreground mt-3 md:mt-4 line-clamp-3">
              {heroArticle?.description}
            </p>
          </div>

          <div className="md:hidden order-2">
            <LatestNewsSidebar articles={latestNews.slice(0, 4)} />
          </div>

          <aside className="lg:col-span-3 md:col-span-2 lg:col-span-3 order-3 space-y-6">
            <TopStories articles={topStories} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
              <TrendingSidebar title="Trending & Opinion" articles={trendingOpinion} />
              <TrendingSidebar title="Trending Now" articles={trendingNow} variant="numbered" />
            </div>
          </aside>
        </div>

        <section className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <FeaturedArticles articles={featuredArticles} />
        </section>

        <section className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-9">
              <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
                More Stories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {moreStories.map((article) => (
                  <ArticleCard key={article.id} article={article} showCategory />
                ))}
              </div>
            </div>
            <aside className="lg:col-span-3 hidden lg:block">
              <TrendingSidebar title="Trending & Opinion" articles={trendingOpinion} />
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeContent />
      </Suspense>
      <Footer />
    </div>
  )
}
