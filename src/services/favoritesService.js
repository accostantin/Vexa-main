import { exigirCliente } from './clienteSupabase.js'
import { traduzirErro } from './erros.js'

// Os favoritos pertencem à usuária autenticada (coluna user_id = auth.uid() no banco).
// news_id é o "id" de cada item em src/data/conteudos.json — nunca renumere ou reutilize ids.
export async function listarFavoritosNoticias() {
  const { data, error } = await exigirCliente()
    .from('favorites')
    .select('news_id')
    .order('created_at', { ascending: true })
  if (error) throw traduzirErro(error)
  return data.map((linha) => linha.news_id)
}

export async function adicionarFavoritoNoticia(newsId) {
  const { error } = await exigirCliente().from('favorites').insert({ news_id: newsId })
  // 23505 = já favoritada (unicidade user_id + news_id): o estado desejado já existe.
  if (error && error.code !== '23505') throw traduzirErro(error)
}

export async function removerFavoritoNoticia(newsId) {
  const { error } = await exigirCliente().from('favorites').delete().eq('news_id', newsId)
  if (error) throw traduzirErro(error)
}
