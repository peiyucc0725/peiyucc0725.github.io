import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 1. 強制指定使用新版 API
        api: 'modern-compiler',
        // 2. 使用函式寫法，避免 variable.scss 注入自己導致找不到檔案
        additionalData: (content, loaderContext) => {
          // 修正：如果檔案路徑包含我們的變數檔，就不要注入
          // 使用 path.normalize 處理不同作業系統的斜線問題
          if (path.normalize(loaderContext).includes(path.normalize('src/assets/style/variable.scss'))) {
            return content;
          }
          // 使用 @use 注入，結尾必須有分號
          return `@use "@/assets/style/variable" as *; ${content}`;
        }
      } as any
    }
  }
})