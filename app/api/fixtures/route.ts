import { NextResponse } from 'next/server'

const API_KEY = process.env.FOOTBALL_DATA_KEY!
const BASE_URL = 'https://api.football-data.org/v4'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') // LIVE, SCHEDULED, FINISHED

  let url = `${BASE_URL}/competitions/WC/matches?season=2026`
  if (status) url += `&status=${status}`

  const res = await fetch(url, {
    headers: { 'X-Auth-Token': API_KEY },
    next: { revalidate: 30 },
  })

  const data = await res.json()
  return NextResponse.json(data)
}
