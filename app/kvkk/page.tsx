export default function KvkkPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-2xl font-bold text-white mb-2">KVKK Aydınlatma Metni</h1>
      <p className="text-white/30 text-xs mb-8">6698 Sayılı Kişisel Verilerin Korunması Kanunu — Madde 10 Kapsamında</p>
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Veri Sorumlusunun Kimliği</h2>
          <p>Kişisel verileriniz, <strong className="text-white">finalyolu.com</strong> tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca aşağıda açıklanan kapsamda işlenmektedir. Platform, FIFA veya herhangi bir futbol federasyonuyla bağlantısı olmayan bağımsız bir fan uygulamasıdır.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. İşlenen Kişisel Veriler</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>E-posta adresi</li>
            <li>Kullanıcı tarafından seçilen takma ad (nickname)</li>
            <li>Tahmin verileri (anonim istatistik olarak kullanılır)</li>
            <li>Açık rıza tarihi ve pazarlama onay durumu</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Kişisel Verilerin İşlenme Amaçları (Madde 5)</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Platforma erişim ve kimlik doğrulama (magic link ile)</li>
            <li>Tahminlerinizin ve puanınızın sıralamada gösterilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Açık rızanızın bulunması halinde: turnuva güncellemeleri ve pazarlama e-postaları</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Hukuki İşleme Sebepleri (Madde 5/2)</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li><span className="text-white">Sözleşmenin kurulması:</span> Platforma kayıt ve hizmet sunumu</li>
            <li><span className="text-white">Meşru menfaat:</span> Puan sıralaması ve güvenlik</li>
            <li><span className="text-white">Açık rıza (Madde 3/1-a):</span> Yalnızca pazarlama iletişimi için</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Verilerin Aktarımı (Madde 8-9)</h2>
          <p>Kişisel verileriniz üçüncü kişilere satılmaz veya kiralanmaz. Yalnızca teknik altyapı kapsamında şu veri işleyenlerle paylaşılır:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70 mt-2">
            <li>Supabase Inc. (veritabanı — ABD, GDPR uyumlu)</li>
            <li>Vercel Inc. (barındırma — ABD, GDPR uyumlu)</li>
            <li>Resend Inc. (e-posta gönderimi — ABD, GDPR uyumlu)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Saklama Süresi (Madde 7)</h2>
          <p>Verileriniz, hizmetin sona ermesinden itibaren <strong className="text-white">1 (bir) yıl</strong> süreyle saklanır. Pazarlama onayını geri aldığınızda ilgili veriler derhal işlemden çıkarılır.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. İlgili Kişinin Hakları (Madde 11)</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>Silinmesini veya yok edilmesini isteme</li>
            <li>Kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">8. Başvuru Yöntemi (Madde 13)</h2>
          <p>Haklarınızı kullanmak için <span className="text-red-400">kvkk@finalyolu.com</span> adresine kimliğinizi doğrulayacak bilgilerle yazılı başvuruda bulunabilirsiniz. Talebiniz 30 gün içinde sonuçlandırılır.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-base mb-2">9. Şikâyet Mercii</h2>
          <p>Başvurunuzun yanıtsız kalması halinde <strong className="text-white">Kişisel Verileri Koruma Kurumu'na (KVKK)</strong> şikâyette bulunma hakkınız saklıdır.</p>
        </section>
        <div className="pt-4 border-t border-white/10 text-white/25 text-xs space-y-1">
          <p>Yasal dayanak: 6698 Sayılı KVKK (RG: 07.04.2016 / 29677)</p>
          <p>Son güncelleme: Haziran 2026</p>
        </div>
      </div>
    </div>
  )
}
