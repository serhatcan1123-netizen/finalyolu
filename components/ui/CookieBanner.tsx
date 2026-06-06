'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('finalyolu_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('finalyolu_cookie_consent', 'accepted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem('finalyolu_cookie_consent', 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1rem',
        right: '1rem',
        zIndex: 9999,
        maxWidth: '520px',
        margin: '0 auto',
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      }}
    >
      <p style={{ color: '#F0F0F5', fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>
        Gizliliğinizi önemsiyoruz
      </p>
      <p style={{ color: '#8A8A9A', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
        Platformu geliştirmek amacıyla yalnızca zorunlu teknik çerezler kullanıyoruz.
        Daha fazla bilgi için{' '}
        <Link href="/gizlilik" style={{ color: '#c8102e', textDecoration: 'underline' }}>
          Gizlilik Politikamızı
        </Link>{' '}
        ve{' '}
        <Link href="/kvkk" style={{ color: '#c8102e', textDecoration: 'underline' }}>
          KVKK Aydınlatma Metnimizi
        </Link>{' '}
        inceleyebilirsiniz.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={accept}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: '10px',
            background: '#c8102e',
            color: '#fff',
            fontWeight: 600,
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer',
            minWidth: '120px',
          }}
        >
          Kabul Et
        </button>
        <button
          onClick={reject}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'transparent',
            color: '#8A8A9A',
            fontWeight: 500,
            fontSize: '13px',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            minWidth: '120px',
          }}
        >
          Reddet
        </button>
      </div>
    </div>
  );
}
