import CardRoupa from './CardRoupa.jsx'
import EmptyState from './EmptyState.jsx'

function ListaRoupa({ roupas, favoritos = [], aoAlternarFavorito = () => {} }) {
  if (roupas.length === 0) return <EmptyState />

  return (
    <section className="lista-roupas lado-b-grid" aria-label="Lista de roupas filtradas">
      {roupas.map((roupa) => (
        <CardRoupa
          key={roupa.id}
          roupa={roupa}
          favorito={favoritos.includes(roupa.id)}
          aoAlternarFavorito={aoAlternarFavorito}
        />
      ))}
    </section>
  )
}

export default ListaRoupa