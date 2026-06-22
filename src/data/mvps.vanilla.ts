import type { MVP } from '@/types'

// Imagens: https://static.divine-pride.net/images/mobs/png/{mobId}.png
const dp = (mobId: number) => `https://static.divine-pride.net/images/mobs/png/${mobId}.png`

/**
 * MVPs oficiais do Ragnarok Online.
 * Respawn times baseados no Divine Pride / iROwiki.
 * IDs: 1–38
 */
export const MVP_VANILLA: MVP[] = [

  // ── 60~70 min ────────────────────────────────────────────────────────
  { id: 1,  mobId: 1087, name: 'Orc Hero',            map: 'gef_fild14',  minRespawn: 60,  maxRespawn: 70,  priority: 7,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'fast', 'field'],              mvpPoints: 54,  image: dp(1087), notes: 'Spawn rápido, bom para rotação.' },
  { id: 2,  mobId: 1150, name: 'Moonlight Flower',    map: 'pay_dun04',   minRespawn: 60,  maxRespawn: 70,  priority: 8,  difficulty: 'medium', source: 'vanilla', tags: ['solo', 'fast'],                       mvpPoints: 123, image: dp(1150), notes: 'Janela curta — atenção redobrada.' },
  { id: 3,  mobId: 1038, name: 'Osiris',              map: 'moc_pryd04',  minRespawn: 60,  maxRespawn: 70,  priority: 7,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'fast'],                       mvpPoints: 73,  image: dp(1038), notes: 'Respawn rápido, bom para manter atividade contínua.' },
  { id: 4,  mobId: 1086, name: 'Golden Thief Bug',    map: 'prt_sewb4',   minRespawn: 60,  maxRespawn: 70,  priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['fast', 'high-drop', 'disputed'],      mvpPoints: 70,  image: dp(1086), notes: 'Alta disputa. Drop de GTB Card — um dos mais valiosos.' },
  { id: 5,  mobId: 1251, name: 'Stormy Knight',       map: 'xmas_dun02',  minRespawn: 60,  maxRespawn: 70,  priority: 6,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'fast'],                       mvpPoints: 98,  image: dp(1251), notes: 'Bom para equip. de gelo/raio.' },
  { id: 6,  mobId: 1312, name: 'Turtle General',      map: 'tur_dun04',   minRespawn: 60,  maxRespawn: 70,  priority: 8,  difficulty: 'medium', source: 'vanilla', tags: ['fast', 'high-drop'],                  mvpPoints: 118, image: dp(1312), notes: 'Drop de equips relevantes.' },
  { id: 7,  mobId: 1272, name: 'Dark Lord',           map: 'gl_chyard',   minRespawn: 60,  maxRespawn: 70,  priority: 8,  difficulty: 'medium', source: 'vanilla', tags: ['fast', 'high-drop'],                  mvpPoints: 103, image: dp(1272), notes: 'Glast Heim Churchyard. Drop de Dark Lord Card.' },
  { id: 8,  mobId: 1389, name: 'Dracula',             map: 'gef_dun02',   minRespawn: 60,  maxRespawn: 70,  priority: 7,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'fast'],                       mvpPoints: 80,  image: dp(1389), notes: 'Geffen Dungeon 2. Drop de Dracula Card.' },
  { id: 9,  mobId: 1157, name: 'Pharaoh',             map: 'in_sphinx5',  minRespawn: 60,  maxRespawn: 70,  priority: 6,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'fast'],                       mvpPoints: 91,  image: dp(1157), notes: 'Sphinx F5. Drop de Pharaoh Card — SP regen.' },
  { id: 10, mobId: 1511, name: 'Amon Ra',             map: 'moc_pryd06',  minRespawn: 60,  maxRespawn: 70,  priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['fast'],                               mvpPoints: 74,  image: dp(1511), notes: 'Pyramid B2F. Drop de Amon Ra Card.' },

  // ── 90~105 min ───────────────────────────────────────────────────────
  { id: 11, mobId: 1419, name: 'Evil Snake Lord',     map: 'gon_dun03',   minRespawn: 95,  maxRespawn: 105, priority: 6,  difficulty: 'medium', source: 'vanilla', tags: ['solo'],                               mvpPoints: 117, image: dp(1419), notes: 'Gonryun Dungeon 3.' },
  { id: 25, mobId: 1658, name: 'Incantation Samurai', map: 'ama_dun03',   minRespawn: 90,  maxRespawn: 100, priority: 6,  difficulty: 'medium', source: 'vanilla', tags: ['solo'],                               mvpPoints: 111, image: dp(1658), notes: 'Amatsu Dungeon 3. Drop de Incantation Samurai Card.' },

  // ── 100~130 min ──────────────────────────────────────────────────────
  { id: 26, mobId: 1623, name: 'White Lady',          map: 'lou_dun03',   minRespawn: 117, maxRespawn: 127, priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['solo', 'high-drop'],                  mvpPoints: 110, image: dp(1623), notes: 'Louyang Dungeon 3. Drop de White Lady Card.' },
  { id: 27, mobId: 1630, name: 'Ktullanux',           map: 'ice_dun03',   minRespawn: 120, maxRespawn: 120, priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['solo'],                               mvpPoints: 122, image: dp(1630), notes: 'Ice Dungeon 3. Respawn fixo. Drop de Ktullanux Card.' },
  { id: 28, mobId: 1685, name: 'Kiel-D-01',           map: 'kh_dun02',    minRespawn: 120, maxRespawn: 130, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'disputed', 'group'],     mvpPoints: 143, image: dp(1685), notes: 'Kiel Hyre Dungeon 2. Drop de Kiel Card — alvo valioso.' },
  { id: 29, mobId: 1688, name: 'Vesper',              map: 'jupe_core',   minRespawn: 120, maxRespawn: 130, priority: 8,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 146, image: dp(1688), notes: 'Jupiter Tower Core. Drop de Vesper Card.' },

  // ── 120~130 min ──────────────────────────────────────────────────────
  { id: 12, mobId: 1039, name: 'Baphomet',            map: 'prt_maze03',  minRespawn: 120, maxRespawn: 130, priority: 10, difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'disputed', 'group'],     mvpPoints: 92,  image: dp(1039), notes: 'Alta prioridade — vale mobilizar o grupo.' },
  { id: 13, mobId: 1115, name: 'Eddga',               map: 'pay_fild11',  minRespawn: 120, maxRespawn: 130, priority: 8,  difficulty: 'medium', source: 'vanilla', tags: ['field', 'high-drop'],                 mvpPoints: 101, image: dp(1115), notes: 'Drop de Eddga Card.' },
  { id: 14, mobId: 1112, name: 'Drake',               map: 'treasure01',  minRespawn: 120, maxRespawn: 130, priority: 8,  difficulty: 'medium', source: 'vanilla', tags: ['solo', 'high-drop'],                  mvpPoints: 104, image: dp(1112), notes: 'Acesso pelo treasure map. Drop valioso.' },
  { id: 15, mobId: 1158, name: 'Phreeoni',            map: 'moc_fild17',  minRespawn: 120, maxRespawn: 130, priority: 6,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'field'],                      mvpPoints: 82,  image: dp(1158), notes: 'Drop de Phreeoni Card (+HIT).' },
  { id: 16, mobId: 1059, name: 'Mistress',            map: 'mjolnir_04',  minRespawn: 120, maxRespawn: 130, priority: 8,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'field', 'high-drop'],         mvpPoints: 111, image: dp(1059), notes: 'Drop de Mistress Card — imune a SP drain.' },
  { id: 17, mobId: 1046, name: 'Doppelganger',        map: 'gef_dun02',   minRespawn: 120, maxRespawn: 130, priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['solo', 'high-drop'],                  mvpPoints: 120, image: dp(1046), notes: 'Drop de Dopple Card (+ASPD).' },
  { id: 18, mobId: 1147, name: 'Maya',                map: 'anthell02',   minRespawn: 120, maxRespawn: 130, priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['solo'],                               mvpPoints: 122, image: dp(1147), notes: 'Ant Hell 2. Drop de Maya Card — reflect magic.' },
  { id: 19, mobId: 1190, name: 'Orc Lord',            map: 'gef_fild10',  minRespawn: 120, maxRespawn: 130, priority: 7,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'field'],                      mvpPoints: 63,  image: dp(1190), notes: 'Geffen Field 10. Drop de Orc Lord Card.' },
  { id: 20, mobId: 1871, name: 'Fallen Bishop',       map: 'abbey03',     minRespawn: 120, maxRespawn: 130, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'disputed', 'group'],     mvpPoints: 157, image: dp(1871), notes: 'Cursed Abbey 3. Drop de Fallen Bishop Card — altíssimo valor.' },
  { id: 30, mobId: 1734, name: 'Hatii',               map: 'xmas_fild01', minRespawn: 120, maxRespawn: 130, priority: 6,  difficulty: 'easy',   source: 'vanilla', tags: ['solo', 'field'],                      mvpPoints: 112, image: dp(1734), notes: 'Christmas Field. Drop de Hatii Card.' },
  { id: 31, mobId: 1751, name: 'Egnigem Cenia',       map: 'lhz_dun02',   minRespawn: 120, maxRespawn: 130, priority: 8,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 161, image: dp(1751), notes: 'Bio Labs 2. Drop de Egnigem Cenia Card — muito valioso.' },
  { id: 32, mobId: 1768, name: 'RSX-0806',            map: 'ein_dun02',   minRespawn: 125, maxRespawn: 135, priority: 7,  difficulty: 'medium', source: 'vanilla', tags: ['solo'],                               mvpPoints: 115, image: dp(1768), notes: 'Einbroch Dungeon 2. Drop de RSX-0806 Card.' },
  { id: 33, mobId: 1873, name: 'Thanatos Phantom',    map: 'tha_t10',     minRespawn: 120, maxRespawn: 120, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 146, image: dp(1873), notes: 'Thanatos Tower 10. Respawn fixo. Drop de Thanatos Card.' },
  { id: 34, mobId: 1885, name: 'Gloom Under Night',   map: 'ra_san05',    minRespawn: 300, maxRespawn: 310, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 188, image: dp(1885), notes: 'Rachel Sanctuary 5. Drop de Gloom Under Night Card.' },

  // ── 123~133 min ──────────────────────────────────────────────────────
  { id: 21, mobId: 1583, name: 'Tao Gunka',           map: 'beach_dun',   minRespawn: 123, maxRespawn: 133, priority: 10, difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'disputed', 'group'],     mvpPoints: 149, image: dp(1583), notes: 'Alvo premium — vale coordenação prévia.' },

  // ── 133 min (fixo) ───────────────────────────────────────────────────
  { id: 22, mobId: 1373, name: 'Lord of Death',       map: 'niflheim',    minRespawn: 133, maxRespawn: 133, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 107, image: dp(1373), notes: 'Niflheim. Respawn fixo. Drop de Lord of Death Card.' },

  // ── 180~190 min ──────────────────────────────────────────────────────
  { id: 23, mobId: 1719, name: 'Detardeurus',         map: 'abyss_03',    minRespawn: 180, maxRespawn: 190, priority: 8,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 163, image: dp(1719), notes: 'Abyss Lake 3. Drop de Detardeurus Card.' },

  // ── 240~250 min ──────────────────────────────────────────────────────
  { id: 24, mobId: 1785, name: 'Atroce',              map: 'ra_fild02',   minRespawn: 240, maxRespawn: 250, priority: 9,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'field', 'group'],        mvpPoints: 176, image: dp(1785), notes: 'Rachel Field. Outros spawns: ra_fild03/04, ve_fild01/02.' },

  // ── 420~430 min ──────────────────────────────────────────────────────
  { id: 35, mobId: 1832, name: 'Lady Tanee',          map: 'ayo_dun02',   minRespawn: 420, maxRespawn: 430, priority: 8,  difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 119, image: dp(1832), notes: 'Ayothaya Dungeon 2. Drop de Lady Tanee Card — alto valor.' },

  // ── 480~490 min ──────────────────────────────────────────────────────
  { id: 36, mobId: 1917, name: 'Valkyrie Randgris',   map: 'odin_tem03',  minRespawn: 480, maxRespawn: 490, priority: 10, difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'disputed', 'group'],     mvpPoints: 220, image: dp(1917), notes: 'Odin Temple 3. Drop de Valkyrie Randgris Card — máxima prioridade.' },

  // ── 660~730 min ──────────────────────────────────────────────────────
  { id: 37, mobId: 2068, name: 'Ifrit',               map: 'thor_v03',    minRespawn: 660, maxRespawn: 670, priority: 10, difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 258, image: dp(2068), notes: 'Thor Volcano 3. Drop de Ifrit Card — raro e valioso.' },
  { id: 38, mobId: 1252, name: 'Beelzebub',           map: 'abbey03',     minRespawn: 720, maxRespawn: 730, priority: 10, difficulty: 'hard',   source: 'vanilla', tags: ['high-drop', 'group'],                 mvpPoints: 270, image: dp(1252), notes: 'Cursed Abbey 3. Respawn longo — marcar sempre que matar.' },
]
