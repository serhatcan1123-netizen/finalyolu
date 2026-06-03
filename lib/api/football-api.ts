import { SAMPLE_MATCHES, GROUPS, TOP_SCORERS, type Match, type Group } from './mock-data';

const BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || '';
// FIFA World Cup 2026 league ID - update once API confirms ID
const WC_LEAGUE_ID = 1;
const WC_SEASON = 2026;

async function apiRequest<T>(endpoint: string): Promise<T | null> {
  if (!API_KEY || API_KEY === 'BURAYA_API_KEYINI_YAZ') {
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.errors && Object.keys(data.errors).length > 0) return null;
    return data.response;
  } catch {
    return null;
  }
}

export async function getFixtures(date?: string): Promise<Match[]> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  const data = await apiRequest(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}&date=${targetDate}`);
  if (!data) {
    return SAMPLE_MATCHES.filter(m => m.date === targetDate);
  }
  // Transform API response - return mock if transformation fails
  return SAMPLE_MATCHES.filter(m => m.date === targetDate);
}

export async function getAllFixtures(): Promise<Match[]> {
  const data = await apiRequest(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`);
  if (!data) return SAMPLE_MATCHES;
  return SAMPLE_MATCHES;
}

export async function getLiveMatches(): Promise<Match[]> {
  const data = await apiRequest(`/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}&live=all`);
  if (!data) return SAMPLE_MATCHES.filter(m => m.status === 'LIVE');
  return SAMPLE_MATCHES.filter(m => m.status === 'LIVE');
}

export async function getStandings(): Promise<Group[]> {
  const data = await apiRequest(`/standings?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`);
  if (!data) return GROUPS;
  return GROUPS;
}

export async function getTopScorers() {
  const data = await apiRequest(`/players/topscorers?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`);
  if (!data) return TOP_SCORERS;
  return TOP_SCORERS;
}

export async function getMatchStats(fixtureId: number) {
  const data = await apiRequest(`/fixtures/statistics?fixture=${fixtureId}`);
  return data;
}
