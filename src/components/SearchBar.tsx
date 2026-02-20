/**
 * Serviço de busca integrado com:
 * - APIs (nova e legacy)
 * - Conteúdo estático do próprio site (páginas e seções)
 * Suporta busca em: Notícias, Projetos, Eventos, Capacitações, Parceiros e Páginas
 * Reutiliza a infraestrutura de api.ts para garantir consistência
 */

import { news } from '../types/news';
import { Project } from '../types/projects';
import type { Event } from '../types/events';
import { Partner } from '../types/partners';
import type { Training } from '../types/training';

// Detecta se está em desenvolvimento local
const isDev = import.meta.env.DEV;
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// URL da API: usa proxy do Vite em desenvolvimento local, senão usa a URL configurada
const getAPIUrl = () => {
  const envUrl = import.meta.env.VITE_WP_API_URL;
  
  // Se está em desenvolvimento local e a URL é localhost, tenta usar proxy relativo
  // Mas se VITE_USE_PRODUCTION_API estiver definido, usa produção mesmo em dev
  if (import.meta.env.VITE_USE_PRODUCTION_API === 'true') {
    return envUrl || 'https://fundacao193.org.br/wp-json/wp/v2';
  }
  
  if (isDev && isLocalhost && envUrl?.includes('localhost')) {
    return '/wp-json/wp/v2';
  }
  
  // Caso contrário, usa a URL completa do .env ou o default
  return envUrl || 'https://fundacao193.org.br/wp-json/wp/v2';
};

const API_URL = getAPIUrl();
const LEGACY_API_URL = import.meta.env.VITE_WP_LEGACY_API_URL || 'https://fundacao193.org.br/wp-json/wp/v2';
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE;
const CACHE_TTL_MS = Number(import.meta.env.VITE_API_CACHE_TTL_MS || 60000);
const isLegacyEnabled = DATA_SOURCE === 'legacy';

// Cache para evitar múltiplas requisições
const searchCache = new Map<string, { timestamp: number; results: SearchResults }>();
const SEARCH_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export interface SearchResultItem {
  id: number;
  title: string;
  excerpt?: string;
  type: 'noticia' | 'projeto' | 'evento' | 'capacitacao' | 'parceiro' | 'pagina';
  link?: string;
  image?: string;
  /**
   * Pontuação opcional de relevância para ordenação avançada.
   * Usada principalmente para páginas estáticas do site.
   */
  score?: number;
}

export interface SearchResults {
  query: string;
  results: SearchResultItem[];
  total: number;
}

/**
 * Função base para requisições com cache (reutiliza lógica de api.ts)
 */
type CacheEntry = {
  expiry: number;
  value: unknown;
};

const responseCache = new Map<string, CacheEntry>();

