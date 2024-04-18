import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  publicDir: 'public',
  assetsInlineLimit: 8 * 1024,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    assetsDir: 'static',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // "primary-color": "#EAA516", //全局样式
        },
      }
    }
  }
})
