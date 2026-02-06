/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/Checkout": {
        target: "https://integrateapistg.rak.ae",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/pg/, "")
      }
    }
  },
  plugins: [
    react(),
    legacy()
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
