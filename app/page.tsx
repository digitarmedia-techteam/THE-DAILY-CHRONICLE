import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { LatestNewsSidebar } from '@/components/latest-news-sidebar'
import { TopStories } from '@/components/top-stories'
import { TrendingSidebar } from '@/components/trending-sidebar'
import { FeaturedArticles } from '@/components/featured-articles'
import { AdPlacement } from '@/components/ad-placement'
import { fetchHomePageData } from '@/lib/rss-service'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingSkeleton() {
  return (
    <div className="container max-w-[1600px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10">
        <div className="hidden lg:block lg:col-span-3">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {[...Array(8)].map((_, i) => (
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
          <Skeleton className="h-64 md:h-96 w-full rounded-lg" />
          <Skeleton className="h-8 w-3/4 mt-4" />
          <Skeleton className="h-4 w-full mt-2" />
          <div className="mt-12 grid grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded" />
            <Skeleton className="h-48 w-full rounded" />
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(6)].map((_, i) => (
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
    moreStories,
  } = data

  const trendingOpinion = trending.slice(0, 5)
  const trendingNow = trending.slice(5, 10)

  return (
    <>
      <main className="container max-w-[1600px] mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* LEFT SIDEBAR: Latest News (Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
              <LatestNewsSidebar articles={latestNews} />
            </div>
          </aside>

          {/* MIDDLE COLUMN: Hero + Editors Picks */}
          <div className="lg:col-span-6 md:col-span-1 order-1 lg:order-2 space-y-10">
            <section>
              {heroArticle && (
                <ArticleCard
                  article={heroArticle}
                  variant="featured"
                  showCategory
                />
              )}
              <p className="text-base text-muted-foreground mt-4 leading-relaxed font-medium">
                {heroArticle?.description}
              </p>
            </section>

            <AdPlacement slot="home-hero-bottom" className="my-6" />

            {/* Injected Content to fill middle space */}
            <section className="pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Editor's Picks</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {moreStories.slice(0, 4).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" showCategory />
                ))}
              </div>
            </section>
          </div>

          {/* MOBILE ONLY: Latest News (Simplified) */}
          <div className="lg:hidden md:col-span-1 order-2 space-y-8">
            <div className="md:hidden">
              <LatestNewsSidebar articles={latestNews.slice(0, 5)} />
              <AdPlacement slot="mobile-infeed-1" label="Promoted" className="my-6" />
            </div>
            <TopStories articles={topStories.slice(0, 8)} />
          </div>

          {/* RIGHT SIDEBAR: Top Stories & Trending (Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 order-3">
            <div className="sticky top-24 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
              <TopStories articles={topStories} />
              <AdPlacement slot="sidebar-top" label="Sponsored" />
              <TrendingSidebar title="Politics & UK" articles={trendingOpinion} />
              <TrendingSidebar title="Trending Now" articles={trendingNow} variant="numbered" />
            </div>
          </aside>
        </div>

        {/* BOTTOM SECTIONS */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-6 bg-[#1a2744] dark:bg-blue-500 rounded-full" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">World Perspective</h2>
          </div>
          <FeaturedArticles articles={featuredArticles} />
        </section>

        <AdPlacement slot="home-middle" className="my-12 px-4 border-y border-border/50 py-4" />

        <section className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-9">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-1.5 h-6 bg-[#183a37] dark:bg-emerald-500 rounded-full" />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Business & Innovation</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {moreStories.slice(4, 13).map((article) => (
                  <ArticleCard key={article.id} article={article} showCategory />
                ))}
              </div>
            </div>
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24">
                <TrendingSidebar title="In Depth" articles={trending.slice(10, 15)} />
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-ignore */}
        <HomeContent />
      </Suspense>
      <Footer />
    </div>
  )
}
