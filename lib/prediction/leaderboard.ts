import { supabase } from '../supabase'

export async function saveToLeaderboard(nickname: string, predictions: any, email?: string, user_id?: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('predictions')
    .insert([{ nickname: nickname.trim(), predictions, score: 0, email: email ?? null, user_id: user_id ?? null }])
    .select('id')
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return null
  }
  return data.id
}

export async function getLeaderboard(limit = 100) {
  const { data, error } = await supabase
    .from('predictions')
    .select('id, nickname, score, created_at')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data
}

export async function getTotalCount(): Promise<number> {
  const { count, error } = await supabase
    .from('predictions')
    .select('*', { count: 'exact', head: true })

  if (error) return 0
  return count ?? 0
}
