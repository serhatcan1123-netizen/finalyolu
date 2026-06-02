// FIFA World Cup 2026 — Verified data from official sources (June 2026)
// Groups source: Wikipedia / FIFA official draw (Dec 5, 2025)
// Schedule source: NBC Sports / FIFA official schedule
// Odds source: Polymarket (June 2026)

export interface Team {
  id: number;
  name: string;       // Short display name
  nameEn: string;     // Full English name
  nameTr: string;     // Full Turkish name
  code: string;       // ISO 3166-1 alpha-2 (for flagcdn)
  flag: string;       // flagcdn w80 URL — sharp on retina
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
  fifaRanking: number;
  slug: string;
  polymarketOdds?: number; // Win probability % from Polymarket
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  date: string;       // YYYY-MM-DD (US date)
  timeET: string;     // HH:MM ET
  venue: string;
  city: string;
  group?: string;
  round: 'Group Stage' | 'Round of 32' | 'Round of 16' | 'Quarter Final' | 'Semi Final' | 'Third Place' | 'Final';
  status: 'NS' | 'LIVE' | 'HT' | 'FT' | 'PST';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
}

export interface Player {
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  club: string;
  age: number;
  caps: number;
  goals: number;
}

// Helper — always use w80 for crisp display at all sizes
const flag = (code: string) => `https://flagcdn.com/w80/${code}.png`;

// ─── 48 TEAMS ─────────────────────────────────────────────────────────────────

