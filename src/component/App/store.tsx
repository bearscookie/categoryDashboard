import { mobxRequest } from 'mobx-value'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import { getAuthFirstMenu, setMenuList } from './Menu/store'
import { DashboardOutlined, ScheduleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons';

// import { getUserAuth, getUserAuthInsightTrend } from 'src/services/Common'
// import { initStream } from 'src/tool/stream'
// import { getUrlSearchValue } from 'src/tool/utils'
// import microApp from '@micro-zoe/micro-app'
// import localforage from 'localforage'

// import { userAuth } from '../../../mock/json/common'

// import { router } from 'src/router'
// import { BASE_ROUTE } from 'src/config'

export const userInfo = mobxRequest({
  value: {
    user: null as Record<string, any> | null,
    modules: [] as Record<string, any>[],
    menus: [] as Record<string, any>[],
    dimVo: [] as Record<string, any>,
  },
  request: async () => {
    // const { pathname } = window.location

    // const res = await getUserAuth()
    // const result = res?.data

    // 开发环境
    // const isLocalMock = () => result.data.user.admin && getUrlSearchValue('dev')
    // const isLocalMock = true

    // if (result && result.code === 200) {
    // const { data } = result
    const svg = () => (
      <svg width="15px" height="14px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icon集" transform="translate(-67.000000, -117.000000)" fill="#FFFFFF" fillRule="nonzero">
            <path d="M75.707019,123.285329 L77.9511127,129.323492 C77.9639233,129.357483 77.9643735,129.394835 77.9523859,129.429119 C78.0070308,129.634346 78.0346144,129.845722 78.034449,130.057971 C78.034449,131.418681 76.9166488,132.521739 75.5377616,132.521739 C74.1588942,132.521739 73.0410749,131.418681 73.0410749,130.057971 C73.0410749,129.672184 73.1309357,129.307113 73.2911215,128.982014 L75.4083118,123.285329 C75.4594591,123.147732 75.6558718,123.147732 75.707019,123.285329 Z M75.5,117 C80.1944286,117 84,120.882261 84,125.671291 C84,128.425162 82.7416205,130.879176 80.7794676,132.46759 C80.7754398,132.472066 80.7706504,132.475549 80.7656741,132.478739 L80.7550681,132.487275 C80.689714,132.518783 80.6116111,132.501586 80.5666451,132.444402 L79.9018806,131.598854 C79.8535701,131.537398 79.8581752,131.448738 79.9125815,131.392834 C81.5693795,130.058578 82.6339286,127.991752 82.6339286,125.671291 C82.6339286,121.651935 79.4399587,118.3936 75.5,118.3936 C71.5600413,118.3936 68.3660714,121.651935 68.3660714,125.671291 C68.3660714,128.004527 69.442365,130.081301 71.116106,131.413138 C71.1665459,131.471277 71.169946,131.557951 71.1225569,131.61821 L70.4577924,132.463758 C70.4126273,132.521199 70.3340621,132.538258 70.2698817,132.504559 L70.256942,132.496894 L70.2447991,132.487178 C68.2687578,130.899383 67,128.436485 67,125.671291 C67,120.882261 70.8055714,117 75.5,117 Z M75.5576555,126.534132 L74.4635895,129.477901 L74.4352804,129.535376 C74.358092,129.692032 74.3142856,129.868261 74.3142856,130.057971 C74.3142856,130.717256 74.8572702,131.26029 75.5377616,131.26029 C76.2182728,131.26029 76.7612375,130.717256 76.7612375,130.057971 C76.7612375,129.950393 76.7471924,129.84792 76.7214497,129.751399 L76.6402626,129.447055 L75.5576555,126.534132 Z M69.6649178,123.397341 L71.8171215,123.968679 C71.9020168,123.991226 71.9523925,124.077687 71.9296415,124.161799 L71.6824993,125.07566 C71.6715753,125.116056 71.6449019,125.150497 71.6083471,125.171407 C71.5717923,125.192318 71.5283505,125.197984 71.4875787,125.187161 L69.3353751,124.615803 C69.2504797,124.593256 69.2001041,124.506796 69.2228551,124.422683 L69.4699972,123.508822 C69.4927541,123.424711 69.5800209,123.374801 69.6649178,123.397341 Z M81.3350681,123.397341 C81.419965,123.374801 81.5072318,123.424711 81.5299887,123.508822 L81.7771507,124.422683 C81.7998887,124.5068 81.749507,124.593256 81.6646108,124.615803 L79.5124072,125.187161 C79.4275058,125.209688 79.3402441,125.159772 79.3174866,125.07566 L79.0703445,124.161799 C79.0594197,124.121404 79.0651391,124.078364 79.0862445,124.042147 C79.1073499,124.00593 79.1421124,123.979503 79.1828844,123.968679 Z M75.9853747,119.217391 C76.0732716,119.217391 76.1445261,119.287988 76.1445261,119.375072 L76.1445261,121.582609 C76.1445261,121.669694 76.0732716,121.74029 75.9853747,121.74029 L75.0304667,121.74029 C74.9425698,121.74029 74.8713153,121.669694 74.8713153,121.582609 L74.8713153,119.375072 C74.8713153,119.287988 74.9425698,119.217391 75.0304667,119.217391 L75.9853747,119.217391 Z" id="品类仪表盘-默认"></path>
          </g>
        </g>
      </svg>
    )
    const DashboardIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={svg} {...props} />
    const bigeventSvg = () => (
      <svg width="15px" height="16px" viewBox="0 0 16 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icon集" transform="translate(-123.000000, -155.000000)" fill="#FFFFFF" fillRule="nonzero">
            <path d="M124.454545,171.827246 L124.454545,160.12 L137.545455,160.115611 L137.551273,171.822857 L124.454545,171.827246 Z M131,156.462857 C132.202909,156.462857 133.181818,157.445897 133.181818,158.657143 L128.818182,158.657143 C128.818182,157.445897 129.797091,156.462857 131,156.462857 L131,156.462857 Z M137.551273,158.657143 L134.636364,158.657143 C134.636364,156.641326 133.005818,155 131,155 C128.992689,155.002418 127.366041,156.638361 127.363636,158.657143 L124.448727,158.657143 C123.648714,158.658755 123.0008,159.311026 123,160.115611 L123,171.827246 C123,172.631817 123.650182,173.285714 124.448727,173.285714 L137.551273,173.285714 C138.351286,173.284102 138.9992,172.631831 139,171.827246 L139,160.115611 C138.9992,159.311026 138.351286,158.658755 137.551273,158.657143 Z M135.288,166.800869 C135.121007,166.703293 134.92228,166.676527 134.735643,166.726471 C134.549005,166.776416 134.389784,166.89897 134.293091,167.067109 C133.641979,168.196518 132.443546,168.893286 131.145455,168.897143 C129.846542,168.894927 128.646694,168.198538 127.994909,167.068571 C127.865919,166.840402 127.625256,166.699235 127.364278,166.698657 C127.1033,166.698082 126.862023,166.838184 126.732036,167.06578 C126.60205,167.293377 126.603285,167.573571 126.735273,167.8 C127.647449,169.380565 129.325427,170.355232 131.142545,170.36 C132.960863,170.356869 134.640463,169.381904 135.552727,167.8 C135.753549,167.450172 135.634377,167.002853 135.286545,166.800869 L135.288,166.800869 Z" id="大事件管理-高亮"></path>
          </g>
        </g>
      </svg>
    )
    const BigEventIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={bigeventSvg} {...props} />
    const mockMenu = [
      {
        code: 'dashboard',
        name: '品类仪表盘',
        uri: '/dashboard',
        url: '/dashboard',
        linkType: 1,
        icon: <DashboardIcon />,
        isShow: true,
        children: [
          {
            code: '/dashborard/supermarket',
            name: '大商超负责人',
            uri: '/dashborard/supermarket',
            url: '/dashborard/supermarket',
            linkType: 1,
            isShow: true,
            authList: [0, 1],
          },
          {
            code: '/dashborard/firstDepartment',
            name: '一级部门',
            uri: '/dashborard/firstDepartment',
            url: '/dashborard/firstDepartment',
            linkType: 1,
            isShow: true,
            authList: [0, 1, 2],
          },
          {
            code: '/dashborard/secondDepartment',
            name: '二级部门',
            uri: '/dashborard/secondDepartment',
            url: '/dashborard/secondDepartment',
            linkType: 3,
            isShow: true,
            authList: [0, 1, 2, 3],
          },
        ],
      },
      {
        code: 'bigEventManage',
        name: '大事件管理',
        uri: '/bigEventManage',
        url: '/bigEventManage',
        linkType: 1,
        icon: <BigEventIcon />,
        isShow: true,
        children: [
          {
            code: 'bigEventAdd',
            name: '大事件录入',
            uri: '/bigEventManage/bigEventAdd',
            url: '/bigEventManage/bigEventAdd',
            linkType: 1,
            isShow: true,
            authList: [0, 2, 3],
          },
          {
            code: 'bigEventList',
            name: '大事件列表',
            uri: '/bigEventManage/bigEventList',
            url: '/bigEventManage/bigEventList',
            linkType: 1,
            isShow: true,
            authList: [0, 2, 3],
          },
        ],
      },
    ]
    const userInfoStr = localStorage.getItem('userInfo')
    let filterMockMenu = mockMenu
    if (userInfoStr?.length) {
      const userInfo = JSON.parse(userInfoStr)
      const userType = userInfo && userInfo.userType
      filterMockMenu = mockMenu.map(menu => {
        const newCmenu = menu.children.filter(cmenu => cmenu.authList && cmenu.authList.findIndex(x => userType === x) !== -1)
        menu.children = newCmenu
        return menu
      })
    }
    console.log('filterMockMenu', filterMockMenu)
    setMenuList(filterMockMenu)

    // 获取第一个菜单
    // getAuthFirstMenu()

    // 无菜单跳转503
    // if (data.menus?.length === 0) {
    //   router.push(`${BASE_ROUTE}/503?referer=${window.location.pathname.split('/')[2]}`)
    // }

    return {
      user: {},
      modules: {},
      menus: mockMenu,
    }
    // }
  },
})

export function isAuth(code: string) {
  return userInfo.value.modules.filter((item: any) => item.code === code).length > 0
}
