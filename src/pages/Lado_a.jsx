
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Banner from '../components/Banner.jsx';
import Home from '../components/Home.jsx';
import ProfileSection from '../components/ProfileSection.jsx';
import Footer from '../components/Footer.jsx';

import '../App.css';

function LadoA() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contato') {
      // Aguarda a página renderizar antes de rolar
      requestAnimationFrame(() => {
        document.getElementById('contato')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="lado-a-page">

      <Header
        onMenuClick={() => setIsOpen(true)}
      />

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Banner />

      <Home />

      <div id="contato">
        <ProfileSection />
      </div>

      <Footer />

    </div>
  );
}

export default LadoA;
