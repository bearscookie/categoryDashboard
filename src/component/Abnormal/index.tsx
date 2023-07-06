import type { FC } from 'react'
import { Button, message } from 'antd'
import { router } from 'src/router'
import { routes } from 'src/routes'
import pic404 from 'src/assets/404.png'
import pic500 from 'src/assets/500.png'
import pic403 from 'src/assets/403.png'
import picnodata from 'src/assets/images/no_data.png'

import style from './style.module.less'

interface StatusItem {
  title: string
  text: string
  pic: any
}
interface Status {
  [id: string]: StatusItem
}

const abnormal: Status = {
  404: {
    title: '404',
    text: '抱歉，你访问的页面不存在',
    pic: pic404,
  },
  500: {
    title: '500',
    text: '抱歉，服务器出错啦',
    pic: pic500,
  },
  403: {
    title: '403',
    text: '抱歉，你无权访问该页面',
    pic: pic403,
  },
  NoAuthority: {
    title: '503',
    text: '503',
    pic: pic403,
  },
  502: {
    title: '503',
    text: '503',
    pic: pic403,
  },
  503: {
    title: '503',
    text: '503',
    pic: pic403,
  },
  NoData: {
    title: '',
    text: '暂无数据',
    pic: picnodata,
  },
}

// 异常状态
export const AbnormalStatus = ['404', '500', '503', '403', 'NoAuthority', 'NoData']
// 无权限状态路由
const NoAuthorityRoutes: string[] = routes.map(v => v.key || 'iframe' || 'microApp')
const NoAuthorityRoutesPaths: string[] = routes.map(v => v.path || 'iframe' || 'microApp')

message.destroy()

const Abnormal: FC = () => {
  const { pathname, search } = router.location
  let status: string = pathname?.split('/')?.[2]

  if (!AbnormalStatus.includes(status)) {
    status = '404'
  }

  // 如果是无权限菜单，status=503
  const pathStr = pathname?.substring(1, pathname.length)?.split('/')[1]
  if (status === '404' && (NoAuthorityRoutes.includes(pathStr) || NoAuthorityRoutesPaths.includes(pathname))) {
    status = '503'
  }

  return (
    <div className={style.page}>
      <img src={abnormal[status].pic} alt="占位图" />
      <div className={style.wrapper}>
        <p className={style.title}>{abnormal[status].title}</p>

        {abnormal[status].text === '503' ? <>
      <div className={style.text}>
        <p>抱歉，您未开通权限，请联系相关人员开通权限： </p>
      </div></> : <div className={style.text}>{abnormal[status].text}</div>}

        {/* <Link className="ant-btn ant-btn-primary" to="/">
        返回首页
      </Link> */}
      </div>
    </div>
  )
}

export default Abnormal
