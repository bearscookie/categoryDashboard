import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/lib/locale/zh_CN'
import * as React from 'react'
import { DevicePixelRatio } from 'src/devicePixelRadio'
import { inIframe } from 'tool/InIframe'
import { router } from 'src/router'

import { Layout } from './Layout'
import { listen } from './emitter'
import Login from 'page/Login'

dayjs.locale('zh-cn')

export const App = () => {
  // 处理window兼容问题
  React.useEffect(() => {
    DevicePixelRatio.init()
  }, [])

  React.useEffect(() => {
    // 初始化零智消息组件
    if (inIframe) {
      LsMessage.init({
        domain: '*', // 父应用域名
        router,
        listenUrl: true,
      })
    }
  }, [])

  React.useEffect(() => {
    if (window.location.pathname === '/') {
      let userName = localStorage.getItem('userName')
      if (userName && userName != '') {
        router.replace('/dashborard/supermarket')
      } else {
        router.replace('/login')
      }
    }
  }, [])

  const getContent = () => {
    let userName = localStorage.getItem('userName')
    if (window.location.pathname === '/login' || !userName || userName == '') {
      return <Login />
    }
    return <Layout />
  }

  React.useEffect(listen, [])
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#47ba71',
        },
      }}
    >
      {getContent()}
    </ConfigProvider>
  )
}
