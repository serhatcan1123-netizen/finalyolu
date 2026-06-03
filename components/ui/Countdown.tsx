'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

const TOURNAMENT_START = new Date('2026-06-15T19:00:00-05:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = TOURNAMENT_START - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { t } = useI18n();
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.days, label: t('home.countdown_days') },
    { value: time.hours, label: t('home.countdown_hours') },
    { value: time.minutes, label: t('home.countdown_minutes') },
    { value: time.seconds, label: t('home.countdown_seconds') },
  ];

  return (
    <div className="flex items-center gap-3 md:gap-4 justify-center flex-wrap">
      {units.map((unit, i) => (
        <div key={i} className="flex items-center gap-3 md:gap-4">
          <div
            className="flex flex-col items-center rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]"
            style={{ background: 'rgba(26,26,36,0.9)', border: '1px solid #2A2A3A' }}
          >
            <span
              className="font-display text-4xl md:text-5xl tabular-nums leading-none"
              style={{ color: '#C9A84C' }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-widest mt-1" style={{ color: '#8A8A9A', fontFamily: 'JetBrains Mono, monospace' }}>
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-3xl" style={{ color: '#C9A84C', opacity: 0.5 }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
