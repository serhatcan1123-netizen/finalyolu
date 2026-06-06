'use client';

import { useRef, useState } from 'react';
import { TEAMS } from '@/lib/api/mock-data';
import type { TournamentPrediction, PredictionScore } from '@/lib/prediction/algorithm';

interface ShareCardProps {
  prediction: TournamentPrediction;
  score: PredictionScore | null;
  onClose: () => void;
}

const XLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ColorStripes = () => (
  <div style={{ display: 'flex', height: '4px', width: '100%' }}>
    {['#F4A300','#E63329','#8B1A8B','#1B3F8B','#009B48','#00B0CA','#F4A300'].map((c, i) => (
      <div key={i} style={{ flex: 1, background: c }} />
    ))}
  </div>
);

export default function ShareCard({ prediction, score, onClose }: ShareCardProps) {
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
      const dataUrl = await toPng(cardRef.current, { quality: 0.99, pixelRatio: 3 });
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
      const blob = await toBlob(cardRef.current, { quality: 0.99, pixelRatio: 3 });
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }

  function shareOnTwitter() {
    const text = `2026 Dünya Kupası tahminim hazır! 🏆 Şampiyonum: ${champion?.name ?? '?'}\nSen de tahminini yap:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://finalyolu.com/predict')}&hashtags=FinalYolu,WorldCup2026`, '_blank');
  }

  function shareOnWhatsApp() {
    const text = `2026 Dünya Kupası tahminim hazır! 🏆 Şampiyonum: ${champion?.name ?? '?'}\nSen de tahminini yap: https://finalyolu.com/predict`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  const groupSummary = prediction.groups
    ? prediction.groups.slice(0, 12).map((gPred) => {
        const slugs = gPred.teamOrder.slice(0, 2);
        const teams = slugs.map(s => Object.values(TEAMS).find(tm => tm.slug === s)).filter(Boolean) as (typeof TEAMS)[string][];
        return { groupId: gPred.groupId, teams };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full" style={{ maxWidth: '360px' }}>
        <button onClick={onClose}
          style={{ position: 'absolute', top: '-2rem', right: 0, color: '#555', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
          ✕ KAPAT
        </button>

        <div ref={cardRef} style={{
          width: '100%', aspectRatio: '9/16',
          background: '#060608',
          borderRadius: '12px', overflow: 'hidden',
          position: 'relative',
          fontFamily: 'DM Sans, sans-serif',
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <ColorStripes />

          <div style={{
            padding: '1.25rem 1.5rem 1.5rem',
            position: 'relative',
            background: 'linear-gradient(160deg, #0D0D14 0%, #12080A 60%, #0A0F18 100%)',
            flex: '0 0 auto',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: '-10px', top: '-10px',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '9rem', lineHeight: 1,
              color: 'rgba(255,255,255,0.03)',
              letterSpacing: '-0.02em',
              userSelect: 'none', pointerEvents: 'none',
            }}>26</div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: 'rgba(244,163,0,0.1)',
              border: '1px solid rgba(244,163,0,0.25)',
              borderRadius: '4px',
              padding: '0.2rem 0.5rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F4A300' }} />
              <span style={{ fontSize: '0.5rem', color: '#F4A300', letterSpacing: '0.2em', fontWeight: 600 }}>FINALYOLU.COM</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
              {champion ? (
                <div style={{ position: 'relative' }}>
                  <img src={champion.flag} alt={champion.nameEn}
                    style={{
                      width: '100px', height: '67px',
                      borderRadius: '6px', objectFit: 'cover',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
                      display: 'block',
                    }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '6px',
                    boxShadow: 'inset 0 0 0 1.5px rgba(244,163,0,0.5)',
                  }} />
                </div>
              ) : (
                <div style={{
                  width: '80px', height: '80px',
                  background: 'rgba(244,163,0,0.08)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem',
                }}>🏆</div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.5rem', color: 'rgba(244,163,0,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Şampiyon Tahmini
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: champion && champion.name.length > 10 ? '2.2rem' : '2.8rem',
                  color: '#FFFFFF', lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  marginBottom: '0.3rem',
                }}>
                  {champion?.name.toUpperCase() ?? 'TAHMİNİM'}
                </div>
                {champion && (
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
                    FIFA #{champion.fifaRanking}
                  </div>
                )}
              </div>
            </div>
          </div>

          {score && (
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: 'rgba(244,163,0,0.06)',
              borderTop: '1px solid rgba(244,163,0,0.1)',
              borderBottom: '1px solid rgba(244,163,0,0.1)',
              gap: '1.5rem',
            }}>
              <div>
                <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Tahmin Skoru</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', color: '#F4A300', lineHeight: 1 }}>
                  {score.percentage}%
                </div>
              </div>
              <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.08)' }} />
              <div>
                <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Puan</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', color: '#FFFFFF', lineHeight: 1 }}>
                  {score.total.toLocaleString()}
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>İlerleme</div>
                <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${score.percentage}%`, height: '100%', background: 'linear-gradient(90deg, #F4A300, #E63329)', borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          )}

          {groupSummary.length > 0 && (
            <div style={{ flex: 1, padding: '1rem 1.5rem', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Grup Tahminlerim
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 1rem' }}>
                {groupSummary.map(({ groupId, teams }) => (
                  <div key={groupId} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.85rem',
                      color: '#F4A300', minWidth: '1rem',
                      background: 'rgba(244,163,0,0.08)',
                      borderRadius: '3px',
                      padding: '0 3px',
                      textAlign: 'center',
                    }}>{groupId}</div>
                    <div style={{ flex: 1 }}>
                      {teams.slice(0, 2).map((tm, i) => (
                        <div key={tm.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: i === 0 ? '1px' : 0 }}>
                          <img src={tm.flag} alt="" style={{ width: '14px', height: '10px', borderRadius: '1px', objectFit: 'cover', opacity: i === 0 ? 1 : 0.5 }} />
                          <span style={{ fontSize: '0.55rem', color: i === 0 ? '#E0E0EB' : '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65px' }}>{tm.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <ColorStripes />
            <div style={{
              padding: '0.6rem 1.5rem',
              background: '#060608',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: '#F4A300', letterSpacing: '0.1em' }}>
                FINAL YOLU
              </div>
              <div style={{ fontSize: '0.45rem', color: '#333', letterSpacing: '0.12em' }}>
                2026 DÜNYA KUPASI TAHMİN PLATFORMU
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'center' }}>
          <button onClick={downloadCard} disabled={downloading} title="PNG İndir"
            style={{ background: downloading ? 'rgba(244,163,0,0.2)' : 'rgba(244,163,0,0.1)', color: '#F4A300', border: '1px solid rgba(244,163,0,0.25)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DownloadIcon />
          </button>
          <button onClick={copyCard} title="Panoya Kopyala"
            style={{ background: copied ? 'rgba(244,163,0,0.25)' : 'rgba(244,163,0,0.08)', color: '#F4A300', border: '1px solid rgba(244,163,0,0.25)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <button onClick={shareOnWhatsApp} title="WhatsApp'ta Paylaş"
            style={{ background: 'rgba(37,211,102,0.08)', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WhatsAppLogo />
          </button>
          <button onClick={shareOnTwitter} title="X'te Paylaş"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XLogo />
          </button>
          <button onClick={downloadCard} title="Instagram Story için İndir"
            style={{ background: 'rgba(131,58,180,0.1)', color: '#C13584', border: '1px solid rgba(193,53,132,0.25)', borderRadius: '50%', width: '46px', height: '46px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InstagramLogo />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '0.4rem', fontSize: '0.55rem', color: '#333', letterSpacing: '0.05em' }}>
          📸 Instagram için görseli indir ve story olarak paylaş
        </div>
      </div>
    </div>
  );
}
