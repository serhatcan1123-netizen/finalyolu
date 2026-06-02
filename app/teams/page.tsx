'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { TEAMS } from '@/lib/api/mock-data';
import type { Team } from '@/lib/api/mock-data';

const CONFEDERATIONS = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'] as const;

const CONFEDERATION_COLORS: Record<string, string> = {
  UEFA: '#003399',
  CONMEBOL: '#006600',
  CONCACAF: '#CC0000',
  CAF: '#FF6600',
  AFC: '#003366',
  OFC: '#009999',
};

export default function TeamsPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [confFilter, setConfFilter] = useState<string>('All');

  const teams = Object.values(TEAMS);
  const filtered = teams.filter(team => {
    const matchSearch = team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.nameEn.toLowerCase().includes(search.toLowerCase());
    const matchConf = confFilter === 'All' || team.confederation === confFilter;
    return matchSearch && matchConf;
  }).sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase" style={{ color: '#F0F0F5' }}>
          {t('teams.title')}
        </h1>
        <p className="mt-2" style={{ color: '#8A8A9A' }}>{t('teams.subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder={t('teams.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
          style={{
            background: '#1A1A24',
            border: '1px solid #2A2A3A',
            color: '#F0F0F5',
          }}
          onFocus={e => { e.target.style.borderColor = '#C9A84C'; }}
          onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
        />
        <div className="flex gap-2 flex-wrap">
          {CONFEDERATIONS.map(conf => (
            <button
              key={conf}
              onClick={() => setConfFilter(conf)}
              className="text-xs px-3 py-1.5 rounded-lg border transition-all"
              style={{
                background: confFilter === conf ? '#C9A84C' : 'transparent',
                color: confFilter === conf ? '#0A0A0F' : '#8A8A9A',
                borderColor: confFilter === conf ? '#C9A84C' : '#2A2A3A',
                fontWeight: confFilter === conf ? 600 : 400,
              }}
            >
              {conf}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#8A8A9A' }}>
          <div className="text-4xl mb-4">🔍</div>
          <p>{t('teams.no_results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      <div className="mt-4 text-center text-xs" style={{ color: '#8A8A9A', fontFamily: 'JetBrains Mono, monospace' }}>
        {filtered.length} / {teams.length} takım
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.slug}`}>
      <div className="card-hover p-4 flex flex-col items-center text-center gap-2">
        <div className="relative w-12 h-8 rounded overflow-hidden">
          <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
        </div>
        <div>
          <div className="font-semibold text-xs leading-tight" style={{ color: '#F0F0F5' }}>{team.name}</div>
          <div
            className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block"
            style={{
              background: `${CONFEDERATION_COLORS[team.confederation]}22`,
              color: CONFEDERATION_COLORS[team.confederation],
              fontSize: '0.65rem',
            }}
          >
            {team.confederation}
          </div>
        </div>
        <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
          #{team.fifaRanking}
        </div>
      </div>
    </Link>
  );
}
