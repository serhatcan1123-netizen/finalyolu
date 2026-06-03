'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { TEAMS } from '@/lib/api/mock-data';
import type { TournamentPrediction } from '@/lib/prediction/algorithm';
import type { PredictionScore } from '@/lib/prediction/algorithm';

interface ShareCardProps {
  prediction: TournamentPrediction;
  score: PredictionScore | null;
  onClose: () => void;
}

export default function ShareCard({ prediction, score, onClose }: ShareCardProps) {
  const { t, locale } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const champion = prediction.champion ? Object.values(TEAMS).find(t => t.slug === prediction.champion) : null;

  async function downloadCard() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'dk2026-tahminim.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  }

  async function copyCard() {
    if (!cardRef.current) return;
    try {
      const { toBlob } = await import('html-to-image');
      const blob = await toBlob(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }

  function shareOnTwitter() {
    const percentage = score?.percentage ?? 0;
    const text = t('share.tweet_text', { percentage });
    const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dk2026.com';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${url} #DK2026 #WorldCup2026`)}`;
    window.open(tweetUrl, '_blank');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-text-secondary hover:text-white transition-colors"
        >
          ✕ Kapat
        </button>

        {/* Share card (capturable) */}
        <div
          ref={cardRef}
          style={{
            background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A24 100%)',
            border: '2px solid #C9A84C',
            borderRadius: '16px',
            padding: '2rem',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '0.2em', color: '#C9A84C' }}>
              DK2026
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8A8A9A', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
              2026 FIFA WORLD CUP
            </div>
          </div>

          {/* Score (if available) */}
          {score && (
            <div className="text-center mb-6">
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '5rem', color: '#C9A84C', lineHeight: 1 }}>
                {score.percentage}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8A8A9A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {t('predict.accuracy')}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#F0F0F5', marginTop: '0.5rem' }}>
                {score.total} / {score.maxPossible} puan
              </div>
            </div>
          )}

          {/* Champion */}
          {champion && (
            <div
              className="text-center p-4 rounded-xl mb-4"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <div style={{ fontSize: '0.65rem', color: '#8A8A9A', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                {t('predict.champion_label')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={champion.flag} alt={champion.nameEn} style={{ width: '48px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#C9A84C', letterSpacing: '0.1em' }}>
                  {champion.name}
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {score && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              {[
                { label: 'Gruplar', value: `${Math.round(score.breakdown.groupPositions / 192 * 100)}%` },
                { label: 'Elemeler', value: `${Math.round((score.breakdown.roundOf32 + score.breakdown.roundOf16) / 256 * 100)}%` },
                { label: 'Şampiyon', value: score.breakdown.champion === 25 ? '✓' : '✗' },
              ].map(item => (
                <div key={item.label} style={{ textAlign: 'center', padding: '0.5rem', background: 'rgba(42,42,58,0.5)', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#C9A84C' }}>{item.value}</div>
                  <div style={{ fontSize: '0.6rem', color: '#8A8A9A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Watermark */}
          <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#2A2A3A', marginTop: '0.5rem' }}>
            dk2026.com
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={downloadCard}
            disabled={downloading}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            {downloading ? '...' : `⬇ ${t('share.download')}`}
          </button>
          <button
            onClick={copyCard}
            className="flex-1 btn-secondary text-sm py-2.5"
          >
            {copied ? t('share.copy_success') : '📋 Kopyala'}
          </button>
          <button
            onClick={shareOnTwitter}
            className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: '#1DA1F2', color: 'white' }}
          >
            𝕏
          </button>
        </div>
      </div>
    </div>
  );
}
