'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TEAMS } from '@/lib/api/mock-data';
import type { MatchScore } from '@/lib/prediction/algorithm';

function getTeam(slug: string | null) {
  if (!slug) return null;
  return Object.values(TEAMS).find(t => t.slug === slug) || null;
}

interface ScoreModalProps {
  matchId: string;
  homeSlug: string | null;
  awaySlug: string | null;
  winnerSlug: string | null;
  initialScore?: MatchScore;
  onSave: (matchId: string, score: MatchScore) => void;
  onClose: () => void;
}

export default function ScoreModal({ matchId, homeSlug, awaySlug, winnerSlug, initialScore, onSave, onClose }: ScoreModalProps) {
  const [homeScore, setHomeScore] = useState(initialScore?.home ?? 0);
  const [awayScore, setAwayScore] = useState(initialScore?.away ?? 0);

  const homeTeam = getTeam(homeSlug);
  const awayTeam = getTeam(awaySlug);

  const handleSave = () => {
    onSave(matchId, { home: homeScore, away: awayScore });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-6"
        style={{ background: '#1A1A24', border: '1px solid #2A2A3A' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-lg" style={{ color: '#8A8A9A' }}>✕</button>

        <h3 className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: '#8A8A9A' }}>
          Skor Tahmini
        </h3>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            {homeTeam && (
              <div className="relative w-12 h-8 rounded overflow-hidden shadow">
                <Image src={homeTeam.flag} alt={homeTeam.nameEn} fill className="object-cover" unoptimized />
              </div>
            )}
            <span className="text-xs font-medium text-center" style={{ color: winnerSlug === homeSlug ? '#C9A84C' : '#F0F0F5' }}>
              {homeTeam?.name || homeSlug}{winnerSlug === homeSlug && ' 🏆'}
            </span>
            <input
              type="number" min={0} max={20}
              value={homeScore}
              onChange={e => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-16 h-16 text-center text-3xl font-bold rounded-xl"
              style={{ background: '#0A0A0F', border: '2px solid #C9A84C', color: '#C9A84C' }}
            />
          </div>

          <span className="text-3xl font-bold" style={{ color: '#2A2A3A' }}>-</span>

          <div className="flex flex-col items-center gap-2 flex-1">
            {awayTeam && (
              <div className="relative w-12 h-8 rounded overflow-hidden shadow">
                <Image src={awayTeam.flag} alt={awayTeam.nameEn} fill className="object-cover" unoptimized />
              </div>
            )}
            <span className="text-xs font-medium text-center" style={{ color: winnerSlug === awaySlug ? '#C9A84C' : '#F0F0F5' }}>
              {awayTeam?.name || awaySlug}{winnerSlug === awaySlug && ' 🏆'}
            </span>
            <input
              type="number" min={0} max={20}
              value={awayScore}
              onChange={e => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-16 h-16 text-center text-3xl font-bold rounded-xl"
              style={{ background: '#0A0A0F', border: '2px solid #C9A84C', color: '#C9A84C' }}
            />
          </div>
        </div>

        <p className="text-center text-xs mt-4 mb-6" style={{ color: '#4A4A5A' }}>
          Doğru skor tahmini +3 bonus puan kazandırır
        </p>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-bold text-sm"
          style={{ background: '#C9A84C', color: '#0A0A0F' }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}
