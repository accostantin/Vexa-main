import '../assets/css/footer.css';
import { useState } from 'react';

function Footer() {

  const [idioma, setIdioma] = useState('English');

  function mudarIdioma() {
    setIdioma(idioma === 'English' ? 'Português' : 'English');
  }

  return (
    <footer className="footer">

      {/* Logo */}
      <div className="footer-logo">
        VEXA<span>®</span>
      </div>

      {/* Redes sociais + idioma */}
      <div className="footer-social">

        {/* Facebook */}
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          f
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          ◎
        </a>

        {/* Pinterest */}
        <a
          href="https://www.pinterest.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          ♥
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          ▶
        </a>

        {/* Idioma */}
        <button
          className="language-button"
          onClick={mudarIdioma}
        >
          {idioma}
        </button>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        Copyright © VEXA, Inc.
      </div>

    </footer>
  );
}

export default Footer;