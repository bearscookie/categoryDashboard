/* eslint-disable no-underscore-dangle */
import * as pathToRegexp from 'path-to-regexp'
import type { AxiosRequestConfig } from 'axios'
import { forEach } from 'lodash'
import axios from 'axios'
import { notification } from 'antd'
import { router } from 'src/router'
import { config, BASE_ROUTE } from 'src/config'
import type { RequestParameter } from 'ts-gear'

import { inIframe } from './InIframe'

/**
 * @description 基于axios http请求封装
 */

// 定义类型
interface RequestConfig extends AxiosRequestConfig {
  errorTitle?: string
}

export const axiosInstance = axios.create({
  baseURL: process.env.__HOST__,
  withCredentials: true,
})

axiosInstance.defaults.timeout = 40000
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// http request 拦截器
axiosInstance.interceptors.request.use(
  req => {
    Object.assign(req.headers.common, {
      // ...
    })
    return req
  },
  error => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data.code === 401) {
      const { encodeURIComponent } = window
      window.location.assign(`${config.loginHost}?ReturnUrl=${encodeURIComponent(window.location.href)}`)
      return Promise.reject(res)
    }
    if (res.status === 200 && res.data.code === 403) {
      router.push(`/ErrorPage?code=${res.data.code}`)
    } else if (res.status === 200 && res.data.code === 502) {
      if (inIframe) {
        LsMessage.postMessage({
          key: 'permissionDenied',
        })
      }
      router.push(`${BASE_ROUTE}/NoAuthority?referer=${window.location.pathname.split('/')[2]}`)
    } else if (res.status === 200 && res.data.code === 500) {
      notification.error({
        message: `${res.data.message}`,
      })
      return Promise.reject(res)
    } else if (res.status !== 200) {
      notification.error({
        message: `${res.data.message}`,
      })
      // router.push(`/500`)
      return Promise.reject(res)
    }
    return res
  },
  error => {
    console.log('error', error)
    // router.push('/500')
    return Promise.reject(error)
  },
)

// eslint-disable-next-line func-names
export default async function (configs: RequestConfig) {
  if (configs.errorTitle) {
    if (!configs.transformResponse) {
      configs.transformResponse = []
    }
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(configs.transformResponse) &&
      configs.transformResponse.push((data: string) => ({
        ...JSON.parse(data),
        errorTitle: configs.errorTitle,
      }))
  }

  return axiosInstance(configs).catch(
    res =>
      // console.log(res)
      res,
  )
}

export const parseUrl = (url: string, option?: RequestParameter): string => {
  if (option && option.path) {
    Object.getOwnPropertyNames(option.path).forEach(k => {
      option.path[k] = encodeURIComponent(String(option.path[k]))
    })
    url = pathToRegexp.compile(url)(option.path)
  }
  if (option && option.query) {
    url = `${url}?${new URLSearchParams(option.query).toString()}`
  }
  return url
}

/** assign request body to axios option */
export function interceptRequest(url: string, option?: RequestParameter): [string, AxiosRequestConfig] {
  url = parseUrl(url, option)
  option = option || {}
  const requestOption: AxiosRequestConfig & { errorTitle?: string } = {
    method: option.method || 'get',
    errorTitle: option.errorTitle,
  }
  if (option.header) {
    requestOption.headers = option.header
  }
  if (option.body && option.method === 'get') {
    requestOption.params = option.body
  }
  if (option.body && option.method !== 'get') {
    requestOption.data = option.body
  }
  // 如果有formData时，直接给requestOption.body赋值即可
  if (option.formData) {
    const formData = new FormData()
    // 这种上传文件的情况，应该只有一维的键值对应，只用forEach处理第一层数据
    forEach(option.formData, (v: any, k: string) => {
      formData.append(k, v)
    })
    requestOption.data = formData
  }
  // TODO:兼容类目匹配保存时params
  if (option.body?.cateOnlineParams) {
    requestOption.data = option.body.cateOnlineParams
  }
  if (option.body?.expandParams) {
    requestOption.data = option.body.expandParams
  }
  return [url, requestOption]
}

/**
 *
 * @param apiUrl
 * @param configs
 * @param stream 是否是字节流导出
 * @returns
 */
export const tsgRequest = async (apiUrl: string, configs?: RequestParameter) => {
  if (configs && configs.errorTitle) {
    if (!configs.transformResponse) {
      configs.transformResponse = []
    }
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(configs.transformResponse) &&
      configs.transformResponse.push((data: string) => ({
        ...JSON.parse(data),
        errorTitle: configs.errorTitle,
      }))
  }

  const [url, option] = interceptRequest(apiUrl, configs)
  // 类目线上化导出兼容-如果是导出文件，需要res.header
  const stream = apiUrl.includes('/export')
  if (stream) option.responseType = 'blob'
  return axiosInstance(url, option).then(res => (stream ? res : res.data))
}
