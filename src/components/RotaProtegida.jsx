import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'

function RotaProtegida({ children }) {
  const { user, carregando } = useAuth()
  const location = useLocation()

  if (carregando) return <p role="status" style={{ padding: '40px' }}>Carregando…</p>
  if (!user) return <Navigate to="/entrar" replace state={{ from: location }} />
  return children
}

export default RotaProtegida
