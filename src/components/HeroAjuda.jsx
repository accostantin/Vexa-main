function HeroAjuda () {
  function handleVerTodosOsCanais() {
    document.getElementById('diretorio')?.scrollIntoView({ behavior: 'smooth' });
  }

    return (
    <section className="hero-ajuda">
      <div className="hero-ajuda-conteudo">
        <h1>
          Denunciar é o primeiro passo <br /> <span className="text-purple">para romper o ciclo</span> .</h1>
          
        <p className="texto-ajuda1">
        Existem vários caminhos para denunciar violência contra a mulher por telefone, presencialmente ou pela internet.
        Todos são gratuitos e a identidade de quem denuncia pode ser mantida em sigilo.
        </p>

         <div className="painel-projeto2" aria-label="Conteudos-ajuda">
          <div className="linha-tecnologias2">
            <button className="botao-ajuda" type="button">Emergência: ligar 190</button>
            <button className="botao-ajuda2" type="button" onClick={handleVerTodosOsCanais}>Ver todos os canais</button>
          </div>
        </div>
         <div className="conteudos-underline3"></div>
        </div>
        </section>
        )
}

export default HeroAjuda