async function fetchJsonWithCache<T>(url: string, label: string): Promise<T> {
  if (CACHE_TTL_MS > 0) {
    const cached = responseCache.get(url);
    if (cached && cached.expiry > Date.now()) {
      return cached.value as T;
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${label}`);
  }

  const data = (await response.json()) as T;

  if (CACHE_TTL_MS > 0) {
    responseCache.set(url, {
      expiry: Date.now() + CACHE_TTL_MS,
      value: data,
    });
  }

  return data;
}

/**
 * Busca em uma rota específica do novo WordPress (CPT)
 * Usa a mesma infraestrutura de api.ts
 * Extrai imagens dos campos ACF quando disponíveis
 */
async function searchNewAPI<T extends { 
  id: number; 
  title?: { rendered?: string }; 
  excerpt?: { rendered?: string }; 
  link?: string;
  acf?: any;
}>(
  resource: string,
  query: string,
  type: SearchResultItem['type']
): Promise<SearchResultItem[]> {
  try {
    const params = new URLSearchParams({
      search: query,
      per_page: '10',
    });
    
    const url = `${API_URL}/${resource}?${params.toString()}`;
    const data = await fetchJsonWithCache<T[]>(url, `${resource} (busca)`);
    
    return data.map((item: T) => {
      const title = item.title?.rendered || 'Sem título';
      const excerpt = item.excerpt?.rendered 
        ? item.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150).trim()
        : undefined;
      
      // Extrai imagem baseado no tipo de recurso
      let image: string | undefined;
      if (item.acf) {
        switch (type) {
          case 'projeto':
            image = typeof item.acf.project_image === 'string' ? item.acf.project_image : undefined;
            break;
          case 'evento':
            image = typeof item.acf.event_featured_image === 'string' ? item.acf.event_featured_image : undefined;
            break;
          case 'capacitacao':
            if (typeof item.acf.cap_feature_image === 'string') {
              image = item.acf.cap_feature_image;
            } else if (typeof item.acf.cap_feature_image === 'object' && item.acf.cap_feature_image?.url) {
              image = item.acf.cap_feature_image.url;
            }
            break;
          case 'parceiro':
            if (typeof item.acf.partner_logo === 'string') {
              image = item.acf.partner_logo;
            } else if (typeof item.acf.partner_logo === 'object' && item.acf.partner_logo?.url) {
              image = item.acf.partner_logo.url;
            }
            break;
          case 'noticia':
            // Notícias podem ter featured_image no ACF
            if (typeof item.acf.featured_image === 'string') {
              image = item.acf.featured_image;
            }
            break;
        }
      }
      
      return {
        id: item.id,
        title,
        excerpt,
        type,
        link: item.link || `#${type}-${item.id}`,
        image,
      };
    });
  } catch (error) {
    console.error(`Erro ao buscar ${resource}:`, error);
    return [];
  }
}

/**
 * Busca na API legacy (posts com categorias)
 * Usa a mesma infraestrutura de api.ts
 */
async function searchLegacyAPI(query: string): Promise<SearchResultItem[]> {
  try {
    const LEGACY_CATEGORY_NEWS = import.meta.env.VITE_WP_LEGACY_CATEGORY_NEWS || '14';
    const LEGACY_CATEGORY_PROJECTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_PROJECTS || '90';
    const LEGACY_CATEGORY_EVENTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_EVENTS || '9';
    
    const categories = [
      { id: LEGACY_CATEGORY_NEWS, type: 'noticia' as const },
      { id: LEGACY_CATEGORY_PROJECTS, type: 'projeto' as const },
      { id: LEGACY_CATEGORY_EVENTS, type: 'evento' as const },
    ].filter(c => c.id);

    const results: SearchResultItem[] = [];
    
    await Promise.allSettled(
      categories.map(async ({ id, type }) => {
        try {
          const params = new URLSearchParams({
            search: query,
            categories: id,
            per_page: '10',
            _embed: '1',
          });
          
          const url = `${LEGACY_API_URL}/posts?${params.toString()}`;
          const posts = await fetchJsonWithCache<Array<{
            id: number;
            title: { rendered: string };
            excerpt: { rendered: string };
            link?: string;
            _embedded?: {
              'wp:featuredmedia'?: Array<{ source_url?: string }>;
            };
          }>>(url, `posts categoria ${id} (busca)`);
          
          posts.forEach(post => {
            const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150).trim();
            
            results.push({
              id: post.id,
              title: post.title.rendered,
              excerpt: excerpt || undefined,
              type,
              link: post.link,
              image: imageUrl,
            });
          });
        } catch (err) {
          console.error(`Erro ao buscar categoria ${id}:`, err);
        }
      })
    );
    
    return results;
  } catch (error) {
    console.error('Erro ao buscar legacy API:', error);
    return [];
  }
}

/**
 * Normaliza texto para comparação (caixa baixa, sem acentos).
 */
const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/**
 * Mapa de sinônimos / intenções para interpretar melhor a busca do usuário.
 * A chave é a forma normalizada da query; o valor são termos equivalentes.
 */
