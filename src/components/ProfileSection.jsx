import { useRef } from 'react';
import emailjs from '@emailjs/browser';

import '../assets/css/ProfileSection.css';

import perfil from '../assets/img/ana.png';
import perfil2 from '../assets/img/isa.png';

function ProfileSection() {

  // Referência para o formulário
  const form = useRef();

  // Função responsável por enviar o formulár
  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_najuo9k',
        'template_5ky29af',
        form.current,
        {
          publicKey: 'RFKQHv2_O2tIceoSu',
        }
      )
      .then(
        () => {
          alert('Mensagem enviada com sucesso!');

          // Limpa os campos depois do envio
          form.current.reset();
        },
        (error) => {
          console.log('ERRO:', error);
          alert('Erro ao enviar a mensagem.');
        }
      );
  };

  return (
    <main className="profile-section">

      {/* TÍTULO */}
      <div className="profile-title">
        <h1 className="contact-title">
          Contato
        </h1>

        <span></span>
      </div>

      {/* CONTEÚDO */}
      <div className="contact-container">

        {/* CARD ESQUERDO */}
        <section className="contact-info">

          <h2 className="profile-info">
            Informações
          </h2>

          <div className="title-line"></div>

          {/* PERFIL 1 */}
          <div className="person">

            <img
              src={perfil}
              alt="Ana Clara"
            />

            <div>
              <h3>Ana Clara Morel</h3>

              <p>
                Porto Alegre, Rio Grande do Sul - Brasil
              </p>
            </div>

          </div>

          <div className="contact-item">
            <span>✉</span>
            <p>anaclaracmorel@gmail.com</p>
          </div>

          <div className="contact-item">
            <span>☎</span>
            <p>+55 51 99568-9785</p>
          </div>


          {/* PERFIL 2 */}
          <div className="person second-person">

            <img
              src={perfil2}
              alt="Isabelle"
            />

            <div>
              <h3>Isabelle Bones</h3>

              <p>
                Porto Alegre, Rio Grande do Sul - Brasil
              </p>
            </div>

          </div>

          <div className="contact-item">
            <span>✉</span>
            <p>isabellebones2008@gmail.com</p>
          </div>

          <div className="contact-item">
            <span>☎</span>
            <p>+55 51 92652-3625</p>
          </div>

        </section>


        {/* FORMULÁRIO */}
        <form
          ref={form}
          className="contact-form"
          onSubmit={enviarEmail}
        >

          {/* NOME */}
          <input
            type="text"
            name="user_name"
            placeholder="Seu nome"
            required
          />

          {/* EMAIL */}
          <input  
            type="email"
            name="user_email"
            placeholder="Seu email"
            required
          />

          {/* MENSAGEM */}
          <textarea
            name="message"
            placeholder="Sua mensagem"
            required
          ></textarea>

          {/* BOTÃO */}
          <button type="submit">
            Enviar
          </button>

        </form>

      </div>

    </main>
  );
}

export default ProfileSection;