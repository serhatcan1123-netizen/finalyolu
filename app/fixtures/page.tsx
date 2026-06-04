'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { GROUP_MATCHES } from '@/lib/api/mock-data';
import type { Match } from '@/lib/api/mock-data';
import { toTSI, toTSIDate } from '@/lib/utils/time';

const ROUNDS = ['Tümü', 'Grup Aşaması', 'Son 32', 'Son 16', 'Çeyrek Final', 'Yarı Final', 'Final'] as const;
type RoundLabel = (typeof ROUNDS)[number];

const ROUND_MAP: Record<RoundLabel, string> = {
  'Tümü': 'all',
  'Grup Aşaması': 'Group Stage',
  'Son 32': 'Round of 32',
  'Son 16': 'Round of 16',
  'Çeyrek Final': 'Quarter Final',
  'Yarı Final': 'Semi Final',
  'Final': 'Final',
};

const GROUP_LABELS = ['Tümü', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

function formatDateTR(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/** Group matches by their TSİ viewing date (not the local venue date). */
function groupByTSIDate(matches: Match[]): Record<string, Match[]> {
  return matches.reduce((acc, m) => {
    const tsiDate = toTSIDate(m.date, m.timeET);
    if (!acc[tsiDate]) acc[tsiDate] = [];
    acc[tsiDate].push(m);
    return acc;
  }, {} as Record<string, Match[]>);
}

function MatchRow({ match }: { match: Match }) {
  const isLive = match.status === 'LIVE' || match.status === 'HT';

  return (
    <div
      className="flex items-center px-4 py-3.5 transition-all duration-200 hover:bg-white/5 rounded-lg"
      style={{
        borderLeft: isLive ? '3px solid #E63946' : '3px solid transparent',
        background: isLive ? 'rgba(230,57,70,0.04)' : 'transparent',
      }}
    >
      {/* Time */}
      <div className="w-16 flex-shrink-0 text-left">
        <div className="text-sm font-mono-custom font-semibold" style={{ color: '#C9A84C' }}>{toTSI(match.timeET)}</div>
        <div className="text-xs" style={{ color: '#8A8A9A' }}>TSİ</div>
      </div>

      {/* Group badge */}
      {match.group && (
        <div
          className="w-12 flex-shrink-0 text-center text-xs font-mono-custom font-bold mr-2 hidden sm:block"
          style={{ color: '#8A8A9A' }}
        >
          GRP {match.group}
        </div>
      )}

      {/* Home team */}
      <div className="flex-1 flex items-center justify-end gap-3 min-w-0">
        <span className="font-semibold text-sm truncate" style={{ color: '#F0F0F5' }}>
          {match.homeTeam.name}
        </span>
        <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={match.homeTeam.flag} alt={match.homeTeam.nameEn} fill className="object-cover" unoptimized />
        </div>
      </div>

      {/* Score / VS */}
      <div className="mx-4 flex-shrink-0 text-center" style={{ minWidth: '56px' }}>
        {match.status === 'NS' ? (
          <div
            className="font-display text-lg tracking-widest"
            style={{ color: '#2A2A3A' }}
          >
            vs
          </div>
        ) : match.status === 'LIVE' || match.status === 'HT' ? (
          <div>
            <div className="font-display text-xl" style={{ color: '#F0F0F5' }}>
              {match.homeScore ?? 0} <span style={{ color: '#2A2A3A' }}>-</span> {match.awayScore ?? 0}
            </div>
            <div className="badge-live" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
              {match.status === 'HT' ? 'HT' : `${match.minute ?? ''}'`}
            </div>
          </div>
        ) : (
          <div className="font-display text-xl" style={{ color: '#F0F0F5' }}>
            {match.homeScore} <span style={{ color: '#2A2A3A' }}>-</span> {match.awayScore}
          </div>
        )}
      </div>

      {/* Away team */}
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0 shadow-sm">
          <Image src={match.awayTeam.flag} alt={match.awayTeam.nameEn} fill className="object-cover" unoptimized />
        </div>
        <span className="font-semibold text-sm truncate" style={{ color: '#F0F0F5' }}>
          {match.awayTeam.name}
        </span>
      </div>

      {/* Venue */}
      <div className="hidden lg:flex flex-col items-end flex-shrink-0 ml-4" style={{ minWidth: '130px' }}>
        <span className="text-xs" style={{ color: '#8A8A9A' }}>{match.venue}</span>
        <span className="text-xs" style={{ color: '#8A8A9A', opacity: 0.7 }}>{match.city}</span>
      </div>
    </div>
  );
}

export default function FixturesPage() {
  const { locale } = useI18n();
  const [activeRound, setActiveRound] = useState<RoundLabel>('Tümü');
  const [activeGroup, setActiveGroup] = useState('Tümü');

  const filtered = useMemo(() => {
    return GROUP_MATCHES.filter(m => {
      const roundOk = activeRound === 'Tümü' || m.round === ROUND_MAP[activeRound];
      const groupOk = activeGroup === 'Tümü' || m.group === activeGroup;
      return roundOk && groupOk;
    });
  }, [activeRound, activeGroup]);

  const grouped = groupByTSIDate(filtered);
  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 font-mono-custom tracking-widest"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          11 HAZİRAN — 19 TEMMUZ 2026
        </div>
        <h1 className="font-display text-5xl md:text-6xl tracking-widest uppercase mb-2" style={{ color: '#F0F0F5' }}>
          MAÇ PROGRAMI
        </h1>
        <p style={{ color: '#8A8A9A' }}>72 grup maçı · 16 şehir · ABD, Kanada, Meksika</p>
      </div>

      {/* Round filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {ROUNDS.map(round => (
          <button
            key={round}
            onClick={() => setActiveRound(round)}
            className="text-sm px-4 py-2 rounded-lg border transition-all duration-200 font-medium"
            style={{
              background: activeRound === round ? '#C9A84C' : 'transparent',
              color: activeRound === round ? '#0A0A0F' : '#8A8A9A',
              borderColor: activeRound === round ? '#C9A84C' : '#2A2A3A',
            }}
          >
            {round}
          </button>
        ))}
      </div>

      {/* Group filter */}
      <div className="flex gap-1.5 flex-wrap mb-8">
        {GROUP_LABELS.map(g => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 font-mono-custom"
            style={{
              background: activeGroup === g ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeGroup === g ? '#C9A84C' : '#8A8A9A',
              borderColor: activeGroup === g ? 'rgba(201,168,76,0.5)' : '#2A2A3A',
            }}
          >
            {locale === 'en' ? (g === 'Tümü' ? 'All Groups' : `Group ${g}`) : (g === 'Tümü' ? 'Tüm Gruplar' : `Grup ${g}`)}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="mb-4 text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
        {filtered.length} maç gösteriliyor
      </div>

      {/* Match list */}
      {sortedDates.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#8A8A9A' }}>
          <div className="text-5xl mb-4">📅</div>
          <p className="font-semibold">Bu filtre için maç bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date, dateIndex) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1" style={{ background: '#2A2A3A' }} />
                <div
                  className="px-4 py-1.5 rounded-full font-mono-custom text-sm font-semibold"
                  style={{ background: '#1A1A24', border: '1px solid #2A2A3A', color: '#C9A84C' }}
                >
                  {formatDateTR(date)}
                </div>
                <div className="h-px flex-1" style={{ background: '#2A2A3A' }} />
              </div>

              {/* Matches for this date */}
              <div className="card divide-y" style={{ borderColor: '#2A2A3A' }}>
                {grouped[date].map((match, matchIndex) => (
                  <div key={match.id}>
                    <MatchRow match={match} />
                    {(matchIndex + 1) % 6 === 0 && matchIndex < grouped[date].length - 1 && (
                      <div className="px-4 py-2">
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {dateIndex === 2 && (
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
