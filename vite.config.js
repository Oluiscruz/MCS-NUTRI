import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }), 
    svgr(),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://servidor-mcs-nutri.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
