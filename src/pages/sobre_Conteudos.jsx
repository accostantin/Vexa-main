
import Header2 from "../components/header.jsx";
import HeroSobre from "../components/HeroSobre.jsx";
import MainSobre from "../components/MainSobre.jsx";
import Footer from "../components/footer.jsx";

function SobreConteudos() {
  return (
    <section className="sobre-Conteudos">
      <Header2 />
      <HeroSobre />
      <MainSobre />

      <div className="fontes-conteudos">
        <p>
          <strong>Fontes:</strong>{" "}
          <a
            href="https://mulher.rs.gov.br/quais-os-tipos-de-violencia-contra-a-mulher"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secretaria da Mulher do Rio Grande do Sul — Tipos de violência
          </a>
          {" | "}
          <a
            href="https://www.cnj.jus.br/formas-de-violencia-contra-a-mulher/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conselho Nacional de Justiça — Formas de violência
          </a>
          {" | "}
          <a
            href="https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2024/janeiro/CartilhaDigital1.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministério das Mulheres — Cartilha informativa
          </a>
          {" | "}
          <a
            href="https://mulher.rs.gov.br/perguntas-frequentes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Secretaria da Mulher do RS — Perguntas frequentes
          </a>
          {" | "}
          <a
            href="https://www.institutomariadapenha.org.br/violencia-domestica/ciclo-da-violencia.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instituto Maria da Penha — Ciclo da violência
          </a>
          {" | "}
          <a
            href="https://informasus.ufscar.br/violencia-contra-a-mulher/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UFSCar — Violência contra a mulher
          </a>
          {" | "}
          <a
            href="https://www.gov.br/pt-br/servicos/denunciar-e-buscar-ajuda-a-vitimas-de-violencia-contra-mulheres"
            target="_blank"
            rel="noopener noreferrer"
          >
            Governo Federal — Denunciar e buscar ajuda
          </a>
          {" | "}
          <a
            href="https://www.gov.br/mulheres/pt-br/ligue180"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministério das Mulheres — Ligue 180
          </a>
          {" | "}
          <a
            href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brasil — Lei Maria da Penha (Lei nº 11.340/2006)
          </a>
        </p>
      </div>

      <Footer />
    </section>
  );
}

export default SobreConteudos;

