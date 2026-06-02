import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as cheerio from 'cheerio'

// GET /api/truemmo-wiki
// Faz scraping do HTML da pagina Pontos_de_MvP e retorna JSON com os MVPs.
// Cache de 10 min no Vercel Edge para nao marttelar a wiki.

const WIKI_URL = 'https://wiki.truemmo.com.br/index.php/Pontos_de_MvP'

interface WikiMvpRow {
  name: string
  map: string
  minRespawn: number
  maxRespawn: number
  mvpPoints: number
}

function parseRespawn(raw: string): { min: number; max: number } {
  const nums = raw.match(/\d+/g)?.map(Number) ?? []
  if (nums.length === 0) return { min: 0, max: 0 }
  if (nums.length === 1) return { min: nums[0], max: nums[0] }
  return { min: nums[0], max: nums[1] }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300')

  try {
    const response = await fetch(WIKI_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return res.status(502).json({ error: `Wiki respondeu ${response.status}` })
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const mvps: WikiMvpRow[] = []

    // A pagina tem uma ou mais wikitables — percorre todas
    $('table.wikitable').each((_, table) => {
      const headers: string[] = []

      // Detecta colunas pelo thead ou primeira linha
      $(table).find('tr').first().find('th').each((_, th) => {
        headers.push($(th).text().trim().toLowerCase())
      })

      // Indice de cada coluna relevante (flexivel a mudancas de layout)
      const iName     = headers.findIndex(h => h.includes('nome') || h.includes('mvp'))
      const iMap      = headers.findIndex(h => h.includes('mapa') || h.includes('map'))
      const iRespawn  = headers.findIndex(h => h.includes('respawn') || h.includes('tempo'))
      const iPoints   = headers.findIndex(h => h.includes('ponto') || h.includes('point'))

      // Pula tabela se nao tiver as colunas esperadas
      if (iName < 0 || iPoints < 0) return

      $(table).find('tr').slice(1).each((_, tr) => {
        const cells = $(tr).find('td').toArray().map(td => $(td).text().trim())
        if (cells.length < 2) return

        const name     = cells[iName]     ?? ''
        const mapRaw   = iMap >= 0 ? (cells[iMap] ?? '') : ''
        const respRaw  = iRespawn >= 0 ? (cells[iRespawn] ?? '') : ''
        const pointRaw = cells[iPoints]   ?? ''

        const points = parseInt(pointRaw.replace(/[^0-9]/g, ''), 10)
        if (!name || isNaN(points)) return

        const { min, max } = parseRespawn(respRaw)

        mvps.push({
          name,
          map:         mapRaw.toLowerCase().replace(/\s+/g, '_') || 'unknown',
          minRespawn:  min,
          maxRespawn:  max,
          mvpPoints:   points,
        })
      })
    })

    return res.status(200).json({
      url:      WIKI_URL,
      count:    mvps.length,
      mvps,
      _fetched: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return res.status(500).json({ error: message })
  }
}
