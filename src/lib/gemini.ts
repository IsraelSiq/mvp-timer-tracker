import type { EnrichedMVP } from '@/types'
import { formatDateTime } from '@/utils/timer'

export async function askGemini(mvps: EnrichedMVP[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string
  if (!apiKey) return '⚠️ VITE_GEMINI_API_KEY não configurada. Adicione no .env e faça redeploy.'

  const snapshot = mvps.slice(0, 10).map(item => ({
    name: item.name,
    map: item.map,
    status: item.status,
    minRespawn: item.minRespawnDate ? formatDateTime(item.minRespawnDate) : 'sem registro',
    maxRespawn: item.maxRespawnDate ? formatDateTime(item.maxRespawnDate) : 'sem registro',
    priority: item.priority,
    notes: item.notes,
    lastKiller: item.latest?.killer ?? 'sem info',
  }))

  const prompt = `Você é um analista de rota de MVP para Ragnarok Online no servidor privado TRUEMMO.
Responda em português do Brasil, de forma objetiva e direta.
Considere: prioridade do boss, status da janela de respawn, chance de disputa e praticidade de deslocamento.
Indique: 1) o MELHOR alvo agora com justificativa rápida; 2) no máximo 2 alternativas.
Dados atuais dos timers: ${JSON.stringify(snapshot)}`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    return `Erro na API Gemini: ${res.status} — ${err}`
  }

  const data = await res.json()
  return (
    data?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join('\n') ??
    'Gemini não retornou sugestão.'
  )
}
