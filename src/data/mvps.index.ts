/**
 * Barrel de dados de MVPs.
 *
 * Importar MVP_LIST a partir daqui ou de './mvps' (re-export de compatibilidade).
 *
 * Sub-arrays disponíveis para uso em filtros no UI:
 *   MVP_VANILLA          → MVPs oficiais RO
 *   MVP_TRUEMMO          → Todos os exclusivos TrueMmo
 *   MVP_TRUEMMO_FIELD    → Field/dungeon TrueMmo
 *   MVP_TRUEMMO_VARMUNDT → Instância Varmundt
 *   MVP_TRUEMMO_CUSTOM   → Custom sem equivalente oficial
 */
export { MVP_VANILLA } from './mvps.vanilla'
export { MVP_TRUEMMO, MVP_TRUEMMO_FIELD, MVP_TRUEMMO_VARMUNDT, MVP_TRUEMMO_CUSTOM } from './mvps.truemmo'

import { MVP_VANILLA } from './mvps.vanilla'
import { MVP_TRUEMMO } from './mvps.truemmo'

export const MVP_LIST = [...MVP_VANILLA, ...MVP_TRUEMMO]
