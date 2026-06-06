import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import CookieBanner from '@/components/ui/CookieBanner';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finalyolu.com'),
  title: 'finalyolu.com | 2026 Dünya Kupası Tahmin Simülatörü — Ücretsiz Fan Oyunu',
  description: '2026 FIFA Dünya Kupası tahmin simülatörü. Şampiyonluk yolunu çiz, tüm maçları tahmin et, arkadaşlarınla yarış. Ücretsiz, bahissiz, tamamen fan eğlencesi.',
  keywords: '2026 dünya kupası tahmin, dünya kupası simülatörü, dünya kupası tahmin oyunu, şampiyonluk yolu, fikstür tahmini, fan simülasyonu',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'finalyolu.com | 2026 Dünya Kupası Tahmin Simülatörü',
    description: 'Tüm turnuvayı tahmin et, skorunu arkadaşlarınla paylaş!',
    type: 'website',
    locale: 'tr_TR',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'finalyolu.com | 2026 Dünya Kupası Tahmin Simülatörü',
    description: 'Tüm turnuvayı tahmin et, skorunu arkadaşlarınla paylaş!',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '[{"@context": "https://schema.org", "@type": "WebApplication", "name": "finalyolu.com", "url": "https://finalyolu.com", "description": "2026 FIFA Dunya Kupasi ucretsiz fan tahmin simulatoru.", "applicationCategory": "SportsApplication", "operatingSystem": "Web", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "TRY"}, "author": {"@type": "Organization", "name": "finalyolu.com", "url": "https://finalyolu.com"}, "potentialAction": {"@type": "PlayAction", "target": "https://finalyolu.com/predict"}}, {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://finalyolu.com"}, {"@type": "ListItem", "position": 2, "name": "Tahmin Et", "item": "https://finalyolu.com/predict"}, {"@type": "ListItem", "position": 3, "name": "Siralama", "item": "https://finalyolu.com/leaderboard"}, {"@type": "ListItem", "position": 4, "name": "Hakkimizda", "item": "https://finalyolu.com/hakkimizda"}, {"@type": "ListItem", "position": 5, "name": "Kullanim Sartlari", "item": "https://finalyolu.com/kullanim-sartlari"}, {"@type": "ListItem", "position": 6, "name": "Gizlilik", "item": "https://finalyolu.com/gizlilik"}, {"@type": "ListItem", "position": 7, "name": "KVKK", "item": "https://finalyolu.com/kvkk"}]}]'}} />
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
