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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: '[\n  {\n    "@context": "https://schema.org",\n    "@type": "WebApplication",\n    "name": "finalyolu.com — 2026 Dünya Kupası Tahmin Simülatörü",\n    "url": "https://finalyolu.com",\n    "description": "2026 FIFA Dünya Kupası için ücretsiz fan tahmin simülatörü. Grup aşamasından finale tüm maçları tahmin et, şampiyonluk yolunu çiz, arkadaşlarınla yarış.",\n    "applicationCategory": "SportsApplication",\n    "operatingSystem": "Web",\n    "offers": {\n      "@type": "Offer",\n      "price": "0",\n      "priceCurrency": "TRY"\n    },\n    "inLanguage": [\n      "tr",\n      "en"\n    ],\n    "author": {\n      "@type": "Organization",\n      "name": "finalyolu.com",\n      "url": "https://finalyolu.com",\n      "logo": "https://finalyolu.com/images/og-image.png",\n      "contactPoint": {\n        "@type": "ContactPoint",\n        "email": "iletisim@finalyolu.com",\n        "contactType": "customer support",\n        "availableLanguage": [\n          "Turkish",\n          "English"\n        ]\n      }\n    },\n    "potentialAction": {\n      "@type": "PlayAction",\n      "target": "https://finalyolu.com/predict"\n    }\n  },\n  {\n    "@context": "https://schema.org",\n    "@type": "FAQPage",\n    "mainEntity": [\n      {\n        "@type": "Question",\n        "name": "2026 Dünya Kupası Tahmin Simülatörü nasıl çalışır?",\n        "acceptedAnswer": {\n          "@type": "Answer",\n          "text": "finalyolu.com tamamen eğlence ve fan analizi amacıyla tasarlanmış ücretsiz bir simülasyon platformudur. Grup aşamasından finale kadar tüm maçların sonuçlarını, gol krallığını ve şampiyonu tahmin ederek kendi şampiyonluk senaryonuzu oluşturursunuz. Platform futbol bilginizi ve stratejik öngörünüzü ölçer; rastgele seçim veya şans unsuru içermez."\n        }\n      },\n      {\n        "@type": "Question",\n        "name": "finalyolu.com\'da tahmin yapmak ücretli mi veya bahis oynatılır mı?",\n        "acceptedAnswer": {\n          "@type": "Answer",\n          "text": "Hayır. finalyolu.com tamamen ücretsizdir. Platform 7258 sayılı Kanun kapsamında tanımlanan bahis, şans oyunu veya kumar faaliyeti yürütmemektedir. Dağıtılan ödüller yalnızca en yüksek puanı toplayan kullanıcılara, nesnel bir bilgi ve yetenek sıralamasıyla verilmektedir."\n        }\n      },\n      {\n        "@type": "Question",\n        "name": "Dünya Kupası şampiyonluk yolumu arkadaşlarımla nasıl paylaşırım?",\n        "acceptedAnswer": {\n          "@type": "Answer",\n          "text": "Tahminlerinizi tamamladıktan sonra paylaş butonuna tıklayarak senaryonuzu tek tıkla sosyal medyada paylaşabilirsiniz. Aynı linki arkadaşlarınıza ilettiğinizde onlar da kendi tahminlerini yapıp sizinle rekabete girebilir."\n        }\n      },\n      {\n        "@type": "Question",\n        "name": "Ödüller nasıl kazanılır?",\n        "acceptedAnswer": {\n          "@type": "Answer",\n          "text": "Ödüller yalnızca puan sıralamasına göre verilir. Birinci sıraya Dünya Kupası maketi, ikinciye forma, üçüncüye 50 USD hediye kartı verilmektedir. Bu bir yetenek yarışmasıdır; şans veya çekiliş unsuru içermez."\n        }\n      },\n      {\n        "@type": "Question",\n        "name": "finalyolu.com FIFA ile resmi bağlantısı olan bir site midir?",\n        "acceptedAnswer": {\n          "@type": "Answer",\n          "text": "Hayır. finalyolu.com; FIFA, UEFA veya herhangi bir futbol federasyonuyla resmi bağı, ortaklığı veya sponsorluğu bulunmayan tamamen bağımsız bir fan simülasyon platformudur."\n        }\n      }\n    ]\n  },\n  {\n    "@context": "https://schema.org",\n    "@type": "SiteNavigationElement",\n    "name": [\n      "Tahmin Et",\n      "Sıralama",\n      "Hakkımızda",\n      "Kullanım Şartları",\n      "Gizlilik",\n      "KVKK"\n    ],\n    "url": [\n      "https://finalyolu.com/predict",\n      "https://finalyolu.com/leaderboard",\n      "https://finalyolu.com/hakkimizda",\n      "https://finalyolu.com/kullanim-sartlari",\n      "https://finalyolu.com/gizlilik",\n      "https://finalyolu.com/kvkk"\n    ]\n  },\n  {\n    "@context": "https://schema.org",\n    "@type": "BreadcrumbList",\n    "itemListElement": [\n      {\n        "@type": "ListItem",\n        "position": 1,\n        "name": "Ana Sayfa",\n        "item": "https://finalyolu.com"\n      },\n      {\n        "@type": "ListItem",\n        "position": 2,\n        "name": "Tahmin Et",\n        "item": "https://finalyolu.com/predict"\n      },\n      {\n        "@type": "ListItem",\n        "position": 3,\n        "name": "Sıralama",\n        "item": "https://finalyolu.com/leaderboard"\n      },\n      {\n        "@type": "ListItem",\n        "position": 4,\n        "name": "Hakkımızda",\n        "item": "https://finalyolu.com/hakkimizda"\n      },\n      {\n        "@type": "ListItem",\n        "position": 5,\n        "name": "Kullanım Şartları",\n        "item": "https://finalyolu.com/kullanim-sartlari"\n      },\n      {\n        "@type": "ListItem",\n        "position": 6,\n        "name": "Gizlilik Politikası",\n        "item": "https://finalyolu.com/gizlilik"\n      },\n      {\n        "@type": "ListItem",\n        "position": 7,\n        "name": "KVKK",\n        "item": "https://finalyolu.com/kvkk"\n      }\n    ]\n  }\n]'
        }}
      />
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