export const TEAMS: Record<string, Team> = {
  // GROUP A
  mexico:       { id: 1,  name: 'Meksika',       nameEn: 'Mexico',                nameTr: 'Meksika',                     code: 'mx', flag: flag('mx'), confederation: 'CONCACAF', fifaRanking: 15, slug: 'mexico',        polymarketOdds: 1.0 },
  southafrica:  { id: 2,  name: 'G. Afrika',      nameEn: 'South Africa',          nameTr: 'Güney Afrika',                code: 'za', flag: flag('za'), confederation: 'CAF',      fifaRanking: 63, slug: 'south-africa' },
  southkorea:   { id: 3,  name: 'G. Kore',        nameEn: 'South Korea',           nameTr: 'Güney Kore',                  code: 'kr', flag: flag('kr'), confederation: 'AFC',      fifaRanking: 23, slug: 'south-korea',  polymarketOdds: 0.8 },
  czechrepublic:{ id: 4,  name: 'Çekya',          nameEn: 'Czech Republic',        nameTr: 'Çekya',                       code: 'cz', flag: flag('cz'), confederation: 'UEFA',     fifaRanking: 40, slug: 'czech-republic' },

  // GROUP B
  canada:       { id: 5,  name: 'Kanada',         nameEn: 'Canada',                nameTr: 'Kanada',                      code: 'ca', flag: flag('ca'), confederation: 'CONCACAF', fifaRanking: 44, slug: 'canada',        polymarketOdds: 0.4 },
  bosnia:       { id: 6,  name: 'Bosna-Hersek',   nameEn: 'Bosnia & Herzegovina',  nameTr: 'Bosna Hersek',                code: 'ba', flag: flag('ba'), confederation: 'UEFA',     fifaRanking: 62, slug: 'bosnia' },
  qatar:        { id: 7,  name: 'Katar',          nameEn: 'Qatar',                 nameTr: 'Katar',                       code: 'qa', flag: flag('qa'), confederation: 'AFC',      fifaRanking: 37, slug: 'qatar' },
  switzerland:  { id: 8,  name: 'İsviçre',        nameEn: 'Switzerland',           nameTr: 'İsviçre',                     code: 'ch', flag: flag('ch'), confederation: 'UEFA',     fifaRanking: 19, slug: 'switzerland' },

  // GROUP C
  brazil:       { id: 9,  name: 'Brezilya',       nameEn: 'Brazil',                nameTr: 'Brezilya',                    code: 'br', flag: flag('br'), confederation: 'CONMEBOL', fifaRanking: 5,  slug: 'brazil',        polymarketOdds: 7.0 },
  morocco:      { id: 10, name: 'Fas',             nameEn: 'Morocco',               nameTr: 'Fas',                         code: 'ma', flag: flag('ma'), confederation: 'CAF',      fifaRanking: 11, slug: 'morocco' },
  haiti:        { id: 11, name: 'Haiti',           nameEn: 'Haiti',                 nameTr: 'Haiti',                       code: 'ht', flag: flag('ht'), confederation: 'CONCACAF', fifaRanking: 80, slug: 'haiti' },
  scotland:     { id: 12, name: 'İskoçya',        nameEn: 'Scotland',              nameTr: 'İskoçya',                     code: 'gb-sct', flag: flag('gb-sct'), confederation: 'UEFA', fifaRanking: 35, slug: 'scotland' },

  // GROUP D
  usa:          { id: 13, name: 'ABD',             nameEn: 'United States',         nameTr: 'Amerika Birleşik Devletleri', code: 'us', flag: flag('us'), confederation: 'CONCACAF', fifaRanking: 13, slug: 'usa',           polymarketOdds: 1.5 },
  paraguay:     { id: 14, name: 'Paraguay',        nameEn: 'Paraguay',              nameTr: 'Paraguay',                    code: 'py', flag: flag('py'), confederation: 'CONMEBOL', fifaRanking: 52, slug: 'paraguay' },
  australia:    { id: 15, name: 'Avustralya',      nameEn: 'Australia',             nameTr: 'Avustralya',                  code: 'au', flag: flag('au'), confederation: 'AFC',      fifaRanking: 22, slug: 'australia' },
  turkey:       { id: 16, name: 'Türkiye',         nameEn: 'Turkey',                nameTr: 'Türkiye',                     code: 'tr', flag: flag('tr'), confederation: 'UEFA',     fifaRanking: 24, slug: 'turkey' },

  // GROUP E
  germany:      { id: 17, name: 'Almanya',         nameEn: 'Germany',               nameTr: 'Almanya',                     code: 'de', flag: flag('de'), confederation: 'UEFA',     fifaRanking: 12, slug: 'germany',       polymarketOdds: 8.0 },
  curacao:      { id: 18, name: 'Curaçao',         nameEn: 'Curaçao',               nameTr: 'Curaçao',                     code: 'cw', flag: flag('cw'), confederation: 'CONCACAF', fifaRanking: 90, slug: 'curacao' },
  cotedivoire:  { id: 19, name: 'Fildişi Sahili',  nameEn: "Côte d'Ivoire",         nameTr: "Fildişi Sahili",              code: 'ci', flag: flag('ci'), confederation: 'CAF',      fifaRanking: 27, slug: 'cote-divoire' },
  ecuador:      { id: 20, name: 'Ekvador',         nameEn: 'Ecuador',               nameTr: 'Ekvador',                     code: 'ec', flag: flag('ec'), confederation: 'CONMEBOL', fifaRanking: 28, slug: 'ecuador' },

  // GROUP F
  netherlands:  { id: 21, name: 'Hollanda',        nameEn: 'Netherlands',           nameTr: 'Hollanda',                    code: 'nl', flag: flag('nl'), confederation: 'UEFA',     fifaRanking: 7,  slug: 'netherlands',   polymarketOdds: 4.0 },
  japan:        { id: 22, name: 'Japonya',         nameEn: 'Japan',                 nameTr: 'Japonya',                     code: 'jp', flag: flag('jp'), confederation: 'AFC',      fifaRanking: 17, slug: 'japan',         polymarketOdds: 1.2 },
  sweden:       { id: 23, name: 'İsveç',           nameEn: 'Sweden',                nameTr: 'İsveç',                       code: 'se', flag: flag('se'), confederation: 'UEFA',     fifaRanking: 26, slug: 'sweden' },
  tunisia:      { id: 24, name: 'Tunus',           nameEn: 'Tunisia',               nameTr: 'Tunus',                       code: 'tn', flag: flag('tn'), confederation: 'CAF',      fifaRanking: 30, slug: 'tunisia' },

  // GROUP G
  belgium:      { id: 25, name: 'Belçika',         nameEn: 'Belgium',               nameTr: 'Belçika',                     code: 'be', flag: flag('be'), confederation: 'UEFA',     fifaRanking: 8,  slug: 'belgium',       polymarketOdds: 3.0 },
  egypt:        { id: 26, name: 'Mısır',           nameEn: 'Egypt',                 nameTr: 'Mısır',                       code: 'eg', flag: flag('eg'), confederation: 'CAF',      fifaRanking: 38, slug: 'egypt' },
  iran:         { id: 27, name: 'İran',            nameEn: 'Iran',                  nameTr: 'İran',                        code: 'ir', flag: flag('ir'), confederation: 'AFC',      fifaRanking: 22, slug: 'iran' },
  newzealand:   { id: 28, name: 'Y. Zelanda',      nameEn: 'New Zealand',           nameTr: 'Yeni Zelanda',                code: 'nz', flag: flag('nz'), confederation: 'OFC',      fifaRanking: 90, slug: 'new-zealand' },

  // GROUP H
  spain:        { id: 29, name: 'İspanya',         nameEn: 'Spain',                 nameTr: 'İspanya',                     code: 'es', flag: flag('es'), confederation: 'UEFA',     fifaRanking: 3,  slug: 'spain',         polymarketOdds: 16.0 },
  capeverde:    { id: 30, name: 'Yeşil Burun',     nameEn: 'Cape Verde',            nameTr: 'Yeşil Burun Adaları',         code: 'cv', flag: flag('cv'), confederation: 'CAF',      fifaRanking: 75, slug: 'cape-verde' },
  saudiarabia:  { id: 31, name: 'S. Arabistan',    nameEn: 'Saudi Arabia',          nameTr: 'Suudi Arabistan',             code: 'sa', flag: flag('sa'), confederation: 'AFC',      fifaRanking: 56, slug: 'saudi-arabia' },
  uruguay:      { id: 32, name: 'Uruguay',         nameEn: 'Uruguay',               nameTr: 'Uruguay',                     code: 'uy', flag: flag('uy'), confederation: 'CONMEBOL', fifaRanking: 14, slug: 'uruguay',       polymarketOdds: 2.0 },

  // GROUP I
  france:       { id: 33, name: 'Fransa',          nameEn: 'France',                nameTr: 'Fransa',                      code: 'fr', flag: flag('fr'), confederation: 'UEFA',     fifaRanking: 2,  slug: 'france',        polymarketOdds: 12.0 },
  senegal:      { id: 34, name: 'Senegal',         nameEn: 'Senegal',               nameTr: 'Senegal',                     code: 'sn', flag: flag('sn'), confederation: 'CAF',      fifaRanking: 18, slug: 'senegal',       polymarketOdds: 0.5 },
  iraq:         { id: 35, name: 'Irak',            nameEn: 'Iraq',                  nameTr: 'Irak',                        code: 'iq', flag: flag('iq'), confederation: 'AFC',      fifaRanking: 68, slug: 'iraq' },
  norway:       { id: 36, name: 'Norveç',          nameEn: 'Norway',                nameTr: 'Norveç',                      code: 'no', flag: flag('no'), confederation: 'UEFA',     fifaRanking: 31, slug: 'norway' },

  // GROUP J
  argentina:    { id: 37, name: 'Arjantin',        nameEn: 'Argentina',             nameTr: 'Arjantin',                    code: 'ar', flag: flag('ar'), confederation: 'CONMEBOL', fifaRanking: 1,  slug: 'argentina',     polymarketOdds: 10.0 },
  algeria:      { id: 38, name: 'Cezayir',         nameEn: 'Algeria',               nameTr: 'Cezayir',                     code: 'dz', flag: flag('dz'), confederation: 'CAF',      fifaRanking: 32, slug: 'algeria' },
  austria:      { id: 39, name: 'Avusturya',       nameEn: 'Austria',               nameTr: 'Avusturya',                   code: 'at', flag: flag('at'), confederation: 'UEFA',     fifaRanking: 25, slug: 'austria' },
  jordan:       { id: 40, name: 'Ürdün',           nameEn: 'Jordan',                nameTr: 'Ürdün',                       code: 'jo', flag: flag('jo'), confederation: 'AFC',      fifaRanking: 71, slug: 'jordan' },

  // GROUP K
  portugal:     { id: 41, name: 'Portekiz',        nameEn: 'Portugal',              nameTr: 'Portekiz',                    code: 'pt', flag: flag('pt'), confederation: 'UEFA',     fifaRanking: 6,  slug: 'portugal',      polymarketOdds: 5.0 },
  drcongo:      { id: 42, name: 'Kongo DR',        nameEn: 'DR Congo',              nameTr: 'Demokratik Kongo Cumhuriyeti',code: 'cd', flag: flag('cd'), confederation: 'CAF',      fifaRanking: 55, slug: 'dr-congo' },
  uzbekistan:   { id: 43, name: 'Özbekistan',      nameEn: 'Uzbekistan',            nameTr: 'Özbekistan',                  code: 'uz', flag: flag('uz'), confederation: 'AFC',      fifaRanking: 65, slug: 'uzbekistan' },
  colombia:     { id: 44, name: 'Kolombiya',       nameEn: 'Colombia',              nameTr: 'Kolombiya',                   code: 'co', flag: flag('co'), confederation: 'CONMEBOL', fifaRanking: 9,  slug: 'colombia',      polymarketOdds: 1.8 },

  // GROUP L
  england:      { id: 45, name: 'İngiltere',       nameEn: 'England',               nameTr: 'İngiltere',                   code: 'gb-eng', flag: flag('gb-eng'), confederation: 'UEFA', fifaRanking: 4, slug: 'england',     polymarketOdds: 10.0 },
  croatia:      { id: 46, name: 'Hırvatistan',     nameEn: 'Croatia',               nameTr: 'Hırvatistan',                 code: 'hr', flag: flag('hr'), confederation: 'UEFA',     fifaRanking: 10, slug: 'croatia',       polymarketOdds: 2.5 },
  ghana:        { id: 47, name: 'Gana',            nameEn: 'Ghana',                 nameTr: 'Gana',                        code: 'gh', flag: flag('gh'), confederation: 'CAF',      fifaRanking: 56, slug: 'ghana' },
  panama:       { id: 48, name: 'Panama',          nameEn: 'Panama',                nameTr: 'Panama',                      code: 'pa', flag: flag('pa'), confederation: 'CONCACAF', fifaRanking: 39, slug: 'panama' },
};

