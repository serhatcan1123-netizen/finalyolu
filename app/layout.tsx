import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finalyolu.com'),
  title: 'Finalyolu — 2026 Dünya Kupası Fikstürler, Maçlar, Tahmin',
  description: '2026 Dünya Kupası maç programı TSİ saatiyle, grup tabloları, takım kadroları ve interaktif turnuva tahmini. 48 takım, 104 maç.',
  keywords: 'Dünya Kupası 2026, maçlar, gruplar, tahmin, futbol, TSİ',
  openGraph: {
    title: 'Finalyolu — 2026 Dünya Kupası',
    description: 'Tüm turnuvayı tahmin et, skorunu arkadaşlarınla paylaş!',
    type: 'website',
    locale: 'tr_TR',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finalyolu — 2026 Dünya Kupası',
    description: 'Tüm turnuvayı tahmin et, skorunu arkadaşlarınla paylaş!',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
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
