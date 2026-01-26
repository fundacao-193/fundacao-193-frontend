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

// Imports dos tipos
import { news } from '../types/news';
import { Project } from '../types/projects';
import type { Event } from '../types/events';
import { Partner } from '../types/partners';
import type { Training } from '../types/training';

export function fetchNoticias() {
  return fetchAPI<news[]>('noticia');
}

export function fetchProjetos() {
  return fetchAPI<Project[]>('projeto');
}

export function fetchEventos() {
  return fetchAPI<Event[]>('evento');
}

export function fetchParceiros() {
  return fetchAPI<Partner[]>('parceria?acf_format=standard');
}

export function fetchCapacitacoes() {
  return fetchAPI<Training[]>('capacitacao?acf_format=standard');
}

