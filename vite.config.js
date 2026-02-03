import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'
import { constants } from 'zlib'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      include: [/\.(js|css|html|svg|json)$/],
      exclude: [/\.(br|gz)$/, /\.map$/],
      threshold: 1024,
      compressionOptions: {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      deleteOriginalAssets: false, 
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react', 'phosphor-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
})
