'use client';
import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import Countdown from '@/components/ui/Countdown';
import MatchCard from '@/components/match/MatchCard';
import GroupTable from '@/components/match/GroupTable';
import PolymarketOdds from '@/components/ui/PolymarketOdds';
import SeoFaq from '@/components/ui/SeoFaq';
import { GROUP_MATCHES, GROUPS, TOP_SCORERS } from '@/lib/api/mock-data';

const C = {
  red:   '#C8102E',
  green: '#009A44',
  blue:  '#003DA5',
  gold:  '#C9A84C',
} as const;

type CKey = keyof typeof C;
const CKEYS: CKey[] = ['red', 'green', 'blue', 'gold'];

const easeOut = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easeOut },
  };
}

/* ── Ribbon components ─────────────────────────────────────────────────── */

function RibbonStrip({ h = 5 }: { h?: number }) {
  return (
    <div className="w-full flex" style={{ height: h }}>
      {CKEYS.map(k => <div key={k} className="flex-1" style={{ background: C[k] }} />)}
    </div>
  );
}

function RibbonDots() {
  return (
    <div className="flex items-center gap-1">
      {CKEYS.map(k => <div key={k} style={{ width: 16, height: 4, background: C[k] }} />)}
    </div>
  );
}

/* SVG cross-weave — 4 diagonal bands (2 going \, 2 going /) */
function RibbonWeave() {
  return (
    <svg viewBox="0 0 560 560" width="560" height="560" aria-hidden="true">
      {/* Bands going \ (top-left → bottom-right) */}
      <path d="M-20,0 L75,0 L540,560 L445,560 Z"  fill={C.red}   />
      <path d="M130,0 L225,0 L690,560 L595,560 Z"  fill={C.green} />
      {/* Bands going / (top-right → bottom-left) */}
      <path d="M485,0 L580,0 L115,560 L20,560 Z"   fill={C.blue}  />
      <path d="M335,0 L430,0 L-35,560 L-130,560 Z" fill={C.gold}  />
      {/* Weave: red crosses OVER blue — re-draw red clipped to the / region */}
      <defs>
        <clipPath id="blue-region">
          <path d="M485,0 L580,0 L115,560 L20,560 Z" />
        </clipPath>
        <clipPath id="gold-region">
          <path d="M335,0 L430,0 L-35,560 L-130,560 Z" />
        </clipPath>
      </defs>
      <path d="M130,0 L225,0 L690,560 L595,560 Z" fill={C.green} clipPath="url(#blue-region)" />
      <path d="M-20,0 L75,0 L540,560 L445,560 Z"  fill={C.red}   clipPath="url(#gold-region)" />
    </svg>
  );
}

/* ── Section header ────────────────────────────────────────────────────── */

