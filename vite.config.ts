import { defineConfig } from 'vitest/config'; // 注意这里换成 vitest 的类型定义
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), visualizer({
    open: true,
    // 打包完自动打开浏览器看图
    filename: "stats.html",
    // 生成的分析文件
    gzipSize: true,
    brotliSize: true
  })],
  server: {
    port: 8000,
    // 前端运行端口,B端
    proxy: {
      // 只要请求路径以 /api 开头，就会触发代理
      "/api": {
        target: process.env.VITE_BASE_URL || "http://localhost:3001",
        // 你的 Mock 服务或真实后端地址
        changeOrigin: true // 允许跨域
        // 如果后端接口没有 /api 前缀，可以进行路径重写
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // 这就是 Vite 版的 splitChunks / cacheGroups
        manualChunks(id) {
          // 把底层最重的 rc-component 抽离成独立包
          if (id.includes("node_modules/@rc-component")) {
            return "rc-foundation";
          }
          // 把 icons 独立，因为它基本不怎么变
          if (id.includes("node_modules/@ant-design/icons")) {
            return "antd-icons";
          }
          // 剩下的 antd 业务组件
          if (id.includes("node_modules/antd")) {
            return "antd-core";
          }
          // 图表库单独成包 (因为只有统计页才用，首屏不需要加载)
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3")) {
            return "charts-vendor";
          }
          // 2. 抽离 react-dom (对应截图里的 reactDom)
          if (id.includes("node_modules/react-dom")) {
            return "reactDom-chunk";
          }
          // 3. 抽离其余 node_modules (对应截图里的 vendors)
          if (id.includes("node_modules")) {
            return "vendors-chunk";
          }
        },
        // 顺便保持文件名清晰
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].css"
      }
    }
  },
  test: {
    projects: [
      {
        // 第一个项目：普通的 Vitest 逻辑测试
        extends: true,
        test: {
          globals: true,
          // 允许全局使用 describe, it, expect
          environment: 'jsdom', // 模拟浏览器环境
          // setupFiles: './src/setupTests.ts', // 初始化测试环境
        },
      },
      /* 如果以后需要开启 Storybook 自动化交互测试，请取消下面的注释
         并运行 npx playwright install 来安装浏览器内核*/
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});