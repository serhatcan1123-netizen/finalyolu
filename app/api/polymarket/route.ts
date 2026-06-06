import { NextResponse } from 'next/server'

const WC_WINNER_SLUG = 'which-country-will-win-the-2026-fifa-world-cup'

export async function GET() {
  try {
    const res = await fetch(
      `https://gamma-api.polymarket.com/markets?slug=${WC_WINNER_SLUG}`,
      { next: { revalidate: 3600 } } // 1 saatte bir güncelle
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
