import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': '/src',
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      // input: ['src/index.ts'],
      // output: [
      //   {
      //     format: "es",
      //     entryFileNames: "[name].js",
      //     preserveModules: true,
      //     dir: "es",
      //     preserveModulesRoot: "src",
      //   },
      //   {
      //     format: "cjs",
      //     entryFileNames: "[name].js",
      //     preserveModules: true,
      //     dir: "lib",
      //     preserveModulesRoot: "src",
      //   },
      // ],
    }
  },
  optimizeDeps: {
    include: ['vue', 'lodash-es', '@vueuse/core']
  },
  plugins: [vue()]
})
