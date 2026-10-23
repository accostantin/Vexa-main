import NoticiaCard from './NoticiasCard.jsx'
import EmptyState2 from './EmptyState2.jsx'

function ListaConteudo({ conteudos, favoritos = [], aoAlternarFavorito = () => {} }) {
  if (conteudos.length === 0) return <EmptyState2 />

  return (
    <section className="lista-conteudos lado-b-grid" aria-label="Lista de conteúdos filtrados">
      {conteudos.map((conteudo) => (
        <NoticiaCard
          key={conteudo.id}
          {...conteudo}
          favorito={favoritos.includes(conteudo.id)}
          aoAlternarFavorito={aoAlternarFavorito}
        />
      ))}
    </section>
  )
}

export default ListaConteudo