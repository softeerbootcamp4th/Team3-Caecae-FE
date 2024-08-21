import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ // Gzip 압축 활성화
    algorithm: 'gzip',
  }),],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './public/assets'),
    },
  },
  build: {
    minify: 'terser',
  }, 
})