const QUERY_SYNONYMS: Record<string, string[]> = {
  // Navegação / páginas
  contato: ['contato', 'fale conosco', 'telefone', 'email', 'e-mail', 'whatsapp', 'endereco', 'endereço'],
  equipe: ['equipe', 'time', 'pessoas', 'profissionais', 'colaboradores'],
  quemsomos: ['quem somos', 'institucional', 'sobre', 'fundacao', 'fundação'],
  historia: ['historia', 'história', 'origem', 'trajetoria', 'linha do tempo'],
  missao: ['missao', 'missão', 'proposito', 'propósito', 'visao', 'visão', 'valores'],
  projetos: ['projetos', 'programas', 'iniciativas', 'acoes', 'ações'],
  capacitacao: ['capacitacao', 'capacitação', 'curso', 'cursos', 'treinamento', 'treinamentos', 'formacao', 'formação'],
  eventos: ['eventos', 'agenda', 'calendario', 'calendário'],
  parcerias: ['parcerias', 'parceiros', 'apoio'],
  prestacaodecontas: ['prestacao de contas', 'prestação de contas', 'transparencia', 'transparência', 'relatorios', 'relatórios', 'balanco', 'balanço'],
  editais: ['editais', 'chamadas publicas', 'chamadas públicas', 'oportunidades'],
  documentos: ['documentos', 'estatuto', 'regulamento', 'atas'],
  lgpd: ['lgpd', 'dados pessoais', 'privacidade', 'proteçao de dados', 'protecao de dados'],
  colabore: ['colabore', 'doacao', 'doação', 'doar', 'apoie', 'contribuir', 'voluntariado'],
  impacto: ['impacto', 'resultados', 'numeros', 'números', 'estatisticas', 'estatísticas'],
  inicio: ['inicio', 'início', 'home', 'pagina inicial', 'página inicial'],

  // Temas gerais
  bombeiros: ['bombeiros', 'cbmdf', 'corpo de bombeiros'],
  emergencia: ['emergencia', 'emergência', '193'],
};

/**
 * Pequena função de distância de edição para fuzzy match leve (até 1 erro).
 */
function isFuzzyMatch(a: string, b: string): boolean {
  const s1 = normalizeText(a);
  const s2 = normalizeText(b);
  const maxLen = Math.max(s1.length, s2.length);

  // Só vale a pena para termos curtos/médios
  if (maxLen <= 2) return false;
  if (Math.abs(s1.length - s2.length) > 1) return false;

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < s1.length && j < s2.length) {
    if (s1[i] === s2[j]) {
      i++;
      j++;
      continue;
    }

    edits++;
    if (edits > 1) return false;

    if (s1.length > s2.length) {
      i++; // remoção em s1
    } else if (s1.length < s2.length) {
      j++; // inserção em s1
    } else {
      i++;
      j++; // substituição
    }
  }

  // Conta caracteres restantes
  edits += s1.length - i + (s2.length - j);
  return edits <= 1;
}

/**
 * Índice estático de páginas/seções do próprio site.
 * Isso permite que termos como "contato", "equipe", "lgpd" etc.
 * retornem resultados mesmo quando não há item na API.
 * Enriquecido com palavras-chave baseadas no conteúdo real do site.
 */
