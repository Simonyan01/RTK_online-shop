import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@data': '/src/data',
      '@features': '/src/features',
      '@helpers': '/src/helpers',
      '@router': '/src/router',
    }
  }
})