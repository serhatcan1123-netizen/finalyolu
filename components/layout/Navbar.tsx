'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/fixtures', label: t('nav.matches') },
    { href: '/groups', label: t('nav.groups') },
    { href: '/teams', label: t('nav.teams') },
    { href: '/leaderboard', label: locale === 'en' ? '🏆 Rankings' : '🏆 Sıralama' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🏆</span>
              <span
                className="font-display text-2xl tracking-widest"
                style={{ color: '#C9A84C' }}
              >
                {t('nav.logo')}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 pb-0.5 ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  style={isActive(link.href) ? { color: '#C9A84C' } : {}}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/predict"
                className="btn-primary text-sm px-4 py-2 rounded-lg"
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                {t('nav.predict')}
              </Link>
            </div>

            {/* Right: lang switcher + hamburger */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              {/* dil secimi gecici olarak gizlendi */}

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span
                  className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
                  style={{ background: '#F0F0F5' }}
                />
                <span
                  className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                  style={{ background: '#F0F0F5' }}
                />
                <span
                  className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                  style={{ background: '#F0F0F5' }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-64 border-l border-border transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: '#111118' }}
        >
          <div className="p-6 pt-20 flex flex-col gap-4">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium py-2 border-b border-border/50"
                style={{ color: isActive(link.href) ? '#C9A84C' : '#F0F0F5' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/predict"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 text-center"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t('nav.predict')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
