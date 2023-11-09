import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
// const HOST = import.meta.env.VITE_API_URL

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
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
          target: env.VITE_API_HOST,
          changeOrigin: true,
        },
      },
    }
  })
}
