/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'
import { router } from 'src/router'
import { percentFormat } from 'tool/format'
import { dayFormats, millionThousandToFormats, percentFormats } from 'tool/dataFomat'

import FirstCategoryColumn from '../FirstCatgoryColumn'

// import CategoryTableItem from '../CategoryTableItem'
import NewTableItem from '../NewTableItem'

import styles from './style.module.less'

const CategoryOverviewTable = ({ list, maxData = {}, level = 0, formData, hierarchy }: any) => {
  const getName = () => {
    if (level === 0) {
      return '一级品类'
    }
    if (level === 1) {
      return '二级品类'
    }
    if (level === 2) {
      return '三级品类'
    }
    return '一级品类'
  }
  const percentFormatFilterValue = (value: any, unit = true) =>
    // 同比
    value ? percentFormat(Number(value), 2, unit) : '0.00%'

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

  const columns = [
    {
      title: '一级部门',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 120,
      fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer' }}
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
      key: 'categoryName',
      width: 120,
      fixed: 'left',
      render: (text: any, record: any) => (
        <span
          style={{ cursor: record.categoryName === '汇总' ? 'normal' : 'pointer' }}
          onClick={() => {
            handleRouter(record)
          }}
        >
           <FirstCategoryColumn text={text} />,
        </span>
      ),
    },
    {
      title: 'C-2负责人',
      dataIndex: 'content',
      key: 'content',
      width: 80,
    },
    {
      title: 'GMV（百万元）',
      dataIndex: 'gmv',
      key: 'gmv',
      width: 200,
      sorter: (a: any, b: any) => a.gmv - b.gmv,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={millionThousandToFormats(text)}
            percentage={percentFormats(text / maxData?.gmvMax)}
            record={record}
            nameFailed="GMV"
            columnName="gmv"
            categoryLevel={hierarchy}
            formData={formData}
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: 'GMV（百万元）',
                value: millionThousandToFormats(record.gmv),
              },
              {
                label: '同比',
                value: `${percentFormats(record.gmvYOY, '%')}`,
              },
              {
                label: '天猫GMV增速',
                value: percentFormats(record.gmvSpeedup, '%'),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '目标完成度',
      dataIndex: 'gmvYOY',
      key: 'gmvYOY',
      width: 120,
    },
    {
      title: '同比',
      dataIndex: 'gmvYOY',
      key: 'gmvYOY',
      width: 120,
      sorter: (a: any, b: any) => a.gmvYOY - b.gmvYOY,
      render: (text: any) => <NewTableItem type={CategoryItemType.text} value={percentFormats(text, '%')} />,
    },
    {
      title: '去年同期',
      width: 120,
      dataIndex: 'turnoverDaysLastyearPeriod',
      key: 'turnoverDaysLastyearPeriod',
      sorter: (a: any, b: any) => a.turnoverDaysLastyearPeriod - b.turnoverDaysLastyearPeriod,
    },
    {
      title: '贡献利润（百万元）',
      dataIndex: 'profit',
      key: 'profit',
      width: 200,
      sorter: (a: any, b: any) => a.profit - b.profit,
      // width: 140,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={millionThousandToFormats(text)}
            nameFailed="贡献利润"
            // standardValue={maxData.profitMax ? formatMoneyByTenMillon(maxData.profitMax) : 0}
            percentage={percentFormats(text / maxData?.profitMax)}
            record={record}
            columnName="profit"
            categoryLevel={hierarchy}
            formData={formData}
            // unit="%"
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: '贡献利润（百万元）',
                // value: record.profit ? formatMoneyByTenMillon(record.profit) : '0.00',
                value: millionThousandToFormats(record.profit),
              },
              {
                label: '同比',
                value: `${percentFormats(record.profitYOY)}`,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '目标完成度',
      dataIndex: 'gmvYOY',
      key: 'gmvYOY',
      width: 120,
    },
    {
      title: '同比',
      dataIndex: 'profitYOY',
      key: 'profitYOY',
      width: 120,
      sorter: (a: any, b: any) => a.profitYOY - b.profitYOY,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormatFilterValue(text)} />,
    },
    {
      title: '去年同期',
      width: 120,
      dataIndex: 'turnoverDaysLastyearPeriod',
      key: 'turnoverDaysLastyearPeriod',
      sorter: (a: any, b: any) => a.turnoverDaysLastyearPeriod - b.turnoverDaysLastyearPeriod,
    },
    {
      title: '前台毛利率',
      dataIndex: 'profit',
      key: 'profit',
      width: 200,
      sorter: (a: any, b: any) => a.profit - b.profit,
      // width: 140,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={millionThousandToFormats(text)}
            nameFailed="贡献利润"
            // standardValue={maxData.profitMax ? formatMoneyByTenMillon(maxData.profitMax) : 0}
            percentage={percentFormats(text / maxData?.profitMax)}
            record={record}
            columnName="profit"
            categoryLevel={hierarchy}
            formData={formData}
            // unit="%"
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: '贡献利润（百万元）',
                // value: record.profit ? formatMoneyByTenMillon(record.profit) : '0.00',
                value: millionThousandToFormats(record.profit),
              },
              {
                label: '同比',
                value: `${percentFormats(record.profitYOY)}`,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '目标完成度',
      dataIndex: 'gmvYOY',
      key: 'gmvYOY',
      width: 120,
    },
    {
      title: '同比',
      dataIndex: 'profitYOY',
      key: 'profitYOY',
      width: 120,
      sorter: (a: any, b: any) => a.profitYOY - b.profitYOY,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormatFilterValue(text)} />,
    },
    {
      title: '现金流天数（天）',
      dataIndex: 'turnoverDays',
      key: 'turnoverDays',
      width: 200,
      sorter: (a: any, b: any) => a.turnoverDays - b.turnoverDays,
      // width: 140,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            // value={text ? parseInt(text) : 0}
            value={dayFormats(text)}
            // standardValue={maxData?.turnoverDaysMax}
            percentage={percentFormats(text / maxData?.turnoverDaysMax)}
            record={record}
            nameFailed="现金流天数"
            columnName="turnoverDays"
            categoryLevel={hierarchy}
            formData={formData}
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: '现金流天数（天）',
                // value: record.turnoverDays ? parseInt(record.turnoverDays) : 0,
                value: dayFormats(record.turnoverDays),
              },
              // {
              //   label: '去年同期',
              //   value: record.turnoverDaysLastyearPeriod,
              // },
            ]}
          />
        </div>
      ),
    },
    {
      title: '目标完成度',
      dataIndex: 'gmvYOY',
      key: 'gmvYOY',
      width: 120,
    },
    {
      title: '同比',
      dataIndex: 'profitYOY',
      key: 'profitYOY',
      width: 120,
      sorter: (a: any, b: any) => a.profitYOY - b.profitYOY,
    },
    {
      title: '去年同期',
      width: 120,
      dataIndex: 'turnoverDaysLastyearPeriod',
      key: 'turnoverDaysLastyearPeriod',
      sorter: (a: any, b: any) => a.turnoverDaysLastyearPeriod - b.turnoverDaysLastyearPeriod,
    },
  ]

  // @ts-ignore
  return <Table bordered scroll={{ x: 1100, y: 500 }} dataSource={list} columns={columns} pagination={false} />
}
export default CategoryOverviewTable
