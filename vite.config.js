import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the React dashboard project.
export default defineConfig({
  plugins: [react()],
  base: './',
});
