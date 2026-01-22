import { useEffect, useState } from 'react';

import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Impact from './components/Impact';
import News from './components/News';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import OurStory from './components/pages/OurStory';
import MissionValues from './components/pages/MissionValues';
import Team from './components/pages/Team';
import Projects from './components/pages/Projects';
import Training from './components/pages/Training';
import Events from './components/pages/Events';
import OurPartnerships from './components/pages/OurPartnerships';
import Accounts from './components/pages/Accounts';
import Edits from './components/pages/Edits';
import Documents from './components/pages/Documents';
import LGPD from './components/pages/LGPD';

function App() {
  // State que representa a pagina atual baseada no hash
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  // Escuta mudancas no hash da URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Renderiza a pagina com base no hash atual
  const renderPage = () => {
    switch (currentPage) {
      case 'nossa-historia':
        return <OurStory />;

      case 'missao-valores':
        return <MissionValues />;

      case 'equipe':
        return <Team />;

      case 'projetos':
        return <Projects />;

      case 'capacitacao':
        return <Training />;

      case 'eventos':
        return <Events />;

      case 'parcerias':
        return <OurPartnerships />;

      case 'prestacao-contas':
        return <Accounts />;

      case 'editais':
        return <Edits />;

      case 'documentos':
        return <Documents />;

      case 'lgpd':
        return <LGPD />;

      case 'home':
      default:
        return (
          <>
            <Hero />
            <About />
            <Services />
            <Impact />
            <News />
            <Partners />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderPage()}
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
