/** @description 导出文件 */
/* eslint-disable func-names */

import { message } from 'antd'

/**
 * 导出文件-获得文件名
 */
export function fileNameFromHeader(disposition: string | null) {
  let result: RegExpMatchArray | any[] | null = null
  if (disposition && /filename=.*/gi.test(disposition)) {
    result = disposition.match(/filename=.*/gi)
    const url = decodeURI(result?.[0].split('=')[1])
    return url
  }
  return null
}

/**
 * get请求拼接url
 * @param url
 * @param params
 * @returns 返回拼接好URL
 */
function spliceGetParams(url: string, params: Record<string, any>) {
  let newUrl = ''

  Object.keys(params).forEach(item => {
    if (newUrl) {
      newUrl += `&${item}=${params[item]}`
    } else {
      newUrl += `${item}=${params[item]}`
    }
  })

  if (url) {
    newUrl = `${url}?${newUrl}`
  }

  return newUrl
}

/**
 * 导出文件-字节流方式
 * @param res 返回二进制字节流
 */
export function exportFileByStream(res: { code: any; msg?: string; message?: string; data: any; headers?: any }) {
  const blob = new Blob([res.data], {
    type: 'application/vnd.ms-excel',
  })
  if (res?.data?.size < 500) {
    const fr: FileReader = new FileReader() // FileReader可以读取Blob内容
    fr.readAsText(blob) // 二进制转换成text
    fr.onload = function () {
      const { result } = fr
      message.error(JSON.parse(result as string)?.msg || JSON.parse(result as string)?.message)
    }
    return
  }

  const oldFileName = fileNameFromHeader(res.headers['content-disposition'])
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = oldFileName as string
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(event)
}

/**
 * 通过数据流方式导出文件
 * @param url 下载url
 * @param progress 进度
 * @param data post数据
 */
export const progressDownLoadPost = (url: string, data: any, progress?: any) => {
  const closeLoading = message.loading('正在导出....请稍后')
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  data = JSON.stringify(data)
  // xhr.onprogress = function (event) {
  //   if (progress) {
  //     if (Math.round((event.loaded / event.total) * 100) === 100) progress.call(event)
  //   }
  // }
  xhr.responseType = 'blob'
  xhr.addEventListener('readystatechange', () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const blob = new Blob([xhr.response], {
        type: 'application/vnd.ms-excel',
      })
      const oldFileName = fileNameFromHeader(xhr.getResponseHeader('Content-Disposition'))

      if (xhr.response.size < 2000) {
        const fr: FileReader = new FileReader() // FileReader可以读取Blob内容
        fr.readAsText(blob) // 二进制转换成text
        fr.onload = function () {
          const { result } = fr
          message.success(JSON.parse(result as string)?.msg || JSON.parse(result as string)?.message)
          if (progress) {
            progress.call()
          }
          return false
        }
      } else {
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = oldFileName as string
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(event)
        if (progress) {
          progress.call()
        }
      }
      closeLoading()
    }
  })
  xhr.send(data)
}

/**
 * 通过数据流方式导出文件
 * @param url 下载url
 * @param progress 进度
 * @param data post数据
 */
export const progressDownLoadGet = (url: string, data: any) => {
  const closeLoading = message.loading('正在导出....请稍后')
  const xhr = new XMLHttpRequest()
  xhr.open('GET', spliceGetParams(url, data))
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'blob'
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const blob = new Blob([xhr.response], {
        type: 'application/vnd.ms-excel',
      })
      const oldFileName = fileNameFromHeader(xhr.getResponseHeader('Content-Disposition'))

      if (xhr.response.size < 2000) {
        const fr: FileReader = new FileReader() // FileReader可以读取Blob内容
        fr.readAsText(blob) // 二进制转换成text
        fr.onload = function () {
          const { result } = fr
          message.error(JSON.parse(result as string)?.msg || JSON.parse(result as string)?.message)
          return false
        }
      } else {
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.download = oldFileName as string
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(event)
      }
      closeLoading()
    }
  }
  xhr.send()
}
