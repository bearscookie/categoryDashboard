import type { HtmlWebpackInjectExternalsPlugin } from 'html-webpack-inject-externals-plugin'

const isProd = process.env.NODE_ENV === 'production'

export const packages: ConstructorParameters<typeof HtmlWebpackInjectExternalsPlugin>[0]['packages'] = [
  {
    name: 'antd',
    path: '/dist/antd.min.css',
  },
  {
    name: '@rmb/path-to-regexp',
    path: '/dist/index.js',
  },
  {
    name: '@rmb/events',
    path: '/dist/index.js',
  },
  {
    name: '@sentry/browser',
    path: `/build/bundle${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'react',
    path: `/umd/react.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: 'history',
    path: `/umd/history.${isProd ? 'production.min.' : 'development.'}js`,
  },
  {
    name: 'react-dom',
    path: `/umd/react-dom.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: 'react-router-dom',
    path: `/umd/react-router-dom${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'mobx',
    path: `/dist/mobx.umd.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: '@superwf/mobx-react-router',
    path: `/dist/mobx-react-router${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'lodash',
    path: `/lodash${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'mobx-react-lite',
    path: `/dist/mobxreactlite.umd.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: '@ant-design/icons',
    path: `/dist/index.umd${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'antd',
    path: `/dist/antd-with-locales${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'echarts',
    path: `/dist/echarts${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'mobx-value',
    path: '/dist/index.js',
  },
]

// 第三方库的umd全局变量对应
export const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  lodash: '_',
  mobx: 'mobx',
  'mobx-react-lite': 'mobxReactLite',
  history: 'HistoryLibrary',
  events: '$RMB_EVENTS',
  echarts: 'echarts',
  'path-to-regexp': '$RMB_PATH_TO_REGEXP',
  '@sentry/browser': 'Sentry',
  '@ant-design/icons': 'icons',
  'antd/lib/locale/zh_CN': 'window.antd.locales.zh_CN',
  // 'antd/lib/locale/zh_CN': ['antd', 'locales', 'zh_CN'],
  // 'antd/lib/locale/en_US': ['antd', 'locales', 'en_US'],
  antd: 'antd',
  'mobx-value': 'mobxValue',
  '@superwf/mobx-react-router': 'MobxReactRouter',
}
