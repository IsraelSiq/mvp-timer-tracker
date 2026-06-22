/**
 * Barrel de MVPs — combina todas as fontes em MVP_LIST.
 *
 * Para filtrar por origem:
 *   import { MVP_VANILLA }  from './mvps.vanilla'
 *   import { MVP_TRUEMMO }  from './mvps.truemmo'
 *
 * Para usar tudo de uma vez (comportamento anterior mantido):
 *   import { MVP_LIST } from './mvps'
 */
import { MVP_VANILLA }  from './mvps.vanilla'
import { MVP_TRUEMMO }  from './mvps.truemmo'

export { MVP_VANILLA }  from './mvps.vanilla'
export { MVP_TRUEMMO }  from './mvps.truemmo'

export const MVP_LIST = [...MVP_VANILLA, ...MVP_TRUEMMO]
