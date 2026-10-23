import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/renderApp.jsx'
import { criarSessao } from '../test/helpers.js'
import { aoMudarAutenticacao, obterSessao, sair } from '../services/authService.js'
import { obterPerfil, salvarPerfil } from '../services/profileService.js'

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

vi.mock('../services/profileService.js', () => ({
  obterPerfil: vi.fn(),
  salvarPerfil: vi.fn(),
}))

const PERFIL = { id: 'u1', name: 'Maria', created_at: '2026-03-15T12:00:00Z', updated_at: '2026-03-15T12:00:00Z' }

beforeEach(() => {
  vi.clearAllMocks()
  aoMudarAutenticacao.mockImplementation(() => () => {})
  obterSessao.mockResolvedValue(criarSessao())
  obterPerfil.mockResolvedValue(PERFIL)
})

describe('Página de perfil', () => {
  it('sem sessão redireciona para o login', async () => {
    obterSessao.mockResolvedValue(null)
    renderApp('/perfil')
    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
    expect(obterPerfil).not.toHaveBeenCalled()
  })

  it('mostra nome, e-mail e data de criação da conta, sem dados sensíveis', async () => {
    renderApp('/perfil')
    expect(await screen.findByText('Maria')).toBeInTheDocument()
    expect(screen.getByText('maria@x.com')).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
    expect(obterPerfil).toHaveBeenCalledWith('u1')
    expect(screen.queryByText(/senha/i)).not.toBeInTheDocument()
  })

  it('cancelar descarta o que foi digitado', async () => {
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    const campo = screen.getByLabelText('Nome')
    expect(campo).toHaveValue('Maria')
    await userEvent.clear(campo)
    await userEvent.type(campo, 'Outra pessoa')
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(salvarPerfil).not.toHaveBeenCalled()
    expect(screen.getByText('Maria')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Editar perfil' }))
    expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
  })

  it('salva o novo nome e só atualiza a tela depois da confirmação', async () => {
    salvarPerfil.mockResolvedValue({ ...PERFIL, name: 'Maria Silva' })
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    const campo = screen.getByLabelText('Nome')
    await userEvent.clear(campo)
    await userEvent.type(campo, '  Maria Silva ')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(salvarPerfil).toHaveBeenCalledWith('u1', { nome: 'Maria Silva' })
    expect(await screen.findByText('Maria Silva')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Perfil atualizado com sucesso.')
  })

  it('valida nome obrigatório', async () => {
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    await userEvent.clear(screen.getByLabelText('Nome'))
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Informe seu nome.')
    expect(salvarPerfil).not.toHaveBeenCalled()
  })

  it('erro ao salvar mantém a edição aberta e mostra a mensagem', async () => {
    salvarPerfil.mockRejectedValue(new Error('Não foi possível concluir a operação. Tente novamente.'))
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    await userEvent.type(screen.getByLabelText('Nome'), ' Silva')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível concluir a operação')
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  })

  it('o e-mail aparece somente leitura na edição', async () => {
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('readonly')
  })

  it('"Voltar" volta para a página anterior quando há histórico', async () => {
    render(
      <MemoryRouter initialEntries={['/conteudos', '/perfil']} initialIndex={1}>
        <App />
      </MemoryRouter>
    )
    await userEvent.click(await screen.findByRole('button', { name: 'Voltar' }))
    expect(await screen.findByPlaceholderText('Buscar por Notícias..')).toBeInTheDocument()
  })

  it('"Voltar" vai para o Lado A quando o perfil foi aberto direto', async () => {
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Voltar' }))
    expect(await screen.findByRole('heading', { name: 'Contato' })).toBeInTheDocument()
  })

  it('o botão "Voltar" não aparece durante a edição', async () => {
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Editar perfil' }))
    expect(screen.queryByRole('button', { name: 'Voltar' })).not.toBeInTheDocument()
  })

  it('"Sair" encerra a sessão e volta ao login', async () => {
    sair.mockResolvedValue()
    renderApp('/perfil')
    await userEvent.click(await screen.findByRole('button', { name: 'Sair' }))
    await waitFor(() => expect(sair).toHaveBeenCalledOnce())
    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })
})
