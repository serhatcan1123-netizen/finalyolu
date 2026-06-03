'use client';

import Image from 'next/image';
import type { Group } from '@/lib/api/mock-data';

interface Standing {
  team: Group['teams'][0];
  p: number; w: number; d: number; l: number;
  gf: number; ga: number; gd: number; pts: number;
}

interface GroupTableProps {
  group: Group;
  standings?: Standing[];
  compact?: boolean;
}

function getDefaultStandings(group: Group): Standing[] {
  return group.teams.map(team => ({
    team,
    p: 0, w: 0, d: 0, l: 0,
    gf: 0, ga: 0, gd: 0, pts: 0,
  }));
}

export default function GroupTable({ group, standings, compact = false }: GroupTableProps) {
  const rows = standings || getDefaultStandings(group);

  const rowStyle = (index: number) => {
    if (index < 2) return { color: '#C9A84C' }; // qualified
    if (index === 2) return { color: '#8A8A9A' }; // playoff
    return { color: '#E63946' }; // eliminated
  };

  const rowBg = (index: number) => {
    if (index < 2) return 'rgba(201,168,76,0.05)';
    if (index === 2) return 'transparent';
    return 'rgba(230,57,70,0.03)';
  };

  return (
    <div className="card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-xl tracking-widest" style={{ color: '#C9A84C' }}>
          GRUP {group.id}
        </h3>
        {!compact && <span className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>WC 2026</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A3A' }}>
              <th className="text-left px-4 py-2 font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>Takım</th>
              {!compact && (
                <>
                  <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>O</th>
                  <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>G</th>
                  <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>B</th>
                  <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>M</th>
                  <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>A</th>
                </>
              )}
              <th className="px-2 py-2 text-center font-medium text-xs uppercase tracking-wider" style={{ color: '#8A8A9A' }}>P</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.team.id}
                style={{ background: rowBg(i), borderBottom: i < rows.length - 1 ? '1px solid rgba(42,42,58,0.5)' : 'none' }}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-4 text-center font-mono-custom" style={{ color: '#8A8A9A' }}>{i + 1}</span>
                    <div className="relative w-6 h-4 rounded overflow-hidden flex-shrink-0">
                      <Image src={row.team.flag} alt={row.team.nameEn} fill className="object-cover" unoptimized />
                    </div>
                    <span className="font-medium text-xs" style={rowStyle(i)}>{row.team.name}</span>
                  </div>
                </td>
                {!compact && (
                  <>
                    <td className="px-2 py-2.5 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{row.p}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{row.w}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{row.d}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{row.l}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                  </>
                )}
                <td className="px-2 py-2.5 text-center font-display text-base" style={{ color: '#C9A84C' }}>{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
