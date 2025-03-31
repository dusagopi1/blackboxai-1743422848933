import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 8000,
    strictPort: true,
    host: true,
    open: false,
    fs: {
      strict: true,
      allow: [__dirname]
    }
  },
  base: '/',
  root: join(__dirname, 'src'),
  publicDir: join(__dirname, 'public'),
  resolve: {
    alias: {
      '@': __dirname
    }
  }
})
