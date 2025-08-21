import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/Minesweeper_AI_v2/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

