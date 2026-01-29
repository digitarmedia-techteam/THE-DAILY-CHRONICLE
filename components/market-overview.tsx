'use client'

import React, { useEffect, useState } from 'react'
import { fetchMarketData, MarketData } from '@/lib/market-service'
import { TrendingUp, TrendingDown, Coins, Activity, BarChart3, Globe2 } from 'lucide-react'

export function MarketOverview() {
    const [data, setData] = useState<MarketData[]>([])

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchMarketData()
            setData(result)
        }
        loadData()
    }, [])

    if (data.length === 0) return null

    // Filter specific metals
    const metals = data.filter(item => item.category === 'metal')
    const indexes = data.filter(item => item.category === 'index')

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metals.concat(indexes).slice(0, 4).map((item) => (
                    <div key={item.symbol} className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 transition-transform group-hover:scale-110 duration-700 ${item.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {item.category === 'metal' ? <Coins className="w-full h-full" /> : <Activity className="w-full h-full" />}
                        </div>

                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-0.5">{item.name}</p>
                                <h4 className="text-xl font-mono font-bold tracking-tighter text-foreground">${item.price.toLocaleString()}</h4>
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${item.change >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(item.changePercent)}%
                            </div>
                        </div>

                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-1000 ${item.change >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${60 + (item.changePercent * 5)}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
