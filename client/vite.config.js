import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Listen on all addresses (0.0.0.0)
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.API_TARGET || 'http://127.0.0.1:8081',
        changeOrigin: true,
      },
      '/ws': {
        target: process.env.API_TARGET || 'http://127.0.0.1:8081',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
