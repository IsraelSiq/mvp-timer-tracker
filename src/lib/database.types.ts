/**
 * Types gerados manualmente para refletir o schema real do Supabase.
 * Regenere com: npx supabase gen types typescript --project-id SEU_PROJECT_ID
 */
export type Database = {
  public: {
    Tables: {
      mvp_kills: {
        Row: {
          id:              string   // uuid
          mvp_id:          number
          mvp_name:        string
          killer:          string
          killed_at:       string   // timestamptz ISO string
          note:            string
          group_name:      string
          killed_by_enemy: boolean
          created_at:      string
        }
        Insert: {
          id?:             string   // opcional — gerado no cliente via crypto.randomUUID()
          mvp_id:          number
          mvp_name:        string
          killer:          string
          killed_at:       string
          note?:           string
          group_name:      string
          killed_by_enemy?: boolean
        }
        Update: Partial<Database['public']['Tables']['mvp_kills']['Insert']>
      }
    }
    Views:     Record<string, never>
    Functions: Record<string, never>
    Enums:     Record<string, never>
  }
}
