"use client"
import { useState } from "react"
import { saveToLeaderboard } from "@/lib/prediction/leaderboard"

interface NicknameModalProps {
  predictions: any
  onClose: () => void
  onSaved: (id: string, nickname: string) => void
}

export default function NicknameModal({ predictions, onClose, onSaved }: NicknameModalProps) {
  const [nickname, setNickname] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSave() {
    const trimmed = nickname.trim()
    if (!trimmed) { setError("Kullanıcı adı gerekli"); return }
    if (trimmed.length < 2 || trimmed.length > 20) { setError("2-20 karakter olmalı"); return }
    setLoading(true)
    setError("")
    const id = await saveToLeaderboard(trimmed, predictions)
    setLoading(false)
    if (!id) { setError("Kayıt sırasında hata oluştu, tekrar dene"); return }
    onSaved(id, trimmed)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold text-white">Sıralamaya Katıl</h2>
          <p className="text-white/50 text-sm mt-2">Tahminini kaydet ve dünya sıralamasında yerini al</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSave()}
            placeholder="Kullanıcı adın (örn: TahminKralı)"
            maxLength={20}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition-colors text-sm"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <p className="text-white/30 text-xs mt-2 text-right">{nickname.trim().length}/20</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all text-sm">
            Atla
          </button>
          <button onClick={handleSave} disabled={loading || !nickname.trim()} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all text-sm">
            {loading ? "..." : "Kaydet & Katıl"}
          </button>
        </div>
      </div>
    </div>
  )
}
