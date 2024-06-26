import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './ssr/',
  publicDir: 'public',
  assetsInlineLimit: 8 * 1024,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  }
})
