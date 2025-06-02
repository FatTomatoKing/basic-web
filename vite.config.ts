import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import {resolve} from "node:path";


// 导出Vite配置，使用函数形式可以访问环境变量和命令行参数
export default defineConfig(({ mode }) => {
  // 获取当前工作目录
  const root = process.cwd()
  console.log('工作目录:', root)
  console.log('运行模式:', mode)
  // 根据当前模式加载对应的环境变量
  const env = loadEnv(mode, root)
  console.log('环境变量:', env)
  // 从环境变量中解构提取配置项
  const {
    VITE_PORT,                // 端口号
    VITE_PUBLIC_PATH,         // 公共路径前缀
    VITE_PROXY,               // 代理配置
  } = env

  // 创建代理配置的函数
  // 解析代理配置
  const createProxyConfig = () => {
    const proxyConfig = {}
    try {
      const proxy = JSON.parse(VITE_PROXY || '[]')
      proxy.forEach(([prefix, target]: [string, string]) => {
        // 使用类型断言确保 proxyConfig 可以使用字符串索引
        (proxyConfig as Record<string, {
          target: string;
          // 是否允许跨域请求
          changeOrigin: boolean;
        }>)[prefix] = {
          target,
          changeOrigin: true
        }
      })
    } catch (error) {
      console.error('代理配置解析失败:', error)
    }
    return proxyConfig
  }

  // 返回最终的Vite配置对象
  return {
    // 公共基础路径，默认为'/'
    base: VITE_PUBLIC_PATH || '/',
    // 项目根目录
    root,
    // 开发服务器配置
    server: {
      // 允许局域网访问
      host: true,
      // 设置端口号，默认为5174
      port: Number(VITE_PORT) || 5174,
      // 使用创建的代理配置
      proxy: createProxyConfig()
    },
    // 路径解析配置
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    // 插件配置
    plugins: [
      // Vue插件
      vue(),
      // Vue开发工具插件
      vueDevTools(),
      // SVG图标插件配置
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icons-[name]',
      }),
    ],
    // 构建配置
    build: {
      // 设置构建目标为最新的ECMAScript标准
      target: 'esnext',
      // 输出目录
      outDir: 'dist',
      // 禁用压缩大小报告以提高构建性能
      reportCompressedSize: false,
      // 设置块大小警告的限制（单位kb）
      chunkSizeWarningLimit: 2000
    }
  }
})
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
