'use client';

import Image from 'next/image';
import { TEAMS, GROUPS } from '@/lib/api/mock-data';
import type { Team } from '@/lib/api/mock-data';
import type { GroupPrediction, KnockoutPrediction } from '@/lib/prediction/algorithm';

interface KnockoutMatchProps {
  matchId: string;
  homeSlug: string | null;
  awaySlug: string | null;
  winnerSlug: string | null;
  onSelectWinner: (matchId: string, winnerSlug: string) => void;
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

export function KnockoutMatch({ matchId, homeSlug, awaySlug, winnerSlug, onSelectWinner, disabled }: KnockoutMatchProps) {
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
        <div className="text-center text-xs font-mono-custom" style={{ color: '#2A2A3A' }}>vs</div>
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
export function getRoundOf32Matchups(groups: GroupPrediction[]): Array<{ home: string | null; away: string | null; matchId: string }> {
  const qualifiers: Record<string, string[]> = {};
  for (const grp of GROUPS) {
    const pred = groups.find(g => g.groupId === grp.id);
    const order = pred?.teamOrder || grp.teams.map(t => t.slug);
    qualifiers[grp.id] = order.slice(0, 2);
  }

  // FIFA 2026 Round of 32 bracket (simplified pairings)
  return [
    { matchId: 'r32_1',  home: qualifiers['A']?.[0] || null, away: qualifiers['B']?.[1] || null },
    { matchId: 'r32_2',  home: qualifiers['B']?.[0] || null, away: qualifiers['A']?.[1] || null },
    { matchId: 'r32_3',  home: qualifiers['C']?.[0] || null, away: qualifiers['D']?.[1] || null },
    { matchId: 'r32_4',  home: qualifiers['D']?.[0] || null, away: qualifiers['C']?.[1] || null },
    { matchId: 'r32_5',  home: qualifiers['E']?.[0] || null, away: qualifiers['F']?.[1] || null },
    { matchId: 'r32_6',  home: qualifiers['F']?.[0] || null, away: qualifiers['E']?.[1] || null },
    { matchId: 'r32_7',  home: qualifiers['G']?.[0] || null, away: qualifiers['H']?.[1] || null },
    { matchId: 'r32_8',  home: qualifiers['H']?.[0] || null, away: qualifiers['G']?.[1] || null },
    { matchId: 'r32_9',  home: qualifiers['I']?.[0] || null, away: qualifiers['J']?.[1] || null },
    { matchId: 'r32_10', home: qualifiers['J']?.[0] || null, away: qualifiers['I']?.[1] || null },
    { matchId: 'r32_11', home: qualifiers['K']?.[0] || null, away: qualifiers['L']?.[1] || null },
    { matchId: 'r32_12', home: qualifiers['L']?.[0] || null, away: qualifiers['K']?.[1] || null },
    // 4 best 3rd-place slots — marked as unknown until group stage ends
    { matchId: 'r32_13', home: null, away: null },
    { matchId: 'r32_14', home: null, away: null },
    { matchId: 'r32_15', home: null, away: null },
    { matchId: 'r32_16', home: null, away: null },
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
