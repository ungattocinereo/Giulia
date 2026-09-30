import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'
import { constants } from 'zlib'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const { POPOVATALK_WEBHOOK_TARGET } = loadEnv(mode, process.cwd(), '')
  // Only the contact endpoint is proxied; deploy webhooks stay inaccessible here.
  const proxy = POPOVATALK_WEBHOOK_TARGET ? {
    '^/hooks/send-telegram$': {
      target: POPOVATALK_WEBHOOK_TARGET,
      changeOrigin: true,
    },
  } : undefined

  return {
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: { proxy },
    preview: { proxy },
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
            ui: ['framer-motion', 'clsx', 'tailwind-merge'],
          },
        },
      },
    },
  }
})
