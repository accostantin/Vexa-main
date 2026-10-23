import { useState, useEffect } from 'react'

import AuthProvider from './context/AuthProvider.jsx'
import { useAuth } from './context/AuthContext.js'
import { useFavoritosNoticias } from './hooks/useFavoritosNoticias.js'
import RotaProtegida from './components/RotaProtegida.jsx'
import Perfil from './pages/Perfil.jsx'
import RedefinirSenha from './pages/RedefinirSenha.jsx'

import LadoA from './pages/lado-a.jsx'

import LadoB from './pages/ladob.jsx'
import LadoBAcessorios from './pages/lado-b-acessorios.jsx'
import LadoBNovaColecao from './pages/lado-b-nova-colecao.jsx'
import LadoBContato from './pages/lado-b-contato.jsx'
import LadoBSobre from './pages/lado-b-sobre.jsx'
import Conteudos from './pages/Conteudos.jsx'
import SobreConteudos from './pages/sobre_Conteudos.jsx'
import CanaisAjuda from './pages/Canais_Ajuda.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Entrar from './pages/Entrar.jsx'

import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'

import './App.css'
import './assets/css/responsive.css'

function AppRotas() {

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Favoritos de notícias ficam no banco, ligados à conta. Os de roupas (Lado B) continuam locais.
  const {
    favoritos: favoritosNoticias,
    erro: erroFavoritos,
    alternar: alternarNoticia,
  } = useFavoritosNoticias(user?.id)

  useEffect(() => {
    if (erroFavoritos) alert(erroFavoritos)
  }, [erroFavoritos])

  const toggleFavoritoNoticia = (id) => {
    if (!user) {
      navigate('/entrar', { state: { from: location } })
      return
    }
    alternarNoticia(id)
  }

  const [favoritos, setFavoritos] = useState(() => {

    try {

      const salvos = localStorage.getItem('favoritos')

      return salvos ? JSON.parse(salvos) : []

    } catch {

      return []

    }

  })

  useEffect(() => {

    localStorage.setItem('favoritos', JSON.stringify(favoritos))

  }, [favoritos])

  const toggleFavorito = (id) => {

    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    )

  }

  return (

    <div className="App">

      <main className="conteudo-principal">

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/lado-b" replace />}
          />

          <Route
            path="/lado-a"
            element={<LadoA />}
          />

          <Route
            path="/cadastro"
            element={<Cadastro />}
          />

          <Route
            path="/entrar"
            element={<Entrar />}
          />

          <Route
            path="/redefinir-senha"
            element={<RedefinirSenha />}
          />

          <Route
            path="/perfil"
            element={
              <RotaProtegida>
                <Perfil />
              </RotaProtegida>
            }
          />

          <Route
            path="/conteudos"
            element={
              <Conteudos
                favoritos={favoritosNoticias}
                aoAlternarFavorito={toggleFavoritoNoticia}
              />
            }
          />

          <Route
            path="/sobreConteudos"
            element={<SobreConteudos />}
          />

          <Route
            path="/canais-ajuda"
            element={<CanaisAjuda />}
          />

          <Route
            path="/lado-b"
            element={
              <LadoB
                favoritos={favoritos}
                aoAlternarFavorito={toggleFavorito}
              />
            }
          />

          <Route
            path="/lado-b/acessorios"
            element={
              <LadoBAcessorios
                favoritos={favoritos}
                aoAlternarFavorito={toggleFavorito}
              />
            }
          />

          <Route
            path="/lado-b/nova-colecao"
            element={
              <LadoBNovaColecao
                favoritos={favoritos}
                aoAlternarFavorito={toggleFavorito}
              />
            }
          />

          <Route
            path="/lado-b/contato"
            element={
              <LadoBContato
                favoritos={favoritos}
                aoAlternarFavorito={toggleFavorito}
              />
            }
          />

          <Route
            path="/lado-b/sobre"
            element={
              <LadoBSobre
                favoritos={favoritos}
                aoAlternarFavorito={toggleFavorito}
              />
            }
          />

          <Route
            path="/lado-b/dashboard"
            element={<Dashboard />}
          />

          {/* Atalhos usados pelo menu do Lado A */}
          <Route
            path="/dashboard"
            element={<Navigate to="/lado-b/dashboard" replace />}
          />

          <Route
  path="/contato"
  element={<Navigate to="/lado-b/contato" replace />}
/>

          <Route
            path="*"
            element={<Navigate to="/lado-a" replace />}
          />

        </Routes>

      </main>

    </div>

  )

}

function App() {

  return (

    <AuthProvider>

      <AppRotas />

    </AuthProvider>

  )

}

export default App