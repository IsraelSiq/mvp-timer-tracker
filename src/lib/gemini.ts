import type { EnrichedMVP } from '@/types'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
const MODEL   = 'gemini-2.0-flash'

export async function askGemini(mvps: EnrichedMVP[]): Promise<string> {
  const available = mvps.filter(m => m.status === 'window-open' || m.status === 'soon')
  const unknown   = mvps.filter(m => m.status === 'mvp')
  const waiting   = mvps.filter(m => m.status === 'far')

  // Fallback local se não tiver API key
  if (!API_KEY) {
    if (available.length > 0) {
      const top = available.sort((a, b) => b.priority - a.priority)[0]
      return `🎯 Sugestão local: **${top.name}** (${top.map}) — janela aberta agora! Prioridade ${top.priority}/10.`
    }
    if (waiting.length > 0) {
      const next = waiting.sort((a, b) =>
        (a.minRespawnDate?.getTime() ?? 0) - (b.minRespawnDate?.getTime() ?? 0)
      )[0]
      return `⏳ Próximo MVP: **${next.name}** — janela abre em breve.`
    }
    return `⚪ Nenhum MVP com registro ativo. Registre kills para começar o tracking.`
  }

  const prompt = [
    'Você é um assistente especialista em Ragnarok Online clássico para o servidor TRUEMMO.',
    'Com base nos dados abaixo, indique qual MVP o grupo deve caçar agora e por quê.',
    'Responda em português, de forma objetiva e direta (máx 3 linhas).',
    '',
    `Janela aberta (${available.length}): ${available.map(m => `${m.name} (P${m.priority})`).join(', ') || 'nenhum'}`,
    `Sem registro (${unknown.length}): ${unknown.map(m => m.name).join(', ') || 'nenhum'}`,
    `Aguardando (${waiting.length}): ${waiting.map(m => `${m.name} ~${Math.round((m.minRespawnDate?.getTime() ?? Date.now() - Date.now()) / 60000)}min`).join(', ') || 'nenhum'}`,
  ].join('\n')

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )

  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sem resposta da IA.'
}
