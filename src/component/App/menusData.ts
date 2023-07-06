import { BASE_ROUTE } from 'src/config'

export const menusData = [
  {
    code: 'TRENDS_INSIGHT',
    name: 'Menu 1',
    uri: '',
    isShow: true,
    children: [
      {
        code: 'TRENDS_INSIGHT',
        name: 'Sub Menu 1',
        uri: `${BASE_ROUTE}/iframe/trends`,
        url: 'http://xxx.example.com/',
        isShow: true,
        children: undefined,
      },
    ],
  },
]
