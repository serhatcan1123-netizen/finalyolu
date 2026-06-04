"use client"
import { useEffect } from "react"
import confetti from "canvas-confetti"

interface SuccessModalProps {
  nickname: string
  onClose: () => void
}

export default function SuccessModal({ nickname, onClose }: SuccessModalProps) {
  useEffect(() => {
    const fire = (particleRatio: number, opts: object) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }
    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-white mb-2">Tahmin Kaydedildi!</h2>
        <p className="text-white/60 text-sm mb-1">
          Hoş geldin, <span className="text-white font-semibold">{nickname}</span>!
        </p>
        <p className="text-white/40 text-sm mb-6">
          Grup aşaması tamamlanınca puanların güncellenecek ve sana mail göndereceğiz.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left space-y-2">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Turnuva takvimi</p>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Turnuva başlangıcı</span>
            <span className="text-white">11 Haziran 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Grup tahminleri kilitlenir</span>
            <span className="text-white">~27 Haziran 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Final</span>
            <span className="text-white">19 Temmuz 2026</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a href="/leaderboard" className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all text-sm text-center">
            Sıralamayı Gör
          </a>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all text-sm">
            Tahmine Dön
          </button>
        </div>
      </div>
    </div>
  )
}