// ─── 12 GROUPS (verified from official FIFA draw Dec 5, 2025) ─────────────────

export const GROUPS: Group[] = [
  { id: 'A', name: 'Grup A', teams: [TEAMS.mexico,      TEAMS.southafrica, TEAMS.southkorea,   TEAMS.czechrepublic] },
  { id: 'B', name: 'Grup B', teams: [TEAMS.canada,      TEAMS.bosnia,      TEAMS.qatar,        TEAMS.switzerland] },
  { id: 'C', name: 'Grup C', teams: [TEAMS.brazil,      TEAMS.morocco,     TEAMS.haiti,        TEAMS.scotland] },
  { id: 'D', name: 'Grup D', teams: [TEAMS.usa,         TEAMS.paraguay,    TEAMS.australia,    TEAMS.turkey] },
  { id: 'E', name: 'Grup E', teams: [TEAMS.germany,     TEAMS.curacao,     TEAMS.cotedivoire,  TEAMS.ecuador] },
  { id: 'F', name: 'Grup F', teams: [TEAMS.netherlands, TEAMS.japan,       TEAMS.sweden,       TEAMS.tunisia] },
  { id: 'G', name: 'Grup G', teams: [TEAMS.belgium,     TEAMS.egypt,       TEAMS.iran,         TEAMS.newzealand] },
  { id: 'H', name: 'Grup H', teams: [TEAMS.spain,       TEAMS.capeverde,   TEAMS.saudiarabia,  TEAMS.uruguay] },
  { id: 'I', name: 'Grup I', teams: [TEAMS.france,      TEAMS.senegal,     TEAMS.iraq,         TEAMS.norway] },
  { id: 'J', name: 'Grup J', teams: [TEAMS.argentina,   TEAMS.algeria,     TEAMS.austria,      TEAMS.jordan] },
  { id: 'K', name: 'Grup K', teams: [TEAMS.portugal,    TEAMS.drcongo,     TEAMS.uzbekistan,   TEAMS.colombia] },
  { id: 'L', name: 'Grup L', teams: [TEAMS.england,     TEAMS.croatia,     TEAMS.ghana,        TEAMS.panama] },
];

// ─── FULL GROUP STAGE SCHEDULE (all 72 matches, times in ET) ──────────────────
// Source: NBC Sports / FIFA official schedule

