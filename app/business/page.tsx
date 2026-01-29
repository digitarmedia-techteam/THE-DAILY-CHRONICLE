import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MarketOverview } from '@/components/market-overview'
import { MarketTicker } from '@/components/market-ticker'
import { BreakingNewsBanner } from '@/components/breaking-news-banner'
import { CategoryContent } from '@/components/category-page'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Business News - globex.news',
  description: 'Latest business news, gold prices, silver prices, and financial analysis.',
}

function MarketDataSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MarketTicker />
      <BreakingNewsBanner />

      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase text-muted-foreground tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Market Overview
          </h2>
          <Suspense fallback={<MarketDataSkeleton />}>
            <MarketOverview />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8"><NewsSkeleton /></div>}>
        {/* @ts-ignore */}
        <CategoryContent category="business" />
      </Suspense>

      <Footer />
    </div>
  )
}
