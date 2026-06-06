export default function GizlilikPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-2xl font-bold text-white mb-2">Gizlilik ve Çerez Politikası</h1>
      <p className="text-white/30 text-xs mb-8">5651 Sayılı Kanun ve GDPR Uyumlu — Son güncelleme: Haziran 2026</p>
      <div className="space-y-6 text-sm leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Veri Sorumlusu</h2>
          <p>
            finalyolu.com ("Platform") bağımsız bir fan platformudur. Kişisel verileriniz
            6698 sayılı KVKK ve AB Genel Veri Koruma Tüzüğü (GDPR) kapsamında işlenmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Toplanan Veriler</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>E-posta adresi (kimlik doğrulama)</li>
            <li>Kullanıcı adı (takma ad)</li>
            <li>Tahmin verileri (anonim istatistik olarak işlenir)</li>
            <li>KVKK / pazarlama onay kaydı ve tarihi</li>
            <li>
              <strong className="text-white">IP adresi ve erişim zaman damgası</strong>{" "}
              — 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu
              Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun'un
              5. maddesi uyarınca yasal zorunluluk nedeniyle{" "}
              <strong className="text-white">2 (iki) yıl</strong> süreyle sunucularımızda
              saklanmaktadır. Bu veriler yalnızca yetkili kamu kurumlarının resmi talebi
              üzerine paylaşılır.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Çerez (Cookie) Politikası</h2>
          <p className="mb-2">Platform yalnızca aşağıdaki çerezleri kullanır:</p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>
              <span className="text-white">Zorunlu Teknik Çerezler:</span> Oturum yönetimi
              ve güvenlik amacıyla Supabase auth sistemi tarafından yerleştirilir.
              Bu çerezler platformun çalışması için zorunludur; devre dışı bırakılamaz.
            </li>
            <li>
              <span className="text-white">Tercih Çerezleri:</span> Dil seçimi ve çerez
              onay durumu tarayıcı localStorage'ında tutulur.
            </li>
            <li>
              <span className="text-white">Analitik Çerezler (İsteğe Bağlı):</span> Yalnızca
              onay vermeniz halinde anonim kullanım istatistikleri toplanabilir.
            </li>
            <li>
              <span className="text-white">Reklam Çerezleri:</span> Google AdSense
              entegrasyonu aktif olduğunda üçüncü taraf reklam çerezleri kullanılabilir.
              Bu durum ayrıca bildirilecek ve yeniden onayınız alınacaktır.
            </li>
          </ul>
          <p className="mt-2 text-white/50">
            Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
            Zorunlu teknik çerezlerin engellenmesi platform işlevselliğini olumsuz etkiler.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. E-posta Güvenliği</h2>
          <p>
            E-posta adresiniz yalnızca magic link kimlik doğrulama ve (onay vermeniz
            halinde) turnuva bildirimleri için kullanılır. Üçüncü taraflara satılmaz,
            kiralanmaz veya izinsiz paylaşılmaz. Tüm e-posta iletişimi TLS şifrelemesiyle
            korunmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Üçüncü Taraf Hizmetler</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Supabase Inc. — veritabanı ve auth (GDPR uyumlu, ABD)</li>
            <li>Vercel Inc. — barındırma ve CDN (GDPR uyumlu, ABD)</li>
            <li>Resend Inc. — e-posta gönderimi (GDPR uyumlu, ABD)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Veri Saklama Süreleri</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Kullanıcı hesabı ve tahmin verileri: hizmet sona erişinden itibaren 1 yıl</li>
            <li>IP ve erişim logları: 5651 sayılı Kanun gereği 2 yıl</li>
            <li>Pazarlama onay kaydı: onay geri çekilene dek</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Haklarınız</h2>
          <p>
            KVKK Madde 11 kapsamındaki talepleriniz için{" "}
            <span className="text-red-400">kvkk@finalyolu.com</span> adresine yazabilirsiniz.
            Talepler 30 gün içinde yanıtlanır.
          </p>
        </section>

        <div className="pt-4 border-t border-white/10 text-white/25 text-xs space-y-1">
          <p>Yasal dayanak: 6698 Sayılı KVKK · 5651 Sayılı Kanun · GDPR</p>
          <p>Son güncelleme: Haziran 2026</p>
        </div>
      </div>
    </div>
  )
}
