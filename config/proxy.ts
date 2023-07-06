import type { ServerOptions } from 'vite'

export const devHost = 'http://47.100.125.177:8082/'

// 增加项目mock请求
export const PROXY_TARGET = process.env.MOCK ? 'http://dev-insight.example.com:3010' : devHost

console.log(" process.env.MOCK::::",  process.env.MOCK)

export const proxy: ServerOptions['proxy'] = {
  '/prd': {
    target: PROXY_TARGET,
    secure: false,
    changeOrigin: true,
    headers: {
      Origin: PROXY_TARGET,
    },
  },
}
