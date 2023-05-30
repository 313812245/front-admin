import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const importPlugin = (isBuild: boolean) => {
  return <Plugin>{
    name: 'importPlugin',
    transform (code, id) {
      // 判断当前处理的是否是 src/main.ts
      const name = fileURLToPath(new URL('./src/main.ts', import.meta.url))
      const list = code.split('\n')
      if (name.replace(/\\/g, '/') === id.replace(/\\/g, '/')) {
        // 处理svg
        list.splice(1, 0, 'import \'virtual:svg-icons-register\';')

        // 开发环境全局引入element
        if (!isBuild) {
          list.splice(1, 0, 'import \'element-plus/dist/index.css\';')
          list.splice(1, 0, 'import ElementPlus from \'element-plus\';')
          const index = list.findIndex(val => val.includes('const app = createApp(App)'))
          if (index >= 0) {
            list.splice(index + 1, 0, 'app.use(ElementPlus);')
          }
        }
      }
      return list.join('\n')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  // console.log(env, '==========mode')
  const isBuild = command === 'build'
  const resolvers = []
  if (isBuild) {
    resolvers.push(ElementPlusResolver())
  }
  return {
    plugins: [
      vue(),
      importPlugin(isBuild),
      createSvgIconsPlugin({
        iconDirs: [
          fileURLToPath(new URL('./src/assets/icons', import.meta.url))
        ],
        symbolId: '[name]'
      }),
      Components({
        resolvers,
        dirs: ['./src/components'],
        dts: './src/components.d.ts'
      }),
      AutoImport({
        resolvers,
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['./src/api', './src/store', './src/utils'],
        dts: './src/auto-import.d.ts',
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      })
    ],
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: isBuild
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          manualChunks: (id) => {
            // 提取路由路径中的页面名称作为输出文件名
            const match = id.match(/src\/(views|components)\/(.*)\/index\.vue$/)
            if (match) {
              const pageName = match[2].replace(/\//g, '-')
              return `${pageName}`
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true,
      port: 8088,
      proxy: {}
    }
  }
})
