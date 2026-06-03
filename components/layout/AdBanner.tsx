'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n';

interface AdBannerProps {
  slot: string;
  format?: 'leaderboard' | 'rectangle' | 'responsive';
  className?: string;
}

// Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

export default function AdBanner({ slot, format = 'responsive', className = '' }: AdBannerProps) {
  const { t } = useI18n();
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      // @ts-expect-error - adsbygoogle is injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const sizeClasses = {
    leaderboard: 'w-full h-[90px] md:h-[90px] min-h-[50px]',
    rectangle: 'w-[300px] h-[250px]',
    responsive: 'w-full min-h-[100px]',
  };

  if (ADSENSE_ID === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return (
      <div className={`${className}`}>
        <p className="text-center text-[10px] text-text-secondary uppercase tracking-widest mb-1">{t('ad.label')}</p>
        <div className={`${sizeClasses[format]} bg-surface border border-border rounded-lg flex items-center justify-center mx-auto`}>
          <span className="text-text-secondary text-xs font-mono-custom">Ad Unit — {slot}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <p className="text-center text-[10px] text-text-secondary uppercase tracking-widest mb-1">{t('ad.label')}</p>
      <div ref={adRef} className={sizeClasses[format]}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format === 'responsive' ? 'auto' : format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
