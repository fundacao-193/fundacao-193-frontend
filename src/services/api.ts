const API_URL = import.meta.env.VITE_WP_API_URL;

/**
 * Funcao base para qualquer requisicao na API
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}`);
  }

  return response.json();
}

/**
 * Tipos (vai para o front)
 */
export interface Noticia {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf?: {
    featured_image?: number;
    category?: string;
  };
}

/**
 * Endpoints
 */
export function fetchNoticias() {
  return fetchAPI<Noticia[]>('noticia');
}

export function fetchProjetos() {
  return fetchAPI<any[]>('projeto');
}
