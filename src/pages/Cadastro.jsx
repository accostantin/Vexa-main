import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cadastro.css";
import { cadastrar, entrarComProvedor } from "../services/authService.js";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function criarConta(e) {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!termos) {
      alert("Você precisa aceitar os termos e condições.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setEnviando(true);

    try {
      const { session } = await cadastrar({
        nome: nome.trim(),
        email: email.trim(),
        senha,
      });

      if (session) {
        alert("Conta criada com sucesso!");

        // VAI DIRETAMENTE PARA O LADO A
        navigate("/lado-a", { replace: true });
      } else {
        // Projeto com confirmação de e-mail ativa: ainda não há sessão.
        alert(
          "Conta criada! Enviamos um e-mail de confirmação. Confirme-o para entrar."
        );
        navigate("/entrar", { replace: true });
      }
    } catch (erro) {
      alert(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  async function entrarComRede(provedor) {
    try {
      await entrarComProvedor(provedor);
    } catch (erro) {
      alert(erro.message);
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

          <h1>Criar conta</h1>

          <p className="cadastro-subtitulo">
            Entre para o Lado B
          </p>

          <div className="login-social">

            <button type="button" onClick={() => entrarComRede("google")}>
              <span>G</span>
              Google
            </button>

            <button type="button" onClick={() => entrarComRede("github")}>
              <span>◉</span>
              GitHub
            </button>

          </div>

          <div className="separador">
            <span>ou</span>
          </div>

          <form onSubmit={criarConta}>

            <label>Nome</label>

            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>E-mail</label>

            <input
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>

            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <label className="termos">

              <input
                type="checkbox"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
              />

              <span>
                Li e concordo com os termos e condições
              </span>

            </label>

            <button
              className="btn-cadastrar"
              type="submit"
              disabled={enviando}
            >
              Criar conta
            </button>

          </form>

          <p className="login-link">

            Já possui uma conta?

            <button
              type="button"
              onClick={() => navigate("/entrar")}
            >
              Entrar
            </button>

          </p>

        </div>
      </section>

    </main>
  );
}

export default Cadastro;