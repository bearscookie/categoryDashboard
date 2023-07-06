import { notification } from 'antd'
import { TypedEmitter } from 'src/lib/TypedEmitter'

/**
 * 全局事件类型与事件参数
 * */
interface EventMap {
  'service:error': string
  'service:success': string
}

export const emitter = new TypedEmitter<EventMap>()

export const serviceErrorListener = (error: string) => {
  notification.error({
    message: '操作失败',
    description: error,
  })
}

export const serviceSuccessListener = (msg: string) => {
  notification.success({
    message: '操作成功',
    description: msg,
  })
}

export const listen = () => {
  emitter.on('service:error', serviceErrorListener)
  emitter.on('service:success', serviceSuccessListener)

  return () => {
    emitter.removeListener('service:error', serviceErrorListener)
    emitter.removeListener('service:success', serviceSuccessListener)
  }
}
