import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use the repo name in the base path for GitHub Pages deployment
// Adjust this if the site is served from the repository root instead
export default defineConfig({
  // Use the repo name in the base path for GitHub Pages deployment
  // Serve from root for Netlify
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: false,
    target: 'es2018',
  },
});
