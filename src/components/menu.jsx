import minhaImagem from "../assets/img/menu.png";

function Menu({ onMenuClick }) {
  return (
    <button
      className="menu-btn"
      onClick={onMenuClick}
    >
      <img src={minhaImagem} alt="Menu" />
    </button>
  );
}

export default Menu;