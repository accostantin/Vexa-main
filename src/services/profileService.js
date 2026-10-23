import { exigirCliente } from './clienteSupabase.js'
import { traduzirErro } from './erros.js'

const COLUNAS = 'id, name, created_at, updated_at'

export async function obterPerfil(userId) {
  const { data, error } = await exigirCliente()
    .from('profiles')
    .select(COLUNAS)
    .eq('id', userId)
    .maybeSingle()
  if (error) throw traduzirErro(error)
  return data
}

// Cria (se faltar) ou atualiza o perfil da própria usuária. A RLS impede qualquer outro id.
export async function salvarPerfil(userId, { nome }) {
  const { data, error } = await exigirCliente()
    .from('profiles')
    .upsert({ id: userId, name: nome }, { onConflict: 'id' })
    .select(COLUNAS)
    .single()
  if (error) throw traduzirErro(error)
  return data
}
