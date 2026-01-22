const API_URL = import.meta.env.VITE_WP_API_URL;

/**
 * Funcao base generica para requisicoes na API
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}`);
  }

  return response.json();
}

/**
 * Endpoints da API
 */
import { News } from '../types/news';

export function fetchNoticias(): Promise<News[]> {
  return fetchAPI<News[]>('noticia');
}

export function fetchProjetos(): Promise<any[]> {
  return fetchAPI<any[]>('projeto');
}
