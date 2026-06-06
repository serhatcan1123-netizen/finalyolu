'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t, locale, setLocale } = useI18n();

  return (
    <footer style={{ background: '#0A0A0F', borderTop: '1px solid #2A2A3A' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏆</span>
              <span className="font-display text-2xl tracking-widest" style={{ color: '#C9A84C' }}>
                {t('nav.logo')}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#8A8A9A' }}>{t('footer.tagline')}</p>
            <div className="flex gap-3 mt-4">
              {['twitter', 'instagram', 'youtube'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all hover:border-primary/50 text-xs"
                  style={{ color: '#8A8A9A' }}
                >
                  {s === 'twitter' ? 'X' : s === 'instagram' ? 'IG' : 'YT'}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#F0F0F5' }}>{"Bağlantılar"}</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/fixtures', label: t('nav.matches') },
                { href: '/groups', label: t('nav.groups') },
                { href: '/teams', label: t('nav.teams') },
                { href: '/predict', label: t('nav.predict') },
                { href: '/leaderboard', label: '🏅 Sıralama' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-sm hover:text-primary transition-colors" style={{ color: '#8A8A9A' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#F0F0F5' }}>{"Dil / Language"}</h4>
            <div className="flex gap-2 mb-6">
              {(['tr', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all"
                  style={{
                    background: locale === l ? '#C9A84C' : 'transparent',
                    color: locale === l ? '#0A0A0F' : '#8A8A9A',
                    borderColor: locale === l ? '#C9A84C' : '#2A2A3A',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8A8A9A' }}>
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#8A8A9A' }}>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <Link href="/sozlesme" className="text-xs transition-colors hover:text-white" style={{ color: '#555566' }}>
              {"Kullanıcı Sözleşmesi"}
            </Link>
            <span style={{ color: '#333344' }}>{"·"}</span>
            <Link href="/kvkk" className="text-xs transition-colors hover:text-white" style={{ color: '#555566' }}>
              {"KVKK Aydınlatma Metni"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
