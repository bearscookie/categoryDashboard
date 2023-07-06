/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Table } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'
import { dayFormats, fixedThousandToFormats, millionThousandToFormats, percentFormats } from 'tool/dataFomat'
import NewTableItem from '../NewTableItem'

import FirstCategoryColumn from '../FirstCatgoryColumn'

import styles from './style.module.less'

const CategoryOverviewTable = ({ list, maxData = {}, level = 0, formData, hierarchy }: any) => {
  const columns = [
    {
      title: '一级部门',
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 120,
      fixed: 'left',
    },
    {
      title: '负责一级品类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 130,
      fixed: 'left',
      render: text => <FirstCategoryColumn text={text} />,
    },
    {
      title: 'C-2负责人',
      dataIndex: 'c2User',
      key: 'c2User',
      width: 110,
      fixed: 'left',
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
      dataIndex: 'gmvGoal',
      key: 'gmvGoal',
      width: 140,
      sorter: (a: any, b: any) => a.gmvGoal - b.gmvGoal,
      render: (text: any,record:any) => <NewTableItem type={CategoryItemType.text} value={percentFormats((record.gmv/text), '%')} />,
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
      dataIndex: 'gmvLastyearPeriod',
      key: 'gmvLastyearPeriod',
      sorter: (a: any, b: any) => a.gmvLastyearPeriod - b.gmvLastyearPeriod,
      render: (text: any) => <NewTableItem type={CategoryItemType.text} value={fixedThousandToFormats(text)} />,
    },
    {
      title: '贡献利润（百万元）',
      dataIndex: 'profit',
      key: 'profit',
      width: 200,
      sorter: (a: any, b: any) => a.profit - b.profit,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={millionThousandToFormats(text)}
            nameFailed="贡献利润"
            percentage={percentFormats(text / maxData?.profitMax)}
            record={record}
            columnName="profit"
            categoryLevel={hierarchy}
            formData={formData}
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: '贡献利润（百万元）',
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
      dataIndex: 'profitGoal',
      key: 'profitGoal',
      width: 140,
      sorter: (a: any, b: any) => a.profitGoal - b.profitGoal,
      render: (text: any, record:any) => <NewTableItem type={CategoryItemType.text} value={percentFormats(record.profit/text, '%')} />,
    },
    {
      title: '同比',
      dataIndex: 'profitYOY',
      key: 'profitYOY',
      width: 120,
      sorter: (a: any, b: any) => a.profitYOY - b.profitYOY,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />,
    },
    {
      title: '去年同期',
      width: 120,
      dataIndex: 'profitLastyearPeriod',
      key: 'profitLastyearPeriod',
      sorter: (a: any, b: any) => a.profitLastyearPeriod - b.profitLastyearPeriod,
      render: (text: any) => <NewTableItem type={CategoryItemType.text} value={fixedThousandToFormats(text)} />,
    },
    {
      title: '前台毛利率',
      dataIndex: 'frontRatio',
      key: 'frontRatio',
      width: 200,
      sorter: (a: any, b: any) => a.frontRatio - b.frontRatio,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={millionThousandToFormats(text)}
            nameFailed="贡献利润"
            percentage={percentFormats(text / maxData?.profitMax)}
            record={record}
            columnName="profit"
            categoryLevel={hierarchy}
            formData={formData}
            detailData={[
              {
                label: '一级品类',
                value: record.categoryName,
              },
              {
                label: '贡献利润（百万元）',
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
      title: '去年同期',
      width: 120,
      dataIndex: 'frontRatioLastyearPeriod',
      key: 'frontRatioLastyearPeriod',
      sorter: (a: any, b: any) => a.frontRatioLastyearPeriod - b.frontRatioLastyearPeriod,
      render: (text: any) => <NewTableItem type={CategoryItemType.text} value={fixedThousandToFormats(text)} />,
    },
    {
      title: '同比',
      dataIndex: 'frontRatioYOY',
      key: 'frontRatioYOY',
      width: 120,
      sorter: (a: any, b: any) => a.profitYOY - b.profitYOY,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />,
    },
    {
      title: '现金流天数（天）',
      dataIndex: 'turnoverDays',
      key: 'turnoverDays',
      width: 200,
      sorter: (a: any, b: any) => a.turnoverDays - b.turnoverDays,
      render: (text: any, record: any) => (
        <div className={styles.processWrap}>
          <NewTableItem
            type={NewItemType.process}
            value={dayFormats(text)}
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
                value: dayFormats(record.turnoverDays),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '目标完成度',
      dataIndex: 'turnoverDaysGoal',
      key: 'turnoverDaysGoal',
      width: 140,
      sorter: (a: any, b: any) => a.turnoverDaysGoal - b.turnoverDaysGoal,
      render: (text: any,record:any) => <NewTableItem type={CategoryItemType.text} value={percentFormats(record.turnoverDays/text, '%')} />,
    },
    {
      title: '同比',
      dataIndex: 'turnoverDaysYOY',
      key: 'turnoverDaysYOY',
      width: 120,
      sorter: (a: any, b: any) => a.turnoverDaysYOY - b.turnoverDaysYOY,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />,
    },
    {
      title: '去年同期',
      width: 120,
      dataIndex: 'turnoverDaysLastyearPeriod',
      key: 'turnoverDaysLastyearPeriod',
      sorter: (a: any, b: any) => a.turnoverDaysLastyearPeriod - b.turnoverDaysLastyearPeriod,
      render: (text: any) => <NewTableItem type={CategoryItemType.text} value={fixedThousandToFormats(text)} />,
    },
  ]

  // @ts-ignore
  return <Table bordered scroll={{ x: 1100, y: 500 }} dataSource={list} columns={columns} pagination={false} />
}
export default CategoryOverviewTable
