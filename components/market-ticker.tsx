'use client'

import React, { useEffect, useState } from 'react'
import { fetchMarketData, MarketData } from '@/lib/market-service'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function MarketTicker() {
    const [data, setData] = useState<MarketData[]>([])

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchMarketData()
            setData(result)
        }
        loadData()
        const interval = setInterval(loadData, 15000) // Update every 15s to respect API rate limits
        return () => clearInterval(interval)
    }, [])

    if (data.length === 0) return null

    return (
        <div className="bg-[#0f172a] text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/5 shadow-inner">
            <div className="flex animate-marquee hover:pause-marquee">
                {/* Duplicate items for seamless loop */}
                {[...data, ...data].map((item, index) => (
                    <div key={`${item.symbol}-${index}`} className="inline-flex items-center px-6 gap-2 group cursor-default">
                        <span className="text-white/60 text-xs font-bold tracking-tighter uppercase">{item.symbol}</span>
                        <span className="text-sm font-mono font-bold tracking-tighter leading-none">${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                            {Math.abs(item.changePercent)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