export const GROUP_MATCHES: Match[] = [
  // GROUP A
  { id: 1,  homeTeam: TEAMS.mexico,       awayTeam: TEAMS.southafrica,  date: '2026-06-11', timeET: '15:00', venue: 'Estadio Azteca',          city: 'Mexico City',     group: 'A', round: 'Group Stage', status: 'NS' },
  { id: 2,  homeTeam: TEAMS.southkorea,   awayTeam: TEAMS.czechrepublic,date: '2026-06-11', timeET: '22:00', venue: 'Estadio Akron',           city: 'Guadalajara',     group: 'A', round: 'Group Stage', status: 'NS' },
  { id: 3,  homeTeam: TEAMS.czechrepublic,awayTeam: TEAMS.southafrica,  date: '2026-06-18', timeET: '12:00', venue: 'Mercedes-Benz Stadium',   city: 'Atlanta',         group: 'A', round: 'Group Stage', status: 'NS' },
  { id: 4,  homeTeam: TEAMS.mexico,       awayTeam: TEAMS.southkorea,   date: '2026-06-18', timeET: '21:00', venue: 'Estadio Akron',           city: 'Guadalajara',     group: 'A', round: 'Group Stage', status: 'NS' },
  { id: 5,  homeTeam: TEAMS.czechrepublic,awayTeam: TEAMS.mexico,       date: '2026-06-24', timeET: '21:00', venue: 'Estadio Azteca',          city: 'Mexico City',     group: 'A', round: 'Group Stage', status: 'NS' },
  { id: 6,  homeTeam: TEAMS.southafrica,  awayTeam: TEAMS.southkorea,   date: '2026-06-24', timeET: '21:00', venue: 'Estadio BBVA',            city: 'Monterrey',       group: 'A', round: 'Group Stage', status: 'NS' },

  // GROUP B
  { id: 7,  homeTeam: TEAMS.canada,       awayTeam: TEAMS.bosnia,       date: '2026-06-12', timeET: '15:00', venue: 'BMO Field',               city: 'Toronto',         group: 'B', round: 'Group Stage', status: 'NS' },
  { id: 8,  homeTeam: TEAMS.qatar,        awayTeam: TEAMS.switzerland,  date: '2026-06-13', timeET: '15:00', venue: "Levi's Stadium",          city: 'San Francisco',   group: 'B', round: 'Group Stage', status: 'NS' },
  { id: 9,  homeTeam: TEAMS.switzerland,  awayTeam: TEAMS.bosnia,       date: '2026-06-18', timeET: '15:00', venue: 'SoFi Stadium',            city: 'Los Angeles',     group: 'B', round: 'Group Stage', status: 'NS' },
  { id: 10, homeTeam: TEAMS.canada,       awayTeam: TEAMS.qatar,        date: '2026-06-18', timeET: '18:00', venue: 'BC Place',                city: 'Vancouver',       group: 'B', round: 'Group Stage', status: 'NS' },
  { id: 11, homeTeam: TEAMS.switzerland,  awayTeam: TEAMS.canada,       date: '2026-06-24', timeET: '15:00', venue: 'BC Place',                city: 'Vancouver',       group: 'B', round: 'Group Stage', status: 'NS' },
  { id: 12, homeTeam: TEAMS.bosnia,       awayTeam: TEAMS.qatar,        date: '2026-06-24', timeET: '15:00', venue: 'Lumen Field',             city: 'Seattle',         group: 'B', round: 'Group Stage', status: 'NS' },

  // GROUP C
  { id: 13, homeTeam: TEAMS.brazil,       awayTeam: TEAMS.morocco,      date: '2026-06-13', timeET: '18:00', venue: 'MetLife Stadium',         city: 'New York/NJ',     group: 'C', round: 'Group Stage', status: 'NS' },
  { id: 14, homeTeam: TEAMS.haiti,        awayTeam: TEAMS.scotland,     date: '2026-06-13', timeET: '21:00', venue: 'Gillette Stadium',        city: 'Boston',          group: 'C', round: 'Group Stage', status: 'NS' },
  { id: 15, homeTeam: TEAMS.scotland,     awayTeam: TEAMS.morocco,      date: '2026-06-19', timeET: '18:00', venue: 'Gillette Stadium',        city: 'Boston',          group: 'C', round: 'Group Stage', status: 'NS' },
  { id: 16, homeTeam: TEAMS.brazil,       awayTeam: TEAMS.haiti,        date: '2026-06-19', timeET: '21:00', venue: 'Lincoln Financial Field', city: 'Philadelphia',    group: 'C', round: 'Group Stage', status: 'NS' },
  { id: 17, homeTeam: TEAMS.scotland,     awayTeam: TEAMS.brazil,       date: '2026-06-24', timeET: '18:00', venue: 'Hard Rock Stadium',       city: 'Miami',           group: 'C', round: 'Group Stage', status: 'NS' },
  { id: 18, homeTeam: TEAMS.morocco,      awayTeam: TEAMS.haiti,        date: '2026-06-24', timeET: '18:00', venue: 'Mercedes-Benz Stadium',   city: 'Atlanta',         group: 'C', round: 'Group Stage', status: 'NS' },

  // GROUP D
  { id: 19, homeTeam: TEAMS.usa,          awayTeam: TEAMS.paraguay,     date: '2026-06-12', timeET: '21:00', venue: 'SoFi Stadium',            city: 'Los Angeles',     group: 'D', round: 'Group Stage', status: 'NS' },
  { id: 20, homeTeam: TEAMS.australia,    awayTeam: TEAMS.turkey,       date: '2026-06-14', timeET: '00:00', venue: 'BC Place',                city: 'Vancouver',       group: 'D', round: 'Group Stage', status: 'NS' },
  { id: 21, homeTeam: TEAMS.usa,          awayTeam: TEAMS.australia,    date: '2026-06-19', timeET: '15:00', venue: 'Lumen Field',             city: 'Seattle',         group: 'D', round: 'Group Stage', status: 'NS' },
  { id: 22, homeTeam: TEAMS.turkey,       awayTeam: TEAMS.paraguay,     date: '2026-06-20', timeET: '00:00', venue: "Levi's Stadium",          city: 'San Francisco',   group: 'D', round: 'Group Stage', status: 'NS' },
  { id: 23, homeTeam: TEAMS.turkey,       awayTeam: TEAMS.usa,          date: '2026-06-25', timeET: '22:00', venue: 'SoFi Stadium',            city: 'Los Angeles',     group: 'D', round: 'Group Stage', status: 'NS' },
  { id: 24, homeTeam: TEAMS.paraguay,     awayTeam: TEAMS.australia,    date: '2026-06-25', timeET: '22:00', venue: "Levi's Stadium",          city: 'San Francisco',   group: 'D', round: 'Group Stage', status: 'NS' },

  // GROUP E
  { id: 25, homeTeam: TEAMS.germany,      awayTeam: TEAMS.curacao,      date: '2026-06-14', timeET: '13:00', venue: 'NRG Stadium',             city: 'Houston',         group: 'E', round: 'Group Stage', status: 'NS' },
  { id: 26, homeTeam: TEAMS.cotedivoire,  awayTeam: TEAMS.ecuador,      date: '2026-06-14', timeET: '19:00', venue: 'Lincoln Financial Field', city: 'Philadelphia',    group: 'E', round: 'Group Stage', status: 'NS' },
  { id: 27, homeTeam: TEAMS.germany,      awayTeam: TEAMS.cotedivoire,  date: '2026-06-20', timeET: '16:00', venue: 'BMO Field',               city: 'Toronto',         group: 'E', round: 'Group Stage', status: 'NS' },
  { id: 28, homeTeam: TEAMS.ecuador,      awayTeam: TEAMS.curacao,      date: '2026-06-20', timeET: '20:00', venue: 'Arrowhead Stadium',       city: 'Kansas City',     group: 'E', round: 'Group Stage', status: 'NS' },
  { id: 29, homeTeam: TEAMS.ecuador,      awayTeam: TEAMS.germany,      date: '2026-06-25', timeET: '16:00', venue: 'MetLife Stadium',         city: 'New York/NJ',     group: 'E', round: 'Group Stage', status: 'NS' },
  { id: 30, homeTeam: TEAMS.curacao,      awayTeam: TEAMS.cotedivoire,  date: '2026-06-25', timeET: '16:00', venue: 'Lincoln Financial Field', city: 'Philadelphia',    group: 'E', round: 'Group Stage', status: 'NS' },

  // GROUP F
  { id: 31, homeTeam: TEAMS.netherlands,  awayTeam: TEAMS.japan,        date: '2026-06-14', timeET: '16:00', venue: 'AT&T Stadium',            city: 'Dallas',          group: 'F', round: 'Group Stage', status: 'NS' },
  { id: 32, homeTeam: TEAMS.sweden,       awayTeam: TEAMS.tunisia,      date: '2026-06-14', timeET: '22:00', venue: 'Estadio BBVA',            city: 'Monterrey',       group: 'F', round: 'Group Stage', status: 'NS' },
  { id: 33, homeTeam: TEAMS.netherlands,  awayTeam: TEAMS.sweden,       date: '2026-06-20', timeET: '13:00', venue: 'NRG Stadium',             city: 'Houston',         group: 'F', round: 'Group Stage', status: 'NS' },
  { id: 34, homeTeam: TEAMS.tunisia,      awayTeam: TEAMS.japan,        date: '2026-06-21', timeET: '00:00', venue: 'Estadio BBVA',            city: 'Monterrey',       group: 'F', round: 'Group Stage', status: 'NS' },
  { id: 35, homeTeam: TEAMS.japan,        awayTeam: TEAMS.sweden,       date: '2026-06-25', timeET: '19:00', venue: 'AT&T Stadium',            city: 'Dallas',          group: 'F', round: 'Group Stage', status: 'NS' },
  { id: 36, homeTeam: TEAMS.tunisia,      awayTeam: TEAMS.netherlands,  date: '2026-06-25', timeET: '19:00', venue: 'Arrowhead Stadium',       city: 'Kansas City',     group: 'F', round: 'Group Stage', status: 'NS' },

  // GROUP G
  { id: 37, homeTeam: TEAMS.belgium,      awayTeam: TEAMS.egypt,        date: '2026-06-15', timeET: '15:00', venue: 'Lumen Field',             city: 'Seattle',         group: 'G', round: 'Group Stage', status: 'NS' },
  { id: 38, homeTeam: TEAMS.iran,         awayTeam: TEAMS.newzealand,   date: '2026-06-15', timeET: '21:00', venue: 'SoFi Stadium',            city: 'Los Angeles',     group: 'G', round: 'Group Stage', status: 'NS' },
  { id: 39, homeTeam: TEAMS.belgium,      awayTeam: TEAMS.iran,         date: '2026-06-21', timeET: '15:00', venue: 'SoFi Stadium',            city: 'Los Angeles',     group: 'G', round: 'Group Stage', status: 'NS' },
  { id: 40, homeTeam: TEAMS.newzealand,   awayTeam: TEAMS.egypt,        date: '2026-06-21', timeET: '21:00', venue: 'BC Place',                city: 'Vancouver',       group: 'G', round: 'Group Stage', status: 'NS' },
  { id: 41, homeTeam: TEAMS.egypt,        awayTeam: TEAMS.iran,         date: '2026-06-26', timeET: '23:00', venue: 'Lumen Field',             city: 'Seattle',         group: 'G', round: 'Group Stage', status: 'NS' },
  { id: 42, homeTeam: TEAMS.newzealand,   awayTeam: TEAMS.belgium,      date: '2026-06-26', timeET: '23:00', venue: 'BC Place',                city: 'Vancouver',       group: 'G', round: 'Group Stage', status: 'NS' },

  // GROUP H
  { id: 43, homeTeam: TEAMS.spain,        awayTeam: TEAMS.capeverde,    date: '2026-06-15', timeET: '12:00', venue: 'Mercedes-Benz Stadium',   city: 'Atlanta',         group: 'H', round: 'Group Stage', status: 'NS' },
  { id: 44, homeTeam: TEAMS.saudiarabia,  awayTeam: TEAMS.uruguay,      date: '2026-06-15', timeET: '18:00', venue: 'Hard Rock Stadium',       city: 'Miami',           group: 'H', round: 'Group Stage', status: 'NS' },
  { id: 45, homeTeam: TEAMS.spain,        awayTeam: TEAMS.saudiarabia,  date: '2026-06-21', timeET: '12:00', venue: 'Mercedes-Benz Stadium',   city: 'Atlanta',         group: 'H', round: 'Group Stage', status: 'NS' },
  { id: 46, homeTeam: TEAMS.uruguay,      awayTeam: TEAMS.capeverde,    date: '2026-06-21', timeET: '18:00', venue: 'Hard Rock Stadium',       city: 'Miami',           group: 'H', round: 'Group Stage', status: 'NS' },
  { id: 47, homeTeam: TEAMS.capeverde,    awayTeam: TEAMS.saudiarabia,  date: '2026-06-26', timeET: '20:00', venue: 'NRG Stadium',             city: 'Houston',         group: 'H', round: 'Group Stage', status: 'NS' },
  { id: 48, homeTeam: TEAMS.uruguay,      awayTeam: TEAMS.spain,        date: '2026-06-26', timeET: '20:00', venue: 'Estadio Akron',           city: 'Guadalajara',     group: 'H', round: 'Group Stage', status: 'NS' },

  // GROUP I
  { id: 49, homeTeam: TEAMS.france,       awayTeam: TEAMS.senegal,      date: '2026-06-16', timeET: '15:00', venue: 'MetLife Stadium',         city: 'New York/NJ',     group: 'I', round: 'Group Stage', status: 'NS' },
  { id: 50, homeTeam: TEAMS.iraq,         awayTeam: TEAMS.norway,       date: '2026-06-16', timeET: '18:00', venue: 'Gillette Stadium',        city: 'Boston',          group: 'I', round: 'Group Stage', status: 'NS' },
  { id: 51, homeTeam: TEAMS.france,       awayTeam: TEAMS.iraq,         date: '2026-06-22', timeET: '17:00', venue: 'Lincoln Financial Field', city: 'Philadelphia',    group: 'I', round: 'Group Stage', status: 'NS' },
  { id: 52, homeTeam: TEAMS.norway,       awayTeam: TEAMS.senegal,      date: '2026-06-22', timeET: '20:00', venue: 'MetLife Stadium',         city: 'New York/NJ',     group: 'I', round: 'Group Stage', status: 'NS' },
  { id: 53, homeTeam: TEAMS.norway,       awayTeam: TEAMS.france,       date: '2026-06-26', timeET: '15:00', venue: 'Gillette Stadium',        city: 'Boston',          group: 'I', round: 'Group Stage', status: 'NS' },
  { id: 54, homeTeam: TEAMS.senegal,      awayTeam: TEAMS.iraq,         date: '2026-06-26', timeET: '15:00', venue: 'BMO Field',               city: 'Toronto',         group: 'I', round: 'Group Stage', status: 'NS' },

  // GROUP J
  { id: 55, homeTeam: TEAMS.argentina,    awayTeam: TEAMS.algeria,      date: '2026-06-16', timeET: '21:00', venue: 'Arrowhead Stadium',       city: 'Kansas City',     group: 'J', round: 'Group Stage', status: 'NS' },
  { id: 56, homeTeam: TEAMS.austria,      awayTeam: TEAMS.jordan,       date: '2026-06-17', timeET: '00:00', venue: "Levi's Stadium",          city: 'San Francisco',   group: 'J', round: 'Group Stage', status: 'NS' },
  { id: 57, homeTeam: TEAMS.argentina,    awayTeam: TEAMS.austria,      date: '2026-06-22', timeET: '13:00', venue: 'AT&T Stadium',            city: 'Dallas',          group: 'J', round: 'Group Stage', status: 'NS' },
  { id: 58, homeTeam: TEAMS.jordan,       awayTeam: TEAMS.algeria,      date: '2026-06-22', timeET: '23:00', venue: "Levi's Stadium",          city: 'San Francisco',   group: 'J', round: 'Group Stage', status: 'NS' },
  { id: 59, homeTeam: TEAMS.algeria,      awayTeam: TEAMS.austria,      date: '2026-06-27', timeET: '22:00', venue: 'Arrowhead Stadium',       city: 'Kansas City',     group: 'J', round: 'Group Stage', status: 'NS' },
  { id: 60, homeTeam: TEAMS.jordan,       awayTeam: TEAMS.argentina,    date: '2026-06-27', timeET: '22:00', venue: 'AT&T Stadium',            city: 'Dallas',          group: 'J', round: 'Group Stage', status: 'NS' },

  // GROUP K
  { id: 61, homeTeam: TEAMS.portugal,     awayTeam: TEAMS.drcongo,      date: '2026-06-17', timeET: '13:00', venue: 'NRG Stadium',             city: 'Houston',         group: 'K', round: 'Group Stage', status: 'NS' },
  { id: 62, homeTeam: TEAMS.uzbekistan,   awayTeam: TEAMS.colombia,     date: '2026-06-17', timeET: '22:00', venue: 'Estadio Azteca',          city: 'Mexico City',     group: 'K', round: 'Group Stage', status: 'NS' },
  { id: 63, homeTeam: TEAMS.portugal,     awayTeam: TEAMS.uzbekistan,   date: '2026-06-23', timeET: '13:00', venue: 'NRG Stadium',             city: 'Houston',         group: 'K', round: 'Group Stage', status: 'NS' },
  { id: 64, homeTeam: TEAMS.colombia,     awayTeam: TEAMS.drcongo,      date: '2026-06-23', timeET: '22:00', venue: 'Estadio Akron',           city: 'Guadalajara',     group: 'K', round: 'Group Stage', status: 'NS' },
  { id: 65, homeTeam: TEAMS.colombia,     awayTeam: TEAMS.portugal,     date: '2026-06-27', timeET: '19:30', venue: 'Hard Rock Stadium',       city: 'Miami',           group: 'K', round: 'Group Stage', status: 'NS' },
  { id: 66, homeTeam: TEAMS.drcongo,      awayTeam: TEAMS.uzbekistan,   date: '2026-06-27', timeET: '19:30', venue: 'Mercedes-Benz Stadium',   city: 'Atlanta',         group: 'K', round: 'Group Stage', status: 'NS' },

  // GROUP L
  { id: 67, homeTeam: TEAMS.england,      awayTeam: TEAMS.croatia,      date: '2026-06-17', timeET: '16:00', venue: 'AT&T Stadium',            city: 'Dallas',          group: 'L', round: 'Group Stage', status: 'NS' },
  { id: 68, homeTeam: TEAMS.ghana,        awayTeam: TEAMS.panama,       date: '2026-06-17', timeET: '19:00', venue: 'BMO Field',               city: 'Toronto',         group: 'L', round: 'Group Stage', status: 'NS' },
  { id: 69, homeTeam: TEAMS.england,      awayTeam: TEAMS.ghana,        date: '2026-06-23', timeET: '16:00', venue: 'Gillette Stadium',        city: 'Boston',          group: 'L', round: 'Group Stage', status: 'NS' },
  { id: 70, homeTeam: TEAMS.panama,       awayTeam: TEAMS.croatia,      date: '2026-06-23', timeET: '19:00', venue: 'BMO Field',               city: 'Toronto',         group: 'L', round: 'Group Stage', status: 'NS' },
  { id: 71, homeTeam: TEAMS.panama,       awayTeam: TEAMS.england,      date: '2026-06-27', timeET: '17:00', venue: 'MetLife Stadium',         city: 'New York/NJ',     group: 'L', round: 'Group Stage', status: 'NS' },
  { id: 72, homeTeam: TEAMS.croatia,      awayTeam: TEAMS.ghana,        date: '2026-06-27', timeET: '17:00', venue: 'Lincoln Financial Field', city: 'Philadelphia',    group: 'L', round: 'Group Stage', status: 'NS' },
];

