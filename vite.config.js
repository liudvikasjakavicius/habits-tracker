// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/habits-tracker/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // This ensures assets are correctly placed
      }
    }
  }
})
