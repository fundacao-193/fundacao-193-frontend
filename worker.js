/**
 * Cloudflare Worker para servir SPA estática
 * O Wrangler gerencia automaticamente os arquivos estáticos através da configuração [site]
 */

export default {
  async fetch(request) {
    try {
      return await (async () => {
        return new Response('Not Found', { status: 404 });
      })();
    } catch (e) {
      return new Response(`${e.message}\n${e.stack}`, {
        status: 500,
      });
    }
  },
};


