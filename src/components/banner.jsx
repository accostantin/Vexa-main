import "../assets/css/banner.css";
import marie from "../assets/img/marie.png";

function Banner() {
  return (
    <main className="banner-main">
      <div className="banner-container">

        <img
           src={marie}
           alt="Banner principal"
           className="banner-img"
        />

        <div className="banner-content">
          <p>
            Descubra novos conteúdos e participe da comunidade.
          </p>

          <button className="banner-btn"> 
            Saiba Mais 
          </button>
        </div>

      </div>
    </main>
  );
}

export default Banner;