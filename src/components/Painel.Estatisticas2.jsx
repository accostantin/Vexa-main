function PainelEstatisticas2({ total, exibidos, favoritos, categorias }) {
  
    const indicadores = [
    { rotulo: 'Noticias cadastradas', valor: total },
    { rotulo: 'Resultado atual', valor: exibidos },
    { rotulo: 'Favoritos', valor: favoritos },
    { rotulo: 'Categorias', valor: categorias },
    ]
    return (
     <section className="painel-estatisticas2" aria-label="Resumo do catálogo de notícias">
       {indicadores.map((item) => (
        <article key={item.rotulo} className="stat-card">
         <strong>{item.valor}</strong>
         <span>{item.rotulo}</span>
        </article>
    ))}
    </section>
    )
    }
    export default PainelEstatisticas2