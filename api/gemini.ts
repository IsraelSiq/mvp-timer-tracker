import type { VercelRequest, VercelResponse } from '@vercel/node'

const MODEL = 'gemini-2.0-flash'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const API_KEY = process.env.GEMINI_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' })
  }

  try {
    const { prompt } = req.body as { prompt: string }
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    )

    if (!upstream.ok) {
      const text = await upstream.text()
      return res.status(upstream.status).json({ error: text })
    }

    const data = await upstream.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sem resposta da IA.'
    return res.status(200).json({ text })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({ error: message })
  }
}
