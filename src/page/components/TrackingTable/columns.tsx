import styles from './style.module.less'
import BigBossAbnormal from '../BigBossAbnormal'

import FirstCategoryColumn from '../FirstCatgoryColumn'
const columns0 = [
  {
    title: '一级部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 60,
  },
  {
    title: '负责一级品类',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 90,
    render: text => <FirstCategoryColumn text={text} />,
  },
  {
    title: 'C-2负责人',
    dataIndex: 'c2User',
    key: 'c2User',
    width: 60,
  },
  {
    title: 'Big Boss数',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
  {
    title: '提示关注',
    children: [
      {
        title: '大事件进度异常BigBoss数',
        dataIndex: 'exceptionEventNum',
        key: 'exceptionEventNum',
        width: 80,
        render: (text: any) => (
         
            <BigBossAbnormal text={text}></BigBossAbnormal>
          
        ),
      },
      {
        title: '超出边界线BigBoss数量',
        dataIndex: 'boundaryBigBossNum',
        key: 'boundaryBigBossNum',
        width: 80,
        render: (text: any) => (
         <BigBossAbnormal text={text}></BigBossAbnormal>
        ),
      },
    ],
  },
]

const columns1 = [
  {
    title: '二级部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 60,
  },
  {
    title: '负责二级品类',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 90,
    render: text => <FirstCategoryColumn text={text} />,
  },
  {
    title: 'Big Boss数',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
  {
    title: '提示关注',
    children: [
      {
        title: '进度异常大事件数量',
        dataIndex: 'exceptionEventNum',
        key: 'exceptionEventNum',
        width: 80,
      },
      {
        title: '边界线',
        dataIndex: 'boundaryBigBossNum',
        key: 'boundaryBigBossNum',
        width: 80,
      },
    ],
  },
]

const columns2 = [
  {
    title: '二级部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 60,
  },
  {
    title: '负责二级品类',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 90,
    render: text => <FirstCategoryColumn text={text} />,
  },
  {
    title: 'Big Boss数',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
  {
    title: '大事件',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
  {
    title: '进展状态',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
  {
    title: '边界线',
    dataIndex: 'bigBossNum',
    key: 'bigBossNum',
    width: 60,
    render: (text: any) => <span>{text | 0}</span>,
  },
]

export const getTrackingColumn = (level: number) => {
  if (level === 0) {
    return columns0
  }
  if (level === 1) {
    return columns1
  }
  if (level === 2) {
    return columns2
  }
  return columns0
}
