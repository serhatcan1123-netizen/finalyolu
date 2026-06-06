export default function HakkimizdaPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-2xl font-bold text-white mb-2">Hakkımızda</h1>
      <p className="text-white/30 text-xs mb-8">finalyolu.com — Bağımsız Fan Simülasyon Platformu</p>
      <div className="space-y-6 text-sm leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Biz Kimiz?</h2>
          <p>
            finalyolu.com, 2026 FIFA Dünya Kupası heyecanını dijital dünyaya taşıyan,
            tamamen ücretsiz ve bağımsız bir fan tahmin simülasyon platformudur.
            Kullanıcılar; grup aşamalarından finale kadar tüm maç sonuçlarını, gol krallığını
            ve şampiyonu tahmin ederek interaktif bir turnuva deneyimi yaşar ve gerçek ödüller
            kazanma şansı elde eder.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Vizyonumuz</h2>
          <p>
            Futbol tutkunlarını bilgi, strateji ve sezgileriyle buluşturan küresel bir
            tahmin topluluğu oluşturmak. Kazananı şans değil, doğru analiz belirler.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">Resmi Bağlantı Reddi (Disclaimer)</h2>
          <p>
            finalyolu.com; <strong className="text-white">FIFA</strong>,{" "}
            <strong className="text-white">UEFA</strong>, herhangi bir ulusal futbol federasyonu,
            milli olimpiyat komitesi veya 2026 Dünya Kupası organizasyonuyla{" "}
            <strong className="text-white">hiçbir resmi bağı, ortaklığı, sponsorluğu veya
            lisans anlaşması bulunmayan</strong> bağımsız bir fan platformudur.
          </p>
          <p className="mt-2">
            Sitede kullanılan takım adları, ülke bayrakları ve turnuva bilgileri yalnızca
            eğitici ve bilgilendirici amaçlarla sunulmaktadır. Tüm ticari markalar ilgili
            sahiplerinin mülkiyetindedir. Platform, bu markaları ticari kazanç amacıyla
            kullanmamakta; yalnızca fan içeriği (fair use / fan art muafiyeti) kapsamında
            atıfta bulunmaktadır.
          </p>
          <p className="mt-2">
            Bu platform 5846 sayılı Fikir ve Sanat Eserleri Kanunu ve uluslararası telif
            hukuku çerçevesinde faaliyet göstermektedir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">İletişim</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>E-posta: <span className="text-red-400">iletisim@finalyolu.com</span></li>
            <li>KVKK başvuruları: <span className="text-red-400">kvkk@finalyolu.com</span></li>
          </ul>
        </section>

        <div className="pt-4 border-t border-white/10 text-white/25 text-xs">
          <p>Son güncelleme: Haziran 2026</p>
        </div>
      </div>
    </div>
  )
}
