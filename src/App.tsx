import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    setCurrentPage(hash || null);

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      setCurrentPage(newHash || null);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'nossa-historia':
        return <OurStory onNavigate={setCurrentPage} />;
      case 'missao-valores':
        return <MissionValues onNavigate={setCurrentPage} />;
      case 'equipe':
        return <Team onNavigate={setCurrentPage} />;
      case 'projetos':
        return <Projects onNavigate={setCurrentPage} />;
      case 'capacitacao':
        return <Training onNavigate={setCurrentPage} />;
      case 'eventos':
        return <Events onNavigate={setCurrentPage} />;
      case 'parcerias':
        return <OurPartnerships onNavigate={setCurrentPage} />;
      case 'prestacao-contas':
        return <Accounts onNavigate={setCurrentPage} />;
      case 'editais':
        return <Edits onNavigate={setCurrentPage} />;
      case 'documentos':
        return <Documents onNavigate={setCurrentPage} />;
      case 'lgpd':
        return <LGPD onNavigate={setCurrentPage} />;
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
