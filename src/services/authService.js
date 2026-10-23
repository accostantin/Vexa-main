import { supabaseConfigurado } from '../lib/supabase.js'
import { exigirCliente } from './clienteSupabase.js'
import { traduzirErro } from './erros.js'

export async function cadastrar({ nome, email, senha }) {
  const { data, error } = await exigirCliente().auth.signUp({
    email,
    password: senha,
    options: {
      data: { name: nome },
      emailRedirectTo: `${window.location.origin}/entrar`,
    },
  })
  if (error) throw traduzirErro(error)

  // Com confirmação de e-mail ativa, um e-mail já confirmado volta sem erro e sem identidades.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw traduzirErro({ code: 'user_already_exists' })
  }
  return { user: data.user, session: data.session }
}

export async function entrar({ email, senha }) {
  const { data, error } = await exigirCliente().auth.signInWithPassword({ email, password: senha })
  if (error) throw traduzirErro(error)
  return { user: data.user, session: data.session }
}

export async function entrarComProvedor(provedor) {
  const { error } = await exigirCliente().auth.signInWithOAuth({
    provider: provedor,
    options: { redirectTo: `${window.location.origin}/lado-a` },
  })
  if (error) throw traduzirErro(error)
}

export async function sair() {
  const { error } = await exigirCliente().auth.signOut()
  if (error) throw traduzirErro(error)
}

export async function enviarLinkRedefinicao(email) {
  const { error } = await exigirCliente().auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })
  if (error) throw traduzirErro(error)
}

export async function definirNovaSenha(senha) {
  const { error } = await exigirCliente().auth.updateUser({ password: senha })
  if (error) throw traduzirErro(error)
}

export async function obterSessao() {
  if (!supabaseConfigurado) return null
  const { data, error } = await exigirCliente().auth.getSession()
  if (error) throw traduzirErro(error)
  return data.session
}

// Retorna a função que cancela a assinatura.
export function aoMudarAutenticacao(callback) {
  if (!supabaseConfigurado) return () => {}
  const { data } = exigirCliente().auth.onAuthStateChange((evento, sessao) => callback(evento, sessao))
  return () => data.subscription.unsubscribe()
}
