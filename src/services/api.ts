import type { news } from '../types/news';
import type { Project } from '../types/projects';
import type { Event } from '../types/events';
import type { Partner } from '../types/partners';
import type { Training } from '../types/training';
import type { Documento } from '../types/documents';
import { cleanContent, extractImageUrl, extractFeaturedImageUrl } from '../lib/wordpress-utils';

// API URL: usa localhost em dev, produção em build
const API_URL = import.meta.env.VITE_WP_API_URL || (
  import.meta.env.PROD 
    ? 'https://conteudo.fundacao193.org.br/wp-json/wp/v2'
    : 'http://localhost:10003/wp-json/wp/v2'
);

// Legacy API: sempre aponta para site antigo
const LEGACY_API_URL = 'https://fundacao193.org.br/wp-json/wp/v2';
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE;
const LEGACY_PER_PAGE = Number(import.meta.env.VITE_WP_LEGACY_PER_PAGE || 50);
const CACHE_TTL_MS = Number(import.meta.env.VITE_API_CACHE_TTL_MS || 60000);

// Valores DEFAULT para modo legado (funcionam com site antigo fundacao193.org.br)
// Sobrescreva no .env.local se necessário
// NO NOVO SISTEMA: CPT "noticia" não precisa de categoria - usa taxonomy noticia_category
const LEGACY_CATEGORY_NEWS = import.meta.env.VITE_WP_LEGACY_CATEGORY_NEWS || '14';       // Blog (LEGACY ONLY)
const LEGACY_CATEGORY_PROJECTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_PROJECTS || '90';  // Projetos (LEGACY ONLY)
const LEGACY_CATEGORY_EVENTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_EVENTS || '9';       // Eventos (LEGACY ONLY)
const LEGACY_CATEGORY_PARTNERS = import.meta.env.VITE_WP_LEGACY_CATEGORY_PARTNERS || '';     // Não usado
const LEGACY_CATEGORY_TRAINING = import.meta.env.VITE_WP_LEGACY_CATEGORY_TRAINING || '';     // Não usado

// MODO LEGACY: Pode ser usado em QUALQUER ambiente (dev ou produção)
// Útil como fallback de emergência se o novo WordPress apresentar problemas
const isLegacyEnabled = DATA_SOURCE === 'legacy';

// Log informativo sobre qual API está sendo usada (somente em desenvolvimento)
if (import.meta.env.DEV) {
  if (isLegacyEnabled) {
    console.info('[api] Modo LEGACY ativo - Consumindo site antigo:', LEGACY_API_URL);
  } else {
    console.info('[api] Modo NOVO ativo - Consumindo CPT/ACF:', API_URL);
  }
}

