"use client"
import { useEffect, useState } from "react"
import { getLeaderboard, getTotalCount } from "@/lib/prediction/leaderboard"
import Link from "next/link"

type Entry = { id: string; nickname: string; score: number; created_at: string }
const MEDALS = ["🥇", "🥈", "🥉"]

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [myId, setMyId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("finalyolu_leaderboard_id")
    if (saved) setMyId(saved)
    async function load() {
      const [data, count] = await Promise.all([getLeaderboard(100), getTotalCount()])
      setEntries(data)
      setTotal(count)
      setLoading(false)
    }
    load()
  }, [])

  const myRank = myId ? entries.findIndex(e => e.id === myId) + 1 : null

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">🏆</div>
          <h1 className="text-3xl font-black tracking-tight">Global Sıralama</h1>
          <p className="text-white/40 text-sm mt-2">{total > 0 ? `${total.toLocaleString()} tahmin yapıldı` : ""}</p>
          {myRank ? (
            <div className="inline-block mt-3 px-4 py-1.5 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold">
              Sıran: #{myRank}
            </div>
          ) : null}
        </div>
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
          <p className="text-yellow-400 text-sm">⚽ Puanlar turnuva başladıktan sonra güncellenecek (11 Haziran 2026)</p>
        </div>
        {loading ? (
          <div className="text-center text-white/30 py-20"><div className="text-3xl mb-3">⏳</div><p>Yükleniyor...</p></div>
        ) : entries.length === 0 ? (
          <div className="text-center text-white/30 py-20"><div className="text-3xl mb-3">🌍</div><p>Henüz tahmin yok. İlk sen ol!</p></div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const isMe = entry.id === myId
              const rank = i + 1
              return (
                <div key={entry.id} className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${isMe ? "bg-red-600/15 border-red-500/40" : rank <= 3 ? "bg-white/5 border-white/15" : "bg-white/[0.03] border-white/[0.08]"}`}>
                  <div className="w-8 text-center text-lg font-black">
                    {rank <= 3 ? MEDALS[rank - 1] : <span className="text-white/30 text-sm">#{rank}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`font-semibold truncate block ${isMe ? "text-red-400" : "text-white"}`}>
                      {entry.nickname}{isMe && <span className="ml-2 text-xs text-red-400/70">(sen)</span>}
                    </span>
                    <span className="text-white/25 text-xs">{new Date(entry.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-black ${rank <= 3 ? "text-yellow-400" : "text-white/60"}`}>{entry.score}</div>
                    <div className="text-white/25 text-xs">puan</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/predict" className="inline-block px-8 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-all">
            Tahmin Yap
          </Link>
        </div>
      </div>
    </main>
  )
}
