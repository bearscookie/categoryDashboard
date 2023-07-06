/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Table } from 'antd'
import { CategoryItemType, NewItemType } from 'src/const'
import { router } from 'src/router'
import CategoryTableItem from '../CategoryTableItem'
import { decimalFormat, percentFormat, formatByTrd, formatMoneyByTrd } from 'tool/format'
import { parseIntFomart, percentFormats } from 'tool/dataFomat'
import NewTableItem from '../NewTableItem'

const BoundaryLineTable = (props: any) => {
  const { list = [], maxData, level, hierarchy } = props
  const getLevel = () => {
    switch (level) {
      case 1:
        return '二级品类'
        break
      case 2:
        return '三级品类'
        break
      default:
        return '一级品类'
    }
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
      title: getLevel,
      dataIndex: 'categoryName',
      key: 'categoryName',
      // width: 150,
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
      title: 'SKU数量',
      dataIndex: 'skuNum',
      key: 'skuNum',
      // width: 150,
      render: (text: any, record: any) => (
        <NewTableItem
          type={NewItemType.processRange}
          // value={parseInt(Number(text))}
          // standardValue={parseInt(Number(maxData?.skuNumMax))}
          value={parseIntFomart(text)}
          percentage={percentFormats(text / maxData?.skuNumMax)}
          record={record}
          columnName="skuNum"
          categoryLevel={hierarchy}
          nameFailed="SKU数量"
          min={record.skuNumMin}
          max={record.skuNumMax}
          detailData={[
            {
              label: '二级品类',
              value: record.categoryName,
            },
            {
              label: 'SKU数量',
              // value: formatMoneyByTrd(parseInt(Number(record.skuNum))),
              value: parseIntFomart(record.skuNum),
            },
            {
              label: '是否达标',
              value: record.skuNum > record.skuNumMin && record.skuNum < record.skuNumMax ? '达标' : '未达标',
            },

            {
              label: '下限',
              // value: formatMoneyByTrd(parseInt(Number(record.skuNumMin))),
              value: parseIntFomart(record.skuNumMin),
            },
            {
              label: '上限',
              // value: formatMoneyByTrd(parseInt(Number(record.skuNumMax))),
              value: parseIntFomart(record.skuNumMax),
            },
            {
              label: '同比',
              // value: percentFormatFilterValue(record.skuYOY),
              value: percentFormats(record.skuYOY, '%'),
            },
          ]}
          // unit="%"
        />
      ),
    },
    {
      title: '是否超出边界线',
      dataIndex: 'skuNumMax',
      key: 'skuNumMax',
      // width: 100,
      render: (text: any, record: any) => {
        const { skuNum = 0, skuNumMax = 0, skuNumMin = 0 } = record
        if (Number(skuNum) > Number(skuNumMax)) {
          return <div className="abnormalStyle">超出上限</div>
        }
        if (Number(skuNum) < Number(skuNumMin)) {
          return <div className="abnormalStyle">低于下限</div>
        }
        return <div className="normalStyle">正常</div>
      },
    },
    {
      title: '下限',
      dataIndex: 'skuNumMin',
      key: 'skuNumMin',
      // width: 100,

      render: (text: any) => <span>{parseIntFomart(text)}</span>,
    },
    {
      title: '上限',
      dataIndex: 'skuNumMax',
      key: 'skuNumMax',
      // width: 100,
      render: (text: any) => <span>{parseIntFomart(text)}</span>,
    },
    {
      title: '同比',
      dataIndex: 'skuYOY',
      key: 'skuYOY',
      // width: 100,
      render: (text: any) => <NewTableItem type={NewItemType.text} value={percentFormats(text, '%')} />,
    },
    // {
    //   title: '自营比例',
    //   dataIndex: 'selfownPct',
    //   key: 'selfownPct',
    //   // width: 100,
    //   render: (text: any, record: any) => (
    //     <CategoryTableItem
    //       type={CategoryItemType.processRange}
    //       value={parseInt(text)}
    //       k={'test'}
    //       standardValue={maxData?.selfownMax}
    //       record={record}
    //       min={record.selfownPctMin}
    //       max={record.selfownPctMax}

    //       columnName={'selfownPct'}
    //       categoryLevel={hierarchy}
    //       detailData={[
    //         {
    //           label: '二级品类',
    //           value: record.categoryName,
    //         },
    //         {
    //           label: '自营比例',
    //           value: record.selfownPct,
    //         },
    //         {
    //           label: '同比',
    //           value: record.selfownPctYOY * 100,
    //         },
    //       ]}
    //       unit="%"
    //     />
    //   ),
    // },
    // {
    //   title: '同比',
    //   dataIndex: 'selfownPctYOY',
    //   key: 'selfownPctYOY',
    //   // width: 150,
    //   render: (text: any) => <CategoryTableItem type={CategoryItemType.text} value={text || 0} />,
    // },
    // {
    //   title: '头部集中度',
    //   dataIndex: 'headRatio',
    //   key: 'headRatio',
    //   // width: 100,
    //   render: (text: any, record: any) => (
    //     <CategoryTableItem
    //       type={CategoryItemType.processRange}
    //       value={parseInt(text)}
    //       min={record.headRatioMin}
    //       max={record.headRatioMax}
    //       standardValue={maxData?.headRatioMax}
    //       record={record}
    //       columnName={'headRatio'}
    //        categoryLevel={hierarchy}
    //       detailData={[
    //         {
    //           label: '二级品类',
    //           value: record.categoryName,
    //         },
    //         {
    //           label: '头部集中度',
    //           value: record.headRatio,
    //         },
    //         {
    //           label: '同比',
    //           value: record.headRatioYOY * 100,
    //         },
    //       ]}
    //       unit="%"
    //     />
    //   ),
    // },
    // {
    //   title: '同比',
    //   dataIndex: 'headRatioYOY',
    //   key: 'headRatioYOY',
    //   // width: 100,
    //   render: (text: any) => <CategoryTableItem type={CategoryItemType.text} value={text || 0} />,
    // },
    // {
    //   title: '价格指数',
    //   dataIndex: 'priceIndex',
    //   key: 'priceIndex',
    //   // width: 150,
    //   render: (text: any, record: any) => (
    //     <CategoryTableItem
    //       type={CategoryItemType.processRange}
    //       value={parseInt(Number(text))}
    //       standardValue={parseInt(Number(maxData?.priceIndexMax))}
    //       record={record}
    //       min={record.priceIndexMin}
    //       max={record.priceIndexMax}
    //       columnName={'priceIndex'}
    //        categoryLevel={hierarchy}
    //       detailData={[
    //         {
    //           label: '二级品类',
    //           value: record.categoryName,
    //         },
    //         {
    //           label: '价格指数',
    //           value: parseInt(Number(record.priceIndex)),

    //         },
    //         {
    //           label: '同比',
    //           value: percentFormatFilterValue(record.priceIndexYOY),
    //         },
    //       ]}
    //       // unit="%"
    //     />
    //   ),
    // },
    // {
    //   title: '同比',
    //   dataIndex: 'priceIndexYOY',
    //   key: 'priceIndexYOY',
    //   // width: 100,
    //   render: (text: any) => <CategoryTableItem type={CategoryItemType.text} value={percentFormatFilterValue(text) || 0} />,
    // },
  ]

  return <Table scroll={{ y: 500 }} bordered dataSource={list} columns={columns} pagination={false} />
}
export default BoundaryLineTable
