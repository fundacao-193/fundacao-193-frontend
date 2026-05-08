import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
// import ThemeToggle from './components/ThemeToggle';  // Desabilitado temporariamente
import BackToTopButton from './components/BackToTopButton';

// Code splitting: lazy load páginas internas
const OurStory = lazy(() => import('./components/pages/OurStory'));
const MissionValues = lazy(() => import('./components/pages/MissionValues'));
const Team = lazy(() => import('./components/pages/Team'));
const Projects = lazy(() => import('./components/pages/Projects'));
const Training = lazy(() => import('./components/pages/Training'));
const Events = lazy(() => import('./components/pages/Events'));
const OurPartnerships = lazy(() => import('./components/pages/OurPartnerships'));
const Accounts = lazy(() => import('./components/pages/Accounts'));
const Edits = lazy(() => import('./components/pages/Edits'));
const Documents = lazy(() => import('./components/pages/Documents'));
const Integrity = lazy(() => import('./components/pages/Integrity'));
const LGPD = lazy(() => import('./components/pages/LGPD'));
const Collaborate = lazy(() => import('./components/pages/Collaborate'));
const NewsList = lazy(() => import('./components/pages/NewsList'));
const NewsDetail = lazy(() => import('./components/pages/NewsDetail'));
const ProjectDetail = lazy(() => import('./components/pages/ProjectDetail'));
const EventDetail = lazy(() => import('./components/pages/EventDetail'));
const Activities = lazy(() => import('./components/pages/Activities'));
const SearchPage = lazy(() => import('./components/pages/Search'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
      <p className="text-neutral-600">Carregando...</p>
    </div>
  </div>
);

// logica para currentPage
function App() {
  // State que representa a pagina atual baseada no hash
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasInitialized = useRef(false);

  // Escuta mudancas no hash da URL COM TRANSITIONS
  useEffect(() => {
    const handleHashChange = (withTransition: boolean) => {
      if (withTransition) {
        setIsTransitioning(true);
      }

      setTimeout(() => {
        const hash = window.location.hash.replace('#', '') || 'home';
        setCurrentPage(hash);

        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (withTransition) {
          setIsTransitioning(false);
        }
      }, withTransition ? 150 : 0);
    };

    const onHashChange = () => handleHashChange(true);

    window.addEventListener('hashchange', onHashChange);

    // Atualiza tambem na carga inicial sem transição para evitar flash
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      handleHashChange(false);
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // Atualiza o titulo da pagina
  useEffect(() => {
    const baseTitle = 'Fundação 193';

    if (currentPage.startsWith('busca/')) {
      const query = decodeURIComponent(currentPage.replace('busca/', ''));
      document.title = `Busca: "${query}" - ${baseTitle}`;
      return;
    }

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
      case 'atividades':
        document.title = `Atividades - ${baseTitle}`;
        break;
      case 'noticias':
        document.title = `Notícias - ${baseTitle}`;
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
      case 'integridade':
        document.title = `Integridade - ${baseTitle}`;
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
    if (currentPage.startsWith('busca/')) {
      const query = decodeURIComponent(currentPage.replace('busca/', ''));
      return <SearchPage query={query} />;
    }

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
      case 'integridade':
        return <Integrity />;
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
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <div 
            className={`transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {renderPage()}
          </div>
        </Suspense>
        <Footer />
        <BackToTopButton />
        <FloatingActions />
        {/* <ThemeToggle /> */}
      </div>
    </ErrorBoundary>
  );
}

export default App;