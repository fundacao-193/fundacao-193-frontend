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
  type: 'noticia' | 'projeto' | 'evento' | 'capacitacao' | 'parceiro';
  link?: string;
  image?: string;
}

export interface SearchResults {
  query: string;
  results: SearchResultItem[];
  total: number;
}

/**
 * Busca em uma rota específica do novo WordPress (CPT)
 */
async function searchNewAPI<T extends { id: number; title?: { rendered?: string }; excerpt?: { rendered?: string } }>(
  resource: string,
  query: string,
  type: SearchResultItem['type']
): Promise<SearchResultItem[]> {
  try {
    const params = new URLSearchParams({
      search: query,
      per_page: '10',
    });
    
    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    if (!response.ok) return [];
    
    const data = await response.json() as T[];
    
    return data.map((item: T) => ({
      id: item.id,
      title: item.title?.rendered || 'Sem título',
      excerpt: item.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100),
      type,
      link: `#${type}-${item.id}`,
    }));
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

  try {
    let results: SearchResultItem[] = [];

    if (isLegacyEnabled) {
      // Busca na API legacy
      results = await searchLegacyAPI(query);
    } else {
      // Busca simultânea em todos os recursos do novo WordPress
      const [noticias, projetos, eventos, capacitacoes, parceiros] = await Promise.allSettled([
        searchNewAPI('noticia', query, 'noticia'),
        searchNewAPI('projeto', query, 'projeto'),
        searchNewAPI('evento', query, 'evento'),
        searchNewAPI('capacitacao', query, 'capacitacao'),
        searchNewAPI('parceiro', query, 'parceiro'),
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

    const searchResults: SearchResults = {
      query,
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
    return { query, results: [], total: 0 };
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
  };
  return labels[type];
}
