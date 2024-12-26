import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }},
    server: {
      port: 8082,
      proxy: {
        '/user' :{
          target: 'http://127.0.0.1:1314/',
          ws: true,
          changeOrigin: true,
          secure: false
        },
        '/space' :{
          target: 'http://127.0.0.1:1314/',
          ws: true,
          changeOrigin: true,
          secure: false
        },
        '/edit' :{
          target: 'http://127.0.0.1:1314/',
          ws: true,
          changeOrigin: true,
          secure: false
        },
        '/special' :{
          target: 'http://127.0.0.1:1314/',
          ws: true,
          changeOrigin: true,
          secure: false
        },
        '/files' :{
          target: 'http://127.0.0.1:1314/',
          ws: true,
          changeOrigin: true,
          secure: false
        },
      }
    },
})
