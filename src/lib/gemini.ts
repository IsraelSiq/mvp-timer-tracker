import type { EnrichedMVP } from '@/types'

export async function askGemini(mvps: EnrichedMVP[]): Promise<string> {
  const available = mvps.filter(m => m.status === 'window-open' || m.status === 'soon')
  const unknown   = mvps.filter(m => m.status === 'mvp')
  const waiting   = mvps.filter(m => m.status === 'far')

  const prompt = [
    'Você é um assistente especialista em Ragnarok Online clássico para o servidor TRUEMMO.',
    'Com base nos dados abaixo, indique qual MVP o grupo deve caçar agora e por quê.',
    'Responda em português, de forma objetiva e direta (máx 3 linhas).',
    '',
    `Janela aberta (${available.length}): ${available.map(m => `${m.name} (P${m.priority})`).join(', ') || 'nenhum'}`,
    `Sem registro (${unknown.length}): ${unknown.map(m => m.name).join(', ') || 'nenhum'}`,
    `Aguardando (${waiting.length}): ${waiting.map(m => `${m.name} ~${Math.round((m.minRespawnDate?.getTime() ?? Date.now() - Date.now()) / 60000)}min`).join(', ') || 'nenhum'}`,
  ].join('\n')

  // Tenta o proxy serverless — funciona em produção (Vercel) e dev (vercel dev)
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    if (!res.ok) throw new Error(`proxy error ${res.status}`)
    const data = await res.json() as { text?: string; error?: string }
    if (data.error) throw new Error(data.error)
    return data.text ?? 'Sem resposta da IA.'
  } catch {
    // Fallback local se proxy indisponível (ex: npm run dev sem vercel dev)
    if (available.length > 0) {
      const top = [...available].sort((a, b) => b.priority - a.priority)[0]
      return `🎯 Sugestão local: **${top.name}** (${top.map}) — janela aberta agora! Prioridade ${top.priority}/10.`
    }
    if (waiting.length > 0) {
      const next = [...waiting].sort((a, b) =>
        (a.minRespawnDate?.getTime() ?? 0) - (b.minRespawnDate?.getTime() ?? 0)
      )[0]
      return `⏳ Próximo MVP: **${next.name}** — janela abre em breve.`
    }
    return `⚪ Nenhum MVP com registro ativo. Registre kills para começar o tracking.`
  }
}
