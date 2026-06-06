'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '2026 Dünya Kupası Tahmin Simülatörü nasıl çalışır?',
    a: 'finalyolu.com tamamen eğlence ve fan analizi amacıyla tasarlanmış ücretsiz bir simülasyon platformudur. Grup aşamasından finale kadar tüm maçların sonuçlarını, gol krallığını ve şampiyonu tahmin ederek kendi şampiyonluk senaryonu oluşturursun. Platform, futbol bilgini ve stratejik öngörünü ölçer; rastgele seçim veya şans unsuru içermez. Turnuva ilerledikçe gerçek sonuçlarla tahminlerin karşılaştırılır ve anlık puan sıralamanda yerini görürsün.',
  },
  {
    q: 'finalyolu.com'da tahmin yapmak ücretli mi veya bahis oynatılır mı?',
    a: 'Hayır. finalyolu.com tamamen ücretsizdir; herhangi bir ödeme, abonelik veya kredi kartı bilgisi gerektirmez. Platform, 7258 sayılı Kanun kapsamında tanımlanan bahis, şans oyunu veya kumar faaliyeti yürütmemektedir. Dağıtılan ödüller yalnızca en yüksek puanı toplayan kullanıcılara, nesnel bir bilgi ve yetenek sıralamasıyla verilmektedir. Milli Piyango İdaresi (MPİ) mevzuatı uyarınca bu bir yetenek yarışmasıdır.',
  },
  {
    q: 'Dünya Kupası şampiyonluk yolumu arkadaşlarımla nasıl paylaşırım?',
    a: 'Tahminlerini tamamladıktan sonra ekranın sağ altındaki "Paylaş" butonuna tıklayarak senaryonu tek tıkla sosyal medyada paylaşabilirsin. Yakında gelecek özellikle kişisel şampiyonluk kartını görsel olarak indirip Instagram hikayelerine veya WhatsApp gruplarına gönderebileceksin. Aynı linki arkadaşlarına ilettiğinde onlar da kendi tahminlerini yapıp seninle rekabete girebilir.',
  },
];

export default function SeoFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* SEO Metni */}
      <div className="mb-12 space-y-4 text-sm leading-relaxed" style={{ color: '#8A8A9A' }}>
        <p>
          <strong style={{ color: '#F0F0F5' }}>finalyolu.com</strong>, 2026 FIFA Dünya Kupası
          heyecanını fan analizine dönüştüren ücretsiz bir{' '}
          <strong style={{ color: '#F0F0F5' }}>Dünya Kupası tahmin simülatörüdür</strong>.
          Grup aşamasından şampiyona uzanan tüm şampiyonluk yolunu kendin çizer, takımların
          performansını değerlendirir ve 48 takımlı dev turnuvada kendi senaryonu oluşturursun.
          Simülatörümüz; istatistik, form analizi ve futbol sezgisini bir araya getirerek
          sıradan bir taraftarlık deneyimini interaktif bir strateji oyununa dönüştürür.
        </p>
        <p>
          <strong style={{ color: '#F0F0F5' }}>2026 Dünya Kupası fikstür tahmininde</strong>{' '}
          her maç sonucunu, skor tahminini ve eleme turlarını ayrı ayrı belirleyerek kapsamlı
          bir turnuva haritası oluşturuyorsun. Platform tamamen eğlence ve fan simülasyonu
          odaklıdır; herhangi bir bahis, kumar veya ücretli içerik barındırmaz.
          Turnuva boyunca gerçek sonuçlarla tahminlerin anlık olarak karşılaştırılır ve
          global sıralamada kaç puanla nerede durduğunu canlı takip edersin.
        </p>
        <p>
          Şampiyonluk yolunu arkadaşlarınla paylaş, aynı turnuvayı onların gözünden gör ve
          kimin daha iyi bir{' '}
          <strong style={{ color: '#F0F0F5' }}>Dünya Kupası tahmin uzmanı</strong>{' '}
          olduğunu nesnel puan sıralamasıyla kanıtla. finalyolu.com; futbol bilgini,
          analitik bakış açını ve turnuva heyecanını tek platformda buluşturan
          Türkiye'nin en kapsamlı 2026 Dünya Kupası fan simülasyon deneyimidir.
        </p>
      </div>

      {/* SSS Başlık */}
      <div className="mb-6">
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C9A84C' }}
        >
          Sıkça Sorulan Sorular
        </span>
        <h2 className="text-xl font-bold mt-1" style={{ color: '#F0F0F5' }}>
          Merak Ettiklerin
        </h2>
      </div>

      {/* Accordion */}
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              background: open === i ? '#161622' : '#111118',
              border: open === i
                ? '1px solid rgba(201,168,76,0.25)'
                : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ color: open === i ? '#F0F0F5' : '#C0C0CC' }}
            >
              <span className="text-sm font-medium pr-4">{faq.q}</span>
              <span
                className="flex-shrink-0 text-lg transition-transform duration-300"
                style={{
                  color: '#C9A84C',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                maxHeight: open === i ? '400px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              <p
                className="px-5 pb-5 text-sm leading-relaxed"
                style={{ color: '#8A8A9A' }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Schema.org FAQPage — SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
