const isProduction = process.env.LOGIN_ENV === 'production'
const isPre = process.env.LOGIN_ENV === 'pre'

export const config = {
  // 使用erp登录的地址
  loginHost: `${isProduction || isPre ? 'https' : 'http'}://${
    isProduction || isPre ? '' : 'test.'
  }ssa.example.com/sso/login`,

  /**
   * 所有fetch请求都需要添加的参数
   * 在从后端接口下载文件时，也需要添加到url的query中
   * */
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
}

export const BASE_ROUTE = '/'

console.log(
  'LOGIN_ENV',
  process.env.LOGIN_ENV,
  'loginHost:',
  config.loginHost,
  'isPre:',
  isPre,
  'isProduction:',
  isProduction,
)
