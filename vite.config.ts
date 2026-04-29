import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 前端运行端口
    proxy: {
      // 只要请求路径以 /api 开头，就会触发代理
      '/api': {
        target: 'http://localhost:3001', // 你的 Mock 服务或真实后端地址
        changeOrigin: true,              // 允许跨域
        // 如果后端接口没有 /api 前缀，可以进行路径重写
        // rewrite: (path) => path.replace(/^\/api/, '') 
      },
    }
  }
})
