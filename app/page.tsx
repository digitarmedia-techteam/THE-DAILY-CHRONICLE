import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { LatestNewsSidebar } from '@/components/latest-news-sidebar'
import { TopStories } from '@/components/top-stories'
import { TrendingSidebar } from '@/components/trending-sidebar'
import { FeaturedArticles } from '@/components/featured-articles'
import { BreakingNewsTicker } from '@/components/breaking-news-ticker'
import {
  fetchNewsByCategory,
  fetchTopStories,
  fetchTrendingNews,
  fetchBreakingNews,
} from '@/lib/rss-service'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

async function HomeContent() {
  const [homeNews, topStories, trending, breaking] = await Promise.all([
    fetchNewsByCategory('home'),
    fetchTopStories(),
    fetchTrendingNews(),
    fetchBreakingNews(),
  ])

  // Get different articles for different sections
  const heroArticle = homeNews[0]
  const latestNews = homeNews.slice(1, 7)
  const featuredArticles = homeNews.slice(7, 10)
  const trendingOpinion = trending.slice(0, 5)
  const trendingNow = trending.slice(5, 10)

  return (
    <>
      {breaking && <BreakingNewsTicker article={breaking} />}
      
      <main className="container mx-auto px-4 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Latest News */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <LatestNewsSidebar articles={latestNews} />
          </aside>

          {/* Main Content - Hero */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            {heroArticle && (
              <ArticleCard
                article={heroArticle}
                variant="featured"
                showCategory
              />
            )}
            <p className="text-sm text-muted-foreground mt-4">
              {heroArticle?.description}
            </p>
          </div>

          {/* Right Sidebar - Top Stories & Trending */}
          <aside className="lg:col-span-3 order-3 space-y-6">
            <TopStories articles={topStories} />
            <TrendingSidebar title="Trending & Opinion" articles={trendingOpinion} />
            <TrendingSidebar title="Trending Now" articles={trendingNow} variant="numbered" />
          </aside>
        </div>

        {/* Featured Articles Section */}
        <section className="mt-12 pt-8 border-t border-border">
          <FeaturedArticles articles={featuredArticles} />
        </section>

        {/* More Trending */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
              <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4 tracking-wide">
                More Stories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homeNews.slice(10, 16).map((article) => (
                  <ArticleCard key={article.id} article={article} showCategory />
                ))}
              </div>
            </div>
            <aside className="lg:col-span-3">
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
      <Suspense fallback={<div className="container mx-auto px-4 py-8"><LoadingSkeleton /></div>}>
        <HomeContent />
      </Suspense>
      <Footer />
    </div>
  )
}