/**
 * Funcao base generica para requisicoes na API
 */

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_URL}/${endpoint}`;
  return fetchJsonWithCache<T>(url, endpoint);
}

async function fetchLegacyAPI<T>(endpoint: string): Promise<T> {
  const url = `${LEGACY_API_URL}/${endpoint}`;
  return fetchJsonWithCache<T>(url, endpoint);
}

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

type LegacyPost = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  link?: string;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
};

const toYmd = (dateStr?: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
};

const getFeaturedImageUrl = (post: LegacyPost): string => {
  const embedded = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (embedded) return embedded;
  return '';
};

const ensureLegacyCategory = (value?: string): string | null => {
  if (!value) return null;
  return value;
};

const fetchLegacyPostsByCategory = async (category?: string): Promise<LegacyPost[]> => {
  const cat = ensureLegacyCategory(category);
  if (!cat) return [];

  const params = new URLSearchParams({
    per_page: String(LEGACY_PER_PAGE),
    _embed: '1',
    categories: cat,
    _fields: 'id,date,title,excerpt,content,link,featured_media,_embedded',
  });

  return fetchLegacyAPI<LegacyPost[]>(`posts?${params.toString()}`);
};

const fetchLegacyPostById = (id: number | string) => {
  return fetchLegacyAPI<LegacyPost>(`posts/${id}?_embed=1&_fields=id,date,title,excerpt,content,link,featured_media,_embedded`);
};

export function fetchNoticias() {
  if (isLegacyEnabled) {
    return fetchLegacyPostsByCategory(LEGACY_CATEGORY_NEWS).then((posts) =>
      posts.map((post) => ({
        id: post.id,
        date: post.date,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        link: post.link,
      }))
    );
  }
  return fetchAPI<news[]>('noticias?per_page=10&_fields=id,date,title,excerpt,content,acf,noticia_category');
}

// Fetch news from multiple categories with category info
export async function fetchNoticiasByCategories(categoryIds: string[]): Promise<(news & { category_ids: number[] })[]> {
  if (isLegacyEnabled) {
    const postsMap = new Map<number, news & { category_ids: number[] }>();
    const categoryList = categoryIds.filter(Boolean);
    const results = await Promise.allSettled(
      categoryList.map((catId) => fetchLegacyPostsByCategory(catId))
    );

    results.forEach((result, index) => {
      if (result.status !== 'fulfilled') {
        console.warn(`Failed to fetch category ${categoryList[index]}:`, result.reason);
        return;
      }

      const catId = categoryList[index];
      for (const post of result.value) {
        const existing = postsMap.get(post.id);
        if (existing) {
          if (!existing.category_ids.includes(Number(catId))) {
            existing.category_ids.push(Number(catId));
          }
        } else {
          postsMap.set(post.id, {
            id: post.id,
            date: post.date,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            link: post.link,
            category_ids: [Number(catId)],
          });
        }
      }
    });
    
    // Converte Map para array e ordena por data
    const allPosts = Array.from(postsMap.values());
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  // ========================================================================
  // API NOVA: Buscar notícias com categorias da Taxonomy
  // Usa ?_embed=wp:term para incluir dados de categorias (limitado com _fields)
  // ========================================================================
  const posts = await fetchAPI<news[]>('noticias?per_page=100&_fields=id,date,title,excerpt,content,acf,noticia_category,_embedded&_embed=wp:term');
  
  return posts.map((post) => {
    // Extrair IDs das categorias do _embedded
    const categoryIds: number[] = [];
    if (post._embedded?.['wp:term'] && Array.isArray(post._embedded['wp:term'][0])) {
      post._embedded['wp:term'][0].forEach((term) => {
        if (term.taxonomy === 'noticia_category' && typeof term.id === 'number') {
          categoryIds.push(term.id);
        }
      });
    }
    
    // Fallback: usar noticia_category se _embedded não estiver disponível
    if (categoryIds.length === 0 && post.noticia_category) {
      categoryIds.push(...post.noticia_category);
    }

    return {
      ...post,
      category_ids: categoryIds,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function fetchProjetos() {
  if (isLegacyEnabled) {
    return fetchLegacyPostsByCategory(LEGACY_CATEGORY_PROJECTS).then((posts) =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        acf: {
          impacto: '',
          project_image: getFeaturedImageUrl(post) || undefined,
        },
      }))
    );
  }
  
  return fetchAPI<Project[]>('projetos?per_page=10&_embed=wp:featuredmedia')
    .then(projects => 
      projects.map(project => {
        const imageUrl = extractImageUrl(project.acf?.project_featured_image) 
                        || extractFeaturedImageUrl(project);
        
        // Se não tem excerpt, usa início do content
        let excerpt = project.excerpt;
        if (!excerpt?.rendered && project.content?.rendered) {
          const plainText = project.content.rendered.replace(/<[^>]*>/g, '').trim();
          excerpt = { rendered: plainText.substring(0, 200) + '...' };
        }
        
        return {
          ...project,
          excerpt,
          content: project.content ? { ...project.content, rendered: cleanContent(project.content.rendered || '') } : undefined,
          acf: project.acf ? {
            ...project.acf,
            project_featured_image: imageUrl,
          } : undefined,
        };
      })
    );
}

export function fetchEventos() {
  if (isLegacyEnabled) {
    return fetchLegacyPostsByCategory(LEGACY_CATEGORY_EVENTS).then((posts) =>
      posts.map((post) => ({
        id: post.id,
        slug: '',
        title: post.title,
        content: post.content,
        acf: {
          event_summary: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
          event_start_date: toYmd(post.date),
          event_end_date: '',
          event_location: '',
          event_registration_url: '',
          event_is_featured: false,
          event_featured_image: getFeaturedImageUrl(post) || undefined,
        },
      }))
    );
  }
  
  return fetchAPI<Event[]>('eventos?per_page=10&_embed=wp:featuredmedia')
    .then(events =>
      events.map(event => {
        const imageUrl = extractImageUrl(event.acf?.event_featured_image) 
                        || extractFeaturedImageUrl(event);
        
        // Se não tem summary no ACF, gera a partir do excerpt ou content
        let acfData = event.acf || {};
        if (!acfData.event_summary) {
          // Prioriza excerpt do WordPress
          if (event.excerpt?.rendered) {
            const plainText = event.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
            if (plainText.length > 0) {
              acfData = {
                ...acfData,
                event_summary: plainText.substring(0, 200)
              };
            }
          } 
          // Fallback para content se excerpt também não existir
          else if (event.content?.rendered) {
            const plainText = event.content.rendered.replace(/<[^>]*>/g, '').trim();
            if (plainText.length > 0) {
              acfData = {
                ...acfData,
                event_summary: plainText.substring(0, 150) + '...'
              };
            }
          }
          
          // Se ainda não tem summary (evento completamente vazio), usa o título
          if (!acfData.event_summary) {
            const titleText = event.title.rendered.replace(/<[^>]*>/g, '').trim();
            acfData = {
              ...acfData,
              event_summary: `Evento: ${titleText}`
            };
          }
        }

        return {
          ...event,
          content: event.content ? { ...event.content, rendered: cleanContent(event.content.rendered || '') } : undefined,
          acf: {
            ...acfData,
            event_featured_image: imageUrl,
          },
        };
      })
    );
}

export function fetchParceiros() {
  if (isLegacyEnabled) {
    return fetchLegacyPostsByCategory(LEGACY_CATEGORY_PARTNERS).then((posts) =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        acf: {
          partner_name: post.title?.rendered || '',
          partner_logo: getFeaturedImageUrl(post) || '',
          partner_website: post.link || '',
          partner_status: 'ativo',
          partner_is_featured: false,
        },
      }))
    );
  }
  return fetchAPI<Partner[]>('parcerias?per_page=20&acf_format=standard&_fields=id,title,acf');
}

export function fetchCapacitacoes() {
  if (isLegacyEnabled) {
    return fetchLegacyPostsByCategory(LEGACY_CATEGORY_TRAINING).then((posts) =>
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        acf: {
          cap_subtitle: '',
          cap_summary: post.excerpt?.rendered || '',
          cap_feature_image: getFeaturedImageUrl(post) || '',
          cap_modality: '',
          cap_workload: '',
          cap_start_date: toYmd(post.date),
          cap_end_date: '',
          cap_signup_link: '',
          cap_status: 'Planejada',
          cap_is_featured: false,
        },
      }))
    );
  }
  
  return fetchAPI<Training[]>('capacitacoes?per_page=10&_embed=wp:featuredmedia')
    .then(trainings =>
      trainings.map(training => {
        const imageUrl = extractImageUrl(training.acf?.cap_feature_image) 
                        || extractFeaturedImageUrl(training);
        return {
          ...training,
          acf: training.acf ? {
            ...training.acf,
            cap_feature_image: imageUrl,
          } : training.acf,
        };
      })
    );
}

// Single-entity fetch helpers for detail pages
export function fetchNoticia(id: number | string) {
  if (isLegacyEnabled) {
    return fetchLegacyPostById(id).then((post) => ({
      id: post.id,
      date: post.date,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      link: post.link,
    }));
  }
  return fetchAPI<news>(`noticias/${id}?_fields=id,date,title,excerpt,content,acf,noticia_category`);
}

export function fetchProjeto(id: number | string) {
  if (isLegacyEnabled) {
    return fetchLegacyPostById(id).then((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      acf: {
        impacto: '',
        project_image: getFeaturedImageUrl(post) || undefined,
      },
    }));
  }
  
  return fetchAPI<Project>(`projetos/${id}?_embed=wp:featuredmedia`)
    .then(project => {
      const imageUrl = extractImageUrl(project.acf?.project_featured_image) 
                      || extractFeaturedImageUrl(project);
      return {
        ...project,
        content: project.content ? { ...project.content, rendered: cleanContent(project.content.rendered || '') } : undefined,
        acf: project.acf ? {
          ...project.acf,
          project_featured_image: imageUrl,
        } : undefined,
      };
    });
}

export function fetchEvento(id: number | string) {
  if (isLegacyEnabled) {
    return fetchLegacyPostById(id).then((post) => ({
      id: post.id,
      slug: '',
      title: post.title,
      content: post.content,
      acf: {
        event_summary: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
        event_start_date: toYmd(post.date),
        event_end_date: '',
        event_location: '',
        event_registration_url: '',
        event_is_featured: false,
        event_featured_image: getFeaturedImageUrl(post) || undefined,
      },
    }));
  }
  
  return fetchAPI<Event>(`eventos/${id}?_embed=wp:featuredmedia`)
    .then(event => {
      const imageUrl = extractImageUrl(event.acf?.event_featured_image) 
                      || extractFeaturedImageUrl(event);
      
      // Gera event_summary se não existir
      let acfData = event.acf || {};
      if (!acfData.event_summary) {
        if (event.excerpt?.rendered) {
          const plainText = event.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
          if (plainText.length > 0) {
            acfData = {
              ...acfData,
              event_summary: plainText.substring(0, 200)
            };
          }
        } else if (event.content?.rendered) {
          const plainText = event.content.rendered.replace(/<[^>]*>/g, '').trim();
          if (plainText.length > 0) {
            acfData = {
              ...acfData,
              event_summary: plainText.substring(0, 150) + '...'
            };
          }
        }
        
        // Fallback final: usa o título se evento está completamente vazio
        if (!acfData.event_summary) {
          const titleText = event.title.rendered.replace(/<[^>]*>/g, '').trim();
          acfData = {
            ...acfData,
            event_summary: `Evento: ${titleText}`
          };
        }
      }
      
      return {
        ...event,
        content: event.content ? { ...event.content, rendered: cleanContent(event.content.rendered || '') } : undefined,
        acf: {
          ...acfData,
          event_featured_image: imageUrl,
        },
      };
    });
}

// ============================================================================
// DOCUMENTOS (CPT UNIFICADO)
// ============================================================================
// CPT: documento (unificado)
// Taxonomies: tipo_documento (hierarchical), ano_documento (tags)
// Filtragem feita por taxonomy query parameters
// ============================================================================

/**
 * Busca documentos filtrados por tipo (taxonomy tipo_documento)
 * Usa filtro por slug direto - sem buscar ID antes (mais performático)
 * @param tipoSlug - Slug do tipo ('edital', 'prestacao-contas', 'documentos-institucionais', etc.)
 * @param perPage - Quantidade de resultados por página (padrão: 20)
 * @returns Array de documentos
 */
async function fetchDocumentosPorTipo(tipoSlug: string, perPage: number = 20): Promise<Documento[]> {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }

  // Filtro direto por slug - WordPress REST aceita slug na query
  // Reduz de 2 requisições para 1, eliminando latência
  return fetchAPI<Documento[]>(
    `documentos?tipo_documento=${tipoSlug}&per_page=${perPage}&_embed=true&_fields=id,date,slug,title,content,tipo_documento,ano_documento,acf,_embedded`
  );
}

/**
 * Busca todos os documentos (sem filtro de tipo)
 * Usado na página Documents.tsx
 */
export function fetchDocumentos(perPage: number = 20) {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }
  return fetchAPI<Documento[]>(
    `documentos?per_page=${perPage}&_embed=true&_fields=id,date,slug,title,content,tipo_documento,ano_documento,acf,_embedded`
  );
}

/**
 * Busca apenas editais (filtra por tipo_documento = 'edital')
 * Usado na página Edits.tsx
 */
export function fetchEditais(perPage: number = 20) {
  return fetchDocumentosPorTipo('edital', perPage);
}

/**
 * Busca apenas prestações de contas (filtra por tipo_documento = 'prestacao-contas')
 * Usado na página Accounts.tsx
 */
export function fetchPrestacaoContas(perPage: number = 20) {
  return fetchDocumentosPorTipo('prestacao-contas', perPage);
}

/**
 * Busca documento individual por ID
 * @param id - ID do documento
 * @returns Documento completo
 */
export function fetchDocumento(id: number | string) {
  if (isLegacyEnabled) {
    return Promise.resolve(null);
  }
  return fetchAPI<Documento>(
    `documentos/${id}?_embed=true&_fields=id,date,slug,title,content,tipo_documento,ano_documento,acf,_embedded`
  );
}

// ============================================================================
// CATEGORIAS DE NOTÍCIAS (Taxonomy: noticia_category)
// ============================================================================

/**
 * Busca todas as categorias de notícias da Taxonomy
 * Usado em NewsList.tsx para popular o dropdown de filtros
 */
export async function fetchNoticiasCategories() {
  if (isLegacyEnabled) {
    // Legacy retorna vazio - categorias são hardcoded
    return Promise.resolve([]);
  }
  return fetchAPI<Array<{
    id: number;
    name: string;
    slug: string;
    count: number;
  }>>('noticia_category');
}  

