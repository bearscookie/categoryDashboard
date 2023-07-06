/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Layout as AntLayout, message } from 'antd'
import { TransitionRoute } from 'component/TransitionRoute'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { DevicePixelRatio } from 'src/devicePixelRadio'
import Watermark from 'component/Watermark'
import { inIframe } from 'tool/InIframe'
import { router } from 'src/router'
import { toJS } from 'mobx'

import shouqi from '../../assets/images/categroy-icon/shouqi.png'
import zhankai from '../../assets/images/categroy-icon/zhankai.png'

import { Menu } from './Menu'
import { Header } from './Header'
import * as store from './store'

message.config({
  duration: 2,
  maxCount: 2,
})

message.config({
  duration: 2,
  maxCount: 2,
})

/**
 * 布局组件
 * */
export const Layout: React.FC = observer(() => {
  const [devicePixelRatio, setDevicePixelRatio] = React.useState(1)
  const { userInfo } = store
  const [collapsed, setCollapsed] = React.useState(false)
  const toggleCollapsed = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  }
  const isIndex = router.location.pathname === '/index' // 是否是产品介绍页面

  // 兼容浏览器
  React.useEffect(() => {
    if (DevicePixelRatio.getSystem()) {
      setDevicePixelRatio(window.devicePixelRatio)
    }
  }, [])
  React.useEffect(() => {
    // 门户页面不请求
    if (isIndex) {
      return
    }
    // 如果有用户信息就放弃请求
    if (userInfo.value.user) {
      return
    }
    ;(async () => {
      await userInfo.request()
    })()
  }, [userInfo])

  return (
    <AntLayout className="h-full">
      {inIframe || isIndex ? null : <Header />}

      <AntLayout>
        {inIframe || isIndex ? null : (
          <AntLayout.Sider trigger={null} collapsed={collapsed} style={{ position: 'relative' }}>
            <Menu />
            <p
              style={{
                position: 'absolute',
                right: 13,
                top: '50%',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 1000,
                width: '20px',
              }}
              className="closeOrOpen"
              onClick={() => {
                toggleCollapsed()
              }}
            >
              <img src={collapsed ? zhankai : shouqi} alt="" style={{ width: 75, height: 67 }} />
            </p>
          </AntLayout.Sider>
        )}
        {/* style={{ height: `calc(100vh*${devicePixelRatio} - 48px)` }} */}
        <AntLayout.Content id="antdLayoutContent" style={{}}>
          {/* <Watermark text={store.userInfo.value.user?.userId} /> */}
          <TransitionRoute menus={userInfo.value.menus} />
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  )
})
