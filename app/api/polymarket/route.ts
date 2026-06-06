import { NextResponse } from 'next/server'
import { POLYMARKET_ODDS } from '@/lib/api/mock-data'

export async function GET() {
  try {
    const res = await fetch(
      'https://gamma-api.polymarket.com/events?slug=2026-fifa-world-cup-winner&limit=1',
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()

    // Eğer API çalışıyorsa parse et
    if (Array.isArray(data) && data.length > 0 && data[0].markets) {
      const markets = data[0].markets
      const odds = markets
        .map((m: { outcomePrices?: string; outcomes?: string }) => {
          const prices = JSON.parse(m.outcomePrices || '[]')
          const outcomes = JSON.parse(m.outcomes || '[]')
          return outcomes.map((name: string, i: number) => ({
            name,
            probability: parseFloat(prices[i] || '0') * 100
          }))
        })
        .flat()
        .filter((o: { probability: number }) => o.probability > 0)
        .sort((a: { probability: number }, b: { probability: number }) => b.probability - a.probability)

      return NextResponse.json({ odds, updatedAt: new Date().toISOString() })
    }
  } catch {}

  // Fallback: mock-data'daki statik oranlar
  const odds = POLYMARKET_ODDS
    .map(o => ({ name: o.team.nameEn, probability: o.probability }))
    .sort((a, b) => b.probability - a.probability)

  return NextResponse.json({ odds, updatedAt: new Date().toISOString() })
}
