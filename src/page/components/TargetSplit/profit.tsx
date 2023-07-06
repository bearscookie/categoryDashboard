/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table, Tooltip } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'

import FirstCategoryColumn from '../FirstCatgoryColumn'
// import { percentFormat } from 'tool/format'
import { router } from 'src/router'
import {
  fixedFormats,
  fixedThousandToFormats,
  millionThousandToFormats,
  percentFormats,
  tenThousandToFormats,
} from 'tool/dataFomat'

import CategoryTableItem from '../CategoryTableItem'
import NewTableItem from '../NewTableItem'

import styles from './style.module.less'

const ProfitTable = (props: any) => {
  const { formData, level, hierarchy } = props
  const { list, maxData } = props

  const columns: any = [
    {
      title: '一级部门',
      dataIndex: 'departmentName',
      width: 200,
      key: 'departmentName',
    },
    {
      title: '负责一级品类',
      dataIndex: 'categoryName',
      width: 200,
      key: 'categoryName',
      render: text => <FirstCategoryColumn text={text} />,
      // fixed: 'left',
    },
    {
      title: '前台毛利',
      dataIndex: 'profitFront',
      width: 200,
      key: 'profitFront',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitFrontYOY',
      width: 200,
      key: 'profitFrontYOY',
      // fixed: 'left',
    },
    {
      title: '后台毛利',
      dataIndex: 'profitBackend',
      width: 200,
      key: 'profitBackend',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitBackendYOY',
      width: 200,
      key: 'profitBackendYOY',
      // fixed: 'left',
    },
    {
      title: '广告费',
      dataIndex: 'profitADProceeds',
      width: 200,
      key: 'profitADProceeds',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitADProceedsYOY',
      width: 200,
      key: 'profitADProceedsYOY',
      // fixed: 'left',
    },
    {
      title: '自营存货损失',
      dataIndex: 'profitSelfownLost',
      width: 200,
      key: 'profitSelfownLost',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitSelfownLostYOY',
      width: 200,
      key: 'profitSelfownLostYOY',
      // fixed: 'left',
    },
    {
      title: '仓配费用',
      dataIndex: 'profitStorage',
      width: 200,
      key: 'profitStorage',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitStorageYOY',
      width: 200,
      key: 'categoryNaprofitStorageYOYme',
      // fixed: 'left',
    },
    {
      title: '其他毛利',
      dataIndex: 'profitOther',
      width: 200,
      key: 'profitOther',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitOtherYOY',
      width: 200,
      key: 'profitOtherYOY',
      // fixed: 'left',
    },
    {
      title: '其他成本',
      dataIndex: 'profitOtherCost',
      width: 200,
      key: 'profitOtherCost',
      // fixed: 'left',
    },
    {
      title: '同比',
      dataIndex: 'profitOtherCostYOY',
      width: 200,
      key: 'profitOtherCostYOY',
      // fixed: 'left',
    },
  ]

  return <Table bordered scroll={{ x: 1800 }} dataSource={list} columns={columns} pagination={false} />
}
export default ProfitTable
