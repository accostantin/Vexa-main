import { useCallback, useEffect, useState } from 'react'
import {
  adicionarFavoritoNoticia,
  listarFavoritosNoticias,
  removerFavoritoNoticia,
} from '../services/favoritesService.js'

// Favoritos de notícias persistidos no banco e ligados à usuária autenticada.
export function useFavoritosNoticias(userId) {
  // Guarda de quem é a lista, para nunca mostrar favoritos de outra conta após trocar de usuária.
  const [estado, setEstado] = useState({ userId: null, ids: [] })
  const [erro, setErro] = useState(null)

  const favoritos = userId && estado.userId === userId ? estado.ids : []

  useEffect(() => {
    if (!userId) return undefined
    let ativo = true
    listarFavoritosNoticias()
      .then((ids) => {
        if (ativo) setEstado({ userId, ids })
      })
      .catch((e) => {
        if (ativo) setErro(e.message)
      })
    return () => {
      ativo = false
    }
  }, [userId])

  // Atualiza a tela na hora e desfaz se o banco recusar.
  const alternar = useCallback(
    async (id) => {
      if (!userId) return
      const ja = favoritos.includes(id)
      const aplicar = (fn) =>
        setEstado((atual) => ({
          userId,
          ids: fn(atual.userId === userId ? atual.ids : []),
        }))

      setErro(null)
      aplicar((ids) => (ja ? ids.filter((f) => f !== id) : [...ids, id]))
      try {
        if (ja) await removerFavoritoNoticia(id)
        else await adicionarFavoritoNoticia(id)
      } catch (e) {
        aplicar((ids) => (ja ? [...ids, id] : ids.filter((f) => f !== id)))
        setErro(e.message)
      }
    },
    [userId, favoritos]
  )

  return { favoritos, erro, alternar }
}