const STATIC_SITE_PAGES: Array<{
  id: number;
  title: string;
  excerpt: string;
  link: string;
  keywords: string[];
}> = [
  {
    id: 1,
    title: 'Contato',
    excerpt: 'Informações de contato, endereço, telefone e e-mail da Fundação 193. SHS Quadra 6, Conjunto A, Bloco A, Sala 501 - Brasília-DF. CEP: 70316-102. Telefone: (61) 99557-8286. E-mail: contato@fundacao193.org.br',
    link: '#contato',
    keywords: [
      'contato', 'fale conosco', 'falar', 'telefone', 'email', 'e-mail', 'endereço',
      'brasília', 'df', 'distrito federal', 'shs', 'quadra 6', 'cep 70316-102',
      'horário de atendimento', 'atendimento', 'suporte', 'comunicação'
    ],
  },
  {
    id: 2,
    title: 'Nossa Equipe',
    excerpt: 'Conheça a equipe da Fundação 193: presidência de honra, presidência executiva, diretoria executiva, conselho de curadores e conselho fiscal.',
    link: '#equipe',
    keywords: [
      'equipe', 'nossa equipe', 'time', 'profissionais', 'presidência', 'diretoria', 'conselho',
      'presidência de honra', 'presidência executiva', 'diretoria executiva',
      'conselho de curadores', 'conselho fiscal', 'governança', 'liderança',
      'desenvolvimento contínuo', 'capacitação profissional', 'mentoria'
    ],
  },
  {
    id: 3,
    title: 'Quem Somos',
    excerpt: 'A Fundação 193 é uma instituição sem fins lucrativos criada para apoiar e fortalecer o Corpo de Bombeiros Militar do Distrito Federal (CBMDF), atuando como um elo entre a Corporação e a sociedade.',
    link: '#quem-somos',
    keywords: [
      'quem somos', 'institucional', 'sobre', 'fundação 193', 'fundação',
      'instituição de apoio', 'apoio ao cbmdf', 'cbmdf', 'corpo de bombeiros',
      'bombeiros militares', 'distrito federal', 'sem fins lucrativos',
      'projetos socioambientais', 'prevenção', 'capacitação', 'segurança'
    ],
  },
  {
    id: 4,
    title: 'Nossa História',
    excerpt: 'A Fundação 193 foi oficialmente constituída em 06 de dezembro de 2022. Conheça a origem, estruturação institucional, atuação e desenvolvimento da Fundação.',
    link: '#nossa-historia',
    keywords: [
      'história', 'nossa história', 'trajetória', 'linha do tempo', 'origem',
      'fundação', 'constituição', 'dezembro 2022', 'estruturação',
      'plano estratégico', 'mpdft', 'ministério público',
      'preservação meio ambiente', 'prevenção incêndios', 'conhecimento científico',
      'história bombeiros', 'qualidade de vida', 'atividades culturais'
    ],
  },
  {
    id: 5,
    title: 'Missão e Valores',
    excerpt: 'Missão: Apoiar o Corpo de Bombeiros Militar do Distrito Federal. Visão: Ser reconhecida como instituição estratégica. Valores: Excelência, Humanidade, Inovação, Colaboração, Segurança e Eficiência.',
    link: '#missao-valores',
    keywords: [
      'missão', 'visão', 'valores', 'propósito', 'excelência', 'humanidade',
      'inovação', 'colaboração', 'segurança', 'eficiência', 'ética',
      'transparência', 'compromisso social', 'responsabilidade', 'solidariedade',
      'respeito à vida', 'dignidade humana', 'criatividade', 'parcerias',
      'boas práticas', 'prevenção de riscos', 'planejamento', 'impacto social'
    ],
  },
  {
    id: 6,
    title: 'Projetos',
    excerpt: 'Projetos apoiados e desenvolvidos pela Fundação 193 nas áreas socioambiental, preventiva, cultural, educacional e desportiva.',
    link: '#projetos',
    keywords: [
      'projetos', 'iniciativas', 'ações', 'programas', 'projetos sociais',
      'projetos socioambientais', 'projetos preventivos', 'projetos culturais',
      'projetos educacionais', 'projetos desportivos', 'apoio operacional',
      'equipamentos', 'tecnologia', 'recursos', 'salvamento', 'combate a incêndios'
    ],
  },
  {
    id: 7,
    title: 'Capacitação',
    excerpt: 'Capacitações, treinamentos e formações oferecidos pela Fundação 193. Programas especializados de formação e aperfeiçoamento para bombeiros.',
    link: '#capacitacao',
    keywords: [
      'capacitação', 'treinamento', 'cursos', 'formação', 'aperfeiçoamento',
      'programas especializados', 'instrutores qualificados', 'estrutura moderna',
      'desenvolvimento profissional', 'educação corporativa', 'parcerias acadêmicas',
      'mentoria especializada', 'desenvolvimento de carreira'
    ],
  },
  {
    id: 8,
    title: 'Eventos',
    excerpt: 'Eventos realizados ou apoiados pela Fundação 193. Seminários, congressos, encontros técnicos e ações institucionais.',
    link: '#eventos',
    keywords: [
      'eventos', 'agenda', 'calendário', 'seminários', 'congressos',
      'encontros técnicos', 'troca de experiências', 'conhecimento',
      'eventos institucionais', 'treinamentos', 'ações institucionais'
    ],
  },
  {
    id: 9,
    title: 'Parcerias',
    excerpt: 'Organizações parceiras e rede de colaboração da Fundação 193. Parcerias institucionais que fortalecem a atuação.',
    link: '#parcerias',
    keywords: [
      'parcerias', 'parceiros', 'apoio', 'colaboração', 'rede de colaboração',
      'organizações parceiras', 'parcerias institucionais', 'trabalho conjunto',
      'sociedade', 'instituições'
    ],
  },
  {
    id: 10,
    title: 'Prestação de Contas',
    excerpt: 'Relatórios, balanços e informações de prestação de contas da Fundação 193. Transparência na aplicação dos recursos.',
    link: '#prestacao-contas',
    keywords: [
      'prestação de contas', 'transparência', 'relatórios', 'balanço',
      'fiscalização', 'fiscalização econômico-financeira', 'aplicação de recursos',
      'responsabilidade financeira', 'conformidade', 'governança'
    ],
  },
  {
    id: 11,
    title: 'Editais',
    excerpt: 'Editais e chamadas públicas da Fundação 193. Oportunidades e processos seletivos.',
    link: '#editais',
    keywords: [
      'editais', 'chamadas públicas', 'oportunidades', 'processos seletivos',
      'seleção', 'concurso', 'licitação'
    ],
  },
  {
    id: 12,
    title: 'Documentos',
    excerpt: 'Documentos institucionais e normativos da Fundação 193. Estatuto, regulamentos, atas e documentos oficiais.',
    link: '#documentos',
    keywords: [
      'documentos', 'atas', 'estatuto', 'regulamento', 'documentos institucionais',
      'documentos normativos', 'documentos oficiais', 'normas', 'legislação'
    ],
  },
  {
    id: 13,
    title: 'LGPD',
    excerpt: 'Políticas e informações sobre proteção de dados pessoais (LGPD). Privacidade e segurança de dados.',
    link: '#lgpd',
    keywords: [
      'lgpd', 'dados pessoais', 'proteção de dados', 'privacidade',
      'lei geral de proteção de dados', 'segurança de dados', 'política de privacidade',
      'conformidade lgpd', 'direitos do titular'
    ],
  },
  {
    id: 14,
    title: 'Colabore',
    excerpt: 'Formas de colaborar e apoiar a Fundação 193. Doações, voluntariado e outras formas de contribuição.',
    link: '#colabore',
    keywords: [
      'doação', 'colabore', 'apoie', 'contribuir', 'voluntariado', 'voluntário',
      'ajudar', 'apoio', 'contribuição', 'doar', 'parceria', 'colaboração'
    ],
  },
  {
    id: 15,
    title: 'Áreas de Atuação',
    excerpt: 'Apoio Operacional, Capacitação e Treinamentos, Eventos Institucionais e Projetos Sociais. Como a Fundação 193 apoia o Corpo de Bombeiros.',
    link: '#areas',
    keywords: [
      'áreas de atuação', 'atuação', 'apoio operacional', 'equipamentos',
      'tecnologia', 'recursos', 'salvamento', 'combate a incêndios',
      'capacitação e treinamentos', 'eventos institucionais', 'projetos sociais',
      'educação preventiva', 'conscientização', 'segurança', 'prevenção'
    ],
  },
  {
    id: 16,
    title: 'Nosso Impacto',
    excerpt: 'Mais de 500 eventos realizados, 15.000+ profissionais capacitados, 200+ projetos apoiados e 3+ anos de atuação.',
    link: '#impacto',
    keywords: [
      'impacto', 'nosso impacto', 'números', 'estatísticas', 'resultados',
      '500+ eventos', '15.000 profissionais', '200+ projetos', '3+ anos',
      'eventos realizados', 'profissionais capacitados', 'projetos apoiados',
      'anos de atuação', 'resultados', 'conquistas', 'métricas'
    ],
  },
  {
    id: 17,
    title: 'Notícias',
    excerpt: 'Últimas notícias e atualizações da Fundação 193 e do Corpo de Bombeiros Militar do Distrito Federal.',
    link: '#noticias',
    keywords: [
      'notícias', 'atualizações', 'últimas notícias', 'blog', 'informações',
      'comunicados', 'releases', 'publicações'
    ],
  },
  {
    id: 18,
    title: 'Início',
    excerpt: 'Página inicial da Fundação 193. Apoiando quem salva vidas. Instituição de apoio ao Corpo de Bombeiros Militar do Distrito Federal.',
    link: '#inicio',
    keywords: [
      'início', 'home', 'página inicial', 'fundação 193', 'apoio bombeiros',
      'salvar vidas', 'emergência 193', 'número 193', 'cbmdf',
      'corpo de bombeiros militar', 'distrito federal', 'brasília'
    ],
  },
];

