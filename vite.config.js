import { defineConfig } from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname,'src')
    }
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
