'use client';
import { useI18n } from '@/lib/i18n';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GROUPS, GROUP_MATCHES } from '@/lib/api/mock-data';
import type { Group } from '@/lib/api/mock-data';
import { toTSI, toTSIDate } from '@/lib/utils/time';

function formatMatchDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

function GroupCard({ group, expanded, onToggle }: {
  group: Group;
  expanded: boolean;
  onToggle: () => void;
}) {
  const groupMatches = GROUP_MATCHES.filter(m => m.group === group.id);

  const qualStatus = (i: number) => {
    if (i < 2) return { dot: '#C9A84C', label: 'Gruptan çıkıyor', rowBg: 'rgba(201,168,76,0.06)', nameColor: '#F0F0F5' };
    if (i === 2) return { dot: '#8A8A9A', label: 'Play-off şansı', rowBg: 'transparent', nameColor: '#8A8A9A' };
    return { dot: '#E63946', label: 'Eleniyor', rowBg: 'rgba(230,57,70,0.04)', nameColor: '#8A8A9A' };
  };

  return (
    <div
      className="transition-all duration-200 rounded-xl overflow-hidden"
      style={{ background: '#1A1A24', border: expanded ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2A2A3A' }}
    >
      {/* Header */}
      <button
        className="w-full px-5 py-4 flex items-center justify-between text-left transition-all hover:bg-white/5"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div
            className="font-display text-4xl leading-none"
            style={{ color: expanded ? '#C9A84C' : '#F0F0F5', letterSpacing: '0.05em' }}
          >
            {group.id}
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>GRUP {group.id}</div>
            <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
              {group.teams.map(t => t.name).join(' · ')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Mini flags */}
          <div className="flex -space-x-1 hidden sm:flex">
            {group.teams.map(team => (
              <div key={team.id} className="relative w-6 h-4 rounded overflow-hidden ring-1 ring-background">
                <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <span
            className="text-xl transition-transform duration-300"
            style={{ color: '#8A8A9A', display: 'block', transform: expanded ? 'rotate(180deg)' : 'none' }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Standings table */}
      <div style={{ borderTop: '1px solid rgba(42,42,58,0.5)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
              <th className="text-left px-5 py-2 text-xs font-mono-custom uppercase tracking-wider" style={{ color: '#8A8A9A' }}>Takım</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>O</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>G</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>B</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>M</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>AG</th>
              <th className="px-2 py-2 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>A</th>
              <th className="px-3 py-2 text-center text-xs font-mono-custom font-bold" style={{ color: '#C9A84C' }}>P</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, i) => {
              const s = qualStatus(i);
              return (
                <tr
                  key={team.id}
                  style={{
                    background: s.rowBg,
                    borderTop: '1px solid rgba(42,42,58,0.3)',
                  }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: s.dot }} title={s.label} />
                      <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0 shadow-sm">
                        <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
                      </div>
                      <Link
                        href={`/teams/${team.slug}`}
                        className="font-medium text-sm hover:underline transition-colors"
                        style={{ color: s.nameColor }}
                      >
                        {team.name}
                      </Link>
                      {team.polymarketOdds && (
                        <span
                          className="text-xs font-mono-custom hidden md:inline"
                          style={{ color: '#8A8A9A', opacity: 0.7 }}
                        >
                          {team.polymarketOdds}%
                        </span>
                      )}
                    </div>
                  </td>
                  {[0, 0, 0, 0, 0, 0, 0].map((_, col) => (
                    <td key={col} className="px-2 py-3 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
                      {col === 6 ? <span className="font-display text-base" style={{ color: '#C9A84C' }}>0</span> : 0}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded group matches */}
      {expanded && (
        <div style={{ borderTop: '1px solid rgba(42,42,58,0.5)' }}>
          <div className="px-4 py-3" style={{ background: 'rgba(0,0,0,0.15)' }}>
            <h4 className="text-xs uppercase tracking-widest font-mono-custom mb-3" style={{ color: '#8A8A9A' }}>
              {locale === 'en' ? `Group Matches (${groupMatches.length})` : `Grup Maçları (${groupMatches.length} maç)`}
            </h4>
            <div className="space-y-2">
              {groupMatches.map(match => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: 'rgba(42,42,58,0.3)' }}
                >
                  {/* Date — shown in TSİ calendar day */}
                  <div className="text-xs font-mono-custom w-16 flex-shrink-0" style={{ color: '#8A8A9A' }}>
                    {formatMatchDate(toTSIDate(match.date, match.timeET))}
                    <br />
                    <span style={{ color: '#C9A84C' }}>{toTSI(match.timeET)} TSİ</span>
                  </div>

                  {/* Home team */}
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-xs font-medium truncate" style={{ color: '#F0F0F5' }}>{match.homeTeam.name}</span>
                    <div className="relative w-6 h-4 rounded overflow-hidden flex-shrink-0">
                      <Image src={match.homeTeam.flag} alt="" fill className="object-cover" unoptimized />
                    </div>
                  </div>

                  {/* Score / VS */}
                  <div className="mx-3 font-display text-base flex-shrink-0" style={{ color: '#C9A84C', minWidth: '28px', textAlign: 'center' }}>
                    {match.status === 'FT' ? `${match.homeScore}-${match.awayScore}` : 'vs'}
                  </div>

                  {/* Away team */}
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-6 h-4 rounded overflow-hidden flex-shrink-0">
                      <Image src={match.awayTeam.flag} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <span className="text-xs font-medium truncate" style={{ color: '#F0F0F5' }}>{match.awayTeam.name}</span>
                  </div>

                  {/* Venue */}
                  <div className="text-xs hidden lg:block text-right flex-shrink-0 ml-2" style={{ color: '#8A8A9A', maxWidth: '120px' }}>
                    {match.city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GroupsPage() {
  const { locale } = useI18n();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 font-mono-custom tracking-widest"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          FİFA 2026 · RESMİ KURA SONUÇLARI
        </div>
        <h1 className="font-display text-5xl md:text-6xl tracking-widest uppercase mb-2" style={{ color: '#F0F0F5' }}>
          GRUPLAR
        </h1>
        <p style={{ color: '#8A8A9A' }}>
          12 Grup · 48 Takım · Top 2 gruptan çıkıyor + 8 en iyi 3.'ler Son 32'ye geçiyor
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-8 flex-wrap text-xs">
        {[
          { color: '#C9A84C', label: 'Gruptan çıkıyor (İlk 2)' },
          { color: '#8A8A9A', label: 'Play-off şansı (3.)' },
          { color: '#E63946', label: 'Eleniyor (4.)' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
            <span style={{ color: '#8A8A9A' }}>{l.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <span className="font-mono-custom" style={{ color: '#8A8A9A' }}>%</span>
          <span style={{ color: '#8A8A9A' }}>Polymarket şampiyonluk olasılığı</span>
        </div>
      </div>

      {/* Groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {GROUPS.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            expanded={expandedGroup === group.id}
            onToggle={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
          />
        ))}
      </div>

      {/* Note about TBD */}
      <div
        className="mt-10 p-4 rounded-xl text-sm flex items-start gap-3"
        style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <span>ℹ️</span>
        <p style={{ color: '#8A8A9A' }}>
          Grup sıralamaları henüz 0-0 gösteriliyor çünkü turnuva <strong style={{ color: '#C9A84C' }}>11 Haziran 2026</strong>'da başlıyor.
          {locale === 'en' ? 'Real results will be updated here as matches are played.' : 'Maçlar başladıkça gerçek sonuçlar burada güncellenecek.'}
        </p>
      </div>
    </div>
  );
}
