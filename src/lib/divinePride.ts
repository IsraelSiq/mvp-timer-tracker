// Cliente Divine Pride — chama nosso proxy /api/divine-pride

export interface DPDrop {
  itemId: number
  chance: number
  item: {
    id: number
    name: string
    imageUrl: string | null
    slots: number
    type: number
    subType: number
  }
}

export interface DPMonster {
  id: number; name: string; level: number; health: number
  baseExp: number; jobExp: number; mvpExp: number
  attack: number; attack2: number; defense: number; magicDefense: number
  str: number; agi: number; vit: number; int: number; dex: number; luk: number
  element: number; size: number; race: number
  drops: DPDrop[]; mvpDrops: DPDrop[]
  imageUrl: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArray(val: any): any[] {
  if (!val) return []
  if (Array.isArray(val)) return val
  return Object.values(val)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(raw: any): DPMonster {
  return {
    id:           raw.id           ?? raw.Id           ?? 0,
    name:         raw.name         ?? raw.Name         ?? '',
    level:        raw.level        ?? raw.Level        ?? 0,
    health:       raw.health       ?? raw.hp           ?? raw.Hp ?? 0,
    baseExp:      raw.baseExp      ?? raw.base_exp     ?? 0,
    jobExp:       raw.jobExp       ?? raw.job_exp      ?? 0,
    mvpExp:       raw.mvpExp       ?? raw.mvp_exp      ?? raw.mvpexp ?? 0,
    attack:       raw.attack       ?? raw.atk          ?? 0,
    attack2:      raw.attack2      ?? raw.atk2         ?? 0,
    defense:      raw.defense      ?? raw.def          ?? 0,
    magicDefense: raw.magicDefense ?? raw.mdef         ?? 0,
    str: raw.str ?? 0, agi: raw.agi ?? 0, vit: raw.vit ?? 0,
    int: raw.int ?? 0, dex: raw.dex ?? 0, luk: raw.luk ?? 0,
    element:  raw.element  ?? raw.Element  ?? 0,
    size:     raw.size     ?? raw.Size     ?? 0,
    race:     raw.race     ?? raw.Race     ?? 0,
    imageUrl: raw.imageUrl ?? raw.image    ?? null,
    drops:    toArray(raw.drops    ?? raw.Drops).filter((d: DPDrop) => d?.item),
    mvpDrops: toArray(raw.mvpDrops ?? raw.mvpdrops ?? raw.MvpDrops).filter((d: DPDrop) => d?.item),
  }
}

const cache = new Map<number, DPMonster>()

export async function fetchMonster(mobId: number): Promise<DPMonster | null> {
  if (cache.has(mobId)) return cache.get(mobId)!
  try {
    const res = await fetch(`/api/divine-pride?mobId=${mobId}`)
    if (!res.ok) return null
    const raw = await res.json()
    const data = normalize(raw)
    cache.set(mobId, data)
    return data
  } catch {
    return null
  }
}

export function formatDropChance(chance: number): string {
  const pct = chance / 100
  if (pct >= 100) return '100%'
  if (pct >= 1)   return `${pct.toFixed(2)}%`
  return `${pct.toFixed(4)}%`
}
