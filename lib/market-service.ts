export interface MarketData {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    category: 'metal' | 'crypto' | 'index' | 'commodity'
}

const INITIAL_DATA: MarketData[] = [
    { symbol: 'GOLD', name: 'Gold Spot', price: 2042.50, change: 12.30, changePercent: 0.61, category: 'metal' },
    { symbol: 'SILVER', name: 'Silver Spot', price: 23.15, change: -0.12, changePercent: -0.52, category: 'metal' },
    { symbol: 'PLAT', name: 'Platinum', price: 925.40, change: 5.20, changePercent: 0.56, category: 'metal' },
    { symbol: 'BTC', name: 'Bitcoin', price: 42350.00, change: 840.00, changePercent: 2.02, category: 'crypto' },
    { symbol: 'ETH', name: 'Ethereum', price: 2280.50, change: 45.30, changePercent: 2.03, category: 'crypto' },
    { symbol: 'S&P500', name: 'S&P 500', price: 4890.97, change: 32.10, changePercent: 0.66, category: 'index' },
    { symbol: 'NASDAQ', name: 'Nasdaq 100', price: 17503.20, change: 154.50, changePercent: 0.89, category: 'index' },
    { symbol: 'OIL', name: 'WTI Crude', price: 77.15, change: -0.85, changePercent: -1.09, category: 'commodity' },
]

export async function fetchMarketData(): Promise<MarketData[]> {
    // In a real app, this would fetch from an API like AlphaVantage, GoldAPI.io, etc.
    // We simulate a small delay to mimic a network request
    await new Promise(resolve => setTimeout(resolve, 300))

    // Return data with slight random fluctuations to make it feel alive
    return INITIAL_DATA.map(item => {
        const fluctuation = (Math.random() - 0.5) * (item.price * 0.001)
        const newPrice = item.price + fluctuation
        return {
            ...item,
            price: Number(newPrice.toFixed(2)),
            // Keep changes and percentages for stability in this demo
        }
    })
}
