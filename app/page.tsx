'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import Countdown from '@/components/ui/Countdown';
import MatchCard from '@/components/match/MatchCard';
import GroupTable from '@/components/match/GroupTable';
import AdBanner from '@/components/layout/AdBanner';
import PolymarketOdds from '@/components/ui/PolymarketOdds';
import { GROUP_MATCHES, GROUPS, TOP_SCORERS } from '@/lib/api/mock-data';

export default function HomePage() {
  const { t } = useI18n();
  // Show first 6 group stage matches (opening week)
  const upcomingMatches = GROUP_MATCHES.slice(0, 6);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.13) 0%, transparent 70%),
            radial-gradient(circle at 15% 85%, rgba(230,57,70,0.06) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)
          `,
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Trophy */}
          <div className="mb-6">
            <span style={{ fontSize: '5rem', display: 'block', filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.5))' }}>🏆</span>
          </div>

          {/* Pre-title */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs tracking-widest uppercase font-mono-custom"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          >
            🌎 {t('home.host_countries')}
          </div>

          {/* Main title */}
          <h1
            className="font-display uppercase leading-none mb-3"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 6rem)', letterSpacing: '0.06em', color: '#F0F0F5' }}
          >
            {t('home.hero_title')}
          </h1>

          <p className="text-lg md:text-xl mb-10" style={{ color: '#8A8A9A', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            {t('home.hero_subtitle')}
          </p>

          {/* Countdown */}
          <div className="mb-10">
            <p
              className="text-xs uppercase tracking-widest mb-5 font-mono-custom"
              style={{ color: '#8A8A9A' }}
            >
              {t('home.countdown_title')}
            </p>
            <Countdown />
          </div>

          {/* CTA */}
          <Link
            href="/predict"
            className="btn-primary font-display tracking-widest inline-flex items-center gap-2"
            style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', borderRadius: '0.75rem' }}
          >
            ⚽ {t('home.cta_predict')}
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ borderTop: '1px solid rgba(42,42,58,0.6)', background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(8px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-8 md:gap-20 flex-wrap">
            {[
              { value: '48', label: t('home.teams_count') },
              { value: '104', label: t('home.matches_count') },
              { value: '12', label: t('home.groups_count') },
              { value: '16', label: 'Şehir' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl leading-none" style={{ color: '#C9A84C' }}>{stat.value}</div>
                <div className="text-xs mt-1 uppercase tracking-widest" style={{ color: '#8A8A9A', fontFamily: 'JetBrains Mono, monospace' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad below hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <AdBanner slot="1234567890" format="leaderboard" />
      </div>

      {/* ── UPCOMING MATCHES ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase" style={{ color: '#F0F0F5' }}>
              {t('home.upcoming_matches')}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8A8A9A' }}>
              11 Haziran 2026 — Grup Aşaması başlıyor
            </p>
          </div>
          <Link href="/fixtures" className="text-sm font-medium transition-colors hover:underline flex items-center gap-1" style={{ color: '#C9A84C' }}>
            {t('home.view_all')} <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* ── POLYMARKET + GROUP PREVIEW (side by side on desktop) ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Polymarket odds */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase mb-6" style={{ color: '#F0F0F5' }}>
              Şampiyonluk Oranları
            </h2>
            <PolymarketOdds />
          </div>

          {/* Top scorers */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase mb-6" style={{ color: '#F0F0F5' }}>
              {t('home.top_scorers')}
            </h2>
            <div className="card overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
                  Turnuva başlamadı — beklenen favori golcüler
                </p>
              </div>
              {TOP_SCORERS.map((scorer, i) => (
                <div
                  key={scorer.player}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{ borderBottom: i < TOP_SCORERS.length - 1 ? '1px solid rgba(42,42,58,0.5)' : 'none' }}
                >
                  <span className="font-display text-2xl w-8 text-center flex-shrink-0" style={{ color: '#C9A84C' }}>{i + 1}</span>
                  <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                    <Image src={scorer.team.flag} alt={scorer.team.nameEn} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>{scorer.player}</div>
                    <div className="text-xs" style={{ color: '#8A8A9A' }}>{scorer.team.name}</div>
                  </div>
                  <div className="flex items-center gap-6 text-right flex-shrink-0">
                    <div>
                      <div className="font-display text-xl leading-none" style={{ color: '#C9A84C' }}>—</div>
                      <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>GOL</div>
                    </div>
                    <div>
                      <div className="font-display text-xl leading-none" style={{ color: '#8A8A9A' }}>—</div>
                      <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>ASİST</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <AdBanner slot="0987654321" format="responsive" />
      </div>

      {/* ── GROUP STANDINGS PREVIEW ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl tracking-widest uppercase" style={{ color: '#F0F0F5' }}>
              {t('home.group_standings')}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8A8A9A' }}>12 grup · 48 takım · Turnuva öncesi sıralama</p>
          </div>
          <Link href="/groups" className="text-sm font-medium transition-colors hover:underline flex items-center gap-1" style={{ color: '#C9A84C' }}>
            {t('home.view_all')} <span>→</span>
          </Link>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
            {GROUPS.slice(0, 6).map(group => (
              <div key={group.id} style={{ width: '220px', flexShrink: 0 }}>
                <GroupTable group={group} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREDICT PROMO ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div
          className="relative rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(26,26,36,1) 55%)',
            border: '1px solid rgba(201,168,76,0.35)',
          }}
        >
          {/* Decorative */}
          <div className="absolute -right-8 -top-8 text-[200px] opacity-[0.04] select-none pointer-events-none" style={{ lineHeight: 1 }}>🏆</div>
          <div className="absolute right-32 bottom-0 text-[120px] opacity-[0.04] select-none pointer-events-none" style={{ lineHeight: 1 }}>⚽</div>

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 font-mono-custom tracking-widest"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
            >
              YENİ · TAHMİN MOTORU
            </div>
            <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase mb-3" style={{ color: '#C9A84C' }}>
              {t('home.predict_promo_title')}
            </h2>
            <p className="text-base md:text-lg max-w-md" style={{ color: '#8A8A9A' }}>
              {t('home.predict_promo_desc')}
            </p>
          </div>
          <Link
            href="/predict"
            className="btn-primary font-display tracking-widest flex-shrink-0"
            style={{ fontSize: '1.2rem', padding: '1rem 2.5rem', borderRadius: '0.75rem' }}
          >
            {t('home.predict_promo_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
