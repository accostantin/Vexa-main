import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRota } from '../test/renderApp.jsx'
import Conteudos from './Conteudos.jsx'
import noticias from '../data/conteudos.json'

const cards = () => document.querySelectorAll('.noticias-card')

describe('Notícias', () => {
  it('lista todas as notícias', () => {
    renderRota(<Conteudos />)
    expect(cards()).toHaveLength(noticias.length)
  })

  it('busca por texto', async () => {
    renderRota(<Conteudos />)
    await userEvent.type(screen.getByLabelText('Buscar conteúdos'), 'maria da penha')
    const esperado = noticias.filter((n) =>
      [n.titulo, n.autor, n.categoria, ...(n.tags ?? [])].some((c) => c.toLowerCase().includes('maria da penha'))
    )
    expect(cards()).toHaveLength(esperado.length)
    expect(esperado.length).toBeGreaterThan(0)
  })

  it('filtra por cada categoria existente', async () => {
    renderRota(<Conteudos />)
    const categorias = [...new Set(noticias.map((n) => n.categoria))]
    for (const cat of categorias) {
      await userEvent.selectOptions(screen.getByRole('combobox'), cat)
      expect(cards()).toHaveLength(noticias.filter((n) => n.categoria === cat).length)
    }
  })

  it('estado vazio para busca sem resultado', async () => {
    renderRota(<Conteudos />)
    await userEvent.type(screen.getByLabelText('Buscar conteúdos'), 'zzzxxx')
    expect(screen.getByText('Nenhuma notícia encontrada')).toBeInTheDocument()
  })

  it('filtro Favoritos', async () => {
    renderRota(<Conteudos favoritos={[1]} />)
    await userEvent.click(screen.getByRole('button', { name: 'Favoritos' }))
    expect(cards()).toHaveLength(1)
  })

  it('links externos abrem em nova aba de forma segura', () => {
    renderRota(<Conteudos />)
    const links = screen.getAllByRole('link', { name: 'Ver conteúdo' })
    expect(links).toHaveLength(noticias.length)
    for (const a of links) {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel')).toContain('noreferrer')
      expect(a.getAttribute('href')).toMatch(/^https?:\/\//)
    }
  })
})
