import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Components({ resolvers: [VantResolver()] })
  ],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  server: {
    // 配置服务器代理，实现跨域
    proxy: {
      //所有以 '/api'为前缀的接口都转向http://localhost:8000
      "/api": {
        target: "http://localhost:80",
        changeOrigin: true,
        //去掉接口中的 '/api'以便和后端接口匹配
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})