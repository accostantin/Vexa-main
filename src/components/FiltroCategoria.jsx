function FiltroCategoria({ categorias, valor, aoAlterar }) {
    // Atencao: categorias precisam ser unicas e estaveis para evitar chaves duplicadas no map.
    // Interessante: select controlado facilita sincronizar UI e regras de negocio.
    return (
    <label className="filtro-select">
    <select value={valor} onChange={(evento) => aoAlterar(evento.target.value)}>
    <option value="Todas">Todas</option>
    {categorias.map((categoria) => (
    <option key={categoria} value={categoria}>{categoria}</option>
        ))}
        </select>
    </label>
    )
}

export default FiltroCategoria