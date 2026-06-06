'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TEAMS } from '@/lib/api/mock-data';

interface OddsItem {
  name: string;
  probability: number;
}

const TEAM_NAME_MAP: Record<string, string> = {
  'France': 'france', 'Spain': 'spain', 'England': 'england',
  'Portugal': 'portugal', 'Argentina': 'argentina', 'Brazil': 'brazil',
  'Germany': 'germany', 'Netherlands': 'netherlands', 'Belgium': 'belgium',
  'Croatia': 'croatia', 'Morocco': 'morocco', 'Uruguay': 'uruguay',
  'Colombia': 'colombia', 'United States': 'usa', 'Mexico': 'mexico',
  'Japan': 'japan', 'Senegal': 'senegal', 'Switzerland': 'switzerland',
  'Austria': 'austria', 'Turkey': 'turkey', 'Australia': 'australia',
  'South Korea': 'south-korea', 'Norway': 'norway', 'Denmark': 'denmark',
};

export default function PolymarketOdds() {
  const [odds, setOdds] = useState<OddsItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/polymarket')
      .then(r => r.json())
      .then(data => {
        if (data.odds?.length > 0) {
          setOdds(data.odds);
          setUpdatedAt(data.updatedAt);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const top10 = odds.slice(0, 10);
  const max = top10[0]?.probability || 1;

  function getTeam(name: string) {
    const slug = TEAM_NAME_MAP[name];
    if (slug) return Object.values(TEAMS).find(t => t.slug === slug);
    return Object.values(TEAMS).find(t => t.nameEn === name || t.name === name);
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>
            Küresel Tahmin Piyasası Beklentileri
          </div>
          <div className="text-xs" style={{ color: '#8A8A9A' }}>Yapay Zeka ve Kitle Tahmin İstatistikleri</div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full cursor-default select-none"
          style={{ color: '#8A8A9A', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          İstatistiksel Analiz
        </span>
      </div>

      <div className="p-4 space-y-2.5">
        {loading ? (
          <div className="text-center py-4 text-sm" style={{ color: '#8A8A9A' }}>Yükleniyor...</div>
        ) : top10.map((item, i) => {
          const team = getTeam(item.name);
          return (
            <div key={item.name} className="flex items-center gap-3">
              <span className="w-5 text-right text-xs font-mono-custom flex-shrink-0"
                style={{ color: i < 3 ? '#C9A84C' : '#8A8A9A' }}>{i + 1}</span>
              <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0 shadow-sm">
                {team ? (
                  <Image src={team.flag} alt={item.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full" style={{ background: '#2A2A3A' }} />
                )}
              </div>
              <span className="text-sm font-medium flex-1 min-w-0 truncate" style={{ color: '#F0F0F5' }}>
                {team?.name || item.name}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0" style={{ width: '120px' }}>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2A3A' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(item.probability / max) * 100}%`,
                      background: i === 0 ? 'linear-gradient(90deg, #C9A84C, #F0D060)' : i < 3 ? 'linear-gradient(90deg, #00d4aa, #0099cc)' : '#3A3A4A',
                    }} />
                </div>
                <span className="text-xs font-mono-custom text-right"
                  style={{ color: i === 0 ? '#C9A84C' : '#8A8A9A', minWidth: '36px', fontWeight: i < 3 ? 600 : 400 }}>
                  {item.probability.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {(() => {
        const turkiye = odds.find(o => o.name === 'Turkey' || o.name === 'Türkiye');
        if (!turkiye) return null;
        const rank = odds.findIndex(o => o.name === 'Turkey' || o.name === 'Türkiye') + 1;
        return (
          <div className="mx-4 mb-3 px-4 py-2.5 rounded-xl flex items-center gap-3"
            style={{ background: 'rgba(227,10,23,0.08)', border: '1px solid rgba(227,10,23,0.25)' }}>
            <span className="text-lg">🇹🇷</span>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: '#E30A17' }}>Türkiye</div>
              <div className="text-xs" style={{ color: '#8A8A9A' }}>Sıralama: #{rank}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-mono-custom" style={{ color: '#E30A17' }}>
                %{turkiye.probability.toFixed(1)}
              </div>
              <div className="text-xs" style={{ color: '#8A8A9A' }}>şampiyonluk tahmini</div>
            </div>
          </div>
        );
      })()}

      <div className="px-5 py-2.5 text-center text-xs"
        style={{ color: '#8A8A9A', borderTop: '1px solid #2A2A3A', background: 'rgba(0,0,0,0.2)' }}>
        {updatedAt
          ? `Son güncelleme: ${new Date(updatedAt).toLocaleTimeString('tr-TR')}`
          : 'Gerçek zamanlı küresel piyasa verileri'}
      </div>

      <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.15)' }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#3d4a6b' }}>
          Yasal Uyarı
        </div>
        <p className="m-0" style={{ fontSize: '10px', lineHeight: '1.6', color: '#3d4a6b' }}>
          Bu alandaki veriler küresel tahmin piyasalarından alınan anonim istatistiksel trendlerdir.
          Sitemizde kesinlikle yasa dışı bahis veya şans oyunu oynatılmamaktadır.
          finalyolu.com bağımsız bir fan platformudur; FIFA veya herhangi bir futbol federasyonu ile resmi bir bağı bulunmamaktadır.
        </p>
      </div>
    </div>
  );
}