/**
 * Busca no índice estático de páginas/seções do site.
 * Usa sinônimos, normalização e fuzzy search leve para entender melhor a intenção.
 */
function searchSiteContent(query: string): SearchResultItem[] {
  const raw = query.trim();
  if (!raw) return [];

  const normalizedQuery = normalizeText(raw);

  // Expande a query com sinônimos
  const baseKey = normalizedQuery.replace(/\s+/g, '');
  const synonyms = QUERY_SYNONYMS[baseKey] || [];
  const expandedTerms = new Set<string>([normalizedQuery, ...synonyms.map(normalizeText)]);

  const results: SearchResultItem[] = [];

  for (const page of STATIC_SITE_PAGES) {
    const titleNorm = normalizeText(page.title);
    const excerptNorm = normalizeText(page.excerpt);
    const keywordsNorm = page.keywords.map(normalizeText);
    const haystack = `${titleNorm} ${excerptNorm} ${keywordsNorm.join(' ')}`;

    let bestScore = 0;

    for (const term of expandedTerms) {
      if (!term) continue;

      // Sem match algum nesse termo, tenta fuzzy em keywords
      const hasBasicMatch = haystack.includes(term);
      const hasFuzzyInKeywords = keywordsNorm.some((kw) => isFuzzyMatch(kw, term));
      if (!hasBasicMatch && !hasFuzzyInKeywords) {
        continue;
      }

      let score = 0;

      // Match muito forte no título
      if (titleNorm === term) {
        score = 120;
      } else if (titleNorm.startsWith(term)) {
        score = 110;
      } else if (titleNorm.includes(term)) {
        score = 100;
      }

      // Match direto em keyword
      if (keywordsNorm.some((kw) => kw === term)) {
        score = Math.max(score, 95);
      }

      // Match fuzzy em keyword (corrige pequenos erros de digitação)
      if (keywordsNorm.some((kw) => isFuzzyMatch(kw, term))) {
        score = Math.max(score, 85);
      }

      // Match no excerpt
      if (excerptNorm.includes(term)) {
        score = Math.max(score, 80);
      }

      // Se nada acima pegou, mas havia basic match em haystack
      if (score === 0 && hasBasicMatch) {
        score = 70;
      }

      bestScore = Math.max(bestScore, score);
    }

    if (bestScore > 0) {
      results.push({
        id: page.id,
        title: page.title,
        excerpt: page.excerpt,
        type: 'pagina',
        link: page.link,
        score: bestScore,
      });
    }
  }

  // Ordena por score desc e depois título
  results.sort((a, b) => {
    const aScore = a.score ?? 0;
    const bScore = b.score ?? 0;
    if (aScore !== bScore) {
      return bScore - aScore;
    }
    return a.title.localeCompare(b.title, 'pt-BR');
  });

  return results;
}

