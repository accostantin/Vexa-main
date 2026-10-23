import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '../test/renderApp.jsx'
import { obterPerfil } from '../services/profileService.js'
import { criarSessao, criarUsuaria } from '../test/helpers.js'
import {
  aoMudarAutenticacao,
  cadastrar,
  entrar,
  entrarComProvedor,
  enviarLinkRedefinicao,
  obterSessao,
} from '../services/authService.js'

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
  obterPerfil: vi.fn().mockResolvedValue(null),
  salvarPerfil: vi.fn(),
}))

let notificarAuth

beforeEach(() => {
  vi.clearAllMocks()
  notificarAuth = () => {}
  obterSessao.mockResolvedValue(null)
  obterPerfil.mockResolvedValue(null)
  aoMudarAutenticacao.mockImplementation((cb) => {
    notificarAuth = cb
    return () => {}
  })
})

async function preencherCadastro({ nome = 'Maria', email = 'maria@x.com', senha = '123456', termos = true } = {}) {
  if (nome) await userEvent.type(screen.getByPlaceholderText('Seu nome'), nome)
  if (email) await userEvent.type(screen.getByPlaceholderText('seuemail@email.com'), email)
  if (senha) await userEvent.type(screen.getByPlaceholderText('Sua senha'), senha)
  if (termos) await userEvent.click(screen.getByRole('checkbox'))
}

async function preencherLogin(email = 'maria@x.com', senha = '123456') {
  await userEvent.type(screen.getByPlaceholderText('seuemail@email.com'), email)
  await userEvent.type(screen.getByPlaceholderText('Sua senha'), senha)
}

describe('Cadastro', () => {
  it('cria a conta no serviço e vai para o Lado A quando já há sessão', async () => {
    cadastrar.mockResolvedValue({ user: criarUsuaria(), session: criarSessao() })
    renderApp('/cadastro')
    await preencherCadastro()
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))

    expect(cadastrar).toHaveBeenCalledWith({ nome: 'Maria', email: 'maria@x.com', senha: '123456' })
    expect(window.alert).toHaveBeenCalledWith('Conta criada com sucesso!')
    expect(await screen.findByRole('heading', { name: 'Contato' })).toBeInTheDocument()
  })

  it('sem sessão (confirmação de e-mail ativa) avisa e leva ao login', async () => {
    cadastrar.mockResolvedValue({ user: criarUsuaria(), session: null })
    renderApp('/cadastro')
    await preencherCadastro()
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('e-mail de confirmação'))
    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('exige todos os campos', async () => {
    renderApp('/cadastro')
    await preencherCadastro({ senha: '' })
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos.')
    expect(cadastrar).not.toHaveBeenCalled()
  })

  it('exige aceitar os termos', async () => {
    renderApp('/cadastro')
    await preencherCadastro({ termos: false })
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
    expect(window.alert).toHaveBeenCalledWith('Você precisa aceitar os termos e condições.')
    expect(cadastrar).not.toHaveBeenCalled()
  })

  it('exige senha com pelo menos 6 caracteres', async () => {
    renderApp('/cadastro')
    await preencherCadastro({ senha: '123' })
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
    expect(window.alert).toHaveBeenCalledWith('A senha deve ter pelo menos 6 caracteres.')
    expect(cadastrar).not.toHaveBeenCalled()
  })

  it('mostra o erro do serviço (ex.: e-mail já cadastrado) e permanece na tela', async () => {
    cadastrar.mockRejectedValue(new Error('Este e-mail já está cadastrado.'))
    renderApp('/cadastro')
    await preencherCadastro()
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Este e-mail já está cadastrado.'))
    expect(screen.getByRole('heading', { name: 'Criar conta' })).toBeInTheDocument()
  })

  it('botões sociais chamam o login com o provedor', async () => {
    entrarComProvedor.mockResolvedValue()
    renderApp('/cadastro')
    await userEvent.click(screen.getByRole('button', { name: /Google/ }))
    await userEvent.click(screen.getByRole('button', { name: /GitHub/ }))
    expect(entrarComProvedor).toHaveBeenNthCalledWith(1, 'google')
    expect(entrarComProvedor).toHaveBeenNthCalledWith(2, 'github')
  })

  it('link "Entrar" leva para a página de login', async () => {
    renderApp('/cadastro')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })
})

describe('Entrar', () => {
  it('login válido leva à página de informações', async () => {
    entrar.mockResolvedValue({ user: criarUsuaria(), session: criarSessao() })
    renderApp('/entrar')
    await preencherLogin()
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(entrar).toHaveBeenCalledWith({ email: 'maria@x.com', senha: '123456' })
    expect(window.alert).toHaveBeenCalledWith('Bem-vinda, Maria!')
    expect(await screen.findByRole('heading', { name: 'Contato' })).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Buscar por estilo, categoria..')).not.toBeInTheDocument()
  })

  it('credenciais inválidas mostram o erro e não saem da tela', async () => {
    entrar.mockRejectedValue(new Error('E-mail ou senha incorretos.'))
    renderApp('/entrar')
    await preencherLogin('maria@x.com', 'errada')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('E-mail ou senha incorretos.'))
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('campos vazios são rejeitados sem chamar o serviço', async () => {
    renderApp('/entrar')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(window.alert).toHaveBeenCalledWith('Preencha o e-mail e a senha.')
    expect(entrar).not.toHaveBeenCalled()
  })

  it('alterna mostrar/ocultar senha', async () => {
    renderApp('/entrar')
    const campo = screen.getByPlaceholderText('Sua senha')
    expect(campo).toHaveAttribute('type', 'password')
    await userEvent.click(screen.getByRole('button', { name: 'Mostrar' }))
    expect(campo).toHaveAttribute('type', 'text')
  })

  it('"Esqueci minha senha" envia link por e-mail, sem pedir nova senha na tela', async () => {
    enviarLinkRedefinicao.mockResolvedValue()
    renderApp('/entrar')
    await userEvent.click(screen.getByRole('button', { name: 'Esqueci minha senha' }))
    expect(screen.queryByPlaceholderText('Digite sua nova senha')).not.toBeInTheDocument()
    await userEvent.type(screen.getByPlaceholderText('seuemail@email.com'), 'maria@x.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar link' }))

    expect(enviarLinkRedefinicao).toHaveBeenCalledWith('maria@x.com')
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Se existir uma conta'))
    )
  })

  it('"Criar conta" leva ao cadastro', async () => {
    renderApp('/entrar')
    await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
    expect(screen.getByRole('heading', { name: 'Criar conta' })).toBeInTheDocument()
  })
})

describe('Fluxos', () => {
  it('catálogo -> "Lado A" -> login -> informações', async () => {
    entrar.mockResolvedValue({ user: criarUsuaria(), session: criarSessao() })
    renderApp('/lado-b')
    await userEvent.click(screen.getByRole('link', { name: 'Lado A' }))
    await preencherLogin()
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(await screen.findByRole('heading', { name: 'Contato' })).toBeInTheDocument()
  })

  it('rota protegida manda para o login e volta para ela depois de entrar', async () => {
    entrar.mockImplementation(async () => {
      const usuaria = criarUsuaria()
      notificarAuth('SIGNED_IN', { user: usuaria })
      return { user: usuaria, session: { user: usuaria } }
    })
    renderApp('/perfil')
    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()

    await preencherLogin()
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    expect(await screen.findByRole('heading', { name: 'Meu perfil' })).toBeInTheDocument()
  })
})
