// Estrutura estática das árvores de skill por classe 4th
// skillId = ID da skill no Divine Pride
// requires = { skillId, minLevel } pré-requisitos
// maxLevel = nível máximo da skill
// tier = 1 (1st) | 2 (2nd) | 3 (3rd) | 4 (4th)

export interface SkillNode {
  id: number
  name: string
  tier: 1 | 2 | 3 | 4
  maxLevel: number
  requires: { id: number; minLevel: number }[]
  col: number   // coluna visual dentro do tier (0-based)
  row: number   // linha visual (0-based)
}

export interface JobChain {
  id: string            // slug único ex: 'wind-hawk'
  name4: string         // nome 4th class
  name3: string
  name2: string
  name1: string
  pointsPerTier: [number, number, number, number] // [1st,2nd,3rd,4th]
  skills: SkillNode[]
}

export const POINTS_PER_TIER: [number, number, number, number] = [50, 70, 50, 60]

// ─────────────────────────────────────────────
// WIND HAWK (Archer → Hunter → Ranger → Wind Hawk)
// ─────────────────────────────────────────────
const WIND_HAWK: JobChain = {
  id: 'wind-hawk',
  name4: 'Wind Hawk',
  name3: 'Ranger',
  name2: 'Hunter',
  name1: 'Archer',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    // Tier 1 — Archer
    { id: 20,  name: 'Detecção de Armadilha',  tier: 1, maxLevel: 1, requires: [], col: 0, row: 0 },
    { id: 19,  name: 'Olho de Aguia',           tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 17,  name: 'Atirar',                  tier: 1, maxLevel: 10, requires: [], col: 2, row: 0 },
    { id: 18,  name: 'Concentração',            tier: 1, maxLevel: 10, requires: [{ id: 17, minLevel: 1 }], col: 2, row: 1 },
    { id: 26,  name: 'Flechada Dupla',          tier: 1, maxLevel: 10, requires: [{ id: 17, minLevel: 5 }], col: 3, row: 0 },
    { id: 28,  name: 'Flecha de Pedra',         tier: 1, maxLevel: 5,  requires: [{ id: 17, minLevel: 1 }], col: 1, row: 1 },
    // Tier 2 — Hunter
    { id: 35,  name: 'Armadilha de Pedra',      tier: 2, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 36,  name: 'Armadilha de Gelo',       tier: 2, maxLevel: 5,  requires: [{ id: 35, minLevel: 3 }], col: 0, row: 1 },
    { id: 38,  name: 'Armadilha de Relâmpago',  tier: 2, maxLevel: 5,  requires: [{ id: 36, minLevel: 3 }], col: 0, row: 2 },
    { id: 43,  name: 'Tiro em Área',            tier: 2, maxLevel: 10, requires: [{ id: 26, minLevel: 5 }], col: 1, row: 0 },
    { id: 44,  name: 'Tiro Penetrante',         tier: 2, maxLevel: 10, requires: [{ id: 43, minLevel: 5 }], col: 1, row: 1 },
    { id: 48,  name: 'Falcão Investida',        tier: 2, maxLevel: 5,  requires: [], col: 2, row: 0 },
    { id: 49,  name: 'Olhos do Falcão',         tier: 2, maxLevel: 5,  requires: [{ id: 48, minLevel: 3 }], col: 2, row: 1 },
    { id: 53,  name: 'Armadilha de Vento',      tier: 2, maxLevel: 5,  requires: [{ id: 38, minLevel: 3 }], col: 0, row: 3 },
    // Tier 3 — Ranger
    { id: 2550, name: 'Tiro Devastador',        tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 2551, name: 'Rajada de Flechas',      tier: 3, maxLevel: 5,  requires: [{ id: 2550, minLevel: 3 }], col: 0, row: 1 },
    { id: 2552, name: 'Tiro do Falcão',         tier: 3, maxLevel: 5,  requires: [{ id: 49, minLevel: 3 }], col: 1, row: 0 },
    { id: 2553, name: 'Armadilha Elétrica',     tier: 3, maxLevel: 5,  requires: [{ id: 53, minLevel: 3 }], col: 2, row: 0 },
    { id: 2554, name: 'Golpe do Vento',         tier: 3, maxLevel: 10, requires: [{ id: 2552, minLevel: 3 }], col: 1, row: 1 },
    { id: 2555, name: 'Caminho do Vento',       tier: 3, maxLevel: 5,  requires: [{ id: 2554, minLevel: 5 }], col: 1, row: 2 },
    // Tier 4 — Wind Hawk
    { id: 5003, name: 'Tempestade de Flechas',  tier: 4, maxLevel: 5,  requires: [{ id: 2551, minLevel: 3 }], col: 0, row: 0 },
    { id: 5004, name: 'Vento Cortante',         tier: 4, maxLevel: 5,  requires: [{ id: 2554, minLevel: 5 }], col: 1, row: 0 },
    { id: 5005, name: 'Olho do Furacão',        tier: 4, maxLevel: 5,  requires: [{ id: 5004, minLevel: 3 }], col: 1, row: 1 },
    { id: 5006, name: 'Chuva de Destruição',    tier: 4, maxLevel: 5,  requires: [{ id: 5003, minLevel: 3 }, { id: 5004, minLevel: 3 }], col: 0, row: 1 },
    { id: 5007, name: 'Aura do Falcão',         tier: 4, maxLevel: 5,  requires: [{ id: 5005, minLevel: 3 }], col: 2, row: 0 },
  ],
}

