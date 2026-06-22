/**
 * Ponto de entrada mantido para compatibilidade com imports existentes.
 *
 * O dado real está em:
 *   src/data/mvps.vanilla.ts  — MVPs oficiais do RO
 *   src/data/mvps.truemmo.ts  — MVPs exclusivos TrueMmo
 *   src/data/mvps.index.ts    — barrel que combina tudo
 *
 * Para filtrar por servidor no código:
 *   import { MVP_VANILLA, MVP_TRUEMMO } from '@/data/mvps'
 */
export { MVP_LIST, MVP_VANILLA, MVP_TRUEMMO } from './mvps.index'
