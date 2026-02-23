import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Otimizações de bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: React e bibliotecas principais
          'react-vendor': ['react', 'react-dom'],
          // UI chunk: Lucide icons
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    // Compressão e otimizações
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs em produção
        drop_debugger: true,
      },
    },
    // Aumenta limite de warning para chunks grandes (imagens)
    chunkSizeWarningLimit: 1000,
    // Otimizações de CSS
    cssCodeSplit: true,
  },
  // Otimizações de servidor dev
  server: {
    host: true,
  },
});
