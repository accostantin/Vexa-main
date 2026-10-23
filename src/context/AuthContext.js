import { createContext, useContext } from 'react'

// Valor padrão usado quando um componente é renderizado fora do AuthProvider (ex.: testes isolados).
export const AuthContext = createContext({
  user: null,
  carregando: false,
  recuperandoSenha: false,
})

export function useAuth() {
  return useContext(AuthContext)
}
