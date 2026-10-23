import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/cadastro.css'
import { definirNovaSenha } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.js'

// Aberta pelo link enviado por e-mail: o Supabase cria uma sessão de recuperação
// e esta página define a nova senha dessa sessão.
function RedefinirSenha() {
  const navigate = useNavigate()
  const { user, carregando } = useAuth()
  const [senha, setSenha] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function salvar(e) {
    e.preventDefault()
    if (senha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }
    setEnviando(true)
    try {
      await definirNovaSenha(senha)
      alert('Senha alterada com sucesso!')
      navigate('/lado-a', { replace: true })
    } catch (err) {
      alert(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="cadastro-page">
      <div className="bolha bolha-1"></div>
      <div className="bolha bolha-2"></div>
      <div className="bolha bolha-3"></div>

      <section className="cadastro-container">
        <div className="cadastro-card">
          <h1>Nova senha</h1>

          {carregando ? (
            <p className="cadastro-subtitulo" role="status">Carregando…</p>
          ) : !user ? (
            <>
              <p className="cadastro-subtitulo" role="alert">
                Link inválido ou expirado. Peça um novo link na tela de login.
              </p>
              <button type="button" className="btn-cadastrar" onClick={() => navigate('/entrar')}>
                Ir para o login
              </button>
            </>
          ) : (
            <>
              <p className="cadastro-subtitulo">Escolha uma nova senha para sua conta</p>
              <form onSubmit={salvar}>
                <label htmlFor="nova-senha">Nova senha</label>
                <div className="senha-container">
                  <input
                    id="nova-senha"
                    type={mostrar ? 'text' : 'password'}
                    placeholder="Digite sua nova senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button type="button" className="btn-mostrar-senha" onClick={() => setMostrar(!mostrar)}>
                    {mostrar ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <button className="btn-cadastrar" type="submit" disabled={enviando}>
                  Alterar senha
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default RedefinirSenha
