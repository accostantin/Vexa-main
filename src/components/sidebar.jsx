import { useNavigate } from "react-router-dom";
import "../assets/css/sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function irPara(rota) {
    onClose();
    navigate(rota);
  }

  // Criar conta ou entrar
  function handleLogin() {
    irPara("/entrar");
  }

  // Perfil (a rota é protegida: sem login, leva para /entrar e volta depois)
  function handleProfile() {
    irPara("/perfil");
  }

  // Ajuda
  function handleHelp() {
    irPara("/canais-ajuda");
  }

  // Configurações
  function handleSettings() {
    onClose();
    alert("Abrindo configurações...");
  }

  return (
    <>
      {/* Fundo escuro */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* Voltar */}
        <div
          className="sidebar-item"
          onClick={onClose}
        >
          <span className="icone">←</span>
          <span>Voltar</span>
        </div>

        {/* Criar conta ou entrar */}
        <div
          className="sidebar-item"
          onClick={handleLogin}
        >
          <span className="icone">✎</span>
          <span>Criar conta ou entrar</span>
        </div>

        {/* Perfil */}
        <div
          className="sidebar-item"
          onClick={handleProfile}
        >
          <span className="icone">☺</span>
          <span>Meu perfil</span>
        </div>

        {/* Ajuda */}
        <div
          className="sidebar-item"
          onClick={handleHelp}
        >
          <span className="icone">?</span>
          <span>Ajuda</span>
        </div>

        {/* Configurações */}
        <div
          className="sidebar-item"
          onClick={handleSettings}
        >
          <span className="icone">⚙</span>
          <span>Configurações</span>
        </div>

      </div>
    </>
  );
}

export default Sidebar;