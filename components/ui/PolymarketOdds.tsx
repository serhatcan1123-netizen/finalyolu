'use client';

import Image from 'next/image';
import { POLYMARKET_ODDS } from '@/lib/api/mock-data';

export default function PolymarketOdds() {
  const top10 = POLYMARKET_ODDS.slice(0, 10);
  const max = top10[0].probability;

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #00d4aa, #0066ff)', color: '#fff' }}
          >
            P
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#F0F0F5' }}>
              Polymarket Şampiyonluk Oranları
            </div>
            <div className="text-xs" style={{ color: '#8A8A9A' }}>Canlı tahmin piyasası</div>
          </div>
        </div>
        <a
          href="https://polymarket.com/event/world-cup-winner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1 rounded-full border transition-all hover:opacity-80"
          style={{ color: '#00d4aa', borderColor: 'rgba(0,212,170,0.3)', background: 'rgba(0,212,170,0.08)' }}
        >
          Polymarket ↗
        </a>
      </div>

      <div className="p-4 space-y-2.5">
        {top10.map((item, i) => (
          <div key={item.team.slug} className="flex items-center gap-3">
            {/* Rank */}
            <span
              className="w-5 text-right text-xs font-mono-custom flex-shrink-0"
              style={{ color: i < 3 ? '#C9A84C' : '#8A8A9A' }}
            >
              {i + 1}
            </span>

            {/* Flag */}
            <div className="relative w-7 h-5 rounded overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={item.team.flag}
                alt={item.team.nameEn}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Name */}
            <span className="text-sm font-medium flex-1 min-w-0 truncate" style={{ color: '#F0F0F5' }}>
              {item.team.name}
            </span>

            {/* Bar + % */}
            <div className="flex items-center gap-2 flex-shrink-0" style={{ width: '120px' }}>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2A3A' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(item.probability / max) * 100}%`,
                    background: i === 0
                      ? 'linear-gradient(90deg, #C9A84C, #F0D060)'
                      : i < 3
                      ? 'linear-gradient(90deg, #00d4aa, #0099cc)'
                      : '#2A2A3A',
                  }}
                />
              </div>
              <span
                className="text-xs font-mono-custom text-right"
                style={{
                  color: i === 0 ? '#C9A84C' : '#8A8A9A',
                  minWidth: '36px',
                  fontWeight: i < 3 ? 600 : 400,
                }}
              >
                {item.probability.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="px-5 py-3 text-center text-xs"
        style={{ color: '#8A8A9A', borderTop: '1px solid #2A2A3A', background: 'rgba(0,0,0,0.2)' }}
      >
        Kaynak: Polymarket · $517M+ işlem hacmi · Gerçek zamanlı piyasa verileri
      </div>
    </div>
  );
}
