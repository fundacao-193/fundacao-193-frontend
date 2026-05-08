/**
 * Serviço de busca integrado com ambas as APIs (nova e legacy)
 * Suporta busca em: Notícias, Projetos, Eventos, Capacitações, Parceiros
 */

const API_URL = import.meta.env.VITE_WP_API_URL || 'https://fundacao193.org.br/wp-json/wp/v2';
const LEGACY_API_URL = import.meta.env.VITE_WP_LEGACY_API_URL || 'https://fundacao193.org.br/wp-json/wp/v2';
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE;
const isLegacyEnabled = DATA_SOURCE === 'legacy';

// Cache para evitar múltiplas requisições
const searchCache = new Map<string, { timestamp: number; results: SearchResults }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export interface SearchResultItem {
  id: number;
  title: string;
  excerpt?: string;
  type: 'noticia' | 'projeto' | 'evento' | 'capacitacao' | 'parceiro' | 'pagina';
  link?: string;
  image?: string;
  /** Opcional: lista de palavras-chave para melhorar a busca local */
  keywords?: string[];
}

export interface SearchResults {
  query: string;
  results: SearchResultItem[];
  total: number;
}

// ---------------------------------------------------------------------------
// Conteúdo local (fallback) - usado quando a API estiver fora do ar
// ---------------------------------------------------------------------------

