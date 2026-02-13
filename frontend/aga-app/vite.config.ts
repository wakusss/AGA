import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 5173,          // можно убрать, если не нужен
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,     // важно!
          secure: false,          // если вдруг https — но у тебя http
          rewrite: (path) => path.replace(/^\/api/, '/api')  // опционально, если нужно сохранить /api
        }
      }
    }
})
