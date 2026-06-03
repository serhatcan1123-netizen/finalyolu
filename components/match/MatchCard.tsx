'use client';

import Image from 'next/image';
import type { Match } from '@/lib/api/mock-data';
import { toTSI } from '@/lib/utils/time';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  const isLive = match.status === 'LIVE' || match.status === 'HT';
  const isFinished = match.status === 'FT';

  return (
    <div
      className="transition-all duration-200 rounded-xl overflow-hidden"
      style={{
        background: '#1A1A24',
        border: isLive
          ? '1px solid rgba(230,57,70,0.5)'
          : '1px solid #2A2A3A',
        boxShadow: isLive ? '0 0 20px rgba(230,57,70,0.15)' : undefined,
      }}
    >
      {/* Match meta bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(42,42,58,0.5)' }}
      >
        <div className="flex items-center gap-2">
          {match.group && (
            <span
              className="text-xs font-mono-custom font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
            >
              GRP {match.group}
            </span>
          )}
          {!match.group && (
            <span className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{match.round}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-custom" style={{ color: '#C9A84C' }}>{toTSI(match.timeET)} TSİ</span>
          <StatusBadge status={match.status} minute={match.minute} />
        </div>
      </div>

      {/* Teams + score */}
      <div className={`flex items-center justify-between ${compact ? 'px-4 py-4' : 'px-5 py-5'} gap-3`}>
        <TeamSide team={match.homeTeam} align="left" />
        <ScoreOrVs match={match} />
        <TeamSide team={match.awayTeam} align="right" />
      </div>

      {/* Venue */}
      {!compact && (
        <div
          className="px-4 py-2 text-center text-xs"
          style={{ borderTop: '1px solid rgba(42,42,58,0.4)', color: '#8A8A9A' }}
        >
          📍 {match.venue}, {match.city}
        </div>
      )}
    </div>
  );
}

function TeamSide({ team, align }: { team: Match['homeTeam']; align: 'left' | 'right' }) {
  return (
    <div className={`flex items-center gap-2.5 flex-1 min-w-0 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      {/* Flag — use w80 source for crisp rendering */}
      <div className="relative w-10 h-7 rounded overflow-hidden flex-shrink-0 shadow-md">
        <Image
          src={team.flag}
          alt={team.nameEn}
          fill
          className="object-cover"
          unoptimized
          sizes="40px"
        />
      </div>
      <span
        className={`font-semibold text-sm truncate ${align === 'right' ? 'text-right' : 'text-left'}`}
        style={{ color: '#F0F0F5' }}
      >
        {team.name}
      </span>
    </div>
  );
}

function ScoreOrVs({ match }: { match: Match }) {
  if (match.status === 'NS') {
    return (
      <div className="flex-shrink-0 text-center" style={{ minWidth: '3.5rem' }}>
        <div className="font-display text-xl leading-none" style={{ color: '#2A2A3A' }}>vs</div>
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 text-center" style={{ minWidth: '3.5rem' }}>
      <div className="font-display text-2xl leading-none" style={{ color: '#F0F0F5' }}>
        {match.homeScore ?? 0}
        <span className="mx-1" style={{ color: '#2A2A3A' }}>-</span>
        {match.awayScore ?? 0}
      </div>
    </div>
  );
}

function StatusBadge({ status, minute }: { status: Match['status']; minute?: number }) {
  if (status === 'LIVE') {
    return (
      <span className="badge-live text-xs">
        {minute ? `${minute}'` : 'CANLI'}
      </span>
    );
  }
  if (status === 'HT') {
    return <span className="badge-live text-xs">Devre Arası</span>;
  }
  if (status === 'FT') {
    return <span className="badge-ft text-xs">MS</span>;
  }
  if (status === 'PST') {
    return <span className="badge-ft text-xs">ERTELENDİ</span>;
  }
  return null;
}
