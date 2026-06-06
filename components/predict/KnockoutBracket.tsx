'use client';

import Image from 'next/image';
import { TEAMS, GROUPS } from '@/lib/api/mock-data';
import type { Team } from '@/lib/api/mock-data';
import type { GroupPrediction, KnockoutPrediction, MatchScore, KnockoutScores } from '@/lib/prediction/algorithm';

interface KnockoutMatchProps {
  matchId: string;
  homeSlug: string | null;
  awaySlug: string | null;
  winnerSlug: string | null;
  score?: MatchScore;
  onSelectWinner: (matchId: string, winnerSlug: string) => void;
  onSetScore?: (matchId: string, score: MatchScore) => void;
  disabled?: boolean;
}

function getTeam(slug: string | null): Team | null {
  if (!slug) return null;
  return Object.values(TEAMS).find(t => t.slug === slug) || null;
}

function TeamButton({
  slug, isWinner, isLoser, onClick, disabled,
}: {
  slug: string | null;
  isWinner: boolean;
  isLoser: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const team = getTeam(slug);

  if (!slug) {
    // Empty slot — tournament hasn't reached this point
    return (
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
        style={{ background: 'rgba(42,42,58,0.2)', border: '1px dashed rgba(42,42,58,0.6)' }}
      >
        <div className="w-7 h-5 rounded flex-shrink-0 flex items-center justify-center" style={{ background: '#2A2A3A' }}>
          <span style={{ fontSize: '0.6rem', color: '#8A8A9A' }}>?</span>
        </div>
        <span className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>Belirlenmedi</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || !slug}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all text-left group"
      style={{
        background: isWinner
          ? 'rgba(201,168,76,0.15)'
          : isLoser
          ? 'rgba(26,26,36,0.4)'
          : 'rgba(26,26,36,0.8)',
        borderColor: isWinner
          ? '#C9A84C'
          : isLoser
          ? 'rgba(42,42,58,0.3)'
          : '#2A2A3A',
        opacity: isLoser ? 0.5 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {team && (
        <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
        </div>
      )}
      <span
        className="text-xs font-medium flex-1 truncate"
        style={{ color: isWinner ? '#C9A84C' : '#F0F0F5' }}
      >
        {team?.name || slug}
      </span>
      {isWinner && (
        <span className="text-xs flex-shrink-0" style={{ color: '#C9A84C' }}>✓</span>
      )}
      {!isWinner && !isLoser && !disabled && (
        <span
          className="text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: '#8A8A9A' }}
        >
          Seç
        </span>
      )}
    </button>
  );
}

export function KnockoutMatch({ matchId, homeSlug, awaySlug, winnerSlug, score, onSelectWinner, onSetScore, disabled }: KnockoutMatchProps) {
  const bothKnown = homeSlug && awaySlug;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: '#1A1A24',
        border: winnerSlug ? '1px solid rgba(201,168,76,0.3)' : '1px solid #2A2A3A',
        minWidth: '170px',
      }}
    >
      {/* Match ID label */}
      <div
        className="px-3 py-1.5 text-xs font-mono-custom flex justify-between items-center"
        style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(42,42,58,0.5)', color: '#8A8A9A' }}
      >
        <span>{matchId.toUpperCase().replace(/_/g, ' ')}</span>
        {winnerSlug && <span style={{ color: '#C9A84C' }}>✓</span>}
      </div>

      <div className="p-2 space-y-1.5">
        <TeamButton
          slug={homeSlug}
          isWinner={winnerSlug === homeSlug}
          isLoser={winnerSlug !== null && winnerSlug !== homeSlug}
          onClick={() => homeSlug && onSelectWinner(matchId, homeSlug)}
          disabled={disabled || !bothKnown}
        />
        {winnerSlug && onSetScore ? (
          <button
            onClick={() => onSetScore(matchId, score || { home: 0, away: 0 })}
            className="w-full text-center text-xs py-1 rounded transition-all"
            style={{
              background: score ? 'rgba(201,168,76,0.1)' : 'rgba(42,42,58,0.3)',
              border: score ? '1px solid rgba(201,168,76,0.4)' : '1px dashed #3A3A4A',
              color: score ? '#C9A84C' : '#4A4A5A',
            }}
          >
            {score ? `${score.home} - ${score.away}` : '+ Skor Tahmin Et'}
          </button>
        ) : (
          <div className="text-center text-xs font-mono-custom" style={{ color: '#2A2A3A' }}>vs</div>
        )}
        <TeamButton
          slug={awaySlug}
          isWinner={winnerSlug === awaySlug}
          isLoser={winnerSlug !== null && winnerSlug !== awaySlug}
          onClick={() => awaySlug && onSelectWinner(matchId, awaySlug)}
          disabled={disabled || !bothKnown}
        />
      </div>
    </div>
  );
}

