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

const User1 = (props: any) => {
  const { formData, level, hierarchy } = props
  const { list, maxData } = props

  const getLevel = () => {
    switch (props.level) {
      case 1:
        return '二级品类'
      case 2:
        return '三级品类'
      default:
        return '一级品类'
    }
  }

  const handleRouter = (record: any) => {
    if (record.categoryName === '汇总') {
      return
    }
    const searchParams = Object.fromEntries(new URL(decodeURIComponent(window.location.href)).searchParams)
    if (level === 0) {
      router.push(
        `/firstClass?dateType=${searchParams?.dateType}&dateValue=${searchParams?.dateValue}&mode=${searchParams?.mode}&firstCategoryId=${record?.categoryName}&secondCategoryId=全部&firstCategoryName=${record?.categoryName}`,
      )
    }
    if (level === 1) {
      router.push(
        `/reclassify?dateType=${searchParams?.dateType}&dateValue=${searchParams?.dateValue}&mode=${searchParams?.mode}&firstCategoryId=${searchParams?.firstCategoryId}&secondCategoryId=${record?.categoryName}&firstCategoryName=${searchParams?.firstCategoryName}&dateValues=1685548800000&secondCategoryName=${record?.categoryName}`,
      )
    }
  }

  // const percentFormatFilterValue = (value: any, unit = true) =>
  //   // 同比
  //   value !== null && value !== '0.00' ? percentFormat(Number(value), 2, unit) : '0.00%'

  const columns: any = [
    {
      title: '一级部门',
      dataIndex: 'categoryName',
      width: 200,
      key: 'categoryName',
      // fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer', width: 100, display: 'inline-block' }}
          onClick={() => {
            handleRouter(record)
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '负责一级品类',
      dataIndex: 'categoryName',
      width: 200,
      key: 'categoryName',
      // fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer', width: 100, display: 'inline-block' }}
          onClick={() => {
            handleRouter(record)
          }}
        >
        <FirstCategoryColumn text={text} />
        </span>
      ),
    },
    {
      title: '拉新/复购',
      children: [
        {
          title: '拉新客流',
          dataIndex: 'gmvUV',
          key: 'gmvUV',
          sorter: (a: any, b: any) => a.gmvUV - b.gmvUV,
          width: 80,
          render: (text: any) => (
            <div style={{ minWidth: 280 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvUVYOY',
          key: 'gmvUVYOY',
          width: 100,
          sorter: (a: any, b: any) => a.gmvUVYOY - b.gmvUVYOY,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '新客90天留存率',
          dataIndex: 'gmvConverRatio',
          key: 'gmvConverRatio',
          sorter: (a: any, b: any) => a.gmvConverRatio - b.gmvConverRatio,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvConverRatioYOY',
          key: 'gmvConverRatioYOY',
          sorter: (a: any, b: any) => a.gmvConverRatioYOY - b.gmvConverRatioYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '30天平均复购频次',
          dataIndex: 'gmvGuestPrice',
          key: 'gmvGuestPrice',
          sorter: (a: any, b: any) => a.gmvGuestPrice - b.gmvGuestPrice,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuestYOY',
          key: 'gmvGuestYOY',
          sorter: (a: any, b: any) => a.gmvGuestPriceYoY - b.gmvGuestPriceYoY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '60天平均复购频次',
          dataIndex: 'gmvGuestPrice',
          key: 'gmvGuestPrice',
          sorter: (a: any, b: any) => a.gmvGuestPrice - b.gmvGuestPrice,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuestYOY',
          key: 'gmvGuestYOY',
          sorter: (a: any, b: any) => a.gmvGuestPriceYoY - b.gmvGuestPriceYoY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '90天平均复购频次',
          dataIndex: 'gmvGuestPrice',
          key: 'gmvGuestPrice',
          sorter: (a: any, b: any) => a.gmvGuestPrice - b.gmvGuestPrice,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvGuestYOY',
          key: 'gmvGuestYOY',
          sorter: (a: any, b: any) => a.gmvGuestPriceYoY - b.gmvGuestPriceYoY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
    {
      title: '用户规模',
      children: [
        {
          title: '极度忠诚用户GMV占比',
          dataIndex: 'gmvNewGuestRatio',
          key: 'gmvNewGuestRatio',
          sorter: (a: any, b: any) => a.gmvNewGuestRatio - b.gmvNewGuestRatio,
          // width: 140,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvNewGuestYOY',
          key: 'gmvNewGuestYOY',
          sorter: (a: any, b: any) => a.gmvNewGuestYOY - b.gmvNewGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '核心用户GMV占比',
          dataIndex: 'gmvOldGuestRatio',
          key: 'gmvOldGuestRatio',
          sorter: (a: any, b: any) => a.gmvOldGuestRatio - b.gmvOldGuestRatio,
          // width: 130,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvOldGuestYOY',
          key: 'gmvOldGuestYOY',
          sorter: (a: any, b: any) => a.gmvOldGuestYOY - b.gmvOldGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '衰退用户GMV占比',
          dataIndex: 'gmvNewGuestRatio',
          key: 'gmvNewGuestRatio',
          sorter: (a: any, b: any) => a.gmvNewGuestRatio - b.gmvNewGuestRatio,
          // width: 140,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvNewGuestYOY',
          key: 'gmvNewGuestYOY',
          sorter: (a: any, b: any) => a.gmvNewGuestYOY - b.gmvNewGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '商超广义新用户GMV占比',
          dataIndex: 'gmvNewGuestRatio',
          key: 'gmvNewGuestRatio',
          sorter: (a: any, b: any) => a.gmvNewGuestRatio - b.gmvNewGuestRatio,
          // width: 140,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
        {
          title: '同比',
          dataIndex: 'gmvNewGuestYOY',
          key: 'gmvNewGuestYOY',
          sorter: (a: any, b: any) => a.gmvNewGuestYOY - b.gmvNewGuestYOY,
          width: 100,
          render: (text: any) => (
            <div style={{ width: 80 }}>
              <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />
            </div>
          ),
        },
      ],
    },
  ]

  return <Table bordered scroll={{ x: 1800 }} dataSource={list} columns={columns} pagination={false} />
}
export default User1
