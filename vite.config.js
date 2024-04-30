import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginLib from './plugins/plugin-lib'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  base: '',
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'package'),
      '#': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'package/install.js'),
      formats: ['es'],
      fileName: 'index'
    },
    /** 排除无需打包进去的依赖库 */
    rollupOptions: {
      external: [
        'vue',
        'vant',
        'lodash',
        'moment',
        'pinia',
        'vue-router'
      ]
      // output: {
      //   entryFileNames: 'index.js'
      // }
    },
    minify: false
  },
  plugins: [
    pluginLib(),
    vue(),
    // 可视化Bundle
    visualizer({
      emitFile: true,
      filename: 'stats.html'
    })
  ]
})