function SectionHead({
  mono, title, href, linkText,
}: {
  mono: string; title: string; href?: string; linkText?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <RibbonDots />
          <span className="text-xs tracking-[0.25em] uppercase font-mono-custom ml-1" style={{ color: '#555566' }}>
            {mono}
          </span>
        </div>
        <h2
          className="font-display uppercase leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', letterSpacing: '0.03em' }}
        >
          {title}
        </h2>
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="text-sm font-medium flex items-center gap-1.5 pb-1 transition-opacity hover:opacity-70"
          style={{ color: C.gold }}
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                   */
/* ═══════════════════════════════════════════════════════════════════════ */

const FACTS = [
  "Meksika, Dünya Kupası tarihinin en çok kaybeden takımı — 28 mağlubiyet.",
  "Just Fontaine, tek bir Dünya Kupası'nda 13 gol attı. Bu rekor 68 yıldır kırılmadı.",
  "Hakan Şükür, 2002'de Güney Kore'ye karşı 11. saniyede gol attı — Dünya Kupası'nın en hızlı golü.",
  "Miroslav Klose, 16 golle Dünya Kupası'nın tüm zamanların en golcüsü — Ronaldo veya Messi değil.",
  "Pelé ilk Dünya Kupası golünü 17 yaşında attı. Hâlâ en genç finalist rekoru elinde.",
  "1950 Dünya Kupası'nda final maçı yoktu — Brezilya son grup maçında Uruguay'a kaybedince şampiyonluğu kaptırdı.",
  "Kuzey Kore 1966'da İtalya'yı 1-0 yenerek çeyrek finale çıktı. Bir daha hiç Dünya Kupası'na katılamadı.",
  "2026 Dünya Kupası'nda 104 maç oynanacak — tüm önceki turnuvaların rekorunu kırıyor.",
]

function FactTicker() {
  const [idx, setIdx] = React.useState(0)
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % FACTS.length)
        setVisible(true)
      }, 400)
    }, 8000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{
      borderTop: '1px solid #1A1A24',
      borderBottom: '1px solid #1A1A24',
      background: '#0D0D14',
      padding: '14px 0',
      overflow: 'hidden',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#C8102E',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>BİLİYOR MUYDUN</span>
        <span style={{ color: '#2A2A3A', flexShrink: 0 }}>·</span>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.85rem',
          color: '#6A6A7A',
          transition: 'opacity 0.4s',
          opacity: visible ? 1 : 0,
          margin: 0,
        }}>
          {FACTS[idx]}
        </p>
      </div>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { step: "01", title: "TAHMİN ET", desc: "Tüm turnuvayı tahmin et — gruplardan finale kadar", icon: "⚽", href: "/predict" },
    { step: "02", title: "SIRALAMAYA GİR", desc: "Nicknameni gir, global sıralamada yerini al", icon: "🏆", href: "/leaderboard" },
    { step: "03", title: "KAZAN", desc: "Turnuva boyunca puan topla, ilk 3'e gir", icon: "🎯", href: "/leaderboard" },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: '#1A1A24', border: '1px solid #1A1A24', borderRadius: '16px', overflow: 'hidden' }}>
        {steps.map((s, i) => (
          <a key={i} href={s.href} style={{ textDecoration: 'none', display: 'block', background: '#0D0D14', padding: '32px 28px', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#111118')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0D0D14')}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8102E' }}>{s.step}</span>
              <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>{s.icon}</span>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#F0F0F5', marginBottom: '8px' }}>{s.title}</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#4A4A5A', lineHeight: 1.6 }}>{s.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { t, locale } = useI18n();
  const upcomingMatches = GROUP_MATCHES.slice(0, 6);

  const stats = [
    { value: '48',  label: t('home.teams_count'),  color: C.red   },
    { value: '104', label: t('home.matches_count'), color: C.blue  },
    { value: '12',  label: t('home.groups_count'),  color: C.green },
    { value: '16',  label: 'Şehir',                 color: C.gold  },
  ];

  return (
    <div style={{ background: '#000', color: '#F0F0F5' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden">

        {/* SVG ribbon weave — top-right decorative */}
        <div
          className="absolute top-0 right-0 pointer-events-none select-none"
          style={{ opacity: 0.13, transform: 'translate(60px, -40px)' }}
        >
          <RibbonWeave />
        </div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.025,
          }}
        />

        {/* Main hero content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-28 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-center">

            {/* Left: typography block */}
            <div>
              <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
                <RibbonDots />
                <span className="text-xs tracking-[0.3em] uppercase font-mono-custom ml-1" style={{ color: '#555566' }}>
                  🌎 {t('home.host_countries')}
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp(0.08)}
                className="font-display uppercase"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 13rem)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.015em',
                  color: '#fff',
                }}
              >
                {t('home.hero_title')}
              </motion.h1>

              <motion.p
                {...fadeUp(0.18)}
                className="mt-5 text-lg max-w-lg"
                style={{ color: '#8A8A9A', lineHeight: 1.6, letterSpacing: '0.05em', fontSize: '1rem' }}
              >
                {t('home.hero_subtitle')}
              </motion.p>

              <motion.div {...fadeUp(0.27)} className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/predict"
                  className="font-display tracking-[0.12em] uppercase inline-flex items-center gap-2 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                  style={{
                    background: C.red,
                    color: '#fff',
                    fontSize: '1.05rem',
                    padding: '0.9rem 2.4rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  ⚽ {t('home.cta_predict')}
                </Link>
                <Link
                  href="/fixtures"
                  className="font-display tracking-[0.1em] uppercase inline-flex items-center gap-2 transition-all duration-200 hover:border-white/30"
                  style={{
                    background: 'transparent',
                    color: '#F0F0F5',
                    fontSize: '1.05rem',
                    padding: '0.9rem 2.4rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  MAÇ TAKVİMİ <span style={{ color: C.gold }}>→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right: countdown panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: easeOut }}
              className="hidden lg:flex flex-col items-end justify-center"
            >
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#F0F0F5',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                {t('home.countdown_title')}
              </p>
              <Countdown />
            </motion.div>
          </div>
        </div>

        {/* Bento stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="relative z-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="py-5 text-center"
                style={{
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderTop: `3px solid ${s.color}`,
                }}
              >
                <div
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: s.color }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs mt-2 uppercase tracking-widest font-mono-custom"
                  style={{ color: '#555566' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Ribbon divider */}
      <RibbonStrip />


      {/* Bilgi Ticker */}
      <FactTicker />

      {/* ── UPCOMING MATCHES ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHead
            mono="Fikstür"
            title={t('home.upcoming_matches')}
            href="/fixtures"
            linkText={t('home.view_all')}
          />
        </motion.div>
        <p className="text-xs -mt-5 mb-8 font-mono-custom" style={{ color: '#555566' }}>
          11 Haziran 2026 — Grup Aşaması başlıyor
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMatches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
            >
              <MatchCard match={match} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── POLYMARKET + TOP SCORERS ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHead
              mono="Piyasa"
              title={locale === 'en' ? 'Championship Odds' : 'Şampiyonluk Oranları'}
            />
            <PolymarketOdds />
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionHead mono="İstatistik" title={t('home.top_scorers')} />
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: `3px solid ${C.gold}`,
              }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-xs font-mono-custom" style={{ color: '#555566' }}>
                  Turnuva başlamadı — beklenen favori golcüler
                </p>
              </div>
              {TOP_SCORERS.map((scorer, i) => (
                <motion.div
                  key={scorer.player}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{
                    borderBottom:
                      i < TOP_SCORERS.length - 1
                        ? '1px solid rgba(255,255,255,0.04)'
                        : 'none',
                  }}
                >
                  <span
                    className="font-display text-2xl w-8 text-center flex-shrink-0"
                    style={{ color: C.gold }}
                  >
                    {i + 1}
                  </span>
                  <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={scorer.team.flag}
                      alt={scorer.team.nameEn}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>
                      {scorer.player}
                    </div>
                    <div className="text-xs" style={{ color: '#555566' }}>
                      {scorer.team.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right flex-shrink-0">
                    <div>
                      <div className="font-display text-xl leading-none" style={{ color: C.gold }}>—</div>
                      <div className="text-xs font-mono-custom" style={{ color: '#555566' }}>GOL</div>
                    </div>
                    <div>
                      <div className="font-display text-xl leading-none" style={{ color: '#555566' }}>—</div>
                      <div className="text-xs font-mono-custom" style={{ color: '#555566' }}>ASİST</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* TAHMİN ET - SIRALAMAYA GİR - KAZAN */}
      <HowItWorks />

      {/* Ribbon divider */}
      <RibbonStrip h={4} />

      {/* ── GROUP STANDINGS ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHead
            mono="Gruplar"
            title={t('home.group_standings')}
            href="/groups"
            linkText={t('home.view_all')}
          />
        </motion.div>
        <p className="text-xs -mt-5 mb-8 font-mono-custom" style={{ color: '#555566' }}>
          12 grup · 48 takım · Turnuva öncesi sıralama
        </p>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
            {GROUPS.slice(0, 6).map((group, i) => (
              <motion.div
                key={group.id}
                style={{ width: '220px', flexShrink: 0 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GroupTable group={group} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SeoFaq />

      {/* ── PREDICT CTA ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden"
          style={{ background: C.red }}
        >
          {/* Ribbon stripe overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 900 280"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full"
            >
              <path d="M-30,0 L60,0 L520,280 L430,280 Z"   fill="#fff" opacity="0.05" />
              <path d="M110,0 L200,0 L660,280 L570,280 Z"  fill="#fff" opacity="0.05" />
              <path d="M640,0 L730,0 L270,280 L180,280 Z"  fill="#fff" opacity="0.05" />
              <path d="M780,0 L870,0 L410,280 L320,280 Z"  fill="#fff" opacity="0.05" />
            </svg>
          </div>

          {/* Gold left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: 6,
              background: `linear-gradient(to bottom, ${C.gold}, ${C.green}, ${C.blue})`,
            }}
          />

          <div className="relative z-10 pl-10 pr-8 md:pl-14 md:pr-12 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono-custom tracking-[0.2em] uppercase"
                style={{ background: 'rgba(0,0,0,0.18)', color: 'rgba(255,255,255,0.75)' }}
              >
                YENİ · TAHMİN MOTORU
              </div>
              <h2
                className="font-display uppercase leading-none"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                {t('home.predict_promo_title')}
              </h2>
              <p className="mt-3 text-base max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {t('home.predict_promo_desc')}
              </p>
            </div>
            <Link
              href="/predict"
              className="font-display tracking-[0.12em] uppercase inline-flex items-center gap-2 flex-shrink-0 transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
              style={{
                background: '#000',
                color: '#fff',
                fontSize: '1.05rem',
                padding: '1rem 2.6rem',
                whiteSpace: 'nowrap',
              }}
            >
              {t('home.predict_promo_cta')}
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
