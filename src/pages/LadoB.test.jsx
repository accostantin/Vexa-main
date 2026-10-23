import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRota } from '../test/renderApp.jsx'
import LadoB from './ladob.jsx'
import roupas from '../data/roupas.json'

const cards = () => document.querySelectorAll('.card-roupa')

describe('Lado B – catálogo de roupas', () => {
  it('lista todas as roupas inicialmente', () => {
    renderRota(<LadoB />)
    expect(cards()).toHaveLength(roupas.length)
  })

  it('busca por título, ignorando maiúsculas/minúsculas', async () => {
    renderRota(<LadoB />)
    await userEvent.type(screen.getByLabelText('Buscar roupas'), 'JEANS')
    const esperado = roupas.filter((r) =>
      [r.titulo, r.autor, r.categoria, ...r.tags].some((c) => c.toLowerCase().includes('jeans'))
    )
    expect(cards()).toHaveLength(esperado.length)
    expect(esperado.length).toBeGreaterThan(0)
  })

  it('busca por tag', async () => {
    renderRota(<LadoB />)
    await userEvent.type(screen.getByLabelText('Buscar roupas'), roupas[0].tags[0])
    expect(cards().length).toBeGreaterThan(0)
  })

  it.each(['Calça', 'Blusa', 'Vestido', 'Short'])('filtra pela categoria %s', async (cat) => {
    renderRota(<LadoB />)
    await userEvent.selectOptions(screen.getByRole('combobox'), cat)
    expect(cards()).toHaveLength(roupas.filter((r) => r.categoria === cat).length)
  })

  it('mostra estado vazio quando nada corresponde', async () => {
    renderRota(<LadoB />)
    await userEvent.type(screen.getByLabelText('Buscar roupas'), 'zzzxxx')
    expect(screen.getByText('Nenhuma roupa encontrada')).toBeInTheDocument()
    expect(cards()).toHaveLength(0)
  })

  it('filtro "Favoritos" mostra só os favoritados', async () => {
    renderRota(<LadoB favoritos={[2, 3]} />)
    await userEvent.click(screen.getByRole('button', { name: 'Favoritos' }))
    expect(cards()).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'Todos' }))
    expect(cards()).toHaveLength(roupas.length)
  })

  it('"Favoritos" sem nenhum favorito mostra estado vazio', async () => {
    renderRota(<LadoB favoritos={[]} />)
    await userEvent.click(screen.getByRole('button', { name: 'Favoritos' }))
    expect(screen.getByText('Nenhuma roupa encontrada')).toBeInTheDocument()
  })

  it('clicar em favoritar chama o callback com o id', async () => {
    const chamadas = []
    renderRota(<LadoB aoAlternarFavorito={(id) => chamadas.push(id)} />)
    await userEvent.click(screen.getByRole('button', { name: `Alternar favorito de ${roupas[4].titulo}` }))
    expect(chamadas).toEqual([roupas[4].id])
  })

  it('carrossel avança e volta ciclicamente', async () => {
    renderRota(<LadoB />)
    expect(screen.getByAltText('Slide 1')).toBeInTheDocument()
    await userEvent.click(screen.getByText('▶'))
    expect(screen.getByAltText('Slide 2')).toBeInTheDocument()
    await userEvent.click(screen.getByText('◀'))
    await userEvent.click(screen.getByText('◀'))
    expect(screen.getByAltText('Slide 3')).toBeInTheDocument()
  })
})
