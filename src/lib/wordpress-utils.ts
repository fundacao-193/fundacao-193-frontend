/**
 * Utilitários para processar dados do WordPress
 */

/**
 * Extrai URL da imagem featured do _embedded/wp:featuredmedia
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractFeaturedImageUrl(post: any): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return '';

  const sourceUrl = typeof media.source_url === 'string' ? media.source_url : '';
  const mimeType = typeof media.mime_type === 'string' ? media.mime_type : '';

  if (sourceUrl && mimeType.startsWith('image/')) {
    return sourceUrl;
  }

  const sizes = media.media_details?.sizes;
  if (sizes && typeof sizes === 'object') {
    const preferred = ['large', 'medium', 'full', 'thumbnail'];
    for (const key of preferred) {
      const size = sizes[key];
      if (size?.source_url && typeof size.source_url === 'string') {
        if (typeof size.mime_type === 'string' && size.mime_type.startsWith('image/')) {
          return size.source_url;
        }
      }
    }
  }

  if (sourceUrl && /\.(png|jpe?g|webp|gif)$/i.test(sourceUrl)) {
    return sourceUrl;
  }

  return '';
}

/**
 * Remove shortcodes Elementor e outros do conteúdo
 * Exemplo: [ux_gallery ids="123,456" ...] → removido
 */
export function removeShortcodes(content: string): string {
  if (!content) return '';
  
  // Remove shortcodes no padrão [name attr="value"] ... [/name]
  return content
    .replace(/\[ux_gallery[^\]]*\]/g, '')
    .replace(/\[\/ux_gallery\]/g, '')
    .replace(/\[\w+[^\]]*\][^[]*\[\/\w+\]/g, '') // Outros shortcodes
    .trim();
}

/**
 * Extrai URL de imagem de diferentes formatos de ACF
 * - Se string: retorna direto (já é URL)
 * - Se número: era ID de anexo (precisa API), mas retorna vazio pra segurança
 * - Se object: tira a propriedade 'url'
 */
export function extractImageUrl(imageValue: unknown): string {
  if (!imageValue) return '';
  
  // Já é URL string
  if (typeof imageValue === 'string' && imageValue.startsWith('http')) {
    return imageValue;
  }
  
  // É um objeto com propriedade URL (ACF image field format)
  if (typeof imageValue === 'object' && imageValue !== null) {
    const obj = imageValue as Record<string, unknown>;
    
    if (typeof obj.url === 'string' && obj.url.startsWith('http')) {
      return obj.url;
    }
    
    // Array de imagens (gallery field)
    if (Array.isArray(obj)) {
      const firstImage = (obj as unknown[])[0];
      if (typeof firstImage === 'object' && firstImage !== null) {
        const img = firstImage as Record<string, unknown>;
        if (typeof img.url === 'string') return img.url;
      }
    }
  }
  
  return '';
}

/**
 * Processa conteúdo HTML removendo shortcodes
 * Mantém tags <img>, remove APENAS shortcodes [ux_gallery] etc
 */
export function cleanContent(html: string): string {
  if (!html) return '';
  
  // Remove APENAS shortcodes Elementor e WordPress
  // Mantém todas as tags HTML incluindo <img>
  const cleaned = html
    .replace(/\[ux_gallery[^\]]*\]/g, '')           // [ux_gallery ...]
    .replace(/\[\/ux_gallery\]/g, '')               // [/ux_gallery]
    .replace(/\[wp_[^\]]*\]/g, '')                  // [wp_*]
    .replace(/\[\/?elementor[^\]]*\]/g, '');        // Elementor tags
  
  return cleaned.trim();
}
