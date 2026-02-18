import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/kmuni-tech/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
