import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'MyComponents',
      fileName: (format) => `my-components.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve:{
    alias:{
      '@' : resolve(__dirname, './src')
    },
  },
  plugins: [vue()],
})
