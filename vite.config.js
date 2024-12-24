import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wos-auto-code/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
});