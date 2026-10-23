import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/renderApp.jsx'
import { criarSessao } from '../test/helpers.js'
import noticias from '../data/conteudos.json'
import { aoMudarAutenticacao, obterSessao } from '../services/authService.js'
import {
  adicionarFavoritoNoticia,
  listarFavoritosNoticias,
  removerFavoritoNoticia,
} from '../services/favoritesService.js'

vi.mock('../services/authService.js', () => ({
  cadastrar: vi.fn(),
  entrar: vi.fn(),
  entrarComProvedor: vi.fn(),
  enviarLinkRedefinicao: vi.fn(),
  definirNovaSenha: vi.fn(),
  sair: vi.fn(),
  obterSessao: vi.fn(),
  aoMudarAutenticacao: vi.fn(),
}))

vi.mock('../services/favoritesService.js', () => ({
  listarFavoritosNoticias: vi.fn(),
  adicionarFavoritoNoticia: vi.fn(),
  removerFavoritoNoticia: vi.fn(),
}))

const botao = (n) => screen.getByRole('button', { name: `Alternar favorito de ${n.titulo}` })

beforeEach(() => {
  vi.clearAllMocks()
  aoMudarAutenticacao.mockImplementation(() => () => {})
  obterSessao.mockResolvedValue(criarSessao())
  listarFavoritosNoticias.mockResolvedValue([])
  adicionarFavoritoNoticia.mockResolvedValue()
  removerFavoritoNoticia.mockResolvedValue()
})

describe('Favoritos de notícias (banco)', () => {
  it('sem login, favoritar leva ao login e não grava nada', async () => {
    obterSessao.mockResolvedValue(null)
    renderApp('/conteudos')
    await userEvent.click(botao(noticias[0]))
    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
    expect(adicionarFavoritoNoticia).not.toHaveBeenCalled()
    expect(listarFavoritosNoticias).not.toHaveBeenCalled()
  })

  it('carrega do banco os favoritos da conta ao abrir a página', async () => {
    listarFavoritosNoticias.mockResolvedValue([noticias[1].id])
    renderApp('/conteudos')
    await waitFor(() => expect(botao(noticias[1])).toHaveTextContent('Favoritado'))
    expect(botao(noticias[0])).toHaveTextContent('Favoritar')
  })

  it('favoritar grava no banco e desfavoritar remove', async () => {
    renderApp('/conteudos')
    await waitFor(() => expect(listarFavoritosNoticias).toHaveBeenCalled())

    await userEvent.click(botao(noticias[0]))
    expect(adicionarFavoritoNoticia).toHaveBeenCalledWith(noticias[0].id)
    await waitFor(() => expect(botao(noticias[0])).toHaveTextContent('Favoritado'))

    await userEvent.click(botao(noticias[0]))
    expect(removerFavoritoNoticia).toHaveBeenCalledWith(noticias[0].id)
    await waitFor(() => expect(botao(noticias[0])).toHaveTextContent('Favoritar'))
  })

  it('se o banco recusar, desfaz a mudança e avisa', async () => {
    adicionarFavoritoNoticia.mockRejectedValue(new Error('Não foi possível concluir a operação. Tente novamente.'))
    renderApp('/conteudos')
    await waitFor(() => expect(listarFavoritosNoticias).toHaveBeenCalled())

    await userEvent.click(botao(noticias[0]))
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Não foi possível')))
    expect(botao(noticias[0])).toHaveTextContent('Favoritar')
  })

  it('não mistura com os favoritos de roupas (ids iguais no JSON, listas separadas)', async () => {
    localStorage.setItem('favoritos', JSON.stringify([noticias[0].id]))
    renderApp('/conteudos')
    await waitFor(() => expect(listarFavoritosNoticias).toHaveBeenCalled())
    expect(botao(noticias[0])).toHaveTextContent('Favoritar')
  })
})
