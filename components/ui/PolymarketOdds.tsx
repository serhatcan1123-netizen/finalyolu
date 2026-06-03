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
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #00d4aa, #0066ff)', color: '#fff' }}>
            P
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>
              Polymarket Şampiyonluk Oranları
            </div>
            <div className="text-xs" style={{ color: '#8A8A9A' }}>Canlı tahmin piyasası</div>
          </div>
        </div>
        <a href="https://polymarket.com/event/world-cup-winner" target="_blank" rel="noopener noreferrer"
          className="text-xs px-3 py-1 rounded-full border transition-all hover:opacity-80"
          style={{ color: '#00d4aa', borderColor: 'rgba(0,212,170,0.3)', background: 'rgba(0,212,170,0.08)' }}>
          Polymarket ↗
        </a>
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

      <div className="px-5 py-3 text-center text-xs"
        style={{ color: '#8A8A9A', borderTop: '1px solid #2A2A3A', background: 'rgba(0,0,0,0.2)' }}>
        Kaynak: Polymarket · $1.5B+ işlem hacmi · {updatedAt ? `Son güncelleme: ${new Date(updatedAt).toLocaleTimeString('tr-TR')}` : 'Gerçek zamanlı piyasa verileri'}
      </div>
    </div>
  );
}
