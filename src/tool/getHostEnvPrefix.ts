/** 本地l、开发d、测试t、预发p */
const prefixReg = /^(l-|d-|t-|p-)\./

/** 根据当前的域名环境，返回前缀 */
export const getHostEnvPrefix = (loc?: Location) => {
  /** 在非dom环境下运行可能没有location */
  if (!loc) {
    return ''
  }
  const { hostname } = loc
  if (prefixReg.test(hostname)) {
    return hostname.match(prefixReg)![1]
  }
  return ''
}

// global没读取到，替换成window
const prefix = getHostEnvPrefix(window.location)

export const isProduction = prefix === 'p-' || (window.location && window.location.hostname === '')