const LOCAL_CONTENT: SearchResultItem[] = [
  {
    id: 1,
    type: 'pagina',
    title: 'Quem Somos',
    excerpt:
      'Conheça a Fundação 193, instituição sem fins lucrativos de apoio ao Corpo de Bombeiros Militar do Distrito Federal.',
    link: '#quem-somos',
    keywords: ['institucional', 'quem somos', 'fundação 193', 'sobre a fundação', 'apresentação'],
  },
  {
    id: 2,
    type: 'pagina',
    title: 'Nossa História',
    excerpt:
      'Linha do tempo e trajetória da Fundação 193 na promoção da prevenção, segurança e bem-estar da população.',
    link: '#nossa-historia',
    keywords: ['história', 'linha do tempo', 'trajetória', 'fundação', 'origem'],
  },
  {
    id: 3,
    type: 'pagina',
    title: 'Missão, Visão e Valores',
    excerpt:
      'Missão de apoiar institucionalmente o CBMDF, visão de referência em transparência e impacto social, e valores de ética e responsabilidade.',
    link: '#missao-valores',
    keywords: ['missão', 'visão', 'valores', 'propósito', 'princípios'],
  },
  {
    id: 4,
    type: 'pagina',
    title: 'Áreas de Atuação',
    excerpt:
      'Apoio operacional, capacitação e treinamentos, eventos institucionais e projetos sociais desenvolvidos pela Fundação 193.',
    link: '#areas',
    keywords: ['apoio operacional', 'capacitação', 'treinamentos', 'eventos', 'projetos sociais', 'atuações'],
  },
  {
    id: 5,
    type: 'pagina',
    title: 'Prestação de Contas',
    excerpt:
      'Transparência financeira, relatórios, documentos e política de alocação de recursos da Fundação 193.',
    link: '#prestacao-contas',
    keywords: ['prestação de contas', 'relatórios financeiros', 'transparência', 'balanço', 'contas'],
  },
  {
    id: 13,
    type: 'pagina',
    title: 'Editais',
    excerpt:
      'Chamadas públicas, seleção de projetos, resultados e documentos relacionados aos editais da Fundação 193.',
    link: '#editais',
    keywords: ['editais', 'edital', 'seleção de projetos', 'chamadas públicas'],
  },
  {
    id: 14,
    type: 'pagina',
    title: 'Parcerias',
    excerpt:
      'Informações sobre parcerias institucionais, benefícios, tipos de parceria e histórico de cooperação.',
    link: '#parcerias',
    keywords: ['parcerias', 'parceiros', 'parceria institucional', 'parcerias estratégicas'],
  },
  {
    id: 6,
    type: 'pagina',
    title: 'Documentos e Transparência',
    excerpt:
      'Acesso a estatuto, regimento interno, código de ética, relatórios anuais e demais documentos institucionais.',
    link: '#documentos',
    keywords: ['documentos', 'estatuto', 'regimento interno', 'código de ética', 'relatórios anuais'],
  },
  {
    id: 7,
    type: 'pagina',
    title: 'Integridade',
    excerpt:
      'Programa de integridade com acesso ao código de ética, estatuto, regimento interno e políticas institucionais.',
    link: '#integridade',
    keywords: ['integridade', 'programa de integridade', 'codigo de etica', 'estatuto', 'regimento'],
  },
  {
    id: 8,
    type: 'pagina',
    title: 'LGPD e Privacidade',
    excerpt:
      'Informações sobre tratamento de dados pessoais, política de privacidade e conformidade com a LGPD.',
    link: '#lgpd',
    keywords: ['lgpd', 'privacidade', 'dados pessoais', 'política de privacidade'],
  },
  {
    id: 9,
    type: 'pagina',
    title: 'Equipe e Governança',
    excerpt:
      'Conheça a equipe, diretoria executiva, conselhos e estrutura de governança da Fundação 193.',
    link: '#equipe',
    keywords: ['equipe', 'diretoria', 'conselho', 'governança', 'organograma'],
  },
  {
    id: 10,
    type: 'pagina',
    title: 'Impacto e Resultados',
    excerpt:
      'Indicadores de impacto, projetos apoiados, capacitações realizadas e resultados institucionais.',
    link: '#impacto',
    keywords: ['impacto', 'resultados', 'indicadores', 'projetos apoiados'],
  },
  {
    id: 11,
    type: 'pagina',
    title: 'Notícias',
    excerpt:
      'Acompanhe as principais notícias, publicações e destaques da Fundação 193.',
    link: '#noticias',
    keywords: ['notícias', 'novidades', 'publicações', 'clipping'],
  },
  {
    id: 15,
    type: 'pagina',
    title: 'Atividades',
    excerpt:
      'Linha do tempo com todas as notícias, eventos e projetos da Fundação 193 em ordem cronológica.',
    link: '#atividades',
    keywords: ['atividades', 'linha do tempo', 'timeline', 'todas', 'cronologia', 'histórico de atividades'],
  },
  {
    id: 12,
    type: 'pagina',
    title: 'Contato',
    excerpt:
      'Canais oficiais de comunicação com a Fundação 193 para dúvidas, parcerias e imprensa.',
    link: '#contato',
    keywords: ['contato', 'fale conosco', 'telefone', 'endereço', 'e-mail'],
  },
  {
    id: 16,
    type: 'pagina',
    title: 'Colabore e Doações',
    excerpt:
      'Saiba como apoiar a Fundação 193 por meio de doações, parcerias e outras formas de contribuição.',
    link: '#colabore',
    keywords: ['doação', 'doações', 'colabore', 'seja doador', 'seja parceiro', 'contribuir'],
  },
];

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function searchLocalContent(query: string): SearchResultItem[] {
  const normalizedQuery = normalizeText(query.trim());
  if (normalizedQuery.length < 2) return [];

  type Scored = { item: SearchResultItem; score: number };
  const scored: Scored[] = [];

  for (const item of LOCAL_CONTENT) {
    let score = 0;

    const title = normalizeText(item.title);
    const excerpt = item.excerpt ? normalizeText(item.excerpt) : '';
    const keywords = (item.keywords || []).map(normalizeText);

    if (title === normalizedQuery) score += 10;
    else if (title.startsWith(normalizedQuery)) score += 7;
    else if (title.includes(normalizedQuery)) score += 5;

    if (excerpt.includes(normalizedQuery)) score += 2;

    for (const kw of keywords) {
      if (kw === normalizedQuery) {
        score += 8;
      } else if (kw.startsWith(normalizedQuery)) {
        score += 6;
      } else if (kw.includes(normalizedQuery)) {
        score += 4;
      }
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.item);
}

/**
 * Busca em uma rota específica do novo WordPress (CPT)
 */
async function searchNewAPI<T extends { 
  id: number; 
  title?: { rendered?: string }; 
  excerpt?: { rendered?: string };
  acf?: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
}>(
  resource: string,
  query: string,
  type: SearchResultItem['type']
): Promise<SearchResultItem[]> {
  try {
    const params = new URLSearchParams({
      search: query,
      per_page: '10',
      _embed: '1', // Inclui imagens destacadas
    });
    
    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    if (!response.ok) return [];
    
    const data = await response.json() as T[];
    
    return data.map((item: T) => {
      // Extrai imagem destacada se disponível
      const imageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      
      // Gera link apropriado baseado no tipo
      let link: string;
      if (type === 'capacitacao') {
        link = '#capacitacao';
      } else if (type === 'parceiro') {
        link = '#parcerias';
      } else {
        // noticia, projeto, evento têm páginas de detalhe
        link = `#${type}-${item.id}`;
      }
      
      return {
        id: item.id,
        title: item.title?.rendered || 'Sem título',
        excerpt: item.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 150),
        type,
        link,
        image: imageUrl,
      };
    });
  } catch (error) {
    console.error(`Erro ao buscar ${resource}:`, error);
    return [];
  }
}

