import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFile } from 'node:fs/promises'

const spaFallback = () => ({
  name: 'spa-fallback',
  async closeBundle() {
    await copyFile('dist/index.html', 'dist/404.html')
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
  server: { proxy: { '/api': 'http://localhost:8787' } },
})
