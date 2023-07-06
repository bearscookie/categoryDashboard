/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export function thousandToFormats(num: any, maximumFractionDigits = 2, minimumFractionDigits = 2) {
  if (num === undefined || num === null || num === 'null') {
    return 0
  }
  num = Number(num)
  return num.toLocaleString('zh', {
    maximumFractionDigits,
    minimumFractionDigits,
  })
}

/**
 * 根据业务类型格式化数据
 * 指标名称及单位说明
 * https://shimo.im/sheets/0l3NMG1y5mUrowAR/W1MDb
 */

/**
  GMV
  GMV目标值
  GMV去年同期
  贡献利润
  贡献利润目标值
  贡献利润去年同期
  前台毛利
  后台毛利
  广告费
  自营存货损失
  供应商返利
  仓配费用
  其他毛利
  其他成本费用
  ********************规则: 单位（百万）/ 小数位数 （2位）
 */

export const millionFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && Number((Number(value) / 1000000).toFixed(decimal || 2))
  return res
}

/**
 *********************规则: 单位（百万）/ 小数位数 （2位）千分位
 * @param value
 * @returns
 */
export const millionThousandToFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && thousandToFormats(Number((Number(value) / 1000000).toFixed(decimal || 2)))
  return res
}

/**
 * 计算百分比 保留2位小数
 */
export const percentFormats = (value: number, unit?: any, decimal?: any): string | 0 => {
  let res = ''
  if (!value) {
    res = '0.00'
    return `${res}${unit || ''}`
  }

  res = `${(value ? value * 100 : value).toFixed(decimal || 2)}`

  // -0.00判断
  if (res === '-0.00') {
    res = '0.00'
  }
  return `${res}${unit || ''}`
}

/**
 * 现金流天数 保留2位小数 单位 天
 */
export const dayFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value ? Number(value).toFixed(decimal || 2) : '0.00'
  return res
}

/**
 UV
  ********************规则: 单位（万）/ 小数位数 （2位）
 */
export const tenThousandFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && Number((Number(value) / 10000).toFixed(decimal || 2))
  return res
}

/**
 *********************规则: 单位（万）/ 小数位数 （2位）千分位
 * @param value
 * @returns
 */
export const tenThousandToFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && thousandToFormats(Number((Number(value) / 10000).toFixed(decimal || 2)))
  return res
}

/**
 * 客单价
 ********************规则:  小数位数 （默认2位）
 */
export const fixedFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && Number(value).toFixed(decimal || 2)
  return res
}

/**
 *********************规则: 小数位数 （2位）千分位
 * @param value
 * @returns
 */
export const fixedThousandToFormats = (value: string | number, decimal?: number): string | number => {
  let res
  if (!value) {
    res = '0.00'
  }
  res = value && thousandToFormats(Number(value).toFixed(decimal || 2))
  return res
}

/**
 *********************规则: 取整
 * @param value
 * @returns
 */
export const parseIntFomart = (value: string | number): string | number => {
  let res
  if (!value) {
    res = '0'
  }
  // @ts-ignore
  res = value && parseInt(value)
  return res
}