/**
 * Busca na API legacy (posts com categorias)
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
          
          const response = await fetch(`${LEGACY_API_URL}/posts?${params.toString()}`);
          if (!response.ok) return;
          
          const posts = await response.json() as Array<{
            id: number;
            title: { rendered: string };
            excerpt: { rendered: string };
            link?: string;
            _embedded?: {
              'wp:featuredmedia'?: Array<{ source_url?: string }>;
            };
          }>;
          
          posts.forEach(post => {
            const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            results.push({
              id: post.id,
              title: post.title.rendered,
              excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100),
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
 * Busca universal em todos os recursos
 * Retorna resultados combinados da API nova (preferencial) ou legacy
 */
export async function searchAll(query: string): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { query, results: [], total: 0 };
  }

  const cacheKey = `${query.toLowerCase()}`;
  const cached = searchCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.results;
  }

  // Resultados locais (fallback) sempre são considerados
  const localResults = searchLocalContent(query);

  try {
    let results: SearchResultItem[] = [];

    if (isLegacyEnabled) {
      // Busca na API legacy
      results = await searchLegacyAPI(query);
    } else {
      // Busca simultânea em todos os recursos do novo WordPress
      const [noticias, projetos, eventos, capacitacoes, parceiros] = await Promise.allSettled([
        searchNewAPI('noticias', query, 'noticia'),
        searchNewAPI('projetos', query, 'projeto'),
        searchNewAPI('eventos', query, 'evento'),
        searchNewAPI('capacitacoes', query, 'capacitacao'),
        searchNewAPI('parcerias', query, 'parceiro'),
      ]);

      // Combina resultados bem-sucedidos
      if (noticias.status === 'fulfilled') results.push(...noticias.value);
      if (projetos.status === 'fulfilled') results.push(...projetos.value);
      if (eventos.status === 'fulfilled') results.push(...eventos.value);
      if (capacitacoes.status === 'fulfilled') results.push(...capacitacoes.value);
      if (parceiros.status === 'fulfilled') results.push(...parceiros.value);
    }

    // Ordena por relevância (título com match exato primeiro)
    const lowerQuery = query.toLowerCase();
    results.sort((a, b) => {
      const aMatch = a.title.toLowerCase().includes(lowerQuery) ? 0 : 1;
      const bMatch = b.title.toLowerCase().includes(lowerQuery) ? 0 : 1;
      return aMatch - bMatch;
    });
    
    // Combina com resultados locais, evitando duplicados por link+tipo+id
    const seen = new Set<string>();
    const combined: SearchResultItem[] = [];

    const pushUnique = (item: SearchResultItem) => {
      const key = `${item.type}-${item.id}-${item.link ?? ''}`;
      if (seen.has(key)) return;
      seen.add(key);
      combined.push(item);
    };

    localResults.forEach(pushUnique);
    results.forEach(pushUnique);

    const searchResults: SearchResults = {
      query,
      results: combined.slice(0, 20), // Limita a 20 resultados combinados
      total: combined.length,
    };

    searchCache.set(cacheKey, {
      timestamp: Date.now(),
      results: searchResults,
    });

    return searchResults;
  } catch (error) {
    console.error('Erro ao buscar:', error);
    // Em caso de erro na API, ainda retornamos os resultados locais
    const fallbackResults: SearchResults = {
      query,
      results: localResults.slice(0, 20),
      total: localResults.length,
    };

    return fallbackResults;
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
    pagina: 'Página',
  };
  return labels[type];
}
