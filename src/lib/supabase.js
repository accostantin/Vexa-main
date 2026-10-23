import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// A chave "anon" é pública por design: quem protege os dados são as políticas
// RLS do banco (ver supabase/migrations). Nunca use a chave "service_role" aqui.
export const supabaseConfigurado = Boolean(url && anonKey)

export const supabase = supabaseConfigurado
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null
