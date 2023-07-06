import Abnormal from 'component/Abnormal'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { router } from 'src/router'
import { getCurUri } from 'src/component/App/Menu/store'
import type { MenuData } from 'src/component/App/Menu/type'
import { AbnormalStatus } from 'src/component/Abnormal/index'
import { toJS } from 'mobx'

import s from './style.module.less'

const isDev = process.env.NODE_ENV === 'development'
const isPre = process.env.LOGIN_ENV === 'pre'

// 过滤掉后台没有返回的路由
const AuthRoutes = (menus: MenuData[]) => {
  const { pathname } = window.location
  // TODO: ifram和micro-app无权限跳转页面空白，没有全链接，没有跳转判断点
  // 兼容菜单-内部跳转
  const filterdList = ['index', 'home']
  const mergeList: string[] = [...AbnormalStatus, ...filterdList]
  // const filterRoutes = router.routes.map((item: any) => {
  //   if (isDev) {
  //     return item
  //   }
  //   return mergeList.includes(item.key) || mergeList.includes(item.path) ? item : null
  // })
  return router.routes

  // return filterRoutes.filter(v => v)
}

export const TransitionRoute: React.FC<any> = observer(({ menus }) => (
  <Router history={router.history}>
    <TransitionGroup className={s.wrapper}>
      <CSSTransition classNames="route" timeout={300}>
        <React.Suspense fallback={''}>
          <Switch location={router.location}>
            {AuthRoutes(menus).map(r => (
              <Route {...r} />
            ))}
            {/* <Route path="*" component={RedirectToWorkbench} /> */}
            {/* 没有匹配到的默认路由，放到最后 */}
            {menus && menus.length > 0 && <Route component={Abnormal} />}
          </Switch>
        </React.Suspense>
      </CSSTransition>
    </TransitionGroup>
  </Router>
))
