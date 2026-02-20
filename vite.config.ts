import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { codeInspectorPlugin } from 'code-inspector-plugin'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
    codeInspectorPlugin({
      bundler: 'vite'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
})
