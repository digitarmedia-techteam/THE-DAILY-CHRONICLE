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
        <div className="bg-[#c9a227] text-white overflow-hidden relative border-y border-white/10 shadow-sm flex items-center">
            {/* Fixed Label */}
            <div className="bg-[#b38f20] px-4 py-1.5 md:py-2 z-10 relative flex items-center gap-2 font-black italic tracking-tighter text-sm md:text-base border-r border-white/20 shadow-[4px_0_15px_rgba(0,0,0,0.1)]">
                <span className="animate-pulse w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                BREAKING
            </div>

            {/* Scrolling Text */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center">
                <div className="flex animate-marquee-slow hover:pause-marquee whitespace-nowrap items-center py-1">
                    {headlines.map((article, index) => (
                        <a
                            key={`${article.id}-${index}`}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 hover:text-white/80 transition-colors group cursor-pointer"
                        >
                            <span className="text-white/70 font-bold text-xs uppercase tracking-widest">{article.source}</span>
                            <span className="text-sm md:text-base font-medium tracking-tight whitespace-nowrap">
                                {article.title}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/40 mx-2" />
                        </a>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((article, index) => (
                        <a
                            key={`${article.id}-dup-${index}`}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 hover:text-white/80 transition-colors group cursor-pointer"
                        >
                            <span className="text-white/70 font-bold text-xs uppercase tracking-widest">{article.source}</span>
                            <span className="text-sm md:text-base font-medium tracking-tight whitespace-nowrap">
                                {article.title}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/40 mx-2" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Fade effects on edges */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#c9a227] to-transparent z-10 pointer-events-none" />
        </div>
    )
}
