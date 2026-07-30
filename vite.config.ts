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
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
