import { NavLink } from 'react-router-dom'

function Menu2() {
  const links = [
    { to: '/lado-b', label: 'Home' },
    { to: '/lado-b/acessorios', label: 'Acessórios' },
    { to: '/lado-b/nova-colecao', label: 'Nova Coleção' },
  ]

  return (
    <nav className="menu2" aria-label="Menu principal">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'menu-link ativo' : 'menu-link')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu2