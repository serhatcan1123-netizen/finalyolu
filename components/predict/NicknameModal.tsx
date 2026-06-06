"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface NicknameModalProps {
  predictions: any
  onClose: () => void
  onSaved: (id: string, nickname: string) => void
}

type Step = "form" | "sent"

export default function NicknameModal({ predictions, onClose, onSaved }: NicknameModalProps) {
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<Step>("form")

  async function handleSave() {
    const trimmed = nickname.trim()
    const emailTrimmed = email.trim().toLowerCase()
    if (!trimmed) { setError("Kullanıcı adı gerekli"); return }
    if (trimmed.length < 2 || trimmed.length > 20) { setError("Kullanıcı adı 2-20 karakter olmalı"); return }
    if (!emailTrimmed || !emailTrimmed.includes("@")) { setError("Geçerli bir e-posta adresi gir"); return }

    setLoading(true)
    setError("")

    // Tahminleri Supabase'e kaydet (farklı tarayıcı sorunu çözümü)
    const { error: dbError } = await supabase
      .from('pending_predictions')
      .insert([{ email: emailTrimmed, nickname: trimmed, predictions }])

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

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <p className="text-white/25 text-xs mb-4">
          Mailine bir giriş linki göndereceğiz — şifre yok, spam yok.
        </p>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all text-sm">
            Atla
          </button>
          <button onClick={handleSave} disabled={loading || !nickname.trim() || !email.trim()} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all text-sm">
            {loading ? "..." : "Link Gönder"}
          </button>
        </div>
      </div>
    </div>
  )
}
