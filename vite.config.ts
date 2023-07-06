/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
import { spawn } from 'child_process'
// import { readFileSync } from 'fs'

// import reactRefresh from '@vitejs/plugin-react-refresh'
// import type { HtmlTagDescriptor } from 'vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react'

// import viteCompression from 'vite-plugin-compression'
// import TransformExternals from 'vite-plugin-transform-externals'
// import TransformExternals from './vite-plugin'
// import { packages, unpkgHost } from './config/externals'
// import { resolveRoot } from './script/resolveRoot'
import uniqueCommitId from 'unique-commit-id'

import packageJSON from './package.json'
import tsconfig from './tsconfig.json'
import { config } from './config/devServer'
import { proxy } from './config/proxy'
import theme from './config/theme'

/** 同步tsconfig.json中的路径别名为vite可用的格式 */
const tsconfigAlias = tsconfig.compilerOptions.paths as Record<string, string[]>

const alias = Object.getOwnPropertyNames(tsconfigAlias).map(key => {
  const target = tsconfigAlias[key]
  return {
    find: new RegExp(`^${key.replace('/*', '')}`),
    replacement: target[0].replace(/(^\.)|(\*$)/g, ''),
  }
})

const loginEnv = process.env.LOGIN_ENV || 'pre'
const isProd = process.env.LOGIN_ENV === 'production'
const isPre = process.env.LOGIN_ENV === 'pre'
const isDev = process.env.NODE_ENV === 'development'
const isMock =`http://127.0.0.1:4523/m1/2721830-0-default/`

// https://vitejs.dev/config/
export default defineConfig({
  base: `/`, // 修改打包路径
  define: {
    'process.env': {
      LOGIN_ENV: `${process.env.LOGIN_ENV}`,
      //LOGIN_ENV: isMock,
      __HOST__: '/',
      __TableCustomVersion__: '20230426',
    },
  },
  plugins: [
    WindiCSS(),
    react({
      include: '**/*.tsx',
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: theme,
      },
    },
  },
  build: {
    // rollup打包设置
    chunkSizeWarningLimit: 1500, // chunk size
    // rollupOptions: {
    //   external: Object.keys(externals),
    //   // external: ['react', '@superwf/mobx-react-router'],
    //   // output: {
    //   //   // eslint-disable-next-line consistent-return
    //   //   manualChunks(id) {
    //   //     if (id.includes('node_modules')) {
    //   //       return id.toString().split('node_modules/')?.[1].split('/')?.[0].toString()
    //   //     }
    //   //   },
    //   // },
    //   output: {
    //     globals: externals,
    //   },
    // },
    rollupOptions: {
      output: {
        entryFileNames: `[name][hash:8].js`,
        chunkFileNames: `[name][hash:8].js`,
        assetFileNames: `[name][hash:8].[ext]`,
      },
    },
  },
  resolve: {
    alias,
  },
  server: {
    port: config.port,
    proxy,
  },
})
