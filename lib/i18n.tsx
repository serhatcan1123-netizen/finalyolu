'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Locale = 'tr' | 'en';
type Translations = Record<string, unknown>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'tr',
  setLocale: () => {},
  t: (key) => key,
});

function getNestedValue(obj: Translations, path: string): string {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const saved = localStorage.getItem('dk2026_locale') as Locale | null;
    if (saved === 'en' || saved === 'tr') {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    fetch(`/locales/${locale}/common.json`)
      .then(r => r.json())
      .then(data => setTranslations(data))
      .catch(() => {});
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('dk2026_locale', newLocale);
  }, []);

  const t = useCallback((key: string, vars?: Record<string, string | number>): string => {
    let value = getNestedValue(translations, key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replace(`{${k}}`, String(v));
      }
    }
    return value;
  }, [translations]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
