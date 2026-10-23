import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test/renderApp.jsx'

describe('Rotas da aplicação unificada', () => {
  it('"/" redireciona para o Lado B', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: 'Lado A' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar por estilo, categoria..')).toBeInTheDocument()
  })

  it('rota inexistente cai no Lado A', () => {
    renderApp('/nao-existe')
    expect(screen.getByRole('heading', { name: 'Contato' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lado B' })).toBeInTheDocument()
  })

  it.each([
    ['/lado-a', 'Contato'],
    ['/cadastro', 'Criar conta'],
    ['/entrar', 'Entrar'],
    ['/lado-b/dashboard', 'Análise de gráficos feminicídio no Brasil'],
    ['/conteudos', 'Notícias'],
  ])('%s renderiza o heading "%s"', (rota, titulo) => {
    renderApp(rota)
    expect(screen.getAllByRole('heading', { name: titulo }).length).toBeGreaterThan(0)
  })

  it.each([
    '/lado-b',
    '/lado-b/acessorios',
    '/lado-b/nova-colecao',
    '/lado-b/contato',
    '/lado-b/sobre',
  ])('%s renderiza o cabeçalho do Lado B', (rota) => {
    renderApp(rota)
    const nav = screen.getByRole('navigation')
    for (const texto of ['Home', 'Acessórios', 'Nova Coleção', 'Contato', 'Sobre nós']) {
      expect(within(nav).getByRole('link', { name: texto })).toBeInTheDocument()
    }
  })

  it.each(['/sobreConteudos', '/canais-ajuda'])('%s renderiza sem erro', (rota) => {
    const { container } = renderApp(rota)
    expect(container.querySelector('.App')).not.toBeEmptyDOMElement()
  })

  it('/dashboard redireciona para /lado-b/dashboard', () => {
    renderApp('/dashboard')
    expect(screen.getByRole('heading', { name: /Análise de gráficos/ })).toBeInTheDocument()
  })

  it('/contato redireciona para /lado-b/contato', () => {
    renderApp('/contato')
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveClass('ativo')
  })
})

describe('Navegação entre os lados', () => {
  it('página de informações -> botão "Lado B" leva ao catálogo', async () => {
    renderApp('/lado-a')
    await userEvent.click(screen.getByRole('link', { name: 'Lado B' }))
    expect(screen.getByPlaceholderText('Buscar por estilo, categoria..')).toBeInTheDocument()
  })

  it('catálogo -> botão "Lado A" leva ao login, que leva às informações', async () => {
    renderApp('/lado-b')
    await userEvent.click(screen.getByRole('link', { name: 'Lado A' }))
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('menu do Lado A navega para Notícias, Dashboard e Conteúdos', async () => {
    renderApp('/lado-a')
    const nav = () => screen.getAllByRole('navigation')[0]

    await userEvent.click(within(nav()).getByRole('link', { name: 'Notícias' }))
    expect(screen.getByPlaceholderText('Buscar por Notícias..')).toBeInTheDocument()

    await userEvent.click(within(nav()).getByRole('link', { name: 'Dashboard' }))
    expect(screen.getByRole('heading', { name: /Análise de gráficos/ })).toBeInTheDocument()

    await userEvent.click(within(nav()).getByRole('link', { name: 'Conteúdos' }))
    expect(screen.getByRole('link', { name: 'Notícias' })).toBeInTheDocument()
  })

  it('navegação entre as abas do Lado B', async () => {
    renderApp('/lado-b')
    for (const [aba, rotaAtiva] of [
      ['Acessórios', 'Acessórios'],
      ['Nova Coleção', 'Nova Coleção'],
      ['Contato', 'Contato'],
      ['Sobre nós', 'Sobre nós'],
      ['Home', 'Home'],
    ]) {
      await userEvent.click(screen.getByRole('link', { name: aba }))
      expect(screen.getByRole('link', { name: rotaAtiva })).toHaveClass('ativo')
    }
  })
})

describe('Favoritos compartilhados', () => {
  it('favoritar persiste no localStorage e é lido na montagem', async () => {
    const { unmount } = renderApp('/lado-b')
    await userEvent.click(screen.getByRole('button', { name: 'Alternar favorito de Calça Jeans Reta' }))
    expect(JSON.parse(localStorage.getItem('favoritos'))).toEqual([1])
    unmount()

    renderApp('/lado-b')
    expect(screen.getByRole('button', { name: 'Alternar favorito de Calça Jeans Reta' })).toHaveTextContent('Favoritado')
  })

  it('desfavoritar remove do localStorage', async () => {
    localStorage.setItem('favoritos', JSON.stringify([1]))
    renderApp('/lado-b')
    await userEvent.click(screen.getByRole('button', { name: 'Alternar favorito de Calça Jeans Reta' }))
    expect(JSON.parse(localStorage.getItem('favoritos'))).toEqual([])
  })

  it('localStorage corrompido não derruba a aplicação', () => {
    localStorage.setItem('favoritos', '{isso não é json')
    renderApp('/lado-b')
    expect(screen.getByPlaceholderText('Buscar por estilo, categoria..')).toBeInTheDocument()
  })
})
