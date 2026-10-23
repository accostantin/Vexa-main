function Header_Ajuda() {
  return (
    <header className="Header_Ajuda">
      <div className="Header_Ajuda-Aviso">
        <p className="Header_Ajuda-Mensagem">Precisa denunciar agora? Ligue <strong>180</strong> - sigiloso, gratuito, 24h</p>
        <a className="Header_Ajuda-Sair" href="/lado-a">Voltar Pagina Principal</a>
      </div>

      <div className="Header_Ajuda-Container">
        <a className="Header_Ajuda-Marca" href="/lado-b" aria-label="Voltar para a página inicial">
          <span className="Header_Ajuda-Titulo">VEXA</span>
        </a>
        <button className="botao-ajuda" type="button">Ligar 180</button>
      </div>
    </header>
  )
}

export default Header_Ajuda