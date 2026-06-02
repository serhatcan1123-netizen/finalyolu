'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GROUPS } from '@/lib/api/mock-data';
import type { GroupPrediction } from '@/lib/prediction/algorithm';

interface GroupPredictorProps {
  groupIndex: number;
  prediction: GroupPrediction | undefined;
  onChange: (prediction: GroupPrediction) => void;
}

const POSITION_META = [
  { bg: 'rgba(201,168,76,0.14)', border: '#C9A84C',              badge: '#C9A84C',  label: '1.',  qualify: true,  qualifyLabel: 'Son 32' },
  { bg: 'rgba(201,168,76,0.07)', border: 'rgba(201,168,76,0.4)', badge: '#C9A84C',  label: '2.',  qualify: true,  qualifyLabel: 'Son 32' },
  { bg: 'rgba(42,42,58,0.4)',    border: '#2A2A3A',              badge: '#8A8A9A',  label: '3.',  qualify: false, qualifyLabel: 'Play-off?' },
  { bg: 'rgba(230,57,70,0.06)',  border: 'rgba(230,57,70,0.25)', badge: '#E63946',  label: '4.',  qualify: false, qualifyLabel: 'Eleniyor' },
] as const;

export default function GroupPredictor({ groupIndex, prediction, onChange }: GroupPredictorProps) {
  const group = GROUPS[groupIndex];
  const currentOrder = prediction?.teamOrder || group.teams.map(t => t.slug);
  const orderedTeams = currentOrder
    .map(slug => group.teams.find(t => t.slug === slug)!)
    .filter(Boolean);

  /* ── Drag state ─────────────────────────────────────────── */
  const dragIndex   = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  function reorder(from: number, to: number) {
    if (from === to) return;
    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    onChange({ groupId: group.id, teamOrder: newOrder });
  }

  function moveTeam(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= orderedTeams.length) return;
    reorder(index, swapIndex);
  }

  /* ── Pointer-based drag (works on touch & mouse) ──────── */
  const pointerStartY   = useRef<number>(0);
  const pointerRowH     = useRef<number>(0);
  const containerRef    = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent, index: number) => {
    if ((e.target as HTMLElement).closest('button')) return; // let arrow buttons work
    e.currentTarget.setPointerCapture(e.pointerId);
    dragIndex.current      = index;
    pointerStartY.current  = e.clientY;
    pointerRowH.current    = (e.currentTarget as HTMLElement).offsetHeight + 8; // gap ≈ 8px
    setDragging(index);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent, index: number) => {
    if (dragIndex.current === null || dragIndex.current !== index) return;
    const dy     = e.clientY - pointerStartY.current;
    const steps  = Math.round(dy / pointerRowH.current);
    const target = Math.max(0, Math.min(orderedTeams.length - 1, index + steps));
    setDragOver(target);
  }, [orderedTeams.length]);

  const onPointerUp = useCallback((index: number) => {
    if (dragIndex.current !== null && dragOver !== null) {
      reorder(dragIndex.current, dragOver);
    }
    dragIndex.current = null;
    setDragging(null);
    setDragOver(null);
  }, [dragOver]);

  /* ── Quick sort by FIFA ranking ──────────────────────────── */
  function sortByFIFA() {
    const sorted = [...orderedTeams].sort((a, b) => a.fifaRanking - b.fifaRanking);
    onChange({ groupId: group.id, teamOrder: sorted.map(t => t.slug) });
  }

  /* ── Reset to draw order ────────────────────────────────── */
  function resetOrder() {
    onChange({ groupId: group.id, teamOrder: group.teams.map(t => t.slug) });
  }

  return (
    <div className="card overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-display text-2xl tracking-widest" style={{ color: '#C9A84C' }}>
          GRUP {group.id}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={sortByFIFA}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
            title="FIFA dünya sıralamasına göre otomatik sırala"
          >
            📊 FIFA Sırala
          </button>
          <button
            onClick={resetOrder}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:opacity-80"
            style={{ background: 'transparent', borderColor: '#2A2A3A', color: '#8A8A9A' }}
            title="Kura sırasına sıfırla"
          >
            ↺ Sıfırla
          </button>
        </div>
      </div>

      {/* Hint */}
      <div className="px-4 py-2 text-xs font-mono-custom" style={{ color: '#8A8A9A', background: 'rgba(0,0,0,0.15)' }}>
        📱 Basılı tutup sürükle · veya ▲▼ oklarını kullan · ya da FIFA sıralamasına göre otomatik sırala
      </div>

      {/* Team rows */}
      <div ref={containerRef} className="p-3 space-y-2" style={{ touchAction: 'none' }}>
        {orderedTeams.map((team, i) => {
          const meta       = POSITION_META[i];
          const isTarget   = dragOver === i && dragging !== null && dragging !== i;
          const isDragging = dragging === i;

          return (
            <div
              key={team.slug}
              onPointerDown={e => onPointerDown(e, i)}
              onPointerMove={e => onPointerMove(e, i)}
              onPointerUp={() => onPointerUp(i)}
              onPointerCancel={() => onPointerUp(i)}
              /* legacy desktop drag-and-drop fallback */
              draggable
              onDragStart={() => { dragIndex.current = i; setDragging(i); }}
              onDragOver={e => { e.preventDefault(); setDragOver(i); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => {
                if (dragIndex.current !== null) reorder(dragIndex.current, i);
                dragIndex.current = null; setDragging(null); setDragOver(null);
              }}
              onDragEnd={() => { dragIndex.current = null; setDragging(null); setDragOver(null); }}
              className="flex items-center gap-2 sm:gap-3 px-3 py-3 rounded-xl border transition-all"
              style={{
                background:  isTarget  ? 'rgba(201,168,76,0.12)' : meta.bg,
                borderColor: isTarget  ? '#C9A84C' : meta.border,
                cursor:      'grab',
                opacity:     isDragging ? 0.45 : 1,
                transform:   isTarget  ? 'scale(1.015)' : 'scale(1)',
                boxShadow:   isTarget  ? '0 0 0 2px rgba(201,168,76,0.25)' : 'none',
                transition:  'transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease',
              }}
            >
              {/* Position badge */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-display text-sm flex-shrink-0"
                style={{ background: `${meta.badge}22`, color: meta.badge, minWidth: '28px' }}
              >
                {meta.label}
              </div>

              {/* Drag handle */}
              <div className="flex-shrink-0 opacity-25 hover:opacity-60 transition-opacity">
                {[0, 1, 2].map(d => (
                  <div key={d} className="flex gap-0.5 mb-0.5">
                    <div className="w-1 h-1 rounded-full" style={{ background: '#8A8A9A' }} />
                    <div className="w-1 h-1 rounded-full" style={{ background: '#8A8A9A' }} />
                  </div>
                ))}
              </div>

              {/* Flag */}
              <div className="relative w-9 h-6 rounded overflow-hidden flex-shrink-0 shadow-sm">
                <Image src={team.flag} alt={team.nameEn} fill className="object-cover" unoptimized />
              </div>

              {/* Name + FIFA rank + odds */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: '#F0F0F5' }}>
                  {team.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>
                    FIFA #{team.fifaRanking}
                  </span>
                  {team.polymarketOdds != null && (
                    <span className="text-xs font-mono-custom" style={{ color: 'rgba(201,168,76,0.8)' }}>
                      · %{team.polymarketOdds} şamp.
                    </span>
                  )}
                </div>
              </div>

              {/* Qualify label */}
              <span
                className="text-xs font-mono-custom flex-shrink-0 hidden sm:flex items-center px-2 py-0.5 rounded-full"
                style={{
                  background: meta.qualify ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color:      meta.qualify ? '#C9A84C' : meta.qualifyLabel === 'Play-off?' ? '#8A8A9A' : '#E63946',
                  border:     `1px solid ${meta.qualify ? 'rgba(201,168,76,0.25)' : 'transparent'}`,
                }}
              >
                {meta.qualifyLabel}
              </span>

              {/* Arrow buttons — bigger touch targets */}
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={e => { e.stopPropagation(); moveTeam(i, 'up'); }}
                  disabled={i === 0}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all disabled:opacity-20 active:scale-90 hover:brightness-125"
                  style={{ background: '#2A2A3A', color: '#C9A84C' }}
                  title="Yukarı taşı"
                >
                  ▲
                </button>
                <button
                  onClick={e => { e.stopPropagation(); moveTeam(i, 'down'); }}
                  disabled={i === orderedTeams.length - 1}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all disabled:opacity-20 active:scale-90 hover:brightness-125"
                  style={{ background: '#2A2A3A', color: '#C9A84C' }}
                  title="Aşağı taşı"
                >
                  ▼
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 pb-3 flex gap-4 text-xs flex-wrap" style={{ color: '#8A8A9A' }}>
        <span style={{ color: '#C9A84C' }}>● 1-2: Son 32'ye geçer</span>
        <span>● 3: Play-off şansı</span>
        <span style={{ color: '#E63946' }}>● 4: Eleniyor</span>
      </div>
    </div>
  );
}
