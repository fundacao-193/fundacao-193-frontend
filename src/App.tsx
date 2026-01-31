import { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
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
import Collaborate from './components/pages/Collaborate';
import NewsList from './components/pages/NewsList';
import NewsDetail from './components/pages/NewsDetail';
import ProjectDetail from './components/pages/ProjectDetail';
import EventDetail from './components/pages/EventDetail';
import Activities from './components/pages/Activities';

// logica para currentPage
function App() {
  // State que representa a pagina atual baseada no hash
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Escuta mudancas no hash da URL COM TRANSITIONS
  useEffect(() => {
    const handleHashChange = () => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const hash = window.location.hash.replace('#', '') || 'home';
        setCurrentPage(hash);
        
        // Scroll suave para o topo 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setIsTransitioning(false);
      }, 150);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Atualiza tambem na carga inicial
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Atualiza o titulo da pagina
  useEffect(() => {
    const baseTitle = 'Fundação 193';

    switch (currentPage) {
      case 'nossa-historia':
        document.title = `Nossa História - ${baseTitle}`;
        break;
      case 'missao-valores':
        document.title = `Missão e Valores - ${baseTitle}`;
        break;
      case 'equipe':
        document.title = `Equipe - ${baseTitle}`;
        break;
      case 'projetos':
        document.title = `Projetos - ${baseTitle}`;
        break;
      case 'capacitacao':
        document.title = `Capacitação - ${baseTitle}`;
        break;
      case 'eventos':
        document.title = `Eventos - ${baseTitle}`;
        break;
      case 'parcerias':
        document.title = `Parcerias - ${baseTitle}`;
        break;
      case 'prestacao-contas':
        document.title = `Prestação de Contas - ${baseTitle}`;
        break;
      case 'editais':
        document.title = `Editais - ${baseTitle}`;
        break;
      case 'documentos':
        document.title = `Documentos - ${baseTitle}`;
        break;
      case 'lgpd':
        document.title = `LGPD - ${baseTitle}`;
        break;
      case 'colabore':
        document.title = `Colabore - ${baseTitle}`;
        break;
      default:
        document.title = `${baseTitle} - Instituição de Apoio ao CBMDF`;
    }
  }, [currentPage]);

  // Renderiza a pagina com base no hash atual
  const renderPage = () => {
    if (currentPage.startsWith('noticia-')) {
      const idStr = currentPage.replace('noticia-', '');
      const id = Number(idStr);
      if (!Number.isNaN(id)) return <NewsDetail id={id} />;
    }

    if (currentPage === 'noticias') {
      return <NewsList />;
    }

    if (currentPage === 'atividades') {
      return <Activities />;
    }

    if (currentPage.startsWith('projeto-')) {
      const idStr = currentPage.replace('projeto-', '');
      const id = Number(idStr);
      if (!Number.isNaN(id)) return <ProjectDetail id={id} />;
    }

    if (currentPage.startsWith('evento-')) {
      const idStr = currentPage.replace('evento-', '');
      const id = Number(idStr);
      if (!Number.isNaN(id)) return <EventDetail id={id} />;
    }

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
      case 'colabore':
        return <Collaborate />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <About />
            <Impact />
            <Services />
            <News />
            <Partners />
            <Contact />
          </>
        );
    }
  }; 

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        {}
        <div 
          className={`transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {renderPage()}
        </div>
        <Footer />
        <FloatingActions />
      </div>
    </ErrorBoundary>
  );
}

export default App;