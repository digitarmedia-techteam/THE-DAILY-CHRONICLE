'use server'

export interface MarketData {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    category: 'metal' | 'crypto' | 'index' | 'commodity'
}

// NOTE: Using a shared cache for the server instance to protect the API Rate Limit
// Finnhub Free Tier: 60 calls / minute
let cachedData: MarketData[] | null = null
let lastFetchTime = 0
const CACHE_DURATION = 15000 // 15 seconds cache

// NOTE: In production, enable this key in your .env
const API_KEY = 'd6237n1r01qgcobre7kgd6237n1r01qgcobre7l0'

const SYMBOLS_MAP = [
    { id: 'GLD', name: 'Gold (ETF)', symbol: 'GOLD', category: 'metal' },
    { id: 'SLV', name: 'Silver (ETF)', symbol: 'SILVER', category: 'metal' },
    { id: 'BINANCE:BTCUSDT', name: 'Bitcoin', symbol: 'BTC', category: 'crypto' },
    { id: 'BINANCE:ETHUSDT', name: 'Ethereum', symbol: 'ETH', category: 'crypto' },
    { id: 'SPY', name: 'S&P 500 (ETF)', symbol: 'S&P500', category: 'index' },
    { id: 'QQQ', name: 'Nasdaq (ETF)', symbol: 'NASDAQ', category: 'index' },
] as const

interface FinnhubQuote {
    c: number  // Current price
    d: number  // Change
    dp: number // Percent change
    h: number
    l: number
    o: number
    pc: number // Previous close
    t: number
}

export async function fetchMarketData(): Promise<MarketData[]> {
    // Return cached data if valid
    if (cachedData && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return cachedData
    }

    try {
        const promises = SYMBOLS_MAP.map(async (item) => {
            try {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${item.id}&token=${API_KEY}`,
                    { cache: 'no-store' }
                )

                if (!response.ok) throw new Error('Failed to fetch')

                const data: FinnhubQuote = await response.json()

                // Fallback for missing data or API errors
                if (!data.c) return null

                return {
                    symbol: item.symbol,
                    name: item.name,
                    price: data.c,
                    change: data.d,
                    changePercent: data.dp,
                    category: item.category
                } as MarketData
            } catch (e) {
                console.error(`Error fetching ${item.id}:`, e)
                return null
            }
        })

        const results = await Promise.all(promises)

        // Filter out failures and updates cache
        const validResults = results.filter((r): r is MarketData => r !== null)

        if (validResults.length > 0) {
            cachedData = validResults
            lastFetchTime = Date.now()
        }

        return cachedData || []

    } catch (error) {
        console.error('Market data fetch error:', error)
        return cachedData || []
    }
}
