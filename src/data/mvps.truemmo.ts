import type { MVP } from '@/types'

// Imagens: https://static.divine-pride.net/images/mobs/png/{mobId}.png
const dp = (mobId: number) => `https://static.divine-pride.net/images/mobs/png/${mobId}.png`

/**
 * MVPs exclusivos do servidor TrueMmo.
 * Divididos em 3 categorias:
 *   - truemmo-field    : MVPs de campo/dungeon exclusivos do servidor
 *   - truemmo-varmundt : MVPs da instância Varmundt (cooldown de instância)
 *   - truemmo-custom   : MVPs customizados — mapa/respawn a confirmar in-game
 *
 * Campos com "// TODO" precisam de verificação no servidor.
 */

// ─────────────────────────────────────────────────────────────────────────────
const TRUEMMO_FIELD: MVP[] = [
  { id: 39, mobId: 1388, name: 'Boitata',           map: 'bra_dun02',  minRespawn: 120, maxRespawn: 130, priority: 8, difficulty: 'medium', tags: ['truemmo-exclusive', 'field'],  mvpPoints: 106, image: dp(1388), source: 'truemmo-field', notes: 'MVP BR exclusivo.' },
  { id: 40, mobId: 1373, name: 'Senhor dos Mortos', map: 'niflheim',   minRespawn: 133, maxRespawn: 143, priority: 8, difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'],  mvpPoints: 107, image: dp(1373), source: 'truemmo-field', notes: 'Versão TrueMmo. // TODO: confirmar mapa e respawn' },
  { id: 41, mobId: 1838, name: 'Morroc Ferido',     map: 'moc_fild22', minRespawn: 60,  maxRespawn: 70,  priority: 9, difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'],  mvpPoints: 278, image: dp(1838), source: 'truemmo-field', notes: '// TODO: confirmar mapa e respawn' },
  { id: 42, mobId: 1839, name: 'Scaraba Dourada',   map: 'in_ruins01', minRespawn: 120, maxRespawn: 130, priority: 7, difficulty: 'medium', tags: ['truemmo-exclusive'],           mvpPoints: 160, image: dp(1839), source: 'truemmo-field', notes: '// TODO: confirmar mapa e respawn no TrueMmo' },
  { id: 43, mobId: 1876, name: 'Gopinich',          map: 'gon_dun03',  minRespawn: 95,  maxRespawn: 105, priority: 6, difficulty: 'medium', tags: ['truemmo-exclusive'],           mvpPoints: 111, image: dp(1876), source: 'truemmo-field', notes: 'Gonryun Dungeon 3. // TODO: confirmar mapa e respawn no TrueMmo' },
  { id: 44, mobId: 1636, name: 'King of the Alley', map: 'gef_fild07', minRespawn: 120, maxRespawn: 130, priority: 7, difficulty: 'medium', tags: ['truemmo-exclusive', 'field'],  mvpPoints: 113, image: dp(1636), source: 'truemmo-field', notes: '// TODO: confirmar mapa e respawn no TrueMmo' },
  { id: 45, mobId: 1613, name: 'Leak',              map: 'pay_dun04',  minRespawn: 120, maxRespawn: 130, priority: 6, difficulty: 'medium', tags: ['truemmo-exclusive'],           mvpPoints: 107, image: dp(1613), source: 'truemmo-field', notes: '// TODO: confirmar mapa e respawn no TrueMmo' },
]

// ─────────────────────────────────────────────────────────────────────────────
const TRUEMMO_VARMUNDT: MVP[] = [
  { id: 50, mobId: 1373, name: 'Senhor dos Mortos (Varmundt)', map: 'varmundt', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard', tags: ['truemmo-exclusive', 'group'], mvpPoints: 369, image: dp(1373), source: 'truemmo-varmundt', notes: 'Instância Varmundt. Respawn depende do cooldown da instância.' },
  { id: 51, mobId: 1719, name: 'Detardeurus (Varmundt)',       map: 'varmundt', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard', tags: ['truemmo-exclusive', 'group'], mvpPoints: 369, image: dp(1719), source: 'truemmo-varmundt', notes: 'Instância Varmundt. Respawn depende do cooldown da instância.' },
  { id: 52, mobId: 1147, name: 'Maya (Varmundt)',              map: 'varmundt', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard', tags: ['truemmo-exclusive', 'group'], mvpPoints: 369, image: dp(1147), source: 'truemmo-varmundt', notes: 'Instância Varmundt. Respawn depende do cooldown da instância.' },
  { id: 53, mobId: 1630, name: 'Ktullanux (Varmundt)',         map: 'varmundt', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard', tags: ['truemmo-exclusive', 'group'], mvpPoints: 369, image: dp(1630), source: 'truemmo-varmundt', notes: 'Instância Varmundt. Respawn depende do cooldown da instância.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// MVPs custom — mapa/respawn a confirmar in-game
const TRUEMMO_CUSTOM: MVP[] = [
  { id: 60, mobId: 0, name: 'Rei Goblin',                   map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 9,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 362, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 61, mobId: 0, name: 'Renire',                       map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 9,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 383, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 62, mobId: 0, name: 'Guide of Dead',                map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 391, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 63, mobId: 0, name: 'Piamette Pesadelo',            map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 10, difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 391, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 64, mobId: 0, name: 'Reginleif',                    map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 8,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 294, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 65, mobId: 0, name: 'Ingrid',                       map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 8,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 294, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 66, mobId: 0, name: 'Gaia Pol',                     map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 9,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 383, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 67, mobId: 0, name: 'The One',                      map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 9,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 348, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 68, mobId: 0, name: 'Death Witch',                  map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 8,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 309, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 69, mobId: 0, name: 'Senhor das Trevas Distorcido', map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 208, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 70, mobId: 0, name: 'Brinaranha Distorcida',        map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 222, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 71, mobId: 0, name: 'Bruxa do Mar',                 map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 234, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 72, mobId: 0, name: 'Gioia',                        map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 228, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 73, mobId: 0, name: 'Amon Ra Pesadelo',             map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 6,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 155, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 74, mobId: 0, name: 'R48-85-BESTIA',                map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 186, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 75, mobId: 0, name: 'R001-Bestia',                  map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 8,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 260, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 76, mobId: 0, name: 'Muspellskoll',                 map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 214, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 77, mobId: 0, name: 'Pyuriel Furiosa',              map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 220, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 78, mobId: 0, name: 'Guardião Morto Kades',         map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 223, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 79, mobId: 0, name: 'General Daehyun',              map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 222, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 80, mobId: 0, name: 'Detardeurus Esquelético',      map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 8,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 252, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 81, mobId: 0, name: 'Maya Silente',                 map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 6,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 187, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 82, mobId: 0, name: 'Tao Gunka Ancestral',          map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 180, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 83, mobId: 0, name: 'Defensor Wootan',              map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 6,  difficulty: 'medium', tags: ['truemmo-exclusive'],          mvpPoints: 180, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 84, mobId: 0, name: 'Burning Fang',                 map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 9,  difficulty: 'hard',   tags: ['truemmo-exclusive', 'group'], mvpPoints: 301, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 85, mobId: 0, name: 'Aranha Mecânica',              map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 6,  difficulty: 'medium', tags: ['truemmo-exclusive'],          mvpPoints: 180, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 86, mobId: 0, name: 'Jungoliant',                   map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 225, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 87, mobId: 0, name: 'Boss Meow',                    map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 7,  difficulty: 'hard',   tags: ['truemmo-exclusive'],          mvpPoints: 239, source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
  { id: 88, mobId: 0, name: 'Gemaring',                     map: 'custom', minRespawn: 0, maxRespawn: 0, priority: 3,  difficulty: 'easy',   tags: ['truemmo-exclusive'],          mvpPoints: 27,  source: 'truemmo-custom', notes: '// TODO: confirmar mapa e respawn' },
]

export const MVP_TRUEMMO: MVP[] = [
  ...TRUEMMO_FIELD,
  ...TRUEMMO_VARMUNDT,
  ...TRUEMMO_CUSTOM,
]
