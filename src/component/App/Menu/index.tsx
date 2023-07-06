/* eslint-disable no-nested-ternary */
import { Menu as AntMenu, Layout } from 'antd'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { router } from 'src/router'
import { Link, Router } from 'react-router-dom'
import microApp, { removeDomScope } from '@micro-zoe/micro-app'
import * as store from './store'
import './module.index.less'
import { firstMenuUri } from './store'
import type { MenuData } from './type'
import { relative } from 'path'

const { SubMenu } = AntMenu
/*
 * 在Header头文件中使用的菜单项组件
 * */
export const Menu: React.FC = observer(() => {
  /**
   * 刷新后默认set selectedKeys
   */

  React.useEffect(
    () =>
      router.subscribe(({ location }) => {
        store.selectedKeys.set([location.pathname])
      }),
    [],
  )
  /**
   * 打开菜单
   * @param param
   */
  // const onOpenChange = (openKeys: any[]) => {
  //   store.openKeys.set(openKeys)
  // }

  const onSelect = ({ key }: any) => {
    // 权限不set
    if (key !== '/auth') {
      store.selectedKeys.set(key)
    }
    // 重置作用域-microapp
    removeDomScope()
    // console.log(key, key.includes('presale'), 99)
    if (key.includes('presale')) {
      microApp.setData(`microapp-presale`, { path: key })
    }
  }

  React.useEffect(() => {
    // 跳转有权限的首个菜单
    const firstMenu = sessionStorage.getItem('firstMenuUri')
    // 刷新时保持当前页签
    if (!firstMenu || router.location.pathname === '/') {
      sessionStorage.setItem('firstMenuUri', firstMenuUri.value)
      // 如果有搜索条件
      if (router.location.search) {
        router.push(firstMenuUri.value + router.location.search)
      } else {
        router.push(firstMenuUri.value)
      }
      store.selectedKeys.set(firstMenuUri.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstMenuUri.value])
  // console.log('menuList:::', store.menuList.value)
  const menus = toJS(store.menuList.value)
  const { history } = router
  const screenHeight = document.body.clientHeight
  console.log(menus)
  console.log('tore.selectedKeys.value::::', store.selectedKeys.value)
  return (
    <div className="menu-wrapper">
      {/* {store.computedOpenKeys.get() && store.computedOpenKeys.get().length > 0 && ( */}
      <AntMenu
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['dashboard']}
        mode="inline"
        theme="dark"
        className="pl-1 overflow-x-hidden overflow-y-auto"
        style={{ color: '#000', height: `${screenHeight - 64}px` }}
        onSelect={onSelect}
      >
        {menus.map((m: MenuData) =>
          m.isShow || m.show ? (
            m.children && m.children.length ? (
              <SubMenu key={m.code} title={m.name} icon={m.icon ? m.icon : null}>
                {m.children.map((n: MenuData) =>
                  n.children && n.children.length ? (
                    <SubMenu key={n.code} title={n.name}>
                      {n.children.map(z =>
                        z.isShow || z.show ? (
                          <AntMenu.Item key={z.uri}>
                            <Router history={history}>
                              <Link to={z.uri || ''}>{z.name}</Link>
                            </Router>
                          </AntMenu.Item>
                        ) : null,
                      )}
                    </SubMenu>
                  ) : n.isShow || n.show ? (
                    <AntMenu.Item key={n.uri}>
                      <Router history={history}>
                        {n.linkType === 2 ? (
                          <a href={n.url} target="_blank" rel="noreferrer">
                            {n.name}
                          </a>
                        ) : (
                          <Link to={n.uri || ''}>{n.name}</Link>
                        )}
                      </Router>
                    </AntMenu.Item>
                  ) : null,
                )}
              </SubMenu>
            ) : (
              <AntMenu.Item key={m.uri}>
                <Router history={history}>
                  <Link to={m.uri || ''}>{m.name}</Link>
                </Router>
              </AntMenu.Item>
            )
          ) : null,
        )}
      </AntMenu>
      {/* )} */}
    </div>
  )
})
