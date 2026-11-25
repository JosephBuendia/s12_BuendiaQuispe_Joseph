// serenazgo-react/vite.config.js  (REEMPLAZA al actual)
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
})
