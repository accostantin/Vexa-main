import Selo from './Selo'

function CardRoupa({ roupa, favorito, aoAlternarFavorito }) {
  const iniciais = roupa.titulo
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0] ?? '')
    .join('')
    .toUpperCase()

  return (
    <article className="card-roupa">
      <div className="capa-roupa" aria-hidden="true">
        {roupa.capa ? (
          <img src={roupa.capa} alt="" loading="lazy" />
        ) : (
          <span className="capa-iniciais">{iniciais}</span>
        )}
      </div>

      <div className="card-conteudo">
        <div className="linha-topo">
          <Selo tipo="categoria">{roupa.categoria}</Selo>
          <button
            type="button"
            className={favorito ? 'favorito ativo' : 'favorito'}
            onClick={() => aoAlternarFavorito(roupa.id)}
            aria-label={`Alternar favorito de ${roupa.titulo}`}
          >
            {favorito ? 'Favoritado' : 'Favoritar'}
          </button>
        </div>

        <h3>{roupa.titulo}</h3>
        <p className="autor">{roupa.autor}</p>
        <p className="descricao">{roupa.descricao}</p>
      </div>
    </article>
  )
}

export default CardRoupa