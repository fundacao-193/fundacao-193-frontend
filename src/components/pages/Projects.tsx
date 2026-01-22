import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Flame } from 'lucide-react';

import { fetchProjetos } from '../../services/api';
import type { Project } from '../../types/projects';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Protecao contra dupla execucao no StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadProjects() {
      try {
        const data = await fetchProjetos();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Estado de loading
  if (loading) {
    return <p className="text-center py-20">Carregando projetos...</p>;
  }

  // Estado de erro
  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Voltar */}
        <button
          onClick={() => (window.location.hash = '')}
          className="flex items-center gap-2 text-[#3d685d] hover:text-[#2f5349] font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        {/* Cabecalho */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Nossos Projetos
        </h1>
        <p className="text-xl text-neutral-600 mb-16">
          Iniciativas estratégicas que fortalecem a capacidade operacional e o
          impacto social.
        </p>

        {/* Lista de projetos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#3d685d]/10 text-[#3d685d] rounded-lg flex items-center justify-center mb-4">
                <Flame size={32} />
              </div>

              {/* Titulo */}
              <h3
                className="text-2xl font-bold text-neutral-900 mb-3"
                dangerouslySetInnerHTML={{
                  __html: project.title.rendered,
                }}
              />

              {/* Resumo */}
              {project.excerpt?.rendered && (
                <p
                  className="text-neutral-600 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{
                    __html: project.excerpt.rendered,
                  }}
                />
              )}

              {/* Impacto */}
              {project.acf?.impacto && (
                <div className="border-t border-neutral-200 pt-4">
                  <p className="text-[#3d685d] font-semibold">
                    {project.acf.impacto}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Projetos em desenvolvimento */}
        <section className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Projetos em Desenvolvimento
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Plataforma Digital de Gerenciamento de Emergências
              </h4>
              <p className="text-neutral-600">
                Sistema integrado para otimização de respostas, análise de dados
                em tempo real e coordenação interagências.
              </p>
            </div>

            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Centro de Pesquisa e Inovação
              </h4>
              <p className="text-neutral-600">
                Laboratório dedicado à pesquisa de novas tecnologias,
                metodologias de resgate e equipamentos especializados.
              </p>
            </div>

            <div className="border-l-4 border-[#3d685d] pl-6">
              <h4 className="text-xl font-bold text-neutral-900 mb-2">
                Parcerias Internacionais de Cooperação Técnica
              </h4>
              <p className="text-neutral-600">
                Colaboração com instituições internacionais para
                compartilhamento de conhecimento e melhores práticas globais.
              </p>
            </div>
          </div>
        </section>

        {/* Como contribuir */}
        <div className="bg-gradient-to-r from-[#3d685d] to-[#2f5349] rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Como Contribuir com Nossos Projetos
          </h3>
          <p className="leading-relaxed mb-6">
            A fundação depende do apoio de parceiros públicos, privados e da
            sociedade civil para executar seus projetos.
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Investimentos diretos em projetos específicos</li>
            <li>Patrocínio de eventos e capacitações</li>
            <li>Doações de equipamentos e tecnologia</li>
            <li>Parcerias técnicas e consultoria</li>
            <li>Programas de voluntariado corporativo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
