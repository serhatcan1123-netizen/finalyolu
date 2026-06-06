import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'https://gamma-api.polymarket.com/events?slug=world-cup-winner&limit=1',
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    
    if (!Array.isArray(data) || !data[0]?.markets?.length) {
      throw new Error('No data')
    }

    const markets = data[0].markets
    
    // Her market "Will X win?" formatında, outcomePrices[0] = Yes fiyatı
    const odds = markets
      .map((m: { question: string; outcomePrices?: string; outcomes?: string }) => {
        // Takım adını "Will Spain win..." formatından çıkar
        const match = m.question.match(/Will (.+?) win the 2026/i)
        if (!match) return null
        const name = match[1]
        const prices = m.outcomePrices ? JSON.parse(m.outcomePrices) : null
        const probability = prices ? parseFloat(prices[0]) * 100 : 0
        return { name, probability }
      })
      .filter((o: { name: string; probability: number } | null) => o && o.probability > 0.1)
      .sort((a: { probability: number }, b: { probability: number }) => b.probability - a.probability)

    return NextResponse.json({ odds, updatedAt: new Date().toISOString() })
  } catch (e) {
    return NextResponse.json({ error: 'Failed', odds: [], updatedAt: '' }, { status: 500 })
  }
}
