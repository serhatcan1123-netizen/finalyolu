import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET() {
  try {
    const res = await fetch(
      'https://gamma-api.polymarket.com/events?slug=world-cup-winner&limit=1',
      { next: { revalidate: 30 } }
    );
    const data = await res.json();
    const markets = data[0]?.markets || [];

    const odds = markets
      .map((m: any) => ({
        name: m.groupItemTitle,
        probability: parseFloat(m.outcomePrices ? JSON.parse(m.outcomePrices)[0] : '0') * 100,
      }))
      .filter((m: any) => m.probability > 0.5)
      .sort((a: any, b: any) => b.probability - a.probability)
      .slice(0, 10);

    return NextResponse.json({ odds, updatedAt: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ odds: [], error: 'Failed to fetch' }, { status: 500 });
  }
}
