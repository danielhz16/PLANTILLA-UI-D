import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/components', replacement: fileURLToPath(new URL('./src/common/components', import.meta.url)) },
      { find: '@/const', replacement: fileURLToPath(new URL('./src/common/const', import.meta.url)) },
      { find: '@/hooks', replacement: fileURLToPath(new URL('./src/common/hooks', import.meta.url)) },
      { find: '@/routes', replacement: fileURLToPath(new URL('./src/common/routes', import.meta.url)) },
      { find: '@/services', replacement: fileURLToPath(new URL('./src/common/services', import.meta.url)) },
      { find: '@/store', replacement: fileURLToPath(new URL('./src/common/store', import.meta.url)) },
      { find: '@/utils', replacement: fileURLToPath(new URL('./src/common/utils', import.meta.url)) },
      { find: '@common', replacement: fileURLToPath(new URL('./src/common', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
