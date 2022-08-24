import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  base: '/static/',
  build: {
    outDir: '../backend/static',
    sourcemap: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2600,
  },
  plugins: [react()]
})
