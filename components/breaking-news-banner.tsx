'use client'

import React, { useEffect, useState } from 'react'
import { NewsArticle } from '@/lib/types'
import { fetchTrendingNews } from '@/lib/rss-service'
import { ChevronRight } from 'lucide-react'

export function BreakingNewsBanner() {
    const [headlines, setHeadlines] = useState<NewsArticle[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const loadHeadlines = async () => {
            try {
                const response = await fetch('/api/rss?category=trending')
                const json = await response.json()
                if (json.success) {
                    setHeadlines(json.articles)
                }
            } catch (error) {
                console.error('Failed to load breaking headlines:', error)
            }
        }
        loadHeadlines()
        const interval = setInterval(loadHeadlines, 60000) // Refresh headlines every 1 minute
        return () => clearInterval(interval)
    }, [])

    if (!mounted || headlines.length === 0) return null

    return (
        <div className="bg-[#c9a227] text-white overflow-hidden relative border-y border-white/10 shadow-lg flex items-center h-10 md:h-12 animate-fade-in">
            {/* Fixed Label */}
            <div className="bg-[#b38f20] px-6 h-full z-20 relative flex items-center gap-2 font-black italic tracking-tighter text-sm md:text-base border-r border-white/20 shadow-[8px_0_20px_rgba(0,0,0,0.2)]">
                <span className="animate-pulse w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#fff]" />
                EXCLUSIVE
            </div>

            {/* Scrolling Text */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center bg-[#c9a227]">
                <div className="flex animate-marquee-slow hover:pause-marquee whitespace-nowrap items-center py-1">
                    {headlines.map((article, index) => (
                        <a
                            key={`${article.id}-${index}`}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 hover:text-black transition-colors group cursor-pointer"
                        >
                            <span className="text-white/60 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">{article.source}</span>
                            <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight whitespace-nowrap uppercase">
                                {article.title}
                            </span>
                            <span className="w-1.5 h-1.5 rotate-45 bg-white/40 mx-4" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#c9a227] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#c9a227] to-transparent z-10 pointer-events-none" />
        </div>
    )
}
