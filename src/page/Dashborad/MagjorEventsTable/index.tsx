import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

import StatusTag from '../../components/StatusTag'

const MagjorEventsTable = (props: any) => {
  const { list = [] } = props
  const columns: any = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 80,
      onCell: (_: any, index: number) => {
        if (index === 0) {
          return { rowSpan: list?.length || 0 }
        }
        return { rowSpan: 0 }
      },
      render: (text: any) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '二级品类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 80,

    },
    {
      title: '大事件',
      dataIndex: 'content',
      key: 'content',
      width: 150,
    },
    {
      title: '进度状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text: any) => {
        return <StatusTag value={text} />
      },
    },
    {
      title: 'BigBoss',
      dataIndex: 'principal',
      key: 'principal',

      width: 70,
    },
  ]
  return <Table bordered dataSource={list} scroll={{x:500}} columns={columns} pagination={false} />

}
export default MagjorEventsTable