// ─────────────────────────────────────────────
// DRAGON KNIGHT (Swordman → Lord Knight → Rune Knight → Dragon Knight)
// ─────────────────────────────────────────────
const DRAGON_KNIGHT: JobChain = {
  id: 'dragon-knight',
  name4: 'Dragon Knight',
  name3: 'Rune Knight',
  name2: 'Lord Knight',
  name1: 'Swordman',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    // Tier 1 — Swordman
    { id: 1,   name: 'Golpe Básico',            tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 2,   name: 'Aumento de HP',           tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 3,   name: 'Mão de Ferro',            tier: 1, maxLevel: 5,  requires: [{ id: 1, minLevel: 4 }], col: 0, row: 1 },
    { id: 4,   name: 'Endure',                  tier: 1, maxLevel: 10, requires: [{ id: 2, minLevel: 5 }], col: 1, row: 1 },
    { id: 5,   name: 'Golpe Perfeito',          tier: 1, maxLevel: 5,  requires: [{ id: 3, minLevel: 3 }], col: 0, row: 2 },
    { id: 7,   name: 'Frenesi',                 tier: 1, maxLevel: 10, requires: [{ id: 5, minLevel: 3 }, { id: 4, minLevel: 5 }], col: 1, row: 2 },
    // Tier 2 — Lord Knight
    { id: 100, name: 'Investida',               tier: 2, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 101, name: 'Esmagamento',             tier: 2, maxLevel: 10, requires: [{ id: 100, minLevel: 3 }], col: 0, row: 1 },
    { id: 102, name: 'Golpe do Cavaleiro',      tier: 2, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 103, name: 'Brandida',                tier: 2, maxLevel: 10, requires: [{ id: 102, minLevel: 5 }], col: 1, row: 1 },
    { id: 104, name: 'Aura de Batalha',         tier: 2, maxLevel: 5,  requires: [{ id: 103, minLevel: 5 }], col: 1, row: 2 },
    { id: 110, name: 'Berserco',                tier: 2, maxLevel: 1,  requires: [{ id: 7, minLevel: 10 }, { id: 104, minLevel: 5 }], col: 2, row: 0 },
    // Tier 3 — Rune Knight
    { id: 2300, name: 'Runa Ignis',             tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 2301, name: 'Runa Nosiege',           tier: 3, maxLevel: 5,  requires: [{ id: 2300, minLevel: 3 }], col: 0, row: 1 },
    { id: 2302, name: 'Runa Urj',               tier: 3, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 2303, name: 'Lança do Dragão',        tier: 3, maxLevel: 10, requires: [{ id: 2302, minLevel: 3 }], col: 1, row: 1 },
    { id: 2304, name: 'Sopro do Dragão',        tier: 3, maxLevel: 10, requires: [{ id: 2303, minLevel: 5 }], col: 1, row: 2 },
    { id: 2305, name: 'Escudo Rúnico',          tier: 3, maxLevel: 5,  requires: [{ id: 2301, minLevel: 3 }], col: 0, row: 2 },
    // Tier 4 — Dragon Knight
    { id: 5100, name: 'Fúria do Dragão',        tier: 4, maxLevel: 5,  requires: [{ id: 2304, minLevel: 5 }], col: 0, row: 0 },
    { id: 5101, name: 'Garras do Dragão',       tier: 4, maxLevel: 5,  requires: [{ id: 5100, minLevel: 3 }], col: 0, row: 1 },
    { id: 5102, name: 'Alma do Dragão',         tier: 4, maxLevel: 5,  requires: [{ id: 2305, minLevel: 3 }], col: 1, row: 0 },
    { id: 5103, name: 'Rugido Dracônico',       tier: 4, maxLevel: 5,  requires: [{ id: 5100, minLevel: 3 }, { id: 5102, minLevel: 3 }], col: 1, row: 1 },
    { id: 5104, name: 'Lança Suprema',          tier: 4, maxLevel: 5,  requires: [{ id: 5101, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// SHADOW CROSS (Thief → Assassin Cross → Guillotine Cross → Shadow Cross)
// ─────────────────────────────────────────────
const SHADOW_CROSS: JobChain = {
  id: 'shadow-cross',
  name4: 'Shadow Cross',
  name3: 'Guillotine Cross',
  name2: 'Assassin Cross',
  name1: 'Thief',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    // Tier 1 — Thief
    { id: 48,  name: 'Roubo',                   tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 50,  name: 'Fuga',                    tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 51,  name: 'Esconder',                tier: 1, maxLevel: 10, requires: [{ id: 50, minLevel: 5 }], col: 1, row: 1 },
    { id: 52,  name: 'Ataque Duplo',            tier: 1, maxLevel: 10, requires: [{ id: 48, minLevel: 5 }], col: 0, row: 1 },
    { id: 53,  name: 'Passo Ágil',              tier: 1, maxLevel: 5,  requires: [{ id: 50, minLevel: 3 }], col: 2, row: 0 },
    // Tier 2 — Assassin Cross
    { id: 200, name: 'Veneno de Soneca',        tier: 2, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 201, name: 'Criar Veneno',            tier: 2, maxLevel: 10, requires: [{ id: 200, minLevel: 3 }], col: 0, row: 1 },
    { id: 202, name: 'Golpe das Sombras',       tier: 2, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 203, name: 'Espadachim Sombrio',      tier: 2, maxLevel: 5,  requires: [{ id: 202, minLevel: 5 }], col: 1, row: 1 },
    { id: 204, name: 'Tempestade Sombria',      tier: 2, maxLevel: 10, requires: [{ id: 203, minLevel: 3 }], col: 1, row: 2 },
    { id: 210, name: 'Assassinar',              tier: 2, maxLevel: 10, requires: [{ id: 52, minLevel: 5 }, { id: 201, minLevel: 5 }], col: 2, row: 0 },
    // Tier 3 — Guillotine Cross
    { id: 2400, name: 'Caminhos das Sombras',   tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 2401, name: 'Poison Burst',           tier: 3, maxLevel: 5,  requires: [{ id: 201, minLevel: 5 }], col: 0, row: 1 },
    { id: 2402, name: 'Cross Impact',           tier: 3, maxLevel: 5,  requires: [{ id: 202, minLevel: 5 }], col: 1, row: 0 },
    { id: 2403, name: 'Rolling Cutter',         tier: 3, maxLevel: 5,  requires: [{ id: 2402, minLevel: 3 }], col: 1, row: 1 },
    { id: 2404, name: 'Counter Slash',          tier: 3, maxLevel: 5,  requires: [{ id: 2403, minLevel: 3 }], col: 1, row: 2 },
    { id: 2405, name: 'Veneno Mortal',          tier: 3, maxLevel: 5,  requires: [{ id: 2401, minLevel: 3 }], col: 0, row: 2 },
    // Tier 4 — Shadow Cross
    { id: 5200, name: 'Abismo das Sombras',     tier: 4, maxLevel: 5,  requires: [{ id: 2404, minLevel: 3 }], col: 0, row: 0 },
    { id: 5201, name: 'Phantasmic Arrow',       tier: 4, maxLevel: 5,  requires: [{ id: 5200, minLevel: 3 }], col: 0, row: 1 },
    { id: 5202, name: 'Sombra Vingativa',       tier: 4, maxLevel: 5,  requires: [{ id: 2405, minLevel: 3 }], col: 1, row: 0 },
    { id: 5203, name: 'Eclipse das Sombras',    tier: 4, maxLevel: 5,  requires: [{ id: 5200, minLevel: 3 }, { id: 5202, minLevel: 3 }], col: 1, row: 1 },
    { id: 5204, name: 'Lâmina Noturna',         tier: 4, maxLevel: 5,  requires: [{ id: 5201, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// CARDINAL (Acolyte → High Priest → Archbishop → Cardinal)
// ─────────────────────────────────────────────
const CARDINAL: JobChain = {
  id: 'cardinal',
  name4: 'Cardinal',
  name3: 'Archbishop',
  name2: 'High Priest',
  name1: 'Acolyte',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    // Tier 1 — Acolyte
    { id: 28,  name: 'Recuperar',               tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 29,  name: 'Bênção',                  tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 30,  name: 'Armadura Sagrada',        tier: 1, maxLevel: 5,  requires: [{ id: 29, minLevel: 5 }], col: 1, row: 1 },
    { id: 31,  name: 'Teleporte',               tier: 1, maxLevel: 2,  requires: [], col: 2, row: 0 },
    { id: 32,  name: 'Ressurreição',            tier: 1, maxLevel: 4,  requires: [{ id: 28, minLevel: 5 }, { id: 30, minLevel: 3 }], col: 0, row: 1 },
    { id: 33,  name: 'Turno Não Morto',        tier: 1, maxLevel: 5,  requires: [{ id: 29, minLevel: 3 }], col: 1, row: 2 },
    // Tier 2 — High Priest
    { id: 300, name: 'Meditação',               tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 301, name: 'Santuário',               tier: 2, maxLevel: 10, requires: [{ id: 28, minLevel: 7 }], col: 0, row: 1 },
    { id: 302, name: 'Magnus Exorcismus',       tier: 2, maxLevel: 10, requires: [{ id: 33, minLevel: 3 }, { id: 301, minLevel: 5 }], col: 0, row: 2 },
    { id: 303, name: 'Assumptio',               tier: 2, maxLevel: 5,  requires: [{ id: 300, minLevel: 5 }], col: 1, row: 0 },
    { id: 304, name: 'Sufragium',               tier: 2, maxLevel: 3,  requires: [], col: 1, row: 1 },
    { id: 305, name: 'Gloria',                  tier: 2, maxLevel: 5,  requires: [{ id: 304, minLevel: 3 }], col: 2, row: 0 },
    // Tier 3 — Archbishop
    { id: 2600, name: 'Judex',                  tier: 3, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 2601, name: 'Adoramus',               tier: 3, maxLevel: 5,  requires: [{ id: 2600, minLevel: 5 }], col: 0, row: 1 },
    { id: 2602, name: 'Highness Heal',          tier: 3, maxLevel: 5,  requires: [{ id: 301, minLevel: 7 }], col: 1, row: 0 },
    { id: 2603, name: 'Sacrament',              tier: 3, maxLevel: 5,  requires: [{ id: 2602, minLevel: 3 }], col: 1, row: 1 },
    { id: 2604, name: 'Praefatio',              tier: 3, maxLevel: 10, requires: [{ id: 303, minLevel: 5 }], col: 2, row: 0 },
    { id: 2605, name: 'Copiosa Gratia',         tier: 3, maxLevel: 5,  requires: [{ id: 2604, minLevel: 5 }], col: 2, row: 1 },
    // Tier 4 — Cardinal
    { id: 5300, name: 'Blessed Presence',       tier: 4, maxLevel: 5,  requires: [{ id: 2602, minLevel: 5 }], col: 0, row: 0 },
    { id: 5301, name: 'Recarregamento Divino',  tier: 4, maxLevel: 5,  requires: [{ id: 5300, minLevel: 3 }], col: 0, row: 1 },
    { id: 5302, name: 'Canto Sagrado',          tier: 4, maxLevel: 5,  requires: [{ id: 2601, minLevel: 3 }], col: 1, row: 0 },
    { id: 5303, name: 'Luz Divina',             tier: 4, maxLevel: 5,  requires: [{ id: 5302, minLevel: 3 }, { id: 5300, minLevel: 3 }], col: 1, row: 1 },
    { id: 5304, name: 'Clementia Suprema',      tier: 4, maxLevel: 5,  requires: [{ id: 5301, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// ARCH MAGE (Mage → High Wizard → Warlock → Arch Mage)
// ─────────────────────────────────────────────
const ARCH_MAGE: JobChain = {
  id: 'arch-mage',
  name4: 'Arch Mage',
  name3: 'Warlock',
  name2: 'High Wizard',
  name1: 'Mage',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    // Tier 1 — Mage
    { id: 60,  name: 'Bola de Fogo',            tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 61,  name: 'Fogo Inferior',           tier: 1, maxLevel: 5,  requires: [{ id: 60, minLevel: 5 }], col: 0, row: 1 },
    { id: 62,  name: 'Bola de Gelo',            tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 63,  name: 'Muro de Gelo',            tier: 1, maxLevel: 5,  requires: [{ id: 62, minLevel: 5 }], col: 1, row: 1 },
    { id: 64,  name: 'Raio',                    tier: 1, maxLevel: 10, requires: [], col: 2, row: 0 },
    { id: 65,  name: 'Tempestade',              tier: 1, maxLevel: 5,  requires: [{ id: 64, minLevel: 5 }], col: 2, row: 1 },
    // Tier 2 — High Wizard
    { id: 400, name: 'Meteor Storm',            tier: 2, maxLevel: 10, requires: [{ id: 61, minLevel: 3 }], col: 0, row: 0 },
    { id: 401, name: 'Storm Gust',              tier: 2, maxLevel: 10, requires: [{ id: 63, minLevel: 3 }], col: 1, row: 0 },
    { id: 402, name: 'Lord of Vermillion',      tier: 2, maxLevel: 10, requires: [{ id: 65, minLevel: 3 }], col: 2, row: 0 },
    { id: 403, name: 'Mystical Amplification',  tier: 2, maxLevel: 10, requires: [], col: 0, row: 1 },
    { id: 404, name: 'Quake',                   tier: 2, maxLevel: 5,  requires: [{ id: 403, minLevel: 5 }], col: 0, row: 2 },
    { id: 405, name: 'Soul Drain',              tier: 2, maxLevel: 10, requires: [], col: 1, row: 1 },
    // Tier 3 — Warlock
    { id: 2700, name: 'Crimson Rock',           tier: 3, maxLevel: 5,  requires: [{ id: 400, minLevel: 5 }], col: 0, row: 0 },
    { id: 2701, name: 'Comet',                  tier: 3, maxLevel: 5,  requires: [{ id: 2700, minLevel: 3 }], col: 0, row: 1 },
    { id: 2702, name: 'Tetra Vortex',           tier: 3, maxLevel: 5,  requires: [{ id: 401, minLevel: 5 }, { id: 402, minLevel: 5 }], col: 1, row: 0 },
    { id: 2703, name: 'Reading Spellbook',      tier: 3, maxLevel: 1,  requires: [], col: 2, row: 0 },
    { id: 2704, name: 'Release',                tier: 3, maxLevel: 2,  requires: [{ id: 2703, minLevel: 1 }], col: 2, row: 1 },
    { id: 2705, name: 'Summon Elemental',       tier: 3, maxLevel: 5,  requires: [{ id: 2702, minLevel: 3 }], col: 1, row: 1 },
    // Tier 4 — Arch Mage
    { id: 5400, name: 'Astral Geyser',          tier: 4, maxLevel: 5,  requires: [{ id: 2701, minLevel: 3 }], col: 0, row: 0 },
    { id: 5401, name: 'Ponto Crítico Mágico',   tier: 4, maxLevel: 5,  requires: [{ id: 5400, minLevel: 3 }], col: 0, row: 1 },
    { id: 5402, name: 'Vórtex Supremo',         tier: 4, maxLevel: 5,  requires: [{ id: 2702, minLevel: 5 }], col: 1, row: 0 },
    { id: 5403, name: 'Infinito Arcano',        tier: 4, maxLevel: 5,  requires: [{ id: 5402, minLevel: 3 }, { id: 5401, minLevel: 3 }], col: 1, row: 1 },
    { id: 5404, name: 'Força da Criação',       tier: 4, maxLevel: 5,  requires: [{ id: 5403, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// MEISTER (Merchant → Mastersmith → Mechanic → Meister)
// ─────────────────────────────────────────────
const MEISTER: JobChain = {
  id: 'meister',
  name4: 'Meister',
  name3: 'Mechanic',
  name2: 'Mastersmith',
  name1: 'Merchant',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 80,  name: 'Comprar Barato',          tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 81,  name: 'Vender Caro',             tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 82,  name: 'Mammonite',               tier: 1, maxLevel: 10, requires: [{ id: 80, minLevel: 5 }], col: 0, row: 1 },
    { id: 83,  name: 'Carregar Pesado',         tier: 1, maxLevel: 5,  requires: [], col: 2, row: 0 },
    { id: 500, name: 'Forja de Armas',          tier: 2, maxLevel: 3,  requires: [], col: 0, row: 0 },
    { id: 501, name: 'Afiação',                 tier: 2, maxLevel: 5,  requires: [{ id: 500, minLevel: 2 }], col: 0, row: 1 },
    { id: 502, name: 'Golpe de Bigorna',        tier: 2, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 503, name: 'Golpe de Martelo',        tier: 2, maxLevel: 5,  requires: [{ id: 502, minLevel: 5 }], col: 1, row: 1 },
    { id: 504, name: 'Pele de Aço',             tier: 2, maxLevel: 5,  requires: [], col: 2, row: 0 },
    { id: 2800, name: 'Modo Mado',              tier: 3, maxLevel: 1,  requires: [], col: 0, row: 0 },
    { id: 2801, name: 'Vulcan Arm',             tier: 3, maxLevel: 5,  requires: [{ id: 2800, minLevel: 1 }], col: 0, row: 1 },
    { id: 2802, name: 'Madogear License',       tier: 3, maxLevel: 5,  requires: [{ id: 2800, minLevel: 1 }], col: 1, row: 0 },
    { id: 2803, name: 'Knuckle Boost',          tier: 3, maxLevel: 5,  requires: [{ id: 2801, minLevel: 3 }], col: 0, row: 2 },
    { id: 2804, name: 'Ax Tornado',             tier: 3, maxLevel: 5,  requires: [{ id: 503, minLevel: 5 }], col: 1, row: 1 },
    { id: 5500, name: 'Maelstrom',              tier: 4, maxLevel: 5,  requires: [{ id: 2803, minLevel: 3 }], col: 0, row: 0 },
    { id: 5501, name: 'Steinwand',              tier: 4, maxLevel: 5,  requires: [{ id: 5500, minLevel: 3 }], col: 0, row: 1 },
    { id: 5502, name: 'Elemental Buster',       tier: 4, maxLevel: 5,  requires: [{ id: 2804, minLevel: 3 }], col: 1, row: 0 },
    { id: 5503, name: 'Gear Crush',             tier: 4, maxLevel: 5,  requires: [{ id: 5502, minLevel: 3 }, { id: 5501, minLevel: 3 }], col: 1, row: 1 },
    { id: 5504, name: 'Overheat',               tier: 4, maxLevel: 5,  requires: [{ id: 5503, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// IMPERIAL GUARD (Swordman → Paladin → Royal Guard → Imperial Guard)
// ─────────────────────────────────────────────
const IMPERIAL_GUARD: JobChain = {
  id: 'imperial-guard',
  name4: 'Imperial Guard',
  name3: 'Royal Guard',
  name2: 'Paladin',
  name1: 'Swordman',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 1,   name: 'Golpe Básico',            tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 2,   name: 'Aumento de HP',           tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 4,   name: 'Endure',                  tier: 1, maxLevel: 10, requires: [{ id: 2, minLevel: 5 }], col: 1, row: 1 },
    { id: 7,   name: 'Frenesi',                 tier: 1, maxLevel: 10, requires: [{ id: 4, minLevel: 5 }], col: 1, row: 2 },
    { id: 600, name: 'Golpe Divino',            tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 601, name: 'Escudo de Fé',            tier: 2, maxLevel: 10, requires: [{ id: 600, minLevel: 5 }], col: 0, row: 1 },
    { id: 602, name: 'Reflexo do Escudo',       tier: 2, maxLevel: 5,  requires: [{ id: 601, minLevel: 3 }], col: 0, row: 2 },
    { id: 603, name: 'Sacrifício',              tier: 2, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 604, name: 'Barreira',                tier: 2, maxLevel: 5,  requires: [{ id: 603, minLevel: 3 }], col: 1, row: 1 },
    { id: 2900, name: 'Verdure',                tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 2901, name: 'Cannon Spear',           tier: 3, maxLevel: 5,  requires: [{ id: 2900, minLevel: 3 }], col: 0, row: 1 },
    { id: 2902, name: 'Pinpoint Attack',        tier: 3, maxLevel: 5,  requires: [{ id: 2901, minLevel: 3 }], col: 0, row: 2 },
    { id: 2903, name: 'Earth Drive',            tier: 3, maxLevel: 5,  requires: [{ id: 602, minLevel: 3 }], col: 1, row: 0 },
    { id: 2904, name: 'Hesperus Lit',           tier: 3, maxLevel: 5,  requires: [{ id: 2903, minLevel: 3 }], col: 1, row: 1 },
    { id: 5600, name: 'Muralha Sagrada',        tier: 4, maxLevel: 5,  requires: [{ id: 2903, minLevel: 3 }], col: 0, row: 0 },
    { id: 5601, name: 'Espada Celestial',       tier: 4, maxLevel: 5,  requires: [{ id: 5600, minLevel: 3 }], col: 0, row: 1 },
    { id: 5602, name: 'Aegis',                  tier: 4, maxLevel: 5,  requires: [{ id: 2902, minLevel: 3 }], col: 1, row: 0 },
    { id: 5603, name: 'Julgamento Imperial',    tier: 4, maxLevel: 5,  requires: [{ id: 5601, minLevel: 3 }, { id: 5602, minLevel: 3 }], col: 1, row: 1 },
    { id: 5604, name: 'Escudo Imortal',         tier: 4, maxLevel: 5,  requires: [{ id: 5603, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// INQUISITOR (Acolyte → Champion → Sura → Inquisitor)
// ─────────────────────────────────────────────
const INQUISITOR: JobChain = {
  id: 'inquisitor',
  name4: 'Inquisitor',
  name3: 'Sura',
  name2: 'Champion',
  name1: 'Acolyte',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 28,  name: 'Recuperar',               tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 29,  name: 'Bênção',                  tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 33,  name: 'Turno Não Morto',         tier: 1, maxLevel: 5,  requires: [{ id: 29, minLevel: 3 }], col: 1, row: 1 },
    { id: 700, name: 'Treino de Punho',         tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 701, name: 'Punho Explosivo',         tier: 2, maxLevel: 10, requires: [{ id: 700, minLevel: 5 }], col: 0, row: 1 },
    { id: 702, name: 'Triângulo',               tier: 2, maxLevel: 5,  requires: [{ id: 701, minLevel: 5 }], col: 0, row: 2 },
    { id: 703, name: 'Rajada de Punhos',        tier: 2, maxLevel: 5,  requires: [{ id: 700, minLevel: 5 }], col: 1, row: 0 },
    { id: 704, name: 'Golpe Mental',            tier: 2, maxLevel: 5,  requires: [{ id: 703, minLevel: 3 }], col: 1, row: 1 },
    { id: 3000, name: 'Knuckle Arrow',          tier: 3, maxLevel: 5,  requires: [{ id: 701, minLevel: 5 }], col: 0, row: 0 },
    { id: 3001, name: 'Tiger Cannon',           tier: 3, maxLevel: 5,  requires: [{ id: 3000, minLevel: 3 }], col: 0, row: 1 },
    { id: 3002, name: 'Gates of Hell',          tier: 3, maxLevel: 5,  requires: [{ id: 702, minLevel: 3 }], col: 1, row: 0 },
    { id: 3003, name: 'Flash Combo',            tier: 3, maxLevel: 5,  requires: [{ id: 3001, minLevel: 3 }, { id: 3002, minLevel: 3 }], col: 1, row: 1 },
    { id: 5700, name: 'Chama do Inquisidor',    tier: 4, maxLevel: 5,  requires: [{ id: 3001, minLevel: 3 }], col: 0, row: 0 },
    { id: 5701, name: 'Julgamento Final',       tier: 4, maxLevel: 5,  requires: [{ id: 5700, minLevel: 3 }], col: 0, row: 1 },
    { id: 5702, name: 'Punho Sagrado',          tier: 4, maxLevel: 5,  requires: [{ id: 3003, minLevel: 3 }], col: 1, row: 0 },
    { id: 5703, name: 'Execução Divina',        tier: 4, maxLevel: 5,  requires: [{ id: 5701, minLevel: 3 }, { id: 5702, minLevel: 3 }], col: 1, row: 1 },
    { id: 5704, name: 'Punição Suprema',        tier: 4, maxLevel: 5,  requires: [{ id: 5703, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// ELEMENTAL MASTER (Mage → Professor → Sorcerer → Elemental Master)
// ─────────────────────────────────────────────
const ELEMENTAL_MASTER: JobChain = {
  id: 'elemental-master',
  name4: 'Elemental Master',
  name3: 'Sorcerer',
  name2: 'Professor',
  name1: 'Mage',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 60,  name: 'Bola de Fogo',            tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 62,  name: 'Bola de Gelo',            tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 64,  name: 'Raio',                    tier: 1, maxLevel: 10, requires: [], col: 2, row: 0 },
    { id: 66,  name: 'Magia da Terra',          tier: 1, maxLevel: 10, requires: [], col: 3, row: 0 },
    { id: 800, name: 'Soul Change',             tier: 2, maxLevel: 1,  requires: [], col: 0, row: 0 },
    { id: 801, name: 'Dispel',                  tier: 2, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 802, name: 'Fólio de Fogo',           tier: 2, maxLevel: 3,  requires: [{ id: 60, minLevel: 5 }], col: 0, row: 1 },
    { id: 803, name: 'Fólio de Gelo',           tier: 2, maxLevel: 3,  requires: [{ id: 62, minLevel: 5 }], col: 1, row: 1 },
    { id: 804, name: 'Fólio Elétrico',          tier: 2, maxLevel: 3,  requires: [{ id: 64, minLevel: 5 }], col: 2, row: 1 },
    { id: 3100, name: 'Psychic Wave',           tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 3101, name: 'Diamond Dust',           tier: 3, maxLevel: 5,  requires: [{ id: 803, minLevel: 3 }], col: 0, row: 1 },
    { id: 3102, name: 'Volcanic Ash',           tier: 3, maxLevel: 5,  requires: [{ id: 802, minLevel: 3 }], col: 1, row: 0 },
    { id: 3103, name: 'Striking',               tier: 3, maxLevel: 5,  requires: [{ id: 3100, minLevel: 3 }], col: 1, row: 1 },
    { id: 5800, name: 'Elementalismo',          tier: 4, maxLevel: 5,  requires: [{ id: 3101, minLevel: 3 }], col: 0, row: 0 },
    { id: 5801, name: 'Tempestade Elemental',   tier: 4, maxLevel: 5,  requires: [{ id: 5800, minLevel: 3 }], col: 0, row: 1 },
    { id: 5802, name: 'Convergência',           tier: 4, maxLevel: 5,  requires: [{ id: 3102, minLevel: 3 }, { id: 3103, minLevel: 3 }], col: 1, row: 0 },
    { id: 5803, name: 'Explosão Arcana',        tier: 4, maxLevel: 5,  requires: [{ id: 5801, minLevel: 3 }, { id: 5802, minLevel: 3 }], col: 1, row: 1 },
    { id: 5804, name: 'Domínio Absoluto',       tier: 4, maxLevel: 5,  requires: [{ id: 5803, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// ABYSS CHASER (Thief → Stalker → Shadow Chaser → Abyss Chaser)
// ─────────────────────────────────────────────
const ABYSS_CHASER: JobChain = {
  id: 'abyss-chaser',
  name4: 'Abyss Chaser',
  name3: 'Shadow Chaser',
  name2: 'Stalker',
  name1: 'Thief',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 48,  name: 'Roubo',                   tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 50,  name: 'Fuga',                    tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 51,  name: 'Esconder',                tier: 1, maxLevel: 10, requires: [{ id: 50, minLevel: 5 }], col: 1, row: 1 },
    { id: 900, name: 'Copiar Habilidade',       tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 901, name: 'Roubar Atributo',         tier: 2, maxLevel: 5,  requires: [{ id: 900, minLevel: 3 }], col: 0, row: 1 },
    { id: 902, name: 'Caminhada Fantasma',      tier: 2, maxLevel: 5,  requires: [{ id: 51, minLevel: 5 }], col: 1, row: 0 },
    { id: 903, name: 'Golpe Furtivo',           tier: 2, maxLevel: 10, requires: [{ id: 902, minLevel: 3 }], col: 1, row: 1 },
    { id: 3200, name: 'Tiro com Tinta',         tier: 3, maxLevel: 5,  requires: [], col: 0, row: 0 },
    { id: 3201, name: 'Manto Oculto',           tier: 3, maxLevel: 5,  requires: [{ id: 902, minLevel: 5 }], col: 0, row: 1 },
    { id: 3202, name: 'Espiral Sombria',        tier: 3, maxLevel: 5,  requires: [{ id: 903, minLevel: 5 }], col: 1, row: 0 },
    { id: 3203, name: 'Explorar Fraqueza',      tier: 3, maxLevel: 5,  requires: [{ id: 3202, minLevel: 3 }], col: 1, row: 1 },
    { id: 5900, name: 'Roubo de Alma',          tier: 4, maxLevel: 5,  requires: [{ id: 3201, minLevel: 3 }], col: 0, row: 0 },
    { id: 5901, name: 'Abismo Infinito',        tier: 4, maxLevel: 5,  requires: [{ id: 5900, minLevel: 3 }], col: 0, row: 1 },
    { id: 5902, name: 'Golpe do Vácuo',         tier: 4, maxLevel: 5,  requires: [{ id: 3203, minLevel: 3 }], col: 1, row: 0 },
    { id: 5903, name: 'Colapso das Sombras',    tier: 4, maxLevel: 5,  requires: [{ id: 5901, minLevel: 3 }, { id: 5902, minLevel: 3 }], col: 1, row: 1 },
    { id: 5904, name: 'Apagamento',             tier: 4, maxLevel: 5,  requires: [{ id: 5903, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// BIOLO (Merchant → Creator → Genetic → Biolo)
// ─────────────────────────────────────────────
const BIOLO: JobChain = {
  id: 'biolo',
  name4: 'Biolo',
  name3: 'Genetic',
  name2: 'Creator',
  name1: 'Merchant',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 80,  name: 'Comprar Barato',          tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 82,  name: 'Mammonite',               tier: 1, maxLevel: 10, requires: [{ id: 80, minLevel: 5 }], col: 0, row: 1 },
    { id: 83,  name: 'Carregar Pesado',         tier: 1, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 1000, name: 'Ácido Corrosivo',        tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 1001, name: 'Bomb Químico',           tier: 2, maxLevel: 5,  requires: [{ id: 1000, minLevel: 5 }], col: 0, row: 1 },
    { id: 1002, name: 'Poção Explosiva',        tier: 2, maxLevel: 5,  requires: [{ id: 1001, minLevel: 3 }], col: 0, row: 2 },
    { id: 1003, name: 'Criar Homúnculo',        tier: 2, maxLevel: 1,  requires: [], col: 1, row: 0 },
    { id: 1004, name: 'Evoluir Homúnculo',      tier: 2, maxLevel: 1,  requires: [{ id: 1003, minLevel: 1 }], col: 1, row: 1 },
    { id: 3300, name: 'Bomb Cluster',           tier: 3, maxLevel: 5,  requires: [{ id: 1002, minLevel: 3 }], col: 0, row: 0 },
    { id: 3301, name: 'Crazy Weed',             tier: 3, maxLevel: 5,  requires: [{ id: 3300, minLevel: 3 }], col: 0, row: 1 },
    { id: 3302, name: 'Spore Explosion',        tier: 3, maxLevel: 5,  requires: [{ id: 1004, minLevel: 1 }], col: 1, row: 0 },
    { id: 3303, name: 'Stem Spear',             tier: 3, maxLevel: 5,  requires: [{ id: 3302, minLevel: 3 }], col: 1, row: 1 },
    { id: 6000, name: 'Bio Explosion',          tier: 4, maxLevel: 5,  requires: [{ id: 3301, minLevel: 3 }], col: 0, row: 0 },
    { id: 6001, name: 'Veneno Biológico',       tier: 4, maxLevel: 5,  requires: [{ id: 6000, minLevel: 3 }], col: 0, row: 1 },
    { id: 6002, name: 'Simbiose',               tier: 4, maxLevel: 5,  requires: [{ id: 3303, minLevel: 3 }], col: 1, row: 0 },
    { id: 6003, name: 'Fusão Genética',         tier: 4, maxLevel: 5,  requires: [{ id: 6001, minLevel: 3 }, { id: 6002, minLevel: 3 }], col: 1, row: 1 },
    { id: 6004, name: 'Evolução Suprema',       tier: 4, maxLevel: 5,  requires: [{ id: 6003, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// TROUBADOUR (Archer → Clown → Minstrel → Troubadour)
// ─────────────────────────────────────────────
const TROUBADOUR: JobChain = {
  id: 'troubadour',
  name4: 'Troubadour',
  name3: 'Minstrel',
  name2: 'Clown',
  name1: 'Archer',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 19,  name: 'Olho de Águia',           tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 17,  name: 'Atirar',                  tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 26,  name: 'Flechada Dupla',          tier: 1, maxLevel: 10, requires: [{ id: 17, minLevel: 5 }], col: 1, row: 1 },
    { id: 1100, name: 'Canção de Batalha',      tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 1101, name: 'Fado',                   tier: 2, maxLevel: 5,  requires: [{ id: 1100, minLevel: 5 }], col: 0, row: 1 },
    { id: 1102, name: 'Canto da Vitória',       tier: 2, maxLevel: 10, requires: [{ id: 1101, minLevel: 3 }], col: 0, row: 2 },
    { id: 1103, name: 'Hino de Lúnaris',        tier: 2, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 1104, name: 'Balada de Morte',        tier: 2, maxLevel: 5,  requires: [{ id: 1103, minLevel: 3 }], col: 1, row: 1 },
    { id: 3400, name: 'Melody of Life',         tier: 3, maxLevel: 5,  requires: [{ id: 1102, minLevel: 5 }], col: 0, row: 0 },
    { id: 3401, name: 'Song of Mana',           tier: 3, maxLevel: 5,  requires: [{ id: 3400, minLevel: 3 }], col: 0, row: 1 },
    { id: 3402, name: 'Windmill Rush',          tier: 3, maxLevel: 5,  requires: [{ id: 1104, minLevel: 3 }], col: 1, row: 0 },
    { id: 3403, name: 'Circle of Nature',       tier: 3, maxLevel: 5,  requires: [{ id: 3401, minLevel: 3 }, { id: 3402, minLevel: 3 }], col: 1, row: 1 },
    { id: 6100, name: 'Música Imortal',         tier: 4, maxLevel: 5,  requires: [{ id: 3401, minLevel: 3 }], col: 0, row: 0 },
    { id: 6101, name: 'Sinfonia Final',         tier: 4, maxLevel: 5,  requires: [{ id: 6100, minLevel: 3 }], col: 0, row: 1 },
    { id: 6102, name: 'Canção do Caos',         tier: 4, maxLevel: 5,  requires: [{ id: 3403, minLevel: 3 }], col: 1, row: 0 },
    { id: 6103, name: 'Harmonia Suprema',       tier: 4, maxLevel: 5,  requires: [{ id: 6101, minLevel: 3 }, { id: 6102, minLevel: 3 }], col: 1, row: 1 },
    { id: 6104, name: 'Réquiem do Trovador',    tier: 4, maxLevel: 5,  requires: [{ id: 6103, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// ─────────────────────────────────────────────
// TROUVERE (Archer → Gypsy → Wanderer → Trouvere)
// ─────────────────────────────────────────────
const TROUVERE: JobChain = {
  id: 'trouvere',
  name4: 'Trouvere',
  name3: 'Wanderer',
  name2: 'Gypsy',
  name1: 'Archer',
  pointsPerTier: POINTS_PER_TIER,
  skills: [
    { id: 19,  name: 'Olho de Águia',           tier: 1, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 17,  name: 'Atirar',                  tier: 1, maxLevel: 10, requires: [], col: 1, row: 0 },
    { id: 26,  name: 'Flechada Dupla',          tier: 1, maxLevel: 10, requires: [{ id: 17, minLevel: 5 }], col: 1, row: 1 },
    { id: 1200, name: 'Dança da Faca',          tier: 2, maxLevel: 10, requires: [], col: 0, row: 0 },
    { id: 1201, name: 'Dança do Luar',          tier: 2, maxLevel: 5,  requires: [{ id: 1200, minLevel: 5 }], col: 0, row: 1 },
    { id: 1202, name: 'Canção da Gipsy',        tier: 2, maxLevel: 10, requires: [{ id: 1201, minLevel: 3 }], col: 0, row: 2 },
    { id: 1203, name: 'Dança Sedutora',         tier: 2, maxLevel: 5,  requires: [], col: 1, row: 0 },
    { id: 1204, name: 'Valsa Macabra',          tier: 2, maxLevel: 5,  requires: [{ id: 1203, minLevel: 3 }], col: 1, row: 1 },
    { id: 3500, name: 'Dança da Tempestade',    tier: 3, maxLevel: 5,  requires: [{ id: 1202, minLevel: 5 }], col: 0, row: 0 },
    { id: 3501, name: 'Dança das Almas',        tier: 3, maxLevel: 5,  requires: [{ id: 3500, minLevel: 3 }], col: 0, row: 1 },
    { id: 3502, name: 'Fanfarra Sombria',       tier: 3, maxLevel: 5,  requires: [{ id: 1204, minLevel: 3 }], col: 1, row: 0 },
    { id: 3503, name: 'Dança Espiral',          tier: 3, maxLevel: 5,  requires: [{ id: 3501, minLevel: 3 }, { id: 3502, minLevel: 3 }], col: 1, row: 1 },
    { id: 6200, name: 'Dança da Lua Nova',      tier: 4, maxLevel: 5,  requires: [{ id: 3501, minLevel: 3 }], col: 0, row: 0 },
    { id: 6201, name: 'Valsa Infinita',         tier: 4, maxLevel: 5,  requires: [{ id: 6200, minLevel: 3 }], col: 0, row: 1 },
    { id: 6202, name: 'Tempestade Rítmica',     tier: 4, maxLevel: 5,  requires: [{ id: 3503, minLevel: 3 }], col: 1, row: 0 },
    { id: 6203, name: 'Dança do Caos Eterno',   tier: 4, maxLevel: 5,  requires: [{ id: 6201, minLevel: 3 }, { id: 6202, minLevel: 3 }], col: 1, row: 1 },
    { id: 6204, name: 'Réquiem da Trouvère',    tier: 4, maxLevel: 5,  requires: [{ id: 6203, minLevel: 3 }], col: 0, row: 2 },
  ],
}

// Exporta todas as cadeias
export const JOB_CHAINS: JobChain[] = [
  WIND_HAWK,
  DRAGON_KNIGHT,
  SHADOW_CROSS,
  CARDINAL,
  ARCH_MAGE,
  MEISTER,
  IMPERIAL_GUARD,
  INQUISITOR,
  ELEMENTAL_MASTER,
  ABYSS_CHASER,
  BIOLO,
  TROUBADOUR,
  TROUVERE,
]
