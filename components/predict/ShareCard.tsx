'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { TEAMS } from '@/lib/api/mock-data';
import type { TournamentPrediction, PredictionScore } from '@/lib/prediction/algorithm';

interface ShareCardProps {
  prediction: TournamentPrediction;
  score: PredictionScore | null;
  onClose: () => void;
}

export default function ShareCard({ prediction, score, onClose }: ShareCardProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const champion = prediction.champion
    ? Object.values(TEAMS).find(tm => tm.slug === prediction.champion)
    : null;

  async function downloadCard() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { quality: 0.98, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'finalyolu-tahminim.png';
      link.href = dataUrl;
      link.click();
    } catch (e) { console.error(e); }
    setDownloading(false);
  }

  async function copyCard() {
    if (!cardRef.current) return;
    try {
      const { toBlob } = await import('html-to-image');
      const blob = await toBlob(cardRef.current, { quality: 0.98, pixelRatio: 2 });
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }

  function shareOnTwitter() {
    const text = `2026 Dünya Kupası tahminim hazır! 🏆 Şampiyonum: ${champion?.name ?? '?'}\nSen de tahminini yap:`;
    const url = 'https://finalyolu.com/predict';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=FinalYolu,WorldCup2026`, '_blank');
  }

  function shareOnWhatsApp() {
    const text = `2026 Dünya Kupası tahminim hazır! 🏆 Şampiyonum: ${champion?.name ?? '?'}\nSen de tahminini yap: https://finalyolu.com/predict`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  const groupSummary = prediction.groups
    ? Object.entries(prediction.groups).slice(0, 12).map(([gId, gPred]) => {
        const slugs = gPred.teamOrder.slice(0, 2);
        const teams = slugs.map(s => Object.values(TEAMS).find(tm => tm.slug === s)).filter(Boolean) as (typeof TEAMS)[string][];
        return { groupId: gId, teams };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)' }}>
      <div className="relative w-full" style={{ maxWidth: '360px' }}>
        <button onClick={onClose}
          style={{ position: 'absolute', top: '-2rem', right: 0, color: '#666', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ✕ Kapat
        </button>

        <div ref={cardRef} style={{
          width: '100%', aspectRatio: '9/16',
          background: '#0A0A0F', borderRadius: '16px', overflow: 'hidden',
          position: 'relative', fontFamily: 'DM Sans, sans-serif',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #1a0a2e 0%, #2d1b00 40%, #0a1a0e 100%)',
            padding: '1.5rem 1.5rem 2rem', position: 'relative', flex: '0 0 auto',
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(100,200,100,0.08)', filter: 'blur(30px)' }} />
            <div style={{ fontSize: '0.55rem', color: 'rgba(201,168,76,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              finalyolu.com
            </div>
            {champion ? (
              <div style={{ marginBottom: '1rem' }}>
                <img src={champion.flag} alt={champion.nameEn}
                  style={{ width: '120px', height: '80px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.3)', display: 'block' }} />
              </div>
            ) : (
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            )}
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '0.02em', marginBottom: '0.25rem' }}>
              {champion?.name.toUpperCase() ?? 'TAHMİNİM'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
              {champion ? `ŞAMPİYON TAHMİNİM · FIFA #${champion.fifaRanking}` : '2026 DÜNYA KUPASI TAHMİNİM'}
            </div>
          </div>

          <div style={{ background: '#0A0A0F', padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {score && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>Doğruluk Oranı</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem', color: '#C9A84C', lineHeight: 1 }}>{score.percentage}%</div>
                <div style={{ fontSize: '0.65rem', color: '#666' }}>{score.total} / {score.maxPossible} puan</div>
              </div>
            )}

            {groupSummary.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>Grup Tahminlerim</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1.5rem' }}>
                  {groupSummary.map(({ groupId, teams }) => (
                    <div key={groupId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#C9A84C', minWidth: '1.2rem' }}>{groupId}</div>
                      <div>
                        {teams.slice(0, 2).map((tm, i) => (
                          <div key={tm.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <img src={tm.flag} alt="" style={{ width: '16px', height: '11px', borderRadius: '1px', objectFit: 'cover' }} />
                            <span style={{ fontSize: '0.6rem', color: i === 0 ? '#F0F0F5' : '#8A8A9A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>{tm.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #1A1A24' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: '#C9A84C', letterSpacing: '0.15em' }}>FINAL YOLU</div>
              <div style={{ fontSize: '0.55rem', color: '#333', letterSpacing: '0.1em' }}>FINALYOLU.COM</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button onClick={downloadCard} disabled={downloading}
            style={{ background: '#C9A84C', color: '#0A0A0F', border: 'none', borderRadius: '10px', padding: '0.65rem', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
            {downloading ? '...' : '⬇ İndir'}
          </button>
          <button onClick={copyCard}
            style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', padding: '0.65rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            {copied ? '✓ Kopyalandı' : '📋 Kopyala'}
          </button>
          <button onClick={shareOnWhatsApp}
            style={{ background: '#25D366', color: 'white', border: 'none', borderRadius: '10px', padding: '0.65rem', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
            💬 WhatsApp
          </button>
          <button onClick={shareOnTwitter}
            style={{ background: '#000', color: 'white', border: '1px solid #222', borderRadius: '10px', padding: '0.65rem', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
            𝕏 Twitter
          </button>
        </div>
        <button onClick={downloadCard}
          style={{ width: '100%', marginTop: '0.5rem', background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', color: 'white', border: 'none', borderRadius: '10px', padding: '0.65rem', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
          📸 Instagram Story için İndir
        </button>
      </div>
    </div>
  );
}
