
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLadoA from './ButtonLadoA.jsx';
import Menu from './menu.jsx';
import Sidebar from './sidebar.jsx';

function Header({ onMenuClick }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <header className="header">

        <div className="header-topo">
          <Menu
            onMenuClick={onMenuClick ?? (() => setMenuAberto(true))}
          />

          <div className="logo">
            <h1 className="titulo">VEXA</h1>
          </div>

          <ButtonLadoA />
        </div>

        <nav>
          <NavLink to="/conteudos">Notícias</NavLink>
          <NavLink to="/lado-b/dashboard">Dashboard</NavLink>
          <NavLink to="/sobreConteudos">Conteúdos</NavLink>
          <NavLink to="/lado-a#contato">Contato</NavLink>
        </nav>

      </header>

      {!onMenuClick && (
        <Sidebar
          isOpen={menuAberto}
          onClose={() => setMenuAberto(false)}
        />
      )}
    </>
  );
}

export default Header;
