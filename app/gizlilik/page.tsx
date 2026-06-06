export default function GizlilikPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-2xl font-bold text-white mb-2">Gizlilik Politikası</h1>
      <p className="text-white/30 text-xs mb-8">Son güncelleme: Haziran 2026</p>
      <div className="space-y-6 text-sm leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Veri Sorumlusu</h2>
          <p>
            finalyolu.com ("Platform"), 2026 FIFA Dünya Kupası temalı bağımsız bir fan tahmin platformudur.
            Kişisel verileriniz, 6698 sayılı KVKK kapsamında Platform tarafından işlenmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Toplanan Veriler</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>E-posta adresi (kimlik doğrulama için)</li>
            <li>Seçilen kullanıcı adı</li>
            <li>Tahmin verileri (anonim istatistik olarak işlenir)</li>
            <li>KVKK ve pazarlama onay kaydı ile tarihi</li>
            <li>Teknik log verileri (IP adresi, tarayıcı bilgisi — Vercel altyapısı)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Çerezler (Cookie)</h2>
          <p className="mb-2">Platform yalnızca şu çerezleri kullanır:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li><span className="text-white">Zorunlu teknik çerezler:</span> Oturum yönetimi ve güvenlik (Supabase auth)</li>
            <li><span className="text-white">Tercih çerezi:</span> Dil seçimi ve cookie onay durumu (localStorage)</li>
          </ul>
          <p className="mt-2 text-white/50">
            Üçüncü taraf reklam çerezi veya izleme pikseli kullanılmamaktadır.
            Google AdSense entegrasyonu yapıldığında bu politika güncellenecektir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Verilerin İşlenme Amacı</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Platforma güvenli erişim sağlamak</li>
            <li>Puan sıralamasını oluşturmak ve görüntülemek</li>
            <li>Teknik sorunları tespit etmek</li>
            <li>Açık rıza verilmesi halinde pazarlama e-postası göndermek</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Veri Güvenliği</h2>
          <p>
            Verileriniz endüstri standardı güvenlik önlemleriyle korunmaktadır.
            Kimlik doğrulama magic link yöntemiyle yapılır; şifre saklanmaz.
            Altyapı hizmetleri GDPR uyumlu Supabase ve Vercel üzerinde çalışmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Üçüncü Taraf Hizmetler</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Supabase Inc. — veritabanı ve kimlik doğrulama</li>
            <li>Vercel Inc. — barındırma ve CDN</li>
            <li>Resend Inc. — e-posta gönderimi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Haklarınız</h2>
          <p>
            KVKK Madde 11 kapsamındaki haklarınızı kullanmak için{' '}
            <span className="text-red-400">kvkk@finalyolu.com</span> adresine yazabilirsiniz.
            Detaylı bilgi için{' '}
            <a href="/kvkk" className="text-red-400 underline">KVKK Aydınlatma Metni</a>{' '}
            sayfamızı inceleyiniz.
          </p>
        </section>

        <div className="pt-4 border-t border-white/10 text-white/25 text-xs space-y-1">
          <p>Yasal dayanak: 6698 Sayılı KVKK · 5651 Sayılı İnternet Kanunu</p>
          <p>Son güncelleme: Haziran 2026</p>
        </div>
      </div>
    </div>
  )
}
