import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: (content: string, loaderContext: any) => {
          if (path.normalize(loaderContext).includes(path.normalize('src/assets/style/variable.scss'))) {
            return content;
          }
          return `@use "@/assets/style/variable" as *; ${content}`;
        }
      } as any
    }
  }
})