// Derive Round of 32 matchups from group predictions
export function getRoundOf32Matchups(groups: GroupPrediction[], playoffPicks: string[] = []): Array<{ home: string | null; away: string | null; matchId: string }> {
  const qualifiers: Record<string, string[]> = {};
  for (const grp of GROUPS) {
    const pred = groups.find(g => g.groupId === grp.id);
    const order = pred?.teamOrder || grp.teams.map(t => t.slug);
    qualifiers[grp.id] = order.slice(0, 2);
  }

  // FIFA 2026 Round of 32 official bracket (source: FIFA regulations)
  // Match 73: A2 vs B2
  // Match 74: E1 vs 3rd(A/B/C/D/F)
  // Match 75: F1 vs C2
  // Match 76: C1 vs F2
  // Match 77: I1 vs 3rd(C/D/F/G/H)
  // Match 78: E2 vs I2
  // Match 79: A1 vs 3rd(C/E/F/H/I)
  // Match 80: L1 vs 3rd(E/H/I/J/K)
  // Match 81: D1 vs 3rd(B/E/F/I/J)
  // Match 82: G1 vs 3rd(A/E/H/I/J)
  // Match 83: K2 vs L2
  // Match 84: H1 vs J2
  // Match 85: B1 vs 3rd(E/F/G/I/J)
  // Match 86: J1 vs H2
  // Match 87: K1 vs 3rd(D/E/I/J/L)
  // Match 88: D2 vs G2
  return [
    { matchId: 'r32_1',  home: qualifiers['A']?.[1] || null, away: qualifiers['B']?.[1] || null }, // A2 vs B2
    { matchId: 'r32_2',  home: qualifiers['E']?.[0] || null, away: playoffPicks[0] || null },       // E1 vs 3rd
    { matchId: 'r32_3',  home: qualifiers['F']?.[0] || null, away: qualifiers['C']?.[1] || null }, // F1 vs C2
    { matchId: 'r32_4',  home: qualifiers['C']?.[0] || null, away: qualifiers['F']?.[1] || null }, // C1 vs F2
    { matchId: 'r32_5',  home: qualifiers['I']?.[0] || null, away: playoffPicks[1] || null },       // I1 vs 3rd
    { matchId: 'r32_6',  home: qualifiers['E']?.[1] || null, away: qualifiers['I']?.[1] || null }, // E2 vs I2
    { matchId: 'r32_7',  home: qualifiers['A']?.[0] || null, away: playoffPicks[2] || null },       // A1 vs 3rd
    { matchId: 'r32_8',  home: qualifiers['L']?.[0] || null, away: playoffPicks[3] || null },       // L1 vs 3rd
    { matchId: 'r32_9',  home: qualifiers['D']?.[0] || null, away: playoffPicks[4] || null },       // D1 vs 3rd
    { matchId: 'r32_10', home: qualifiers['G']?.[0] || null, away: playoffPicks[5] || null },       // G1 vs 3rd
    { matchId: 'r32_11', home: qualifiers['K']?.[1] || null, away: qualifiers['L']?.[1] || null }, // K2 vs L2
    { matchId: 'r32_12', home: qualifiers['H']?.[0] || null, away: qualifiers['J']?.[1] || null }, // H1 vs J2
    { matchId: 'r32_13', home: qualifiers['B']?.[0] || null, away: playoffPicks[6] || null },       // B1 vs 3rd
    { matchId: 'r32_14', home: qualifiers['J']?.[0] || null, away: qualifiers['H']?.[1] || null }, // J1 vs H2
    { matchId: 'r32_15', home: qualifiers['K']?.[0] || null, away: playoffPicks[7] || null },       // K1 vs 3rd
    { matchId: 'r32_16', home: qualifiers['D']?.[1] || null, away: qualifiers['G']?.[1] || null }, // D2 vs G2
  ];
}

export function buildNextRound(
  prevMatchups: Array<{ matchId: string; home: string | null; away: string | null }>,
  prevResults: KnockoutPrediction,
  prefix: string
): Array<{ matchId: string; home: string | null; away: string | null }> {
  const nextMatchups = [];
  for (let i = 0; i < prevMatchups.length; i += 2) {
    const m1 = prevMatchups[i];
    const m2 = prevMatchups[i + 1];
    nextMatchups.push({
      matchId: `${prefix}_${Math.floor(i / 2) + 1}`,
      home: (m1 && prevResults[m1.matchId]) || null,
      away: (m2 && prevResults[m2.matchId]) || null,
    });
  }
  return nextMatchups;
}
