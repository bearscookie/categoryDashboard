import type { Routes, Route } from 'src/lib/Router'
import { lazy } from 'react'
import Login from 'page/Login'

const Abnormal = lazy(() => import(/* webpackChunkName: "ErrorPage" */ 'src/component/Abnormal'))

const Dashboard = lazy(() => import('page/Dashborad'))
const BigEventList = lazy(() => import('page/BigEventMange/BigEventList'))
const BigEventAdd = lazy(() => import('page/BigEventMange/BigEventAdd'))

interface ExtendsRoute extends Route {
  keepAlive?: boolean
}
type ExtendsRoutes = ExtendsRoute[]

export const routes: ExtendsRoutes = [
  {
    key: '/login',
    component: Login,
    exact: true,
    path: '/login',
  },
  {
    key: '500',
    path: '/data-insight/500',
    exact: true,
    component: Abnormal,
  },
  {
    key: 'NoAuthority',
    path: '/data-insight/NoAuthority',
    exact: true,
    component: Abnormal,
  },
  {
    key: '503',
    path: '/data-insight/503',
    exact: true,
    component: Abnormal,
  },
  {
    key: 'NoData',
    path: '/data-insight/NoData',
    exact: true,
    component: Abnormal,
  },
  {
    key: 'dashborard',
    component: Dashboard,
    path: '/dashborard/supermarket',
  },
  {
    key: 'dashborard',
    component: Dashboard,
    path: '/dashborard/secondDepartment',
  },
  {
    key: 'dashborard',
    component: Dashboard,
    path: '/dashborard/firstDepartment',
  },
  {
    key: '/bigEventManage/bigEventList',
    component: BigEventList,
    path: '/bigEventManage/bigEventList',
  },
  {
    key: '/bigEventManage/bigEventAdd',
    component: BigEventAdd,
    path: '/bigEventManage/bigEventAdd',
  },
]
