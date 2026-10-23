import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLadoA from './ButtonLadoA.jsx';
import Menu from './menu.jsx';
import Sidebar from './sidebar.jsx';


function Header({ onMenuClick }) {

  // Páginas que já controlam o próprio Sidebar (ex.: Lado A) passam onMenuClick.
  // As demais (Notícias, Dashboard, Conteúdos) usam o menu embutido aqui.
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <header className="header">

        <Menu onMenuClick={onMenuClick ?? (() => setMenuAberto(true))} />

        <div className="logo">
          <h1 className="titulo">VEXA</h1>
        </div>

        <nav>
          <NavLink to="/conteudos">Notícias</NavLink>
          <NavLink to="/lado-b/dashboard">Dashboard</NavLink>
          <NavLink to="/sobreConteudos">Conteúdos</NavLink>
          <NavLink to="/lado-a#contato">Contato</NavLink>
        </nav>

        <ButtonLadoA />

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
