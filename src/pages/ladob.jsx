import { useMemo, useState } from 'react'
import Header2 from '../components/header2.jsx'
import Carrossel2 from '../components/Carrossel2.jsx'
import SearchBarB from '../components/SearchBarB.jsx'
import FiltroCategoria from '../components/FiltroCategoria.jsx'
import ListaRoupa from '../components/ListaRoupa.jsx'
import roupasData from '../data/roupas.json'

const OPCOES_VISUAIS = ['Todos', 'Favoritos']

function LadoB({ favoritos = [], aoAlternarFavorito = () => {} }) {
  const [query, setQuery] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [filtroVisual, setFiltroVisual] = useState('Todos')

  const categorias = useMemo(
    () => ['Calça', 'Blusa', 'Vestido', 'Short'],
    []
  )

  const roupasFiltradas = useMemo(() => {
    const termo = query.trim().toLowerCase()

    return roupasData.filter((roupa) => {
      const matchCategoria = categoria === 'Todas' || roupa.categoria === categoria
      const matchBusca =
        !termo ||
        [roupa.titulo, roupa.autor, roupa.categoria, ...(roupa.tags ?? [])].some((campo) =>
          String(campo).toLowerCase().includes(termo)
        )

      const matchVisual =
        filtroVisual === 'Todos' ||
        (filtroVisual === 'Favoritos' && favoritos.includes(roupa.id))

      return matchCategoria && matchBusca && matchVisual
    })
  }, [categoria, filtroVisual, query, favoritos])

  return (
    <div className="lado-b-page">
      <Header2 />

      <Carrossel2 />

      <div className="lado-b-toolbar">
        <div className="lado-b-search-wrap">
          <SearchBarB value={query} onChange={setQuery} />
        </div>

        <div className="lado-b-select-wrap">
          <span className="lado-b-label"></span>
          <FiltroCategoria
            categorias={categorias}
            valor={categoria}
            aoAlterar={setCategoria}
          />
        </div>

        <div className="lado-b-chip-group">
          {OPCOES_VISUAIS.map((opcao) => (
            <button
              key={opcao}
              type="button"
              className={filtroVisual === opcao ? 'lado-b-chip active' : 'lado-b-chip'}
              onClick={() => setFiltroVisual(opcao)}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>

      <main className="lado-b-main">
        <ListaRoupa
          roupas={roupasFiltradas}
          favoritos={favoritos}
          aoAlternarFavorito={aoAlternarFavorito}
        />
      </main>
    </div>
  )
}

export default LadoB
