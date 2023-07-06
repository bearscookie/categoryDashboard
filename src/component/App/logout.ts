import { once } from 'lodash'
import { config } from 'src/config'
import * as API from 'src/services/Common'
/** 退出系统，只要调用就会跳转，不需要重复调用 */
export const logout = once(async () => {
  const { encodeURIComponent, location } = window
  window.location.assign(`${config.loginHost}?returnUrl=${encodeURIComponent(window.location.href)}`)    
})