// Alias for components that still import SAMPLE_MATCHES
export const SAMPLE_MATCHES = GROUP_MATCHES;

// ─── POLYMARKET ODDS (source: Polymarket, June 2026) ─────────────────────────

export const POLYMARKET_ODDS: { team: Team; probability: number }[] = [
  { team: TEAMS.spain,       probability: 16.0 },
  { team: TEAMS.france,      probability: 12.0 },
  { team: TEAMS.argentina,   probability: 10.0 },
  { team: TEAMS.england,     probability: 10.0 },
  { team: TEAMS.germany,     probability: 8.0  },
  { team: TEAMS.brazil,      probability: 7.0  },
  { team: TEAMS.portugal,    probability: 5.0  },
  { team: TEAMS.netherlands, probability: 4.0  },
  { team: TEAMS.belgium,     probability: 3.0  },
  { team: TEAMS.croatia,     probability: 2.5  },
  { team: TEAMS.uruguay,     probability: 2.0  },
  { team: TEAMS.colombia,    probability: 1.8  },
  { team: TEAMS.usa,         probability: 1.5  },
  { team: TEAMS.southkorea,  probability: 0.8  },
  { team: TEAMS.senegal,     probability: 0.5  },
  { team: TEAMS.canada,      probability: 0.4  },
  { team: TEAMS.mexico,      probability: 1.0  },
  { team: TEAMS.japan,       probability: 1.2  },
];

