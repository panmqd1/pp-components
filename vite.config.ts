import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from "unocss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
  plugins: [
    vue(),
    Unocss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
