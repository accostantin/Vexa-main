import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import '../assets/css/dashboard.css'
import {
  Venus,
  Hand,
  Brain,
  Eye,
  TriangleAlert
} from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <Header />

      <main className="dashboard">

        {/* =====================================================
            TÍTULO
        ===================================================== */}

        <h1 className="dashboard-title"> Análise de gráficos <span className="rosa">feminicídio</span> no Brasil </h1>


        {/* =====================================================
            GRÁFICOS
        ===================================================== */}

        <div className="dashboard-grid">

          {/* ===================================================
              GRÁFICO — RELAÇÃO VÍTIMA / AUTOR
          =================================================== */}

          <section className="dashboard-card grafico-principal">

            <p className="grafico-titulo">
              Percentual da relação entre vítima e autor dos feminicídios
            </p>

            <div className="bar-chart">

            <div className="bar-area">

  <div className="bar-item">
    <div className="bar bar-1">
      <span>59,4%</span>
    </div>
    <span className="bar-legenda">Companheiro</span>
  </div>

  <div className="bar-item">
    <div className="bar bar-2">
      <span>21,3%</span>
    </div>
    <span className="bar-legenda">Ex-companheiro</span>
  </div>

  <div className="bar-item">
    <div className="bar bar-3">
      <span>10,2%</span>
    </div>
    <span className="bar-legenda">Familiar</span>
  </div>

  <div className="bar-item">
    <div className="bar bar-4">
      <span>4,8%</span>
    </div>
    <span className="bar-legenda">Desconhecido</span>
  </div>

</div>

              <div className="bar-axis">
                <span>60%</span>
                <span>50%</span>
                <span>40%</span>
                <span>30%</span>
                <span>20%</span>
                <span>10%</span>
                <span>0%</span>
              </div>

            </div>

          </section>


          {/* ===================================================
              DADOS DE 2025
          =================================================== */}
<section className="dashboard-card dados-2025">
  <h2>
    Feminicídios no ano de 2025
  </h2>

  <div className="dado-item">
    <span>1.492 Vítimas</span>
    <span className="dado-icon">
      <Venus />
    </span>
  </div>

  <div className="dado-item">
    <span>3.870 Tentativas</span>
    <span className="dado-icon pequeno">
      <Hand />
    </span>
  </div>

  <div className="dado-item">
    <span>51.886 Violências psicológicas</span>
    <span className="dado-icon">
      <Brain />
    </span>
  </div>

  <div className="dado-item">
    <span>95.026 Stalking</span>
    <span className="dado-icon">
      <Eye />
    </span>
  </div>

  <div className="dado-item">
    <span>747.683 Ameaças</span>
    <span className="dado-icon">
      <TriangleAlert />
    </span>
  </div>