/**
 * Busca universal em todos os recursos
 * Retorna resultados combinados da API nova (preferencial) ou legacy
 * Usa os tipos corretos e mapeia os dados adequadamente
 */
export async function searchAll(query: string): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { query, results: [], total: 0 };
  }

  const cacheKey = `${query.toLowerCase().trim()}`;
  const cached = searchCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_TTL) {
    return cached.results;
  }

  try {
    let results: SearchResultItem[] = [];

    if (isLegacyEnabled) {
      // Busca na API legacy
      results = await searchLegacyAPI(query.trim());
    } else {
      // Busca simultânea em todos os recursos do novo WordPress
      // Usa os tipos corretos importados de api.ts
      const [noticias, projetos, eventos, capacitacoes, parceiros] = await Promise.allSettled([
        searchNewAPI<news>('noticia', query.trim(), 'noticia'),
        searchNewAPI<Project>('projeto', query.trim(), 'projeto'),
        searchNewAPI<Event>('evento', query.trim(), 'evento'),
        searchNewAPI<Training>('capacitacao', query.trim(), 'capacitacao'),
        searchNewAPI<Partner>('parceria', query.trim(), 'parceiro'),
      ]);

      // Combina resultados bem-sucedidos
      if (noticias.status === 'fulfilled') results.push(...noticias.value);
      if (projetos.status === 'fulfilled') results.push(...projetos.value);
      if (eventos.status === 'fulfilled') results.push(...eventos.value);
      if (capacitacoes.status === 'fulfilled') results.push(...capacitacoes.value);
      if (parceiros.status === 'fulfilled') results.push(...parceiros.value);
    }

    // Também busca em páginas/seções estáticas do site
    const siteResults = searchSiteContent(query);
    if (siteResults.length > 0) {
      results.push(...siteResults);
    }

    // Ordena por relevância combinando score (quando existir) e heurísticas de título
    const lowerQuery = normalizeText(query);
    results.sort((a, b) => {
      const aTitle = normalizeText(a.title);
      const bTitle = normalizeText(b.title);
      
      // Score explícito (principalmente para páginas estáticas)
      const aScore = a.score ?? 0;
      const bScore = b.score ?? 0;
      if (aScore !== bScore) {
        return bScore - aScore;
      }

      // Páginas do site têm prioridade quando há match exato no título
      const aIsPage = a.type === 'pagina';
      const bIsPage = b.type === 'pagina';
      
      // Se uma é página e outra não, e a página tem match exato, prioriza a página
      if (aIsPage && !bIsPage && aTitle === lowerQuery) {
        return -1;
      }
      if (!aIsPage && bIsPage && bTitle === lowerQuery) {
        return 1;
      }
      
      // Match exato no título (qualquer tipo)
      const aExactMatch = aTitle === lowerQuery ? 0 : (aTitle.includes(lowerQuery) ? 1 : 2);
      const bExactMatch = bTitle === lowerQuery ? 0 : (bTitle.includes(lowerQuery) ? 1 : 2);
      
      if (aExactMatch !== bExactMatch) {
        return aExactMatch - bExactMatch;
      }
      
      // Se ambos têm match, ordena por posição no título (mais próximo do início primeiro)
      const aIndex = aTitle.indexOf(lowerQuery);
      const bIndex = bTitle.indexOf(lowerQuery);
      
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // Se ambos são páginas ou ambos são da API, mantém ordem original (já ordenada)
      return 0;
    });

    const searchResults: SearchResults = {
      query: query.trim(),
      results: results.slice(0, 20), // Limita a 20 resultados
      total: results.length,
    };

    searchCache.set(cacheKey, {
      timestamp: Date.now(),
      results: searchResults,
    });

    return searchResults;
  } catch (error) {
    console.error('Erro ao buscar:', error);
    return { query: query.trim(), results: [], total: 0 };
  }
}

/**
 * Retorna tipo legível em português
 */
export function getTypeLabel(type: SearchResultItem['type']): string {
  const labels: Record<SearchResultItem['type'], string> = {
    noticia: 'Notícia',
    projeto: 'Projeto',
    evento: 'Evento',
    capacitacao: 'Capacitação',
    parceiro: 'Parceiro',
    pagina: 'Página do Site',
  };
  return labels[type];
}
