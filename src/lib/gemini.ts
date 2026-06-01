import type { EnrichedMVP } from '@/types'
import { formatDateTime } from '@/utils/timer'

// Models to try in order — fallback if one is unavailable
const MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
]

function parseRetryDelay(body: string): number | null {
  try {
    const json = JSON.parse(body)
    const retryDelay = json?.error?.details?.find(
      (d: { '@type': string }) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
    )?.retryDelay as string | undefined
    if (!retryDelay) return null
    return Math.ceil(parseFloat(retryDelay))
  } catch {
    return null
  }
}

async function tryModel(model: string, prompt: string, apiKey: string): Promise<{ ok: boolean; status: number; text: string }> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    )
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
  } catch (e) {
    return { ok: false, status: 0, text: String(e) }
  }
}

export async function askGemini(mvps: EnrichedMVP[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string
  if (!apiKey) return '⚠️ VITE_GEMINI_API_KEY não configurada. Adicione nas variáveis de ambiente da Vercel e faça redeploy.'

  const snapshot = mvps.slice(0, 10).map(item => ({
    name: item.name,
    map: item.map,
    status: item.status,
    minRespawn: item.minRespawnDate ? formatDateTime(item.minRespawnDate) : 'sem registro',
    maxRespawn: item.maxRespawnDate ? formatDateTime(item.maxRespawnDate) : 'sem registro',
    priority: item.priority,
    lastKiller: item.latest?.killer ?? 'sem info',
  }))

  const prompt = `Você é um analista de rota de MVP para Ragnarok Online (servidor TRUEMMO).
Responda em português do Brasil, de forma objetiva.
Indique: 1) melhor alvo agora com justificativa rápida; 2) até 2 alternativas.
Dados: ${JSON.stringify(snapshot)}`

  for (const model of MODELS) {
    const { ok, status, text } = await tryModel(model, prompt, apiKey)

    if (ok) {
      try {
        const data = JSON.parse(text)
        return (
          data?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join('\n') ??
          'Gemini não retornou sugestão.'
        )
      } catch {
        return 'Erro ao processar resposta do Gemini.'
      }
    }

    if (status === 429) {
      const retry = parseRetryDelay(text)
      const retryMsg = retry ? ` Tente em ~${retry}s.` : ' Aguarde alguns minutos.'
      return `⏳ Limite de quota atingido (${model}).${retryMsg}`
    }

    if (status === 401 || status === 403) {
      return '🔑 Chave inválida ou sem permissão. Verifique VITE_GEMINI_API_KEY na Vercel.'
    }

    // 404 = modelo não disponível, tenta o próximo
    if (status === 404) continue

    // outro erro — para e reporta
    return `❌ Erro na API Gemini (${status}). Tente novamente.`
  }

  return '❌ Nenhum modelo Gemini disponível para esta chave. Verifique seu projeto no Google AI Studio.'
}
