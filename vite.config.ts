import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para a API do WordPress durante desenvolvimento
      '/wp-json': {
        target: 'http://localhost:10003',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.warn('[Vite Proxy] Erro ao conectar ao WordPress local:', err.message);
            console.warn('[Vite Proxy] Dica: Se o WordPress não estiver rodando localmente,');
            console.warn('[Vite Proxy] configure VITE_USE_PRODUCTION_API=true no .env');
          });
        },
      },
    },
  },
});
