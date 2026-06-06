// football-data.org → mock-data eşleştirme
// Takım adını slug'a çevirmek için

const NAME_TO_SLUG: Record<string, string> = {
  'Mexico': 'mexico', 'South Africa': 'south-africa', 'South Korea': 'south-korea',
  'Czech Republic': 'czech-republic', 'Canada': 'canada', 'Bosnia and Herzegovina': 'bosnia',
  'Qatar': 'qatar', 'Switzerland': 'switzerland', 'Brazil': 'brazil', 'Morocco': 'morocco',
  'Scotland': 'scotland', 'Haiti': 'haiti', 'USA': 'usa', 'United States': 'usa',
  'Paraguay': 'paraguay', 'Australia': 'australia', 'Türkiye': 'turkey', 'Turkey': 'turkey',
  'Germany': 'germany', 'Curaçao': 'curacao', "Côte d'Ivoire": 'cotedivoire',
  'Ecuador': 'ecuador', 'Netherlands': 'netherlands', 'Japan': 'japan', 'Sweden': 'sweden',
  'Tunisia': 'tunisia', 'Belgium': 'belgium', 'Egypt': 'egypt', 'Iran': 'iran',
  'New Zealand': 'new-zealand', 'Spain': 'spain', 'Cape Verde': 'capeverde',
  'Saudi Arabia': 'saudiarabia', 'Uruguay': 'uruguay', 'France': 'france',
  'Senegal': 'senegal', 'Iraq': 'iraq', 'Norway': 'norway', 'Argentina': 'argentina',
  'Algeria': 'algeria', 'Austria': 'austria', 'Jordan': 'jordan', 'Portugal': 'portugal',
  'DR Congo': 'drcongo', 'Uzbekistan': 'uzbekistan', 'Colombia': 'colombia',
  'England': 'england', 'Croatia': 'croatia', 'Ghana': 'ghana', 'Panama': 'panama',
}

export interface LiveScore {
  homeScore: number | null
  awayScore: number | null
  status: string // TIMED, IN_PLAY, PAUSED, FINISHED, etc.
  minute?: number
}

// key: "homeSlug-awaySlug"
export type LiveScoreMap = Record<string, LiveScore>

export function buildLiveScoreMap(matches: any[]): LiveScoreMap {
  const map: LiveScoreMap = {}
  for (const m of matches) {
    const homeSlug = NAME_TO_SLUG[m.homeTeam?.name] || m.homeTeam?.tla?.toLowerCase()
    const awaySlug = NAME_TO_SLUG[m.awayTeam?.name] || m.awayTeam?.tla?.toLowerCase()
    if (!homeSlug || !awaySlug) continue
    const key = `${homeSlug}-${awaySlug}`
    map[key] = {
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      status: m.status,
    }
  }
  return map
}
