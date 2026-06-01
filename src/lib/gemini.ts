import type { EnrichedMVP } from '@/types'
import { formatDateTime } from '@/utils/timer'

// gemini-1.5-flash has a more generous free-tier quota than gemini-2.0-flash
const GEMINI_MODEL = 'gemini-1.5-flash'

function parseRetryDelay(body: string): number | null {
  try {
    const json = JSON.parse(body)
    const retryDelay = json?.error?.details?.find(
      (d: { '@type': string }) => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
    )?.retryDelay as string | undefined
    if (!retryDelay) return null
    // retryDelay is like "49s" or "49.068s"
    return Math.ceil(parseFloat(retryDelay))
  } catch {
    return null
  }
}

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

  let rawError = ''
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    )

    rawError = await res.text()

    if (!res.ok) {
      // 429 — quota exceeded
      if (res.status === 429) {
        const retry = parseRetryDelay(rawError)
        const retryMsg = retry ? ` Tente novamente em ~${retry}s.` : ' Aguarde alguns minutos.'
        return `⏳ Limite da API Gemini atingido (quota gratuita).${retryMsg}\n\nDica: o modelo ${GEMINI_MODEL} tem cota maior. Se continuar acontecendo, verifique seu plano em https://ai.dev/rate-limit`
      }
      // 401 / 403 — chave inválida
      if (res.status === 401 || res.status === 403) {
        return '🔑 Chave da API Gemini inválida ou sem permissão. Verifique VITE_GEMINI_API_KEY.'
      }
      return `❌ Erro na API Gemini (${res.status}). Tente novamente em instantes.`
    }

    const data = JSON.parse(rawError)
    return (
      data?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join('\n') ??
      'Gemini não retornou sugestão.'
    )
  } catch (e) {
    return `❌ Falha de conexão com Gemini. Verifique sua internet e tente novamente.\n${String(e)}`
  }
}
