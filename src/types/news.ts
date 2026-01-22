/**
 * Tipo que representa uma Noticia vinda da API do WordPress
 */
export interface News {
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
