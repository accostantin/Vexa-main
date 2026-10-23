function NoticiasCard({
  id,
  titulo,
  descricao,
  tags = [],
  conteudoUrl,
  link,
  favorito = false,
  aoAlternarFavorito = () => {}
}) {
  const url = conteudoUrl || link || '#'

  return (
    <article className="noticias-card">
      <div className="noticias-card-header">
        <div className="noticias-card-topo">
        </div>

        <h2>{titulo}</h2>
      </div>

      <div className="noticias-card-conteudo">
        <p>{descricao}</p>

        <div className="noticias-card-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="noticias-card-actions">
          <a
            className="noticias-card-link"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Ver conteúdo
          </a>

          <button
            type="button"
            className={favorito ? 'favorito ativo' : 'favorito'}
            onClick={() => aoAlternarFavorito(id)}
            aria-label={`Alternar favorito de ${titulo}`}
          >
            {favorito ? 'Favoritado' : 'Favoritar'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default NoticiasCard