// ─── SQUADS (key players for top teams) ───────────────────────────────────────

export const SQUADS: Record<string, Player[]> = {
  spain: [
    { name: 'Unai Simón',         position: 'GK',  club: 'Athletic Club',      age: 27, caps: 38,  goals: 0  },
    { name: 'David Raya',          position: 'GK',  club: 'Arsenal',            age: 29, caps: 14,  goals: 0  },
    { name: 'Dani Carvajal',       position: 'DEF', club: 'Real Madrid',        age: 32, caps: 54,  goals: 3  },
    { name: 'Pau Cubarsí',         position: 'DEF', club: 'Barcelona',          age: 17, caps: 8,   goals: 0  },
    { name: 'Aymeric Laporte',     position: 'DEF', club: 'Al-Nassr',           age: 30, caps: 35,  goals: 3  },
    { name: 'Marc Cucurella',      position: 'DEF', club: 'Chelsea',            age: 25, caps: 22,  goals: 0  },
    { name: 'Alejandro Grimaldo',  position: 'DEF', club: 'Bayer Leverkusen',   age: 29, caps: 9,   goals: 1  },
    { name: 'Rodri',               position: 'MID', club: 'Manchester City',    age: 28, caps: 67,  goals: 7  },
    { name: 'Pedri',               position: 'MID', club: 'Barcelona',          age: 23, caps: 42,  goals: 6  },
    { name: 'Fabián Ruiz',         position: 'MID', club: 'Paris Saint-Germain',age: 28, caps: 37,  goals: 5  },
    { name: 'Martín Zubimendi',    position: 'MID', club: 'Arsenal',            age: 25, caps: 15,  goals: 1  },
    { name: 'Dani Olmo',           position: 'MID', club: 'Barcelona',          age: 26, caps: 38,  goals: 12 },
    { name: 'Lamine Yamal',        position: 'FWD', club: 'Barcelona',          age: 18, caps: 22,  goals: 8  },
    { name: 'Nico Williams',       position: 'FWD', club: 'Athletic Club',      age: 22, caps: 20,  goals: 7  },
    { name: 'Álvaro Morata',       position: 'FWD', club: 'AC Milan',           age: 33, caps: 82,  goals: 37 },
    { name: 'Mikel Oyarzabal',     position: 'FWD', club: 'Real Sociedad',      age: 28, caps: 42,  goals: 21 },
    { name: 'Ferran Torres',       position: 'FWD', club: 'Barcelona',          age: 24, caps: 38,  goals: 14 },
  ],
  france: [
    { name: 'Mike Maignan',        position: 'GK',  club: 'AC Milan',           age: 29, caps: 22,  goals: 0  },
    { name: 'Alphonse Aréola',     position: 'GK',  club: 'West Ham',           age: 31, caps: 7,   goals: 0  },
    { name: 'Jules Koundé',        position: 'DEF', club: 'Barcelona',          age: 26, caps: 44,  goals: 2  },
    { name: 'William Saliba',      position: 'DEF', club: 'Arsenal',            age: 24, caps: 26,  goals: 1  },
    { name: 'Dayot Upamecano',     position: 'DEF', club: 'Bayern Munich',      age: 26, caps: 34,  goals: 1  },
    { name: 'Theo Hernández',      position: 'DEF', club: 'AC Milan',           age: 27, caps: 27,  goals: 5  },
    { name: 'Benjamin Pavard',     position: 'DEF', club: 'Inter Milan',        age: 28, caps: 57,  goals: 3  },
    { name: 'Ibrahima Konaté',     position: 'DEF', club: 'Liverpool',          age: 25, caps: 16,  goals: 1  },
    { name: 'N\'Golo Kanté',       position: 'MID', club: 'Al-Ittihad',         age: 35, caps: 56,  goals: 2  },
    { name: 'Aurélien Tchouaméni', position: 'MID', club: 'Real Madrid',        age: 25, caps: 38,  goals: 6  },
    { name: 'Antoine Griezmann',   position: 'MID', club: 'Atlético Madrid',    age: 35, caps: 137, goals: 44 },
    { name: 'Warren Zaïre-Emery',  position: 'MID', club: 'Paris Saint-Germain',age: 20, caps: 14,  goals: 2  },
    { name: 'Kylian Mbappé',       position: 'FWD', club: 'Real Madrid',        age: 27, caps: 90,  goals: 52 },
    { name: 'Ousmane Dembélé',     position: 'FWD', club: 'Paris Saint-Germain',age: 29, caps: 58,  goals: 11 },
    { name: 'Marcus Thuram',       position: 'FWD', club: 'Inter Milan',        age: 27, caps: 32,  goals: 12 },
    { name: 'Bradley Barcola',     position: 'FWD', club: 'Paris Saint-Germain',age: 22, caps: 16,  goals: 5  },
    { name: 'Michael Olise',       position: 'FWD', club: 'Bayern Munich',      age: 23, caps: 10,  goals: 4  },
  ],
  argentina: [
    { name: 'Emiliano Martínez',   position: 'GK',  club: 'Aston Villa',        age: 32, caps: 42,  goals: 0  },
    { name: 'Franco Armani',       position: 'GK',  club: 'River Plate',        age: 38, caps: 30,  goals: 0  },
    { name: 'Cristian Romero',     position: 'DEF', club: 'Tottenham',          age: 26, caps: 40,  goals: 3  },
    { name: 'Lisandro Martínez',   position: 'DEF', club: 'Manchester United',  age: 26, caps: 27,  goals: 2  },
    { name: 'Nicolás Otamendi',    position: 'DEF', club: 'Benfica',            age: 38, caps: 117, goals: 7  },
    { name: 'Gonzalo Montiel',     position: 'DEF', club: 'Nottm Forest',       age: 27, caps: 35,  goals: 1  },
    { name: 'Nicolás Tagliafico',  position: 'DEF', club: 'Lyon',               age: 32, caps: 78,  goals: 5  },
    { name: 'Rodrigo De Paul',     position: 'MID', club: 'Atlético Madrid',    age: 30, caps: 79,  goals: 10 },
    { name: 'Alexis Mac Allister', position: 'MID', club: 'Liverpool',          age: 26, caps: 44,  goals: 12 },
    { name: 'Enzo Fernández',      position: 'MID', club: 'Chelsea',            age: 24, caps: 37,  goals: 8  },
    { name: 'Giovani Lo Celso',    position: 'MID', club: 'Villarreal',         age: 28, caps: 50,  goals: 9  },
    { name: 'Lionel Messi',        position: 'FWD', club: 'Inter Miami',        age: 38, caps: 191, goals: 112},
    { name: 'Lautaro Martínez',    position: 'FWD', club: 'Inter Milan',        age: 27, caps: 74,  goals: 36 },
    { name: 'Julián Álvarez',      position: 'FWD', club: 'Atlético Madrid',    age: 24, caps: 42,  goals: 19 },
    { name: 'Alejandro Garnacho',  position: 'FWD', club: 'Manchester United',  age: 21, caps: 22,  goals: 9  },
    { name: 'Paulo Dybala',        position: 'FWD', club: 'Roma',               age: 32, caps: 47,  goals: 34 },
  ],
  england: [
    { name: 'Jordan Pickford',     position: 'GK',  club: 'Everton',            age: 32, caps: 68,  goals: 0  },
    { name: 'Aaron Ramsdale',      position: 'GK',  club: 'Southampton',        age: 27, caps: 10,  goals: 0  },
    { name: 'Trent Alexander-Arnold',position:'DEF', club: 'Real Madrid',       age: 27, caps: 40,  goals: 5  },
    { name: 'John Stones',         position: 'DEF', club: 'Manchester City',    age: 32, caps: 72,  goals: 3  },
    { name: 'Harry Maguire',       position: 'DEF', club: 'Manchester United',  age: 33, caps: 65,  goals: 8  },
    { name: 'Levi Colwill',        position: 'DEF', club: 'Chelsea',            age: 22, caps: 12,  goals: 0  },
    { name: 'Luke Shaw',           position: 'DEF', club: 'Manchester United',  age: 28, caps: 35,  goals: 1  },
    { name: 'Declan Rice',         position: 'MID', club: 'Arsenal',            age: 27, caps: 54,  goals: 6  },
    { name: 'Jude Bellingham',     position: 'MID', club: 'Real Madrid',        age: 22, caps: 47,  goals: 14 },
    { name: 'Phil Foden',          position: 'MID', club: 'Manchester City',    age: 26, caps: 45,  goals: 10 },
    { name: 'Kobbie Mainoo',       position: 'MID', club: 'Manchester United',  age: 20, caps: 16,  goals: 3  },
    { name: 'Harry Kane',          position: 'FWD', club: 'Bayern Munich',      age: 32, caps: 97,  goals: 68 },
    { name: 'Bukayo Saka',         position: 'FWD', club: 'Arsenal',            age: 24, caps: 49,  goals: 16 },
    { name: 'Marcus Rashford',     position: 'FWD', club: 'Aston Villa',        age: 28, caps: 66,  goals: 17 },
    { name: 'Cole Palmer',         position: 'FWD', club: 'Chelsea',            age: 23, caps: 18,  goals: 8  },
    { name: 'Ollie Watkins',       position: 'FWD', club: 'Aston Villa',        age: 30, caps: 22,  goals: 10 },
  ],
  brazil: [
    { name: 'Alisson',             position: 'GK',  club: 'Liverpool',          age: 33, caps: 80,  goals: 0  },
    { name: 'Ederson',             position: 'GK',  club: 'Manchester City',    age: 31, caps: 42,  goals: 0  },
    { name: 'Marquinhos',          position: 'DEF', club: 'Paris Saint-Germain',age: 30, caps: 96,  goals: 12 },
    { name: 'Gabriel Magalhães',   position: 'DEF', club: 'Arsenal',            age: 27, caps: 28,  goals: 3  },
    { name: 'Bremer',              position: 'DEF', club: 'Juventus',           age: 27, caps: 14,  goals: 0  },
    { name: 'Danilo',              position: 'DEF', club: 'Flamengo',           age: 33, caps: 91,  goals: 7  },
    { name: 'Guilherme Arana',     position: 'DEF', club: 'Atlético Mineiro',   age: 27, caps: 18,  goals: 1  },
    { name: 'Casemiro',            position: 'MID', club: 'Manchester United',  age: 34, caps: 84,  goals: 7  },
    { name: 'Bruno Guimarães',     position: 'MID', club: 'Newcastle',          age: 27, caps: 40,  goals: 7  },
    { name: 'Lucas Paquetá',       position: 'MID', club: 'West Ham',           age: 27, caps: 54,  goals: 13 },
    { name: 'Gerson',              position: 'MID', club: 'Flamengo',           age: 27, caps: 16,  goals: 2  },
    { name: 'Vinicius Jr.',        position: 'FWD', club: 'Real Madrid',        age: 25, caps: 60,  goals: 22 },
    { name: 'Raphinha',            position: 'FWD', club: 'Barcelona',          age: 29, caps: 48,  goals: 21 },
    { name: 'Rodrygo',             position: 'FWD', club: 'Real Madrid',        age: 24, caps: 38,  goals: 12 },
    { name: 'Endrick',             position: 'FWD', club: 'Real Madrid',        age: 18, caps: 12,  goals: 4  },
    { name: 'Gabriel Martinelli',  position: 'FWD', club: 'Arsenal',            age: 23, caps: 22,  goals: 8  },
  ],
  germany: [
    { name: 'Manuel Neuer',        position: 'GK',  club: 'Bayern Munich',      age: 40, caps: 124, goals: 0  },
    { name: 'Marc-André ter Stegen',position:'GK',  club: 'Barcelona',          age: 34, caps: 40,  goals: 0  },
    { name: 'Antonio Rüdiger',     position: 'DEF', club: 'Real Madrid',        age: 33, caps: 84,  goals: 7  },
    { name: 'Jonathan Tah',        position: 'DEF', club: 'Bayer Leverkusen',   age: 30, caps: 26,  goals: 2  },
    { name: 'Joshua Kimmich',      position: 'DEF', club: 'Bayern Munich',      age: 31, caps: 92,  goals: 10 },
    { name: 'Nico Schlotterbeck',  position: 'DEF', club: 'Borussia Dortmund',  age: 25, caps: 22,  goals: 1  },
    { name: 'David Raum',          position: 'DEF', club: 'RB Leipzig',         age: 26, caps: 24,  goals: 2  },
    { name: 'Florian Wirtz',       position: 'MID', club: 'Bayer Leverkusen',   age: 21, caps: 32,  goals: 11 },
    { name: 'Jamal Musiala',       position: 'MID', club: 'Bayern Munich',      age: 21, caps: 36,  goals: 12 },
    { name: 'Ilkay Gündoğan',      position: 'MID', club: 'Barcelona',          age: 35, caps: 82,  goals: 18 },
    { name: 'Robert Andrich',      position: 'MID', club: 'Bayer Leverkusen',   age: 30, caps: 22,  goals: 2  },
    { name: 'Kai Havertz',         position: 'FWD', club: 'Arsenal',            age: 26, caps: 62,  goals: 22 },
    { name: 'Leroy Sané',          position: 'FWD', club: 'Bayern Munich',      age: 30, caps: 61,  goals: 17 },
    { name: 'Niclas Füllkrug',     position: 'FWD', club: 'West Ham',           age: 33, caps: 28,  goals: 17 },
    { name: 'Serge Gnabry',        position: 'FWD', club: 'Bayern Munich',      age: 30, caps: 46,  goals: 21 },
  ],
  portugal: [
    { name: 'Diogo Costa',         position: 'GK',  club: 'Porto',              age: 25, caps: 24,  goals: 0  },
    { name: 'Rui Patrício',        position: 'GK',  club: 'Roma',               age: 37, caps: 109, goals: 0  },
    { name: 'João Cancelo',        position: 'DEF', club: 'Barcelona',          age: 31, caps: 57,  goals: 3  },
    { name: 'Rúben Dias',          position: 'DEF', club: 'Manchester City',    age: 27, caps: 60,  goals: 5  },
    { name: 'Gonçalo Inácio',      position: 'DEF', club: 'Sporting CP',        age: 23, caps: 22,  goals: 2  },
    { name: 'Nuno Mendes',         position: 'DEF', club: 'Paris Saint-Germain',age: 22, caps: 30,  goals: 1  },
    { name: 'Diogo Dalot',         position: 'DEF', club: 'Manchester United',  age: 25, caps: 30,  goals: 2  },
    { name: 'Bruno Fernandes',     position: 'MID', club: 'Manchester United',  age: 31, caps: 88,  goals: 27 },
    { name: 'Bernardo Silva',      position: 'MID', club: 'Manchester City',    age: 30, caps: 85,  goals: 22 },
    { name: 'Rúben Neves',         position: 'MID', club: 'Al-Hilal',           age: 27, caps: 50,  goals: 7  },
    { name: 'Vitinha',             position: 'MID', club: 'Paris Saint-Germain',age: 25, caps: 36,  goals: 6  },
    { name: 'Cristiano Ronaldo',   position: 'FWD', club: 'Al-Nassr',           age: 41, caps: 221, goals: 136},
    { name: 'Rafael Leão',         position: 'FWD', club: 'AC Milan',           age: 25, caps: 38,  goals: 12 },
    { name: 'Gonçalo Ramos',       position: 'FWD', club: 'Paris Saint-Germain',age: 23, caps: 22,  goals: 14 },
    { name: 'Diogo Jota',          position: 'FWD', club: 'Liverpool',          age: 27, caps: 50,  goals: 22 },
    { name: 'Pedro',               position: 'FWD', club: 'Flamengo',           age: 27, caps: 16,  goals: 6  },
  ],
  netherlands: [
    { name: 'Bart Verbruggen',     position: 'GK',  club: 'Brighton',           age: 22, caps: 14,  goals: 0  },
    { name: 'Jasper Cillessen',    position: 'GK',  club: 'NEC Nijmegen',       age: 37, caps: 65,  goals: 0  },
    { name: 'Virgil van Dijk',     position: 'DEF', club: 'Liverpool',          age: 34, caps: 74,  goals: 7  },
    { name: 'Matthijs de Ligt',    position: 'DEF', club: 'Manchester United',  age: 25, caps: 50,  goals: 4  },
    { name: 'Nathan Aké',          position: 'DEF', club: 'Manchester City',    age: 29, caps: 44,  goals: 3  },
    { name: 'Denzel Dumfries',     position: 'DEF', club: 'Inter Milan',        age: 28, caps: 54,  goals: 8  },
    { name: 'Lutsharel Geertruida',position: 'DEF', club: 'RB Leipzig',         age: 24, caps: 18,  goals: 2  },
    { name: 'Frenkie de Jong',     position: 'MID', club: 'Barcelona',          age: 29, caps: 67,  goals: 8  },
    { name: 'Tijjani Reijnders',   position: 'MID', club: 'AC Milan',           age: 26, caps: 26,  goals: 7  },
    { name: 'Ryan Gravenberch',    position: 'MID', club: 'Liverpool',          age: 22, caps: 22,  goals: 3  },
    { name: 'Teun Koopmeiners',    position: 'MID', club: 'Juventus',           age: 26, caps: 28,  goals: 7  },
    { name: 'Cody Gakpo',          position: 'FWD', club: 'Liverpool',          age: 25, caps: 40,  goals: 16 },
    { name: 'Memphis Depay',       position: 'FWD', club: 'Atlético Madrid',    age: 32, caps: 92,  goals: 45 },
    { name: 'Donyell Malen',       position: 'FWD', club: 'Borussia Dortmund',  age: 26, caps: 34,  goals: 12 },
    { name: 'Xavi Simons',         position: 'FWD', club: 'RB Leipzig',         age: 22, caps: 24,  goals: 8  },
  ],
};

// top scorers placeholder
export const TOP_SCORERS: { player: string; team: Team; goals: number; assists: number }[] = [
  { player: 'Kylian Mbappé',     team: TEAMS.france,      goals: 0, assists: 0 },
  { player: 'Lionel Messi',      team: TEAMS.argentina,   goals: 0, assists: 0 },
  { player: 'Harry Kane',        team: TEAMS.england,     goals: 0, assists: 0 },
  { player: 'Vinicius Jr.',      team: TEAMS.brazil,      goals: 0, assists: 0 },
  { player: 'Lamine Yamal',      team: TEAMS.spain,       goals: 0, assists: 0 },
];
