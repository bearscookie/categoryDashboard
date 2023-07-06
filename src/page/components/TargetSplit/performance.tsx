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

const PerformanceTable = (props: any) => {
  const { formData, level, hierarchy } = props
  const { list, maxData } = props

  const columns: any = [
    {
      title: '一级部门',
      dataIndex: 'departmentName',
      width: 200,
      key: 'departmentName',
      // fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer', width: 100, display: 'inline-block' }}
          onClick={() => {
            // handleRouter(record)
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '一级品类',
      dataIndex: 'categoryName',
      width: 200,
      key: 'categoryName',
      // fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer', width: 100, display: 'inline-block' }}
          onClick={() => {
            // handleRouter(record)
          }}
        >
         <FirstCategoryColumn text={text} />,
        </span>
      ),
    },
    {
      title: '流量转化',
      children: [
        {
          title: '商详页UV',
          dataIndex: 'gmvDetailUV',
          key: 'gmvDetailUV',
          sorter: (a: any, b: any) => a.gmvDetailUV - b.gmvDetailUV,
          // width: 100,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvDetailUVYOY',
          key: 'gmvDetailUVYOY',
          // width: 100,
          sorter: (a: any, b: any) => a.gmvDetailUVYOY - b.gmvDetailUVYOY,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: 'UV点击购买转化率',
          dataIndex: 'gmvUV',
          key: 'gmvUV',
          // width: 200,
          sorter: (a: any, b: any) => a.gmvUV - b.gmvUV,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvUVYOY',
          key: 'gmvUVYOY',
          sorter: (a: any, b: any) => a.gmvUVYOY - b.gmvUVYOY,
          // width: 100,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '客单价',
          dataIndex: 'gmvGuestPrice',
          key: 'gmvGuestPrice',
          sorter: (a: any, b: any) => a.gmvGuestPrice - b.gmvGuestPrice,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuestYOY',
          key: 'gmvGuestYOY',
          sorter: (a: any, b: any) => a.gmvGuestPriceYoY - b.gmvGuestPriceYoY,
          // width: 100,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '品牌集中度',
      children: [
        {
          title: 'Top5品牌占比',
          dataIndex: 'gmvTop5BrandRatio',
          key: 'gmvTop5BrandRatio',
          sorter: (a: any, b: any) => a.gmvTop5BrandRatio - b.gmvTop5BrandRatio,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvTop5BrandYOY',
          key: 'gmvTop5BrandYOY',
          sorter: (a: any, b: any) => a.gmvTop5BrandYOY - b.gmvTop5BrandYOY,
          // width: 100,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '中腰部品牌占比',
          dataIndex: 'gmvOldGuestRatio',
          key: 'gmvOldGuestRatio',
          sorter: (a: any, b: any) => a.gmvOldGuestRatio - b.gmvOldGuestRatio,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvWaistlineYOY',
          key: 'gmvWaistlineYOY',
          sorter: (a: any, b: any) => a.gmvWaistlineYOY - b.gmvWaistlineYOY,
          // width: 100,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '连带分析',
      children: [
        {
          title: '连带件数',
          dataIndex: 'gmvRelatedRatio',
          key: 'gmvRelatedRatio',
          sorter: (a: any, b: any) => a.gmvRelatedRatio - b.gmvRelatedRatio,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: 'top3连带品类',
          dataIndex: 'gmvRelatedTop3',
          key: 'gmvRelatedTop3',
          sorter: (a: any, b: any) => a.gmvRelatedTop3 - b.gmvRelatedTop3,
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '连带新客30天GMV',
          dataIndex: 'gmvRelated30Day',
          // width: 100,
          key: 'gmvRelated30Day',
          render: (text: any) => (
            <div style={{ width: 150 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '竞对比较',
      children: [
        {
          title: '淘宝GMV增速',
          dataIndex: 'gmvTaobaoSpeedUp',
          key: 'gmvTaobaoSpeedUp',
        },
        {
          title: '天猫GMV增速',
          dataIndex: 'gmvTmallSpeedUp',
          key: 'gmvTmallSpeedUp',
        },
        {
          title: '抖音GMV增速',
          dataIndex: 'gmvDouyinSpeedUp',
          key: 'gmvDouyinSpeedUp',
        },
        {
          title: '快手GMV增速',
          dataIndex: 'gmvKuaishouSpeedUp',
          key: 'gmvKuaishouSpeedUp',
        },
        {
          title: '淘宝GMV倍比',
          dataIndex: 'gmvTaobaoMultiple',
          key: 'gmvTaobaoMultiple',
        },
        {
          title: '天猫GMV倍比',
          dataIndex: 'gmvTmallMultiple',
          key: 'gmvTmallMultiple',
        },
        {
          title: '抖音GMV倍比',
          dataIndex: 'gmvDouyinMultiple',
          key: 'gmvDouyinMultiple',
        },
        {
          title: '快手GMV倍比',
          dataIndex: 'gmvKuaishouMultiple',
          key: 'gmvKuaishouMultiple',
        },
      ],
    },
  ]

  return <Table bordered scroll={{ x: 1800 }} dataSource={list} columns={columns} pagination={false} />
}
export default PerformanceTable
