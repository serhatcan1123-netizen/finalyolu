import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dk2026.com'),
  title: '2026 FIFA Dünya Kupası | DK2026 - Maçlar, Gruplar, Tahmin',
  description: '2026 FIFA Dünya Kupası maç programı, grup tabloları, takım bilgileri ve tahmin motoru. ABD, Kanada ve Meksika ev sahipliğinde 48 takım, 104 maç.',
  keywords: 'FIFA 2026, Dünya Kupası, World Cup, maçlar, gruplar, tahmin, futbol',
  openGraph: {
    title: '2026 FIFA Dünya Kupası | DK2026',
    description: 'Tüm maçları tahmin et, skorunu arkadaşlarınla paylaş!',
    type: 'website',
    locale: 'tr_TR',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 FIFA Dünya Kupası | DK2026',
    description: 'Tüm maçları tahmin et, skorunu arkadaşlarınla paylaş!',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        {/* AdSense - Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: '#0A0A0F' }}>
        <I18nProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
