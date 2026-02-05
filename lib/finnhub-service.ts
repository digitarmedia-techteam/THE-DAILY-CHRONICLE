import { subDays, format } from 'date-fns'

export interface CompanyNews {
    category: string
    datetime: number
    headline: string
    id: number
    image: string
    related: string
    source: string
    summary: string
    url: string
}

// NOTE: in production, use process.env.FINNHUB_API_KEY
const API_KEY = 'd6237n1r01qgcobre7kgd6237n1r01qgcobre7l0'

export async function fetchCompanyNews(symbol: string = 'AAPL'): Promise<CompanyNews[]> {
    // Get dates dynamically for the last 30 days
    const to = new Date()
    const from = subDays(to, 30)

    const fromStr = format(from, 'yyyy-MM-dd')
    const toStr = format(to, 'yyyy-MM-dd')

    try {
        const response = await fetch(
            `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromStr}&to=${toStr}&token=${API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        )

        if (!response.ok) {
            console.error(`Finnhub API error: ${response.status} ${response.statusText}`)
            return []
        }

        const data = await response.json()
        // Return top 6 latest news items
        return data.slice(0, 6)
    } catch (error) {
        console.error('Error fetching company news:', error)
        return []
    }
}
