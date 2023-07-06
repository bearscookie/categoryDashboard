import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

import StatusTag from '../../components/StatusTag'

const MagjorEventsTable = (props: any) => {
  const { list = [] } = props
  const columns: any = [
    {
      title: '二级品类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 80,

    },
    {
      title: '在线SKU数',
      dataIndex: 'content',
      key: 'content',
      width: 150,
    },
    {
      title: '下限',
      dataIndex: 'status',
      key: 'status',
      width: 80,
    },
    {
      title: '上限',
      dataIndex: 'status',
      key: 'status',
      width: 80,
    },
    {
      title: '是否超出边界线',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text: any, record: any) => {
        const { sku = 0, skuMax = 0, skuMin = 0 } = record
        if (Number(sku) > Number(skuMax)) {
          return <div className="abnormalStyle">超出上限</div>
        }
        if (Number(sku) < Number(skuMin)) {
          return <div className="abnormalStyle">低于下限</div>
        }
        return <div className="normalStyle">正常</div>
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
