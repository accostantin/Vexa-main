import { supabase } from '../lib/supabase.js'
import { MSG_NAO_CONFIGURADO } from './erros.js'

export function exigirCliente() {
  if (!supabase) throw new Error(MSG_NAO_CONFIGURADO)
  return supabase
}
