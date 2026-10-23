export const MSG_NAO_CONFIGURADO =
  'O serviço de contas ainda não foi configurado. Consulte o README (seção "Banco de dados").'

const POR_CODIGO = {
  invalid_credentials: 'E-mail ou senha incorretos.',
  user_already_exists: 'Este e-mail já está cadastrado.',
  email_exists: 'Este e-mail já está cadastrado.',
  email_not_confirmed: 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.',
  weak_password: 'A senha é muito fraca. Use pelo menos 6 caracteres.',
  same_password: 'A nova senha deve ser diferente da atual.',
  over_email_send_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  over_request_rate_limit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  provider_disabled: 'Este método de login não está habilitado.',
  session_not_found: 'Sua sessão expirou. Entre novamente.',
}

// Converte erros do Supabase em mensagens para a usuária, sem vazar detalhes internos.
export function traduzirErro(erro) {
  if (!erro) return new Error('Não foi possível concluir a operação. Tente novamente.')
  if (erro.message === MSG_NAO_CONFIGURADO) return erro
  if (POR_CODIGO[erro.code]) return new Error(POR_CODIGO[erro.code])
  if (/invalid login credentials/i.test(erro.message ?? '')) return new Error(POR_CODIGO.invalid_credentials)
  if (/already registered/i.test(erro.message ?? '')) return new Error(POR_CODIGO.user_already_exists)
  return new Error('Não foi possível concluir a operação. Tente novamente.')
}
