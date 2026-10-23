function PainelEstatisticas({ total, exibidos, favoritos, categorias }) {
    // Atencao: indicadores derivados devem vir de fonte unica de verdade para evitar inconsistencias.
    // Interessante: transformar os cards em array simplifica manutencao e extensao futura.
    const indicadores = [
    { rotulo: 'Roupas cadastradas', valor: total },
    { rotulo: 'Resultado atual', valor: exibidos },
    { rotulo: 'Favoritos', valor: favoritos },
    { rotulo: 'Categorias', valor: categorias },
    ]
    return (
     <section className="painel-estatisticas" aria-label="Resumo do catálogo de roupas">
       {indicadores.map((item) => (
        <article key={item.rotulo} className="stat-card">
         <strong>{item.valor}</strong>
         <span>{item.rotulo}</span>
        </article>
    ))}
    </section>
    )
    }
    export default PainelEstatisticas