</section>


          {/* ===================================================
              GRÁFICO — FAIXA ETÁRIA
          =================================================== */}

          <section className="dashboard-card faixa-etaria">

            <p className="grafico-titulo">
              Percentual de idade das vítimas de feminicídio, por faixa etária
            </p>

            <div className="horizontal-chart">

              <div className="idade-linha">

                <span>
                  0 a 11 anos
                </span>

                <div className="idade-bar bar-idade-1">
                  <b>1,3%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  12 a 17 anos
                </span>

                <div className="idade-bar bar-idade-2">
                  <b>3,8%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  18 a 24 anos
                </span>

                <div className="idade-bar bar-idade-3">
                  <b>15,5%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  25 a 29 anos
                </span>

                <div className="idade-bar bar-idade-4">
                  <b>13,9%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  30 a 39 anos
                </span>

                <div className="idade-bar bar-idade-5">
                  <b>28,3%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  40 a 49 anos
                </span>

                <div className="idade-bar bar-idade-6">
                  <b>21,7%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  50 a 59 anos
                </span>

                <div className="idade-bar bar-idade-7">
                  <b>9,4%</b>
                </div>

              </div>


              <div className="idade-linha">

                <span>
                  60 anos ou mais
                </span>

                <div className="idade-bar bar-idade-8">
                  <b>5,0%</b>
                </div>

              </div>

            </div>


            <div className="eixo-horizontal">

              <span>0,0%</span>
              <span>5,0%</span>
              <span>10,0%</span>
              <span>15,0%</span>
              <span>20,0%</span>
              <span>25,0%</span>
              <span>30,0%</span>

            </div>

          </section>


          {/* ===================================================
              GRÁFICO — RAÇA / COR
          =================================================== */}

          <section className="dashboard-card raca-cor">

            <p className="grafico-titulo">
              Raça/cor das vítimas de feminicídio
            </p>

            <div className="donut-container">

              <div className="donut-chart">

                <div className="donut-center"></div>

                <span className="donut-label label-amarela">
                  0,3%
                </span>

                <span className="donut-label label-branca">
                  36,8%
                </span>

                <span className="donut-label label-indigena">
                  0,3%
                </span>

                <span className="donut-label label-negra">
                  62,6%
                </span>

              </div>


              <div className="legenda">

                <div>
                  <span className="legenda-cor amarela"></span>
                  Amarela
                </div>

                <div>
                  <span className="legenda-cor branca"></span>
                  Branca
                </div>

                <div>
                  <span className="legenda-cor indigena"></span>
                  Indígena
                </div>

                <div>
                  <span className="legenda-cor negra"></span>
                  Negra
                </div>

              </div>

            </div>

          </section>

        </div>


        {/* =====================================================
            TABELA DE SERVIÇOS
        ===================================================== */}

        <section className="servicos-section">

          <div className="servicos-header">

            <div className="div-tags">

              <span className="servicos-tag">
                REDE DE ATENDIMENTO
              </span>

              <h2>
                Serviços de apoio às mulheres
              </h2>

            </div>

          </div>


          <div className="tabela-wrapper">

            <table className="tabela-servicos">

              <thead>

                <tr>

                  <th>
                    Serviço
                  </th>

                  <th>
                    Função do serviço na rede
                  </th>

                  <th>
                    Esfera
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* SERVIÇO 1 */}

                <tr>

                  <td>
                    Delegacia de Defesa da Mulher
                  </td>

                  <td>
                    Delegacia especializada no atendimento a mulheres
                    vítimas de violência. Realiza o registro de boletins
                    de ocorrência, investigações, solicitações de Medidas
                    Protetivas da Urgência e encaminhamentos para a rede
                    de apoio. Também faz parte da Delegacia de Defesa da
                    Mulher Online, que possibilita os registros de BOs por
                    meio de plataforma online.
                  </td>

                  <td>
                    <span className="esfera estadual">
                      Estadual
                    </span>
                  </td>

                </tr>


                {/* SERVIÇO 2 */}

                <tr>

                  <td>
                    Central de Atendimento à Mulher
                    <br />
                    (Ligue 180)
                  </td>

                  <td>
                    Canal nacional de denúncia e orientação sobre violência
                    contra as mulheres. Recebe, encaminha e acompanha
                    relatos de agressões, conforme instituído pela Lei
                    nº 10.714/2003.
                  </td>

                  <td>
                    <span className="esfera federal">
                      Federal
                    </span>
                  </td>

                </tr>


                {/* SERVIÇO 3 */}

                <tr>

                  <td>
                    Centros de Referência (ou de Atendimento) à Mulher
                    em situação de violência / Núcleos de Atendimento à
                    Mulher em situação de Violência, Centros Integrados
                    da Mulher
                  </td>

                  <td>
                    Serviços de acolhimento e atendimento humanizado a
                    mulheres em situação de violência. Oferecem apoio
                    psicológico, social e orientação jurídica. Também
                    desenvolvem ações de prevenção, promoção da cidadania
                    e fortalecimento da autonomia das mulheres.
                  </td>

                  <td>
                    <span className="esfera municipal">
                      Municipal
                    </span>
                  </td>

                </tr>


                {/* SERVIÇO 4 */}

                <tr>

                  <td>
                    Serviços especializados de atendimento à violência
                    sexual e abortamento legal
                  </td>

                  <td>
                    Unidades de saúde especializadas no acolhimento e
                    atendimento integral às vítimas de violência sexual,
                    incluindo a realização dos procedimentos previstos
                    em lei para interrupção da gestação.
                  </td>

                  <td>
                    <span className="esfera municipal-estadual">
                      Municipal e/ou estadual
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

      <div className="dashboard-fonte">
        <p>
          <strong>Fonte:</strong> Análise produzida a partir dos microdados
          dos registros policiais e das secretarias estaduais de segurança
          pública e/ou defesa social.
          <br />
          Fórum Brasileiro de Segurança Pública, 2026.
          {" "}
          <a
            href="https://forumseguranca.org.br/wp-content/uploads/2026/03/nota-tecnica-dia-mulher-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar documento original (PDF)
          </a>
        </p>
      </div>


      <Footer />

    </div>
  )
}

export default Dashboard