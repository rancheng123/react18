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
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',  // 打包后的入口文件名  
        entryFileNames: 'js/[name]-[hash].js',  //打包后的代码块文件名
        // 打包后的静态资源文件名
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          const imgType = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp']
          if (imgType.some(item => assetInfo.name.endsWith(item))) {
            return 'imgs/[name]-[hash].[ext]'
          }

          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  },
  // server: {
  //   proxy: {
  //     '/translate': {
  //       target: 'https://member.chukouplus.com/',
  //       changeOrigin: true,
  //     }
  //   }
  // },
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
