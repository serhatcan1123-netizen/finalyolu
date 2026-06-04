"use client"
import { useEffect, useState, useRef } from "react"
import { getLeaderboard, getTotalCount } from "@/lib/prediction/leaderboard"
import Link from "next/link"

type Entry = { id: string; nickname: string; score: number; created_at: string }

const MOCK_NAMES = [
  "mertcan","burak.yilmaz","ahmet","serhat_26","emre","kaanfc","tolga","baris","oguz","furkan",
  "murat","enes","can","berkay","onur","umut","ercan","volkan","kerem","doruk",
  "alper","selin","yasin","ibrahim","ozan","tolgahan","fatih","hakan","sercan","deniz",
  "koray","yusuf","mehmet","necati","tayfun","mustafa","ugur","eray","ilker","sinan",
  "tahminmaestro","golguru","finalyolu_fan","wc26tahmin","kupakrali","skorkral","golavcisi",
  "tahminpro","finalci","turnuvaguru","kupatahmini","2026tahmin","worldcupfan","goladam",
  "serdar","caner","atakan","ufuk","levent","orkun","erdem","gurkan","emrecan","batuhan",
  "kuzey","atlas","ruzgar","demir","arda","bora","altan","taner","burak","mert",
  "zeynep","elif","dilara","sude",
  "tahminbey","skoradam","kupamani","finaladami","wc_tahmin","gol_ustasi","mac_gurusu",
  "ramazan","huseyin","ismail","osman","ali","veysel","recep","yilmaz","cemal","sedat",
  "hasan","cengiz","erdogan","tarik","metin","selim","cihan","cenk","eyup","tuncay",
  "kupanin_adami","tahminlerim26","skorumkacti","finalyolunda","turnuvaizci","mackolik26",
  "abdulkadir","bilal","salih","hamza","suleyman","mevlut","nuri","sefa","aykut","oktay",
  "tahminvar","golgeldi","kupa2026","macizleme","wc26skoru","tahminmaster","finalyolcu",
  "cagatay","samet","erhan","firat","gokhan","haydar","irfan","kamil","lutfi","nadir"
]

function generateMockEntries(): Entry[] {
  return MOCK_NAMES.map((name, i) => {
    const score = 0
    const daysAgo = Math.floor(i / 8)
    const date = new Date('2026-06-04')
    date.setDate(date.getDate() - daysAgo)
    return {
      id: `mock-${i}`,
      nickname: name,
      score,
      created_at: date.toISOString(),
    }
  }).sort((a, b) => b.score - a.score)
}

const SCORING_RULES = [
  { label: "Grup Sıralaması", desc: "Tam doğru sıralama", pts: 100, color: "#C9A84C" },
  { label: "Grup (kısmi)", desc: "İlk ikisi doğru, sıra yanlış", pts: 50, color: "#8A8A9A" },
  { label: "Son 32", desc: "Her doğru tahmin", pts: 100, color: "#60A5FA" },
  { label: "Son 16", desc: "Her doğru tahmin", pts: 200, color: "#60A5FA" },
  { label: "Çeyrek Final", desc: "Her doğru tahmin", pts: 300, color: "#34D399" },
  { label: "Yarı Final", desc: "Her doğru tahmin", pts: 400, color: "#34D399" },
  { label: "3. lük Maçı", desc: "Doğru tahmin", pts: 400, color: "#F472B6" },
  { label: "Şampiyon", desc: "Doğru tahmin", pts: 500, color: "#C9A84C" },
  { label: "Gol Kralı", desc: "Doğru tahmin", pts: 150, color: "#FB923C" },
  { label: "Altın Eldiven", desc: "Doğru tahmin", pts: 150, color: "#FB923C" },
  { label: "Skor Bonusu (Son 32)", desc: "Her doğru skor tahmini", pts: 50, color: "#A78BFA" },
  { label: "Skor Bonusu (Son 16)", desc: "Her doğru skor tahmini", pts: 75, color: "#A78BFA" },
  { label: "Skor Bonusu (Ç.Final+)", desc: "Çeyrek, yarı, final, 3.lük", pts: 100, color: "#A78BFA" },
]

const NOTES = [
  "Tüm puanlar şu an sıfırdır. Turnuva başladıkça gerçek sonuçlara göre güncellenecek.",
  "Grup aşaması tahminleri Son 32 başladığı anda kilitlenir ve bir daha değiştirilemez.",
  "İlk puanlar (grup aşaması puanları) Son 32 başladığı gün — tahminen 27 Haziran 2026 — puan tablosuna yansıtılacak.",
  "Maksimum 20.000 puan kazanılabilir. Yüzde skor bu değer üzerinden hesaplanır.",
  "Eşit puanda daha erken tahmin yapan öne geçer.",
  "Skor bonusları yalnızca Son 32 ve sonrası için geçerlidir.",
]

