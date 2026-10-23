function MainAjuda() {
    return (
        <section className="main-ajuda">
            <div className="main-ajuda-conteudo">
                <div className="canal-ajuda">
                    <p className="canal-ajuda-titulo">Risco imediato</p>
                    <p className="canal-ajuda-numero">190</p>
                    <p className="canal-ajuda-descricao">Polícia Militar. Use quando há perigo acontecendo agora.</p>
                </div>

                <div className="canal-ajuda">
                    <p className="canal-ajuda-titulo">Orientação e denúncia</p>
                    <p className="canal-ajuda-numero">180</p>
                    <p className="canal-ajuda-descricao">Central de Atendimento à Mulher. Escuta, orienta e encaminha o caso.</p>
                </div>

                <div className="canal-ajuda">
                    <p className="canal-ajuda-titulo">Direitos humanos</p>
                    <p className="canal-ajuda-numero">100</p>
                    <p className="canal-ajuda-descricao">Disque Direitos Humanos. Recebe denúncias de violações em geral.</p>
                </div>

                <div className="passo-a-passo-conteudo">
                    <p className="passo-a-passo-label">Passo a passo</p>
                    <h2>Como fazer uma denúncia.</h2>
                    <p className="passo-a-passo-introducao">O caminho muda um pouco conforme o canal escolhido, mas a lógica geral é a mesma em quase todos os casos.</p>

                    <div className="passo-a-passo-lista">
                        <div className="passo-a-passo-item">
                            <p className="passo-a-passo-numero">01</p>
                            <div>
                                <h3>Escolha o canal conforme a urgência</h3>
                                <p className="textinho">Perigo imediato vai para o 190. Para orientação, denúncia ou dúvidas, o 180 funciona como porta de entrada para qualquer situação.</p>
                            </div>
                        </div>

                        <div className="passo-a-passo-item">
                            <p className="passo-a-passo-numero">02</p>
                            <div>
                                <h3>Reúna o que for possível, sem se colocar em risco</h3>
                                <p className="textinho">Datas, mensagens, fotos de lesões ou testemunhas ajudam, mas a ausência de provas não impede a denúncia nem a proteção.</p>
                            </div>
                        </div>

                        <div className="passo-a-passo-item">
                            <p className="passo-a-passo-numero">03</p>
                            <div>
                                <h3>Registre o boletim de ocorrência</h3>
                                <p className="textinho">Pode ser feito em qualquer delegacia, de preferência numa Delegacia Especializada de Atendimento à Mulher (DEAM).</p>
                            </div>
                        </div>

                        <div className="passo-a-passo-item">
                            <p className="passo-a-passo-numero">04</p>
                            <div>
                                <h3>Solicite a medida protetiva de urgência</h3>
                                <p className="textinho">Pedida na delegacia ou direto ao Ministério Público, pode determinar o afastamento do agressor em até 48 horas.</p>
                            </div>
                        </div>

                        <div className="passo-a-passo-item">
                            <p className="passo-a-passo-numero">05</p>
                            <div>
                                <h3>Acompanhe o caso pela rede de apoio</h3>
                                <p className="textinho">A Casa da Mulher Brasileira e os CREAS oferecem acompanhamento jurídico, psicológico e social durante todo o processo.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MainAjuda