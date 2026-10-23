import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { aoMudarAutenticacao, obterSessao } from '../services/authService.js'
import { supabaseConfigurado } from '../lib/supabase.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [carregando, setCarregando] = useState(supabaseConfigurado)
  const [recuperandoSenha, setRecuperandoSenha] = useState(false)

  useEffect(() => {
    let ativo = true

    obterSessao()
      .then((sessao) => {
        if (ativo) setUser(sessao?.user ?? null)
      })
      .catch(() => {
        if (ativo) setUser(null)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    const cancelar = aoMudarAutenticacao((evento, sessao) => {
      if (!ativo) return
      setUser(sessao?.user ?? null)
      setRecuperandoSenha(evento === 'PASSWORD_RECOVERY')
      setCarregando(false)
    })

    return () => {
      ativo = false
      cancelar()
    }
  }, [])

  const valor = useMemo(
    () => ({ user, carregando, recuperandoSenha }),
    [user, carregando, recuperandoSenha]
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default AuthProvider
