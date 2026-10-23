function Protecao() {
    return(
        <section className="protecao-completo">
            <div className="protecao-aviso">
                <svg className="protecao-icone" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="10" width="17" height="12" rx="1.5" />
                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                </svg>
                <h2>Sua identidade pode ficar em sigilo</h2>
                <p>A maioria dos canais permite denúncia anônima. Você decide quanto revelar, e isso não impede que o caso seja investigado.</p>
            </div>

            <div className="protecao-conteudo">
                <p className="protecao-label">Proteção de quem denuncia</p>
                <h2>Denunciar não é se expor sozinha.</h2>
                <div className="protecao-lista">
                    <p className="protecao-item"><strong>Denúncia anônima:</strong><span>disponível no 180, no 100 e nos canais digitais, sem necessidade de se identificar.</span></p>
                    <p className="protecao-item"><strong>Medida protetiva:</strong><span>pode ser concedida antes mesmo da conclusão do inquérito policial.</span></p>
                    <p className="protecao-item"><strong>Acompanhamento psicossocial;</strong><span>oferecido gratuitamente durante todo o processo, não apenas no momento da denúncia.</span></p>
                    <p className="protecao-item"><strong>Retaliação é crime:</strong><span>descumprir uma medida protetiva ou ameaçar quem denunciou agrava a situação do agressor perante a lei.</span></p>
                </div>
            </div>

            




    </section>
    )
}
export default Protecao