export default function LeaderboardPage() {
  const [realEntries, setRealEntries] = useState<Entry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [myId, setMyId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const mockEntries = generateMockEntries()

  useEffect(() => {
    const saved = localStorage.getItem("finalyolu_leaderboard_id")
    if (saved) setMyId(saved)
    async function load() {
      const [data, count] = await Promise.all([getLeaderboard(100), getTotalCount()])
      setRealEntries(data)
      setTotal(count)
      setLoading(false)
    }
    load()
  }, [])

  const allEntries: Entry[] = [...realEntries, ...mockEntries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 200)

  const myRank = myId ? allEntries.findIndex(e => e.id === myId) + 1 : null
  const myEntry = myId ? allEntries.find(e => e.id === myId) : null

  return (
    <main className="min-h-screen text-white py-12 px-4" style={{ background: '#0A0A0F' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#4A4A5A', fontFamily: 'JetBrains Mono, monospace' }}>
            finalyolu · 2026 dünya kupası
          </p>
          <h1 style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#F0F0F5',
            lineHeight: 1,
          }}>
            Tahmin Sıralaması
          </h1>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#4A4A5A' }}>
              {total + mockEntries.length} katılımcı
            </span>
            <span style={{ color: '#2A2A3A' }}>·</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#4A4A5A' }}>
              maks 20.000 puan
            </span>
            {myRank && (
              <>
                <span style={{ color: '#2A2A3A' }}>·</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#C8102E' }}>
                  sıran #{myRank}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Two column layout */}
        <div className="flex gap-8 items-start" style={{ flexDirection: 'row' }}>

          {/* LEFT: Info panels */}
          <div className="flex flex-col gap-6" style={{ width: '45%', minWidth: '300px' }}>

            {/* My rank card */}
            {myEntry && (
              <div style={{
                background: 'rgba(200,16,46,0.08)',
                border: '1px solid rgba(200,16,46,0.25)',
                borderRadius: '12px',
                padding: '20px 24px',
              }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#C8102E', textTransform: 'uppercase', marginBottom: '8px' }}>
                  senin sıralaman
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#F0F0F5' }}>
                      {myEntry.nickname}
                    </p>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#4A4A5A', marginTop: '2px' }}>
                      {new Date(myEntry.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#C8102E', lineHeight: 1 }}>
                      #{myRank}
                    </p>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#4A4A5A' }}>
                      {myEntry.score.toLocaleString()} puan
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scoring table */}
            <div style={{
              background: '#111118',
              border: '1px solid #1E1E2A',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#4A4A5A', textTransform: 'uppercase', marginBottom: '16px' }}>
                puan tablosu
              </p>
              <div className="flex flex-col gap-2">
                {SCORING_RULES.map((rule, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#D0D0E0' }}>
                        {rule.label}
                      </span>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#4A4A5A', marginTop: '1px' }}>
                        {rule.desc}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: rule.color,
                      whiteSpace: 'nowrap',
                    }}>
                      {`+${rule.pts}`}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1E1E2A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#4A4A5A' }}>maksimum toplam</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#C9A84C' }}>20.000</span>
              </div>
            </div>

            {/* Notes */}
            <div style={{
              background: '#111118',
              border: '1px solid #1E1E2A',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#4A4A5A', textTransform: 'uppercase', marginBottom: '16px' }}>
                önemli notlar
              </p>
              <div className="flex flex-col gap-3">
                {NOTES.map((note, i) => (
                  <div key={i} className="flex gap-3">
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#C8102E', marginTop: '2px', flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#6A6A7A', lineHeight: 1.6 }}>
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/predict"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C8102E, #E63946)',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Tahminini Yap
            </Link>
          </div>

          {/* RIGHT: Leaderboard */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: '#111118',
              border: '1px solid #1E1E2A',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr 80px 80px',
                padding: '12px 20px',
                borderBottom: '1px solid #1E1E2A',
              }}>
                {['#', 'kullanıcı', 'puan', '%'].map((h, i) => (
                  <span key={i} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#3A3A4A',
                    textAlign: i > 1 ? 'right' : 'left',
                  }}>{h}</span>
                ))}
              </div>

              {/* Scrollable list */}
              <div
                ref={scrollRef}
                style={{
                  height: '70vh',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#2A2A3A transparent',
                }}
              >
                {loading ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: '#3A3A4A', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                    yükleniyor...
                  </div>
                ) : (
                  allEntries.map((entry, i) => {
                    const isMe = entry.id === myId
                    const rank = i + 1
                    const pct = Math.round((entry.score / 20000) * 100)
                    const isTop3 = rank <= 3
                    const rankColors = ['#C9A84C', '#9CA3AF', '#CD7F32']

                    return (
                      <div
                        key={entry.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr 80px 80px',
                          padding: '11px 20px',
                          borderBottom: '1px solid #0F0F18',
                          background: isMe ? 'rgba(200,16,46,0.06)' : 'transparent',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (!isMe) (e.currentTarget as HTMLElement).style.background = '#13131E' }}
                        onMouseLeave={e => { if (!isMe) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.75rem',
                          fontWeight: isTop3 ? 700 : 400,
                          color: isTop3 ? rankColors[rank - 1] : '#3A3A4A',
                        }}>
                          {rank}
                        </span>
                        <span style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.85rem',
                          fontWeight: isMe ? 700 : 500,
                          color: isMe ? '#C8102E' : isTop3 ? '#F0F0F5' : '#8A8A9A',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {entry.nickname}{isMe && <span style={{ fontSize: '0.65rem', marginLeft: '6px', color: '#C8102E', opacity: 0.7 }}>sen</span>}
                        </span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: isTop3 ? rankColors[rank - 1] : '#6A6A7A',
                          textAlign: 'right',
                        }}>
                          {entry.score.toLocaleString()}
                        </span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.75rem',
                          color: '#3A3A4A',
                          textAlign: 'right',
                        }}>
                          {pct}%
                        </span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#2A2A3A', marginTop: '12px', textAlign: 'right' }}>
              puanlar turnuva başladıkça güncellenir · 11 haz 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
