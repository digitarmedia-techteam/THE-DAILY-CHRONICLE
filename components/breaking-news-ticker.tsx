'use client'

import { useEffect, useState } from 'react'
import type { NewsArticle } from '@/lib/types'

interface BreakingNewsTickerProps {
  article: NewsArticle
}

export function BreakingNewsTicker({ article }: BreakingNewsTickerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div className="bg-[#c9a227] text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 font-bold text-sm uppercase bg-white/20 px-3 py-1 rounded">
            Breaking
          </span>
          <div className="flex-1 overflow-hidden">
            <a
              href={article.link}
              target="_blank"
              rel="nofollow noopener sponsored"
              className={`inline-block whitespace-nowrap hover:underline ${
                prefersReducedMotion ? '' : 'animate-marquee'
              }`}
              style={prefersReducedMotion ? {} : {
                animation: 'marquee 30s linear infinite',
              }}
            >
              <span className="font-medium">{article.title}</span>
              <span className="mx-8 opacity-50">|</span>
              <span className="text-white/80">{article.source}</span>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
