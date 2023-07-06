import { notification } from 'antd'
import { request, setter } from 'mobx-value'
import * as commonApi from 'src/services/Common'
import * as api from 'src/services/Dashboard/Supermarket'

export const count = setter<number>({
  value: 0,
})

export const requestData = request({
  value: [] as any,
  request: async (mode) => {
    const { data: result } = await api.getCurrentMonthYOY(mode)

    if (result?.code === 200) {
      const { data } = result
      return data
    }
    notification.error({ message: `${result?.errorTitle}：${result?.message}` })
    return []
  },
  autoRestoreOnBecomeUnobserved: true,
})
