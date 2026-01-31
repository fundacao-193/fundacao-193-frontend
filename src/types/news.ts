/**
 * Tipo que representa uma Noticia vinda da API do WordPress
 */
export interface news {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  // Optional direct link to the post (when provided by API)
  link?: string;
  // Full content when returned by the API
  content?: {
    rendered: string;
  };
  acf?: {
    featured_image?: number;
    category?: string;
  };
}
