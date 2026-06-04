'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

const TOURNAMENT_START = new Date('2026-06-11T19:00:00-06:00').getTime();

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
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.days, label: t('home.countdown_days') },
    { value: time.hours, label: t('home.countdown_hours') },
    { value: time.minutes, label: t('home.countdown_minutes') },
    { value: time.seconds, label: t('home.countdown_seconds') },
  ];

  return (
    <div className="flex items-end gap-6 md:gap-8">
      {units.map((unit, i) => (
        <div key={i} className="flex items-end gap-6 md:gap-8">
          <div className="flex flex-col items-center">
            <span
              className="tabular-nums leading-none"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#F0F0F5',
                letterSpacing: '-0.02em',
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#4A4A5A',
                marginTop: '4px',
              }}
            >
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 300,
                color: '#2A2A3A',
                marginBottom: '18px',
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
