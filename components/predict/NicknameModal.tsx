"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface NicknameModalProps {
  predictions: any
  onClose: () => void
  onSaved: (id: string, nickname: string) => void
}

type Step = "form" | "sent"

function Checkbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className="w-4 h-4 rounded border transition-all duration-150"
          style={{
            background: checked ? '#dc2626' : 'rgba(255,255,255,0.05)',
            borderColor: checked ? '#dc2626' : 'rgba(255,255,255,0.2)',
          }}
        >
          {checked && (
            <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {children}
      </span>
    </label>
  )
}

export default function NicknameModal({ predictions, onClose, onSaved }: NicknameModalProps) {
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<Step>("form")
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [marketingAccepted, setMarketingAccepted] = useState(false)

  const canSubmit = nickname.trim() && email.trim() && kvkkAccepted && !loading

  async function handleSave() {
    const trimmed = nickname.trim()
    const emailTrimmed = email.trim().toLowerCase()
    if (!trimmed) { setError("Kullanıcı adı gerekli"); return }
    if (trimmed.length < 2 || trimmed.length > 20) { setError("Kullanıcı adı 2-20 karakter olmalı"); return }
    if (!emailTrimmed || !emailTrimmed.includes("@")) { setError("Geçerli bir e-posta adresi gir"); return }
    if (!kvkkAccepted) { setError("Devam etmek için sözleşmeyi kabul etmen gerekiyor"); return }

    setLoading(true)
    setError("")

    const { error: dbError } = await supabase
      .from('pending_predictions')
      .insert([{
        email: emailTrimmed,
        nickname: trimmed,
        predictions,
        kvkk_accepted: true,
        marketing_accepted: marketingAccepted,
        consent_at: new Date().toISOString(),
      }])

    if (dbError) {
      setLoading(false)
      setError("Kayıt sırasında hata oluştu, tekrar dene")
      return
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: emailTrimmed,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (authError) {
      setError("Mail gönderilemedi, tekrar dene")
      return
    }

    setStep("sent")
  }

  if (step === "sent") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-white mb-2">Mail Gönderildi!</h2>
          <p className="text-white/50 text-sm mb-1">
            <span className="text-white font-medium">{email}</span> adresine giriş linki gönderdik.
          </p>
          <p className="text-white/40 text-sm mb-6">
            Maildeki butona tıklayınca tahminlerin otomatik kaydedilecek.
          </p>
          <button onClick={onClose} className="w-full py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all text-sm">
            Tamam
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold text-white">Sıralamaya Katıl</h2>
          <p className="text-white/50 text-sm mt-2">Tahminini kaydet, turnuva boyunca sıranı takip et</p>
        </div>

        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Kullanıcı adın (örn: TahminKralı)"
            maxLength={20}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors text-sm"
            autoFocus
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSave()}
            placeholder="E-posta adresin"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors text-sm"
          />
        </div>

        {/* KVKK Onay Bölümü */}
        <div className="space-y-3 mb-4 px-1">
          {/* Zorunlu — KVKK */}
          <Checkbox id="kvkk" checked={kvkkAccepted} onChange={setKvkkAccepted}>
            <span>
              <a href="/sozlesme" target="_blank" rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 transition-colors"
                style={{ color: '#f87171' }}
                onClick={e => e.stopPropagation()}>
                Kullanıcı Sözleşmesi
              </a>
              {' '}ve{' '}
              <a href="/kvkk" target="_blank" rel="noopener noreferrer"
                className="font-medium underline underline-offset-2 transition-colors"
                style={{ color: '#f87171' }}
                onClick={e => e.stopPropagation()}>
                KVKK Aydınlatma Metni
              </a>
              {'\'ni okudum, kabul ediyorum.'}
              <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </Checkbox>

          {/* İsteğe Bağlı — Pazarlama */}
          <Checkbox id="marketing" checked={marketingAccepted} onChange={setMarketingAccepted}>
            finalyolu.com ve sponsorlarının turnuva güncellemeleri, ödüllü yarışmalar ve pazarlama
            iletilerini e-posta yoluyla göndermesine onay veriyorum.{' '}
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>(İsteğe bağlı)</span>
          </Checkbox>
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <p className="text-white/25 text-xs mb-4">
          Mailine bir giriş linki göndereceğiz — şifre yok, spam yok.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all text-sm"
          >
            Atla
          </button>
          <button
            onClick={handleSave}
            disabled={!canSubmit}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all text-sm"
          >
            {loading ? "..." : "Link Gönder"}
          </button>
        </div>
      </div>
    </div>
  )
}
