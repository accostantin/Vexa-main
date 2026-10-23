import { NavLink } from 'react-router-dom'
import Button from './btn.jsx'

function Header2() {
  return (
    <header className="header2">
      <div className="logo">
        <h1 className="titulo">VEXA</h1>
      </div>
      <nav>
        <NavLink to="/lado-b" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Home 
        </NavLink>
        <NavLink to="/lado-b/acessorios" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Acessórios 
        </NavLink>
        <NavLink to="/lado-b/nova-colecao" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Nova Coleção 
        </NavLink>
        <NavLink to="/lado-b/contato" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Contato 
        </NavLink>
        <NavLink to="/lado-b/sobre" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Sobre nós 
        </NavLink>
      </nav>
      <Button />
    </header>
  )
}

export default Header2