import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLadoB from './btn.jsx';
import Sidebar from './sidebar.jsx';


function Header({ onMenuClick }) {

  // Páginas que já controlam o próprio Sidebar (ex.: Lado A) passam onMenuClick.
  // As demais (Notícias, Dashboard, Conteúdos) usam o menu embutido aqui.
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <header className="header">

      

        <div className="logo">
          <h1 className="titulo">VEXA</h1>
        </div>

        <nav>
          <NavLink to="#">Partes de cima</NavLink>
          <NavLink to="#">Partes de baixo</NavLink>
          <NavLink to="#">Calçados</NavLink>
          <NavLink to="#">Acessórios</NavLink>
        </nav>

        <ButtonLadoB />

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
