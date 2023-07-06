// 参考：https://zhuanlan.zhihu.com/p/39620591

// 集成T，但忽略T的K属性
// export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// 递归将T的所有属性都转为raadonly

import type { Form } from 'antd'
import type { ColumnProps } from 'antd/lib/table'
import type { ComponentProps, FC } from 'react'

export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }

export type ConvertNumberToString<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K]
}

export type TypedColumnProps<T> = ColumnProps<T> & {
  dataIndex?: keyof T
}

/** 获取数组元素类型 */
export type ArrayItem<T extends any[]> = T extends (infer I)[] ? I : any

/** 获取函数返回值的Promise中的值类型 */
export type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R>
  ? R
  : any

/** 获取接口某个属性对应的类型 */
export type PropertyType<T extends any, K extends keyof T> = T[K]

export type ComponentProp<T extends FC, K extends keyof ComponentProps<T>> = ComponentProps<T>[K]

/** 提取接口请求参数中的query/body值作为Form.Item的name */
export type TypedFormItem<
  RequestOption extends { query?: any; body?: any },
  RequestPosition extends 'query' | 'body',
> = React.FC<
  React.ComponentProps<typeof Form.Item> & {
    name: keyof Required<RequestOption>[RequestPosition]
  }
>
