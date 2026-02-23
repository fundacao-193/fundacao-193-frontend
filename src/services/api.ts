const API_URL = import.meta.env.VITE_WP_API_URL || 'https://fundacao193.org.br/wp-json/wp/v2';
const LEGACY_API_URL = import.meta.env.VITE_WP_LEGACY_API_URL || 'https://fundacao193.org.br/wp-json/wp/v2';
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE;
const LEGACY_PER_PAGE = Number(import.meta.env.VITE_WP_LEGACY_PER_PAGE || 50);
const CACHE_TTL_MS = Number(import.meta.env.VITE_API_CACHE_TTL_MS || 60000);

// Valores DEFAULT para modo legado (funcionam com site antigo fundacao193.org.br)
// Sobrescreva no .env.local se necessário
const LEGACY_CATEGORY_NEWS = import.meta.env.VITE_WP_LEGACY_CATEGORY_NEWS || '14';       // Blog
const LEGACY_CATEGORY_PROJECTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_PROJECTS || '90';  // Projetos  
const LEGACY_CATEGORY_EVENTS = import.meta.env.VITE_WP_LEGACY_CATEGORY_EVENTS || '9';       // Eventos
const LEGACY_CATEGORY_PARTNERS = import.meta.env.VITE_WP_LEGACY_CATEGORY_PARTNERS || '';     // Não usado
const LEGACY_CATEGORY_TRAINING = import.meta.env.VITE_WP_LEGACY_CATEGORY_TRAINING || '';     // Não usado

const isLegacyEnabled = DATA_SOURCE === 'legacy';

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
  });

  return fetchLegacyAPI<LegacyPost[]>(`posts?${params.toString()}`);
};

const fetchLegacyPostById = (id: number | string) => {
  return fetchLegacyAPI<LegacyPost>(`posts/${id}?_embed=1`);
};

// Imports dos tipos
import { news } from '../types/news';
import { Project } from '../types/projects';
import type { Event } from '../types/events';
import { Partner } from '../types/partners';
import type { Training } from '../types/training';
import type { Document } from '../types/documents';
import type { Edit } from '../types/edits';
import type { Account } from '../types/accounts';

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
  return fetchAPI<news[]>('noticia');
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
  // Usa ?_embed=wp:term para incluir dados de categorias
  // ========================================================================
  const posts = await fetchAPI<news[]>('noticia?_embed=wp:term');
  
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
  return fetchAPI<Project[]>('projeto');
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
  return fetchAPI<Event[]>('evento');
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
  return fetchAPI<Partner[]>('parceria?acf_format=standard');
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
  return fetchAPI<Training[]>('capacitacao?acf_format=standard');
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
  return fetchAPI<news>(`noticia/${id}`);
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
  return fetchAPI<Project>(`projeto/${id}`);
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
  return fetchAPI<Event>(`evento/${id}`);
}

// ============================================================================
// DOCUMENTOS, EDITAIS E PRESTAÇÃO DE CONTAS
// ============================================================================
// NOTA: Estas funções retornam arrays vazios em modo legacy, pois esses
// CPTs não existiam no WordPress antigo. Ative quando o novo WP estiver pronto.
// ============================================================================

/**
 * Busca todos os documentos (CPT: documento)
 * Usado na página Documents.tsx
 */
export function fetchDocumentos() {
  if (isLegacyEnabled) {
    // Legacy mode não tem esses documentos
    return Promise.resolve([]);
  }
  return fetchAPI<Document[]>('documento?acf_format=standard');
}

/**
 * Busca todos os editais (CPT: edital)
 * Usado na página Edits.tsx
 */
export function fetchEditais() {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }
  return fetchAPI<Edit[]>('edital?acf_format=standard');
}

/**
 * Busca todas as prestações de contas (CPT: prestacao_conta)
 * Usado na página Accounts.tsx
 */
export function fetchPrestacaoContas() {
  if (isLegacyEnabled) {
    return Promise.resolve([]);
  }
  return fetchAPI<Account[]>('prestacao-conta?acf_format=standard');
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

