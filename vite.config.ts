import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@imgs': path.resolve(__dirname, 'src/imgs'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      "/subject": {
        target: "http://117.72.14.166:3010",
        changeOrigin: true,
      },
    },
  }
})
