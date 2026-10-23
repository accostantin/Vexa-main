import { useNavigate } from 'react-router-dom';

function HeroSobre() {
  const navigate = useNavigate();

  const scrollToTiposDeViolencia = () => {
    document.getElementById("tipos-violencia")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleCanaisDeAjuda = () => {
    navigate('/canais-ajuda');
  };

  return (
    <section className="hero-sobre">
      <div className="hero-sobre-conteudo">
        <h1>
          Nenhuma mulher deveria <span className="purple-text">ter medo de</span>
          <br />
          estar em casa ou sair na rua.
        </h1>
        <p className="texto1">
      Falar sobre violência contra a mulher é um ato de resistência e de cuidado coletivo. 
      Este espaço foi criado para informar, sensibilizar e apoiar, trazendo os tipos de violência existentes, seus sinais e os caminhos para buscar ajuda.
       Porque conhecer é o primeiro passo para transformar
        </p>

        <div className="painel-projeto" aria-label="Conteudos">
          <div className="linha-tecnologias">
             <button className="botao1" type="button" onClick={handleCanaisDeAjuda}>
                Ver canais de ajuda
             </button>
             <button className="botao2" type="button" onClick={scrollToTiposDeViolencia}>
                Entender formas de violência
             </button>
          </div>
        </div>
        <div className="conteudos-underline2"></div>
     </div>
    </section>
  )
}

export default HeroSobre