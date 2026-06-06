export default function KullanimSartlariPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-white/80">
      <h1 className="text-2xl font-bold text-white mb-2">Kullanım Şartları ve Yarışma Katılım Şartnamesi</h1>
      <p className="text-white/30 text-xs mb-8">Yetenek ve Bilgi Yarışması — MPİ Mevzuatına Uygun</p>
      <div className="space-y-6 text-sm leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-2">1. Genel Hükümler</h2>
          <p>
            Bu şartname, finalyolu.com üzerinde düzenlenen 2026 FIFA Dünya Kupası Tahmin
            Yarışması'na ("Yarışma") katılım koşullarını düzenler. Platforma kayıt olarak
            bu şartnameyi okuduğunuzu ve kabul ettiğinizi beyan etmiş sayılırsınız.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">2. Yarışmanın Hukuki Niteliği</h2>
          <p className="mb-2">
            finalyolu.com Tahmin Yarışması, 7258 sayılı Futbol ve Diğer Spor Müsabakalarında
            Bahis ve Şans Oyunları Düzenlenmesi Hakkında Kanun ile Milli Piyango İdaresi (MPİ)
            mevzuatı kapsamında{" "}
            <strong className="text-white">şans oyunu, piyango veya çekiliş niteliği taşımamaktadır.</strong>
          </p>
          <p>
            Bu yarışma; katılımcıların futbol bilgisi, istatistik analizi ve stratejik
            öngörü yeteneklerini ölçen bir{" "}
            <strong className="text-white">yetenek ve bilgi yarışmasıdır.</strong>{" "}
            Kazananlar yalnızca nesnel puan sıralamasına göre belirlenir; rastgele seçim,
            kura veya herhangi bir şans unsuru içermez.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">3. Katılım Koşulları</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>18 yaşını doldurmuş olmak (18 yaş altı katılım yasaktır)</li>
            <li>Geçerli bir e-posta adresiyle kayıt olmak</li>
            <li>Her kullanıcı yalnızca bir hesap açabilir; çoklu hesap açmak diskalifiye nedenidir</li>
            <li>Tahminlerin turnuva başlamadan (11 Haziran 2026, 19:00 CST) önce tamamlanmış olması</li>
            <li>Platform çalışanları ve birinci derece yakınları yarışmaya katılamaz</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">4. Puan Sistemi ve Kazanan Belirleme</h2>
          <p className="mb-2">Kazananlar aşağıdaki nesnel kriterlere göre belirlenir:</p>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>Grup aşaması tam doğru: 100 puan / kısmi doğru: 50 puan</li>
            <li>Son 32 kazananı: 150 puan/takım</li>
            <li>Son 16 kazananı: 250 puan/takım</li>
            <li>Çeyrek Final: 400 puan/takım</li>
            <li>Yarı Final: 500 puan/takım</li>
            <li>3. lük maçı: 600 puan</li>
            <li>Şampiyon tahmini: 600 puan</li>
            <li>Gol Kralı tahmini: 200 puan</li>
            <li>Altın Eldiven tahmini: 200 puan</li>
            <li>Skor bonusu (Son 32): 75 puan/maç</li>
            <li>Skor bonusu (Son 16): 100 puan/maç</li>
            <li>Skor bonusu (Çeyrek Final ve üstü): 150 puan/maç</li>
          </ul>
          <p className="mt-3">
            <strong className="text-white">Puan Eşitliği Durumu:</strong> Birden fazla
            kullanıcının puanının eşit olması halinde, platforma{" "}
            <strong className="text-white">daha erken kayıt olan kullanıcı</strong> öncelikli
            sıralamaya alınır. Bu kriter şansa değil, katılım zamanlamasına dayandığından
            MPİ mevzuatı kapsamında şans unsuru içermemektedir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">5. Ödüller</h2>
          <ul className="list-disc list-inside space-y-1 text-white/70">
            <li>1. sıra: Gerçek boyutlu 2026 Dünya Kupası maketi</li>
            <li>2. sıra: Seçilen takımın resmi forması</li>
            <li>3. sıra: 50 USD değerinde dijital hediye kartı</li>
          </ul>
          <p className="mt-2 text-white/50">
            Ödüller ayni olup nakit karşılığı verilmez. Platform, ödül değerini önceden
            haber vererek değiştirme hakkını saklı tutar. Ödüller kargo veya dijital
            teslimat yoluyla iletilir; kargo bedeli platforma aittir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">6. Diskalifiye ve İptal</h2>
          <p>
            Hile, bot kullanımı, sistem manipülasyonu veya çoklu hesap tespiti halinde
            kullanıcı derhal diskalifiye edilir ve tüm puanları sıfırlanır. Platform bu
            kararı gerekçe göstermeksizin uygulayabilir.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-2">7. Uygulanacak Hukuk</h2>
          <p>
            Bu şartname Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda
            İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </section>

        <div className="pt-4 border-t border-white/10 text-white/25 text-xs">
          <p>Son güncelleme: Haziran 2026</p>
        </div>
      </div>
    </div>
  )
}
