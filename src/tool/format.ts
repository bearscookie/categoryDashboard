/**
 * 格式化金额，百万级别
 * @param value
 * @param decimal 小数位
 * @returns
 */
export const formatMoneyByTenMillon = (value: number, decimal = 2) =>
  value && Number((value / 1000000).toFixed(decimal))

/**
 * 千分位格式化
 * @param value
 * @returns
 */
export const formatByTrd = (value: number, decimal = 2) =>
  value.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

/**
 * 金额千分位
 */
export const formatMoneyByTrd = (num: number) => {
  const str = `${Math.round(num)}`
  return (
    str &&
    str
      .split('')
      .reverse()
      .reduce((prev, next, index) => (index % 3 ? next : `${next},`) + prev)
  )
}

/**
 * 格式化金额
 * @param value
 * @param decimal 小数位，默认两位
 * @param unit 是否需要单位，默认需要
 * @param trd 是否千分位 默认false
 * @param integer 是否是整数，例如销量，格式化时需要保存两位，整数是不保留小数
 * @returns
 */
export const formatMoney = (value: number, decimal = 2, unit = true, trd = false, integer = false) => {
  let res = ''
  let unitName = ''
  if (value === 0) {
    res = '0'
  }
  if (!value) {
    res = ''
  }
  if (Number(Math.abs(value) / 100000000) >= 1) {
    res = `${(value / 100000000).toFixed(decimal)}`
    unitName = `${unit ? '亿' : ''}`
  } else if (Number(Math.abs(value) / 10000) >= 1) {
    res = `${(value / 10000).toFixed(decimal)}`
    unitName = `${unit ? '万' : ''}`
  } else {
    res = !integer ? value.toFixed(decimal) : String(value)
  }

  // -0.00判断
  if (res === '-0.00') {
    res = '0.00'
  }

  return trd ? `${formatByTrd(Number(res), decimal)}${unitName}` : `${res}${unitName}`
}

/**
 * 格式化金额，亿级别
 * @param value
 * @param decimal 小数位
 * @returns
 */
export const formatMoneyByBillion = (value: number, decimal = 2) => value && (value / 100000000).toFixed(decimal)

/**
 * 格式化金额，万级别
 * @param value
 * @param decimal 小数位
 * @returns
 */
export const formatMoneyBymillion = (value: number, decimal = 2) => value && (value / 10000).toFixed(decimal)

/**
 * 金额千分位，并保留2位小数
 * @param num
 * @returns
 */
// export const formatMoneyByTrdDecimal = (num: number) => num && num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

export const formatMoneyByTrdDecimal = (num: number) =>
  num && String(Number(Number(num).toFixed(2))).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

/**
 * 格式化数字，保留两位小数
 * @param value
 * @returns {string}
 */
export const decimalFormat = (value: number, decimal = 2, trd = false): string | 0 => {
  let res = ''
  if (!value) {
    res = ''
    return res
  }

  res = trd ? formatByTrd(value, decimal) : value.toFixed(decimal)

  // -0.00判断
  if (res === '-0.00') {
    res = '0.00'
  }

  return res
}

/**
 * 百分比 %
 * @param value
 * @returns {string}
 */
export const percentFormat = (value: number, decimal = 2, unit = true, hundred = true): string | 0 => {
  let res = ''
  if (!value) {
    res = ''
    return res
  }

  res = `${(hundred ? value * 100 : value).toFixed(decimal)}`

  // -0.00判断
  if (res === '-0.00') {
    res = '0.00'
  }

  return `${res}${unit ? '%' : ''}`
}

/**
 *
 * @param value
 * @param decimal
 * @param unit
 * @returns
 */
export const formatMoneyByTrdAndAbs = (value: number, decimal = 2, unit = true) => {
  if (value === 0) {
    return '0'
  }
  if (!value) {
    return ''
  }
  if (Number((Math.abs(value) / 100000000).toFixed(0)) > 0) {
    return `${(value / 100000000).toFixed(decimal)}${unit ? '亿' : ''}`
  }
  if (Number((Math.abs(value) / 10000).toFixed(0)) > 0) {
    return `${(value / 10000).toFixed(decimal)}${unit ? '万' : ''}`
  }
  if (Number(Math.abs(value) / 1000) >= 1) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  return (value / 1).toFixed(decimal)
}

export function thousandToFormat(num: any, maximumFractionDigits = 2, minimumFractionDigits = 2) {
  if (num === undefined || num === null || num === 'null') {
    return 0
  }
  num = Number(num)
  return num.toLocaleString('zh', {
    maximumFractionDigits,
    minimumFractionDigits,
  })
}
