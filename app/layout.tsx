import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import CookieBanner from '@/components/ui/CookieBanner';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finalyolu.com'),
  title: 'Finalyolu — 2026 Dünya Kupası Fikstürler, Maçlar, Tahmin',
  description: '2026 Dünya Kupası maç programı TSİ saatiyle, grup tabloları, takım kadroları ve interaktif turnuva tahmini. 48 takım, 104 maç.',
  keywords: 'Dünya Kupası 2026, maçlar, gruplar, tahmin, futbol, TSİ',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#0A0A0F' }}>
        <I18nProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <a href="/predict" style={{position:"fixed",bottom:"1.5rem",right:"1.5rem",zIndex:50,display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",borderRadius:"9999px",fontWeight:"bold",color:"white",background:"linear-gradient(135deg,#C8102E,#E63946)",boxShadow:"0 4px 24px rgba(200,16,46,0.4)",textDecoration:"none"}}><span>⚽</span><span>Tahmin Et</span></a>
        </I18nProvider>
      </body>
    </html>
  );
}
