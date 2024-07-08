import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
<<<<<<< HEAD
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
=======
// import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock'
>>>>>>> jp_dev

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
<<<<<<< HEAD
      mockPath: 'mock',
      localEnabled: true,
=======
      mockPath: 'src/mock',
      enable: true,
      watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      logger:true
>>>>>>> jp_dev
    }),
  ],
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
