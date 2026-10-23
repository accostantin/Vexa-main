import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../assets/css/cadastro.css'
import '../assets/css/perfil.css'
import { useAuth } from '../context/AuthContext.js'
import { obterPerfil, salvarPerfil } from '../services/profileService.js'
import { sair } from '../services/authService.js'

const NOME_MAX = 100

function formatarData(iso) {
  if (!iso) return '—'
  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return '—'
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function validarNome(valor) {
  const nome = valor.trim()
  if (!nome) return 'Informe seu nome.'
  if (nome.length > NOME_MAX) return `O nome deve ter no máximo ${NOME_MAX} caracteres.`
  return ''
}

function Perfil() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const [perfil, setPerfil] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState('')
  const [erroNome, setErroNome] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'sucesso' | 'erro', texto }

  useEffect(() => {
    let ativo = true
    obterPerfil(user.id)
      .then((dados) => {
        if (!ativo) return
        // Se o trigger ainda não criou a linha, usa o nome do cadastro como ponto de partida.
        setPerfil(dados ?? { id: user.id, name: user.user_metadata?.name ?? '', created_at: user.created_at })
      })
      .catch((e) => {
        if (ativo) setMensagem({ tipo: 'erro', texto: e.message })
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
  }, [user])

  function iniciarEdicao() {
    setNome(perfil?.name ?? '')
    setErroNome('')
    setMensagem(null)
    setEditando(true)
  }

  function cancelar() {
    setNome(perfil?.name ?? '')
    setErroNome('')
    setEditando(false)
  }

  async function salvar(e) {
    e.preventDefault()
    const erro = validarNome(nome)
    if (erro) {
      setErroNome(erro)
      return
    }
    setSalvando(true)
    setMensagem(null)
    try {
      const atualizado = await salvarPerfil(user.id, { nome: nome.trim() })
      setPerfil(atualizado) // só muda a tela depois que o banco confirmou
      setEditando(false)
      setMensagem({ tipo: 'sucesso', texto: 'Perfil atualizado com sucesso.' })
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message })
    } finally {
      setSalvando(false)
    }
  }

  // Volta para a página anterior; se a pessoa abriu o perfil direto (sem histórico), vai para o Lado A.
  function voltar() {
    if (location.key !== 'default') navigate(-1)
    else navigate('/lado-a')
  }

  async function aoSair() {
    try {
      await sair()
      navigate('/entrar', { replace: true })
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.message })
    }
  }

  return (
    <main className="cadastro-page">
      <div className="bolha bolha-1"></div>
      <div className="bolha bolha-2"></div>
      <div className="bolha bolha-3"></div>
      <div className="bolha bolha-4"></div>
      <div className="bolha bolha-5"></div>
      <div className="bolha bolha-6"></div>

      <section className="cadastro-container">
        <div className="cadastro-card">
          <h1>Meu perfil</h1>
          <p className="cadastro-subtitulo">Seus dados de cadastro</p>

          {mensagem && (
            <p className={`perfil-msg ${mensagem.tipo}`} role={mensagem.tipo === 'erro' ? 'alert' : 'status'}>
              {mensagem.texto}
            </p>
          )}

          {carregando ? (
            <p role="status">Carregando…</p>
          ) : !editando ? (
            <>
              <dl className="perfil-dados">
                <div>
                  <dt>Nome</dt>
                  <dd>{perfil?.name || '—'}</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>{user.email}</dd>
                </div>
                <div>
                  <dt>Conta criada em</dt>
                  <dd>{formatarData(perfil?.created_at ?? user.created_at)}</dd>
                </div>
              </dl>

              <div className="perfil-acoes">
                <button type="button" className="btn-cadastrar" onClick={iniciarEdicao} disabled={!perfil}>
                  Editar perfil
                </button>
                <button type="button" className="btn-secundario" onClick={voltar}>
                  Voltar
                </button>
                <button type="button" className="btn-secundario" onClick={aoSair}>
                  Sair
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={salvar} noValidate>
              <label htmlFor="perfil-nome">Nome</label>
              <input
                id="perfil-nome"
                type="text"
                value={nome}
                maxLength={NOME_MAX + 20}
                aria-invalid={Boolean(erroNome)}
                aria-describedby={erroNome ? 'perfil-nome-erro' : undefined}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
              />
              {erroNome && (
                <p id="perfil-nome-erro" className="perfil-erro-campo" role="alert">
                  {erroNome}
                </p>
              )}

              <label htmlFor="perfil-email">E-mail</label>
              <input id="perfil-email" type="email" value={user.email ?? ''} readOnly aria-readonly="true" />

              <div className="perfil-acoes">
                <button type="submit" className="btn-cadastrar" disabled={salvando}>
                  {salvando ? 'Salvando…' : 'Salvar'}
                </button>
                <button type="button" className="btn-secundario" onClick={cancelar} disabled={salvando}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Perfil
