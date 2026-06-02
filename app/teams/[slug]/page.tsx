'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TEAMS, SQUADS, GROUP_MATCHES, GROUPS, POLYMARKET_ODDS } from '@/lib/api/mock-data';
import { toTSI, toTSIDate } from '@/lib/utils/time';

const POSITION_LABELS: Record<string, string> = {
  GK: '🧤 Kaleciler',
  DEF: '🛡️ Defanslar',
  MID: '⚙️ Orta Sahalar',
  FWD: '⚡ Forvetsler',
};

const POSITION_ORDER = ['GK', 'DEF', 'MID', 'FWD'] as const;

export default function TeamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<'squad' | 'matches' | 'stats'>('squad');

  const team = Object.values(TEAMS).find(t => t.slug === slug);
  if (!team) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="font-semibold text-lg mb-4" style={{ color: '#F0F0F5' }}>Takım bulunamadı</p>
        <Link href="/teams" className="btn-secondary inline-flex">← Tüm Takımlar</Link>
      </div>
    );
  }

  const squad = SQUADS[slug] || [];
  const teamMatches = GROUP_MATCHES.filter(m => m.homeTeam.id === team.id || m.awayTeam.id === team.id);
  const group = GROUPS.find(g => g.teams.some(t => t.id === team.id));
  const oddsEntry = POLYMARKET_ODDS.find(o => o.team.id === team.id);

  const TABS = [
    { id: 'squad', label: `Kadro${squad.length > 0 ? ` (${squad.length})` : ''}` },
    { id: 'matches', label: `Maçlar (${teamMatches.length})` },
    { id: 'stats', label: 'İstatistikler' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href="/teams"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-white"
        style={{ color: '#8A8A9A' }}
      >
        ← Tüm Takımlar
      </Link>

      {/* Hero header */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 p-8 md:p-10"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(26,26,36,1) 60%)',
          border: '1px solid rgba(201,168,76,0.25)',
        }}
      >
        {/* BG flag watermark */}
        <div
          className="absolute right-0 top-0 bottom-0 w-48 md:w-64 opacity-10 pointer-events-none"
          style={{ background: `url(${team.flag}) center/cover no-repeat`, filter: 'blur(8px)' }}
        />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Flag */}
          <div
            className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-gold"
            style={{ width: '120px', height: '80px' }}
          >
            <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-2">
              {group && (
                <span
                  className="text-xs font-mono-custom px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  GRUP {group.id}
                </span>
              )}
              <span
                className="text-xs font-mono-custom px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(42,42,58,0.8)', color: '#8A8A9A', border: '1px solid #2A2A3A' }}
              >
                {team.confederation}
              </span>
            </div>

            <h1
              className="font-display uppercase tracking-widest leading-none mb-1"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#F0F0F5' }}
            >
              {team.nameEn}
            </h1>
            <p className="text-lg" style={{ color: '#C9A84C' }}>{team.nameTr}</p>

            {/* Key stats */}
            <div className="flex gap-6 mt-4 flex-wrap justify-center md:justify-start">
              <div>
                <div className="font-display text-2xl leading-none" style={{ color: '#C9A84C' }}>#{team.fifaRanking}</div>
                <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>FIFA Sıralama</div>
              </div>
              {oddsEntry && (
                <div>
                  <div className="font-display text-2xl leading-none" style={{ color: '#C9A84C' }}>{oddsEntry.probability}%</div>
                  <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>Şampiyonluk (Polymarket)</div>
                </div>
              )}
              {squad.length > 0 && (
                <div>
                  <div className="font-display text-2xl leading-none" style={{ color: '#C9A84C' }}>{squad.length}</div>
                  <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>Kadro Oyuncusu</div>
                </div>
              )}
              <div>
                <div className="font-display text-2xl leading-none" style={{ color: '#C9A84C' }}>{teamMatches.length}</div>
                <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>Grup Maçı</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8" style={{ borderColor: '#2A2A3A' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px"
            style={{
              color: activeTab === tab.id ? '#C9A84C' : '#8A8A9A',
              borderColor: activeTab === tab.id ? '#C9A84C' : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SQUAD TAB */}
      {activeTab === 'squad' && (
        <div>
          {squad.length === 0 ? (
            <div
              className="text-center py-16 rounded-xl"
              style={{ background: '#1A1A24', border: '1px dashed #2A2A3A' }}
            >
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold mb-1" style={{ color: '#F0F0F5' }}>Kadro bilgisi henüz eklenmedi</p>
              <p className="text-sm" style={{ color: '#8A8A9A' }}>Bu takımın kadrosu yakında güncellenecek.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {POSITION_ORDER.map(pos => {
                const players = squad.filter(p => p.position === pos);
                if (players.length === 0) return null;
                return (
                  <div key={pos}>
                    <h3 className="font-display text-xl tracking-widest uppercase mb-4" style={{ color: '#C9A84C' }}>
                      {POSITION_LABELS[pos]}
                    </h3>
                    <div className="card overflow-hidden">
                      {/* Table header */}
                      <div
                        className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider"
                        style={{ background: 'rgba(0,0,0,0.3)', color: '#8A8A9A', borderBottom: '1px solid #2A2A3A' }}
                      >
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">Oyuncu</div>
                        <div className="col-span-3">Kulüp</div>
                        <div className="col-span-1 text-center">Yaş</div>
                        <div className="col-span-1 text-center">Maç</div>
                        <div className="col-span-2 text-center">Gol</div>
                      </div>
                      {players.map((player, i) => (
                        <div
                          key={player.name}
                          className="flex md:grid md:grid-cols-12 items-center gap-2 px-4 py-3 transition-colors hover:bg-white/5"
                          style={{ borderTop: i > 0 ? '1px solid rgba(42,42,58,0.4)' : 'none' }}
                        >
                          <div className="text-xs font-mono-custom w-6 md:col-span-1 flex-shrink-0 text-right md:text-left" style={{ color: '#8A8A9A' }}>
                            {i + 1}
                          </div>
                          <div className="flex-1 md:col-span-4">
                            <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>{player.name}</div>
                            <div className="text-xs md:hidden" style={{ color: '#8A8A9A' }}>{player.club}</div>
                          </div>
                          <div className="hidden md:block md:col-span-3 text-sm" style={{ color: '#8A8A9A' }}>{player.club}</div>
                          <div className="hidden md:block md:col-span-1 text-center text-sm font-mono-custom" style={{ color: '#8A8A9A' }}>{player.age}</div>
                          <div className="hidden md:block md:col-span-1 text-center text-sm font-mono-custom" style={{ color: '#F0F0F5' }}>{player.caps}</div>
                          <div className="md:col-span-2 text-right md:text-center">
                            <span className="font-display text-xl" style={{ color: player.goals > 0 ? '#C9A84C' : '#8A8A9A' }}>
                              {player.goals}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MATCHES TAB */}
      {activeTab === 'matches' && (
        <div className="space-y-3">
          {teamMatches.length === 0 ? (
            <p style={{ color: '#8A8A9A' }}>Henüz maç bilgisi yok.</p>
          ) : (
            teamMatches.map(match => {
              const isHome = match.homeTeam.id === team.id;
              const opponent = isHome ? match.awayTeam : match.homeTeam;
              const tsiDate = toTSIDate(match.date, match.timeET);
              const d = new Date(tsiDate + 'T12:00:00');
              return (
                <div
                  key={match.id}
                  className="card p-4 flex items-center gap-4"
                >
                  <div className="text-xs font-mono-custom flex-shrink-0" style={{ color: '#8A8A9A', minWidth: '80px' }}>
                    {d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                    <br />
                    <span style={{ color: '#C9A84C' }}>{toTSI(match.timeET)} TSİ</span>
                  </div>
                  <div className="text-xs font-mono-custom flex-shrink-0" style={{ color: '#8A8A9A' }}>
                    {isHome ? 'EV' : 'DEP'}
                  </div>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                      <Image src={opponent.flag} alt={opponent.nameEn} fill className="object-cover" unoptimized />
                    </div>
                    <span className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>{opponent.name}</span>
                  </div>
                  <div className="font-display text-xl flex-shrink-0" style={{ color: '#C9A84C' }}>
                    {match.status === 'FT'
                      ? `${isHome ? match.homeScore : match.awayScore} - ${isHome ? match.awayScore : match.homeScore}`
                      : 'vs'}
                  </div>
                  <div className="text-xs flex-shrink-0 text-right hidden sm:block" style={{ color: '#8A8A9A', maxWidth: '110px' }}>
                    {match.city}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* STATS TAB */}
      {activeTab === 'stats' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Atılan Gol', value: '—' },
              { label: 'Yenilen Gol', value: '—' },
              { label: 'Şut / Maç', value: '—' },
              { label: 'Top Hakimiyeti', value: '—' },
            ].map(stat => (
              <div key={stat.label} className="card p-6 text-center">
                <div className="font-display text-4xl mb-2" style={{ color: '#C9A84C' }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-widest font-mono-custom" style={{ color: '#8A8A9A' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div
            className="p-5 rounded-xl text-sm"
            style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <p style={{ color: '#8A8A9A' }}>
              ℹ️ İstatistikler turnuva başladığında (11 Haziran 2026) güncellenecek.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
