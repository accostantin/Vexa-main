import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/cadastro.css";
import { enviarLinkRedefinicao, entrar } from "../services/authService.js";

function Entrar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [trocarSenha, setTrocarSenha] = useState(false);

  // Se a pessoa foi barrada por uma rota protegida, volta para ela depois do login.
  const origem = location.state?.from;
  const destino = origem?.pathname
    ? `${origem.pathname}${origem.search ?? ""}${origem.hash ?? ""}`
    : "/lado-a";

  async function fazerLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha o e-mail e a senha.");
      return;
    }

    setEnviando(true);

    try {
      const { user } = await entrar({ email: email.trim(), senha });

      const nomeUsuaria = user?.user_metadata?.name;

      alert(nomeUsuaria ? `Bem-vinda, ${nomeUsuaria}!` : "Bem-vinda!");

      // Depois de entrar, vai para a página de informações (Lado A)
      navigate(destino, { replace: true });
    } catch (erro) {
      alert(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  async function pedirLinkRedefinicao(e) {
    e.preventDefault();

    if (!email) {
      alert("Informe o e-mail da sua conta.");
      return;
    }

    setEnviando(true);

    try {
      await enviarLinkRedefinicao(email.trim());

      // Mesma resposta exista ou não a conta, para não revelar quem tem cadastro.
      alert(
        "Se existir uma conta com esse e-mail, enviaremos um link para criar uma nova senha."
      );

      setTrocarSenha(false);
    } catch (erro) {
      alert(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="cadastro-page">

      <div className="bolha bolha-1"></div>
      <div className="bolha bolha-2"></div>
      <div className="bolha bolha-3"></div>
      <div className="bolha bolha-4"></div>
      <div className="bolha bolha-5"></div>
      <div className="bolha bolha-6"></div>

      <section className="cadastro-container">
        <div className="cadastro-card">

          {!trocarSenha ? (
            <>
              <h1>Entrar</h1>

              <p className="cadastro-subtitulo">
                Acesse o Lado B
              </p>

              <form onSubmit={fazerLogin}>

                <label>E-mail</label>

                <input
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Senha</label>

                <div className="senha-container">

                  <input
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn-mostrar-senha"
                    onClick={() =>
                      setMostrarSenha(!mostrarSenha)
                    }
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>

                </div>

                <button
                  className="btn-cadastrar"
                  type="submit"
                  disabled={enviando}
                >
                  Entrar
                </button>

              </form>

              <button
                type="button"
                className="btn-trocar-senha"
                onClick={() => setTrocarSenha(true)}
              >
                Esqueci minha senha
              </button>

              <p className="login-link">
                Ainda não possui uma conta?

                <button
                  type="button"
                  onClick={() => navigate("/cadastro")}
                >
                  Criar conta
                </button>
              </p>
            </>

          ) : (

            <>
              <h1>Trocar senha</h1>

              <p className="cadastro-subtitulo">
                Enviaremos um link para criar uma nova senha
              </p>

              <form onSubmit={pedirLinkRedefinicao}>

                <label>E-mail</label>

                <input
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="btn-cadastrar"
                  type="submit"
                  disabled={enviando}
                >
                  Enviar link
                </button>

              </form>

              <button
                type="button"
                className="btn-trocar-senha"
                onClick={() => setTrocarSenha(false)}
              >
                Voltar para entrar
              </button>
            </>
          )}

        </div>
      </section>

    </main>
  );
}

export default Entrar;
