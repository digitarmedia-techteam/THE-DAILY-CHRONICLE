'use client'

import React from "react"
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { Search, Loader2 } from 'lucide-react'
import type { NewsArticle } from '@/lib/types'
import Loading from './loading'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = React.useState(query)
  const [results, setResults] = React.useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasSearched, setHasSearched] = React.useState(false)

  const performSearch = React.useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Search News
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for news articles..."
              className="w-full pl-12 pr-4 py-3 text-base md:text-lg border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1a2744] dark:focus:ring-white/20"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1a2744] text-white rounded-md text-sm font-medium hover:bg-[#1a2744]/90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        <Suspense fallback={<Loading />}>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Searching...</span>
            </div>
          ) : hasSearched ? (
            <div>
              <p className="text-muted-foreground mb-6">
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
              </p>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((article) => (
                    <ArticleCard key={article.id} article={article} showCategory />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No articles found matching your search.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try different keywords or browse our categories.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">
                Enter a search term to find news articles
              </p>
            </div>
          )}
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
