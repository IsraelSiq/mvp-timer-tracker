/**
 * Combina class names filtrando valores falsy.
 * Implementação inline sem dependências